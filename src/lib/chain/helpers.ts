import { firstValueFrom } from "rxjs";
import {ExtrinsicHelper} from "$lib/chain/extrinsicHelpers";
import type { KeyringPair } from "@polkadot/keyring/types";
import { u16, u32, Option } from '@polkadot/types';
import type { Codec } from "@polkadot/types/types";
import {u8aToHex, u8aWrapBytes} from "@polkadot/util";
import type { HandleResponse, MessageSourceId, PageHash } from "@frequency-chain/api-augment/interfaces";
import type {
  AddKeyData,
  AddProviderPayload,
  ItemizedSignaturePayload,
  PaginatedDeleteSignaturePayload,
  PaginatedUpsertSignaturePayload,
} from "$lib/chain/chainTypes";
import { getBlockNumber } from "$lib/chain/extrinsicHelpers";

export type Sr25519Signature = { Sr25519: `0x${string}` };

export function signPayloadSr25519(keys: KeyringPair, data: Codec): Sr25519Signature {
  return { Sr25519: u8aToHex(keys.sign(u8aWrapBytes(data.toU8a()))) };
}

export async function generateDelegationPayload(payloadInputs: AddProviderPayload, expirationOffset?: number): Promise<AddProviderPayload> {
  // eslint-disable-next-line prefer-const
  let { expiration, ...payload } = payloadInputs;
  if (!expiration) {
    expiration = (await getBlockNumber()) + (expirationOffset || 5);
  }

  return {
    expiration,
    ...payload,
  };
}

export async function generateAddKeyPayload(
  payloadInputs: AddKeyData,
  // eslint-disable-next-line default-param-last
  expirationOffset: number = 100,
  blockNumber?: number,
): Promise<AddKeyData> {
  // eslint-disable-next-line prefer-const
  let { expiration, ...payload } = payloadInputs;
  if (!expiration) {
    expiration = (blockNumber || (await getBlockNumber())) + expirationOffset;
  }

  return {
    expiration,
    ...payload,
  };
}

export async function generateItemizedSignaturePayload(payloadInputs: ItemizedSignaturePayload, expirationOffset?: number): Promise<ItemizedSignaturePayload> {
  // eslint-disable-next-line prefer-const
  let { expiration, ...payload } = payloadInputs;
  if (!expiration) {
    expiration = (await ExtrinsicHelper.getLastBlock()).block.header.number.toNumber() + (expirationOffset || 5);
  }

  return {
    expiration,
    ...payload,
  };
}

export async function generatePaginatedUpsertSignaturePayload(payloadInputs: PaginatedUpsertSignaturePayload, expirationOffset?: number): Promise<PaginatedUpsertSignaturePayload> {
  // eslint-disable-next-line prefer-const
  let { expiration, ...payload } = payloadInputs;
  if (!expiration) {
    expiration = (await ExtrinsicHelper.getLastBlock()).block.header.number.toNumber() + (expirationOffset || 5);
  }

  return {
    expiration,
    ...payload,
  };
}

export async function generatePaginatedDeleteSignaturePayload(payloadInputs: PaginatedDeleteSignaturePayload, expirationOffset?: number): Promise<PaginatedDeleteSignaturePayload> {
  // eslint-disable-next-line prefer-const
  let { expiration, ...payload } = payloadInputs;
  if (!expiration) {
    expiration = (await ExtrinsicHelper.getLastBlock()).block.header.number.toNumber() + (expirationOffset || 5);
  }

  return {
    expiration,
    ...payload,
  };
}

export async function getCurrentItemizedHash(msaId: MessageSourceId, schemaId: u16): Promise<PageHash> {
  const result = await ExtrinsicHelper.getItemizedStorage(msaId, schemaId);
  return result.content_hash;
}

export async function getCurrentPaginatedHash(msaId: MessageSourceId, schemaId: u16, pageId: number): Promise<u32> {
  const result = await ExtrinsicHelper.getPaginatedStorage(msaId, schemaId);
  const pageResponse = result.filter((page) => page.page_id.toNumber() === pageId);
  if (pageResponse.length <= 0) {
    return new u32(ExtrinsicHelper.api.registry, 0);
  }

  return pageResponse[0].content_hash;
}

export async function getHandleForMsa(msaId: MessageSourceId): Promise<Option<HandleResponse>> {
  const result = await ExtrinsicHelper.getHandleForMSA(msaId);
  return result;
}

export async function getNonce(keys: KeyringPair): Promise<number> {
  const nonce = await firstValueFrom(ExtrinsicHelper.api.call.accountNonceApi.accountNonce(keys.address));
  return nonce.toNumber();
}

