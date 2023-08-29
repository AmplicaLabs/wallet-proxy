/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import type { ApiPromise, ApiRx } from '@polkadot/api';
import type { ApiTypes, AugmentedEvent, SubmittableExtrinsic } from '@polkadot/api/types';
import type { Vec, Option } from '@polkadot/types';
import type { FrameSystemAccountInfo } from '@polkadot/types/lookup';
import type { AnyTuple, Codec, IEvent, ISubmittableResult } from '@polkadot/types/types';
import { firstValueFrom, filter, map, pipe, tap } from 'rxjs';
import type { Event, SignedBlock } from '@polkadot/types/interfaces';
import type { IsEvent } from '@polkadot/types/metadata/decorate/types';
import type {
  HandleResponse,
  ItemizedStoragePageResponse,
  MessageSourceId,
  PaginatedStorageResponse,
  PresumptiveSuffixesResponse,
} from '@frequency-chain/api-augment/interfaces';
import { u8aToHex } from '@polkadot/util/u8a/toHex';
import { u8aWrapBytes } from '@polkadot/util';
import type { Call } from '@polkadot/types/interfaces/runtime';
import type { KeyringPair } from '@polkadot/keyring/types';
import { connect, connectPromise } from './apiConnection';
import { log } from '../util';
import type { Sr25519Signature } from "./helpers";
import  {EventError} from "$lib/chain/chainTypes";
import type {
  AddKeyData,
  AddProviderPayload,
  EventMap,
  ItemizedSignaturePayload,
  PaginatedDeleteSignaturePayload,
  PaginatedUpsertSignaturePayload,
  ParsedEventResult,
} from "$lib/chain/chainTypes";

type ParsedEvent<C extends Codec[] = Codec[], N = unknown> = IEvent<C, N>;

function eventKey(event: Event): string {
  return `${event.section}.${event.method}`;
}

export async function getBlockNumber(): Promise<number> {
  return (await ExtrinsicHelper.getLastBlock()).block.header.number.toNumber();
}

/**
 * These helpers return a map of events, some of which contain useful data, some of which don't.
 * Extrinsics that "create" records typically contain an ID of the entity they created, and this
 * would be a useful value to return. However, this data seems to be nested inside an array of arrays.
 *
 * Ex: schemaId = events["schemas.SchemaCreated"][<arbitrary_index>]
 *
 * To get the value associated with an event key, we would need to query inside that nested array with
 * a set of arbitrary indices. Should an object at any level of that querying be undefined, the helper
 * will throw an unchecked exception.
 *
 * To get type checking and cast a returned event as a specific event type, you can utilize TypeScripts
 * type guard functionality like so:
 *
 *      const msaCreatedEvent = events.defaultEvent;
 *      if (ExtrinsicHelper.api.events.msa.MsaCreated.is(msaCreatedEvent)) {
 *          msaId = msaCreatedEvent.data.msaId;
 *      }
 */

export class Extrinsic<T extends ISubmittableResult = ISubmittableResult, C extends Codec[] = Codec[], N = unknown> {
  private event?: IsEvent<C, N>;

  private extrinsic: () => SubmittableExtrinsic<'rxjs', T>;

  // private call: Call;
  private keys: KeyringPair;

  public api: ApiRx;

  constructor(extrinsic: () => SubmittableExtrinsic<'rxjs', T>, keys: KeyringPair, targetEvent?: IsEvent<C, N>) {
    this.extrinsic = extrinsic;
    this.keys = keys;
    this.event = targetEvent;
    this.api = ExtrinsicHelper.api;
  }

  public get targetEvent() {
    return this.event;
  }

  public signAndSend(nonce?: number): Promise<ParsedEventResult> {
    return firstValueFrom(
      this.extrinsic()
        .signAndSend(this.keys, { nonce })
        .pipe(
          filter(({ status }) => status.isInBlock || status.isFinalized),
          this.parseResult(this.event),
        ),
    );
  }

  public getEstimatedTxFee(): Promise<bigint> {
    return firstValueFrom(
      this.extrinsic()
        .paymentInfo(this.keys)
        .pipe(map((info) => info.partialFee.toBigInt())),
    );
  }

  public getCall(): Call {
    const call = ExtrinsicHelper.api.createType('Call', this.extrinsic.call);
    return call;
  }

  // eslint-disable-next-line no-shadow
  private parseResult<ApiType extends ApiTypes = 'rxjs', T extends AnyTuple = AnyTuple, N = unknown>(targetEvent?: AugmentedEvent<ApiType, T, N>) {
    return pipe(
      tap((result: ISubmittableResult) => {
        if (result.dispatchError) {
          const err = new EventError(result.dispatchError);
          log(err.toString());
          throw err;
        }
      }),
      map((result: ISubmittableResult) =>
        result.events.reduce((acc, { event }) => {
          acc[eventKey(event)] = event;
          if (targetEvent && targetEvent.is(event)) {
            acc.defaultEvent = event;
          }
          if (this.api.events.sudo.Sudid.is(event)) {
            const { sudoResult } = event.data;
            if (sudoResult.isErr) {
              const err = new EventError(sudoResult.asErr);
              log(err.toString());
              throw err;
            }
          }
          return acc;
        }, {} as EventMap),
      ),
      map((em) => {
        // const result: ParsedEventResult<T, N> = [undefined, {}];
        const result: ParsedEventResult = [undefined, {}];
        if (targetEvent && targetEvent.is(em?.defaultEvent)) {
          result[0] = em.defaultEvent;
        }
        result[1] = em;
        return result;
      }),
      tap((events) => log(events)),
    );
  }
}

export class ExtrinsicHelper {
  public static api: ApiRx;

  public static apiPromise: ApiPromise;

  public static async initialize(providerUrl: string | string[]) {
    ExtrinsicHelper.api = await connect(providerUrl);
    // For single state queries (api.query), ApiPromise is better
    ExtrinsicHelper.apiPromise = await connectPromise(providerUrl);
  }

  public static async disconnect(): Promise<void> {
    await ExtrinsicHelper.api.disconnect();
    await ExtrinsicHelper.apiPromise.disconnect();
  }

  public static getLastBlock(): Promise<SignedBlock> {
    return firstValueFrom(ExtrinsicHelper.api.rpc.chain.getBlock());
  }

  /** Query Extrinsics */
  public static getAccountInfo(address: string): Promise<FrameSystemAccountInfo> {
    return ExtrinsicHelper.apiPromise.query.system.account(address);
  }

  public static getCurrentMsaIdentifierMaximum() {
    return ExtrinsicHelper.apiPromise.query.msa.currentMsaIdentifierMaximum();
  }

  public static addPublicKeyToMsa(keys: KeyringPair, ownerSignature: Sr25519Signature, newSignature: Sr25519Signature, payload: AddKeyData): Extrinsic {
    return new Extrinsic(
      () => ExtrinsicHelper.api.tx.msa.addPublicKeyToMsa(keys.publicKey, ownerSignature, newSignature, payload),
      keys,
      ExtrinsicHelper.api.events.msa.PublicKeyAdded,
    );
  }

  public static createSponsoredAccountWithDelegation(delegatorKeys: KeyringPair, providerKeys: KeyringPair, signature: Sr25519Signature, payload: AddProviderPayload): Extrinsic {
    return new Extrinsic(
      () => ExtrinsicHelper.api.tx.msa.createSponsoredAccountWithDelegation(delegatorKeys.publicKey, signature, payload),
      providerKeys,
      ExtrinsicHelper.api.events.msa.MsaCreated,
    );
  }

  public static grantDelegation(delegatorKeys: KeyringPair, providerKeys: KeyringPair, signature: Sr25519Signature, payload: AddProviderPayload): Extrinsic {
    return new Extrinsic(
      () => ExtrinsicHelper.api.tx.msa.grantDelegation(delegatorKeys.publicKey, signature, payload),
      providerKeys,
      ExtrinsicHelper.api.events.msa.DelegationGranted,
    );
  }

  public static revokeDelegationByDelegator(keys: KeyringPair, providerMsaId: any): Extrinsic {
    return new Extrinsic(() => ExtrinsicHelper.api.tx.msa.revokeDelegationByDelegator(providerMsaId), keys, ExtrinsicHelper.api.events.msa.DelegationRevoked);
  }

  public static applyItemActionsWithSignature(delegatorKeys: KeyringPair, providerKeys: KeyringPair, signature: Sr25519Signature, payload: ItemizedSignaturePayload): Extrinsic {
    return new Extrinsic(
      () => ExtrinsicHelper.api.tx.statefulStorage.applyItemActionsWithSignature(delegatorKeys.publicKey, signature, payload),
      providerKeys,
      ExtrinsicHelper.api.events.statefulStorage.ItemizedPageUpdated,
    );
  }

  public static removePageWithSignature(delegatorKeys: KeyringPair, providerKeys: KeyringPair, signature: Sr25519Signature, payload: PaginatedDeleteSignaturePayload): Extrinsic {
    return new Extrinsic(
      () => ExtrinsicHelper.api.tx.statefulStorage.deletePageWithSignature(delegatorKeys.publicKey, signature, payload),
      providerKeys,
      ExtrinsicHelper.api.events.statefulStorage.PaginatedPageDeleted,
    );
  }

  public static upsertPageWithSignature(delegatorKeys: KeyringPair, providerKeys: KeyringPair, signature: Sr25519Signature, payload: PaginatedUpsertSignaturePayload): Extrinsic {
    return new Extrinsic(
      () => ExtrinsicHelper.api.tx.statefulStorage.upsertPageWithSignature(delegatorKeys.publicKey, signature, payload),
      providerKeys,
      ExtrinsicHelper.api.events.statefulStorage.PaginatedPageUpdated,
    );
  }

  public static getItemizedStorage(msa_id: MessageSourceId, schemaId: any): Promise<ItemizedStoragePageResponse> {
    return firstValueFrom(ExtrinsicHelper.api.rpc.statefulStorage.getItemizedStorage(msa_id, schemaId));
  }

  public static getPaginatedStorage(msa_id: MessageSourceId, schemaId: any): Promise<Vec<PaginatedStorageResponse>> {
    return firstValueFrom(ExtrinsicHelper.api.rpc.statefulStorage.getPaginatedStorage(msa_id, schemaId));
  }

  public static claimHandle(delegatorKeys: KeyringPair, payload: any): Extrinsic {
    const proof = {
      Sr25519: u8aToHex(delegatorKeys.sign(u8aWrapBytes(payload.toU8a()))),
    };
    return new Extrinsic(
      () => ExtrinsicHelper.api.tx.handles.claimHandle(delegatorKeys.publicKey, proof, payload),
      delegatorKeys,
      ExtrinsicHelper.api.events.handles.HandleClaimed,
    );
  }

  public static getNextSuffixesForHandle(base_handle: string, count: number): Promise<PresumptiveSuffixesResponse> {
    let suffixes = ExtrinsicHelper.api.rpc.handles.getNextSuffixes(base_handle, count);
    return firstValueFrom(suffixes);
  }

  public static getHandleForMSA(msa_id: MessageSourceId): Promise<Option<HandleResponse>> {
    const handle_response = ExtrinsicHelper.api.rpc.handles.getHandleForMsa(msa_id);
    return firstValueFrom(handle_response);
  }

  public static getMsaForHandle(handle: string): Promise<Option<MessageSourceId>> {
    const msa_response = ExtrinsicHelper.api.rpc.handles.getMsaForHandle(handle);
    return firstValueFrom(msa_response);
  }

}
