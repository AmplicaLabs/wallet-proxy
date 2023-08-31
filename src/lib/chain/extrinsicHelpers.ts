/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import type { ApiPromise, ApiRx } from '@polkadot/api';
import type { InjectedAccount, InjectedExtension } from '@polkadot/extension-inject/types';
import type { Option } from '@polkadot/types';
import { firstValueFrom } from 'rxjs';
import type { SignedBlock } from '@polkadot/types/interfaces';
import type {
  HandleResponse,
  MessageSourceId,
} from '@frequency-chain/api-augment/interfaces';
import { connect, connectPromise } from './apiConnection';

export async function getBlockNumber(): Promise<number> {
  return (await ExtrinsicHelper.getLastBlock()).block.header.number.toNumber();
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

  public static async getGenesisHash(): Promise<string> {
    const hash = await ExtrinsicHelper.api.runtimeMetadata.hash;
    return hash.toString();
  }

  public static getLastBlock(): Promise<SignedBlock> {
    return firstValueFrom(ExtrinsicHelper.api.rpc.chain.getBlock());
  }

  /** Queries */
  public static async getNonce(publicKey: string): Promise<number> {
    const nonce = await firstValueFrom(ExtrinsicHelper.api.call.accountNonceApi.accountNonce(publicKey));
    return nonce.toNumber();
  }

  public static getHandleForMSA(msa_id: MessageSourceId): Promise<Option<HandleResponse>> {
    const handle_response = ExtrinsicHelper.api.rpc.handles.getHandleForMsa(msa_id);
    return firstValueFrom(handle_response);
  }
}
