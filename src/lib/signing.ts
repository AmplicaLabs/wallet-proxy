import { isFunction, u8aWrapBytes, u8aToHex } from '@polkadot/util';
import type { U8aLike } from '@polkadot/util/types';
import { TypeRegistry, Bytes } from '@polkadot/types';
import { walletConnector } from './wallet';
import { ExtrinsicHelper } from "$lib/chain/extrinsicHelpers";

const Registry = new TypeRegistry();
Registry.register({
  ClaimHandle: {
    baseHandle: 'Bytes',
    expiration: 'u32'
  },
  AddProvider: {
    authorizedMsaId: 'u64',
    schemaIds: 'Vec<u16>',
    expiration: 'u32'
  }
});

const isWebSocket = (url: string): boolean => {
  let parsed = new URL(url);
  return (parsed.protocol === 'wss:' || parsed.protocol === 'ws:');
}

export async function getDelegationAndPermissionSignature(
  walletName: string,
  account: string,
  endpoint: string,
  providerId: string,
  schemasIds: number[]
) {
  let blockNumber: number;
  if (isWebSocket(endpoint)) {
    blockNumber = await ExtrinsicHelper.getBlockNumber();
  } else {
    blockNumber = await fetchBlockNumber(endpoint);
  }
  const expiration = blockNumber + 50;
  const addProviderPayload = payloadAddProvider(expiration, providerId, schemasIds);

  return await signPayloadWithExtension(walletName, account, addProviderPayload.toU8a());
}

export async function getHandleSignature(
  walletName: string,
  account: string,
  endpoint: string,
  handleName: string
): Promise<string> {
  let blockNumber: number;
  if (isWebSocket(endpoint)) {
    blockNumber = await ExtrinsicHelper.getBlockNumber();
  } else {
    blockNumber = await fetchBlockNumber(endpoint);
  }
  const expiration = blockNumber + 50;
  const handlePayload = payloadHandle(expiration, handleName);

  return await signPayloadWithExtension(walletName, account, handlePayload.toU8a());
}

export async function signPayloadWithExtension(wallet: string, address: string, payload: U8aLike) {
  const walletAccount = await walletConnector(wallet, 'Acme App');
  const signRaw = walletAccount.signer?.signRaw;
  let signed;
  if (signRaw && isFunction(signRaw)) {
    const payloadWrappedToU8a = u8aWrapBytes(payload);
    try {
      signed = await signRaw({
        address,
        data: u8aToHex(payloadWrappedToU8a),
        type: 'bytes'
      } as any);
      return signed?.signature;
    } catch (e) {
      console.log(e);
      return 'ERROR!';
    }
  }
  return 'Unknown error';
}

export const payloadHandle = (expiration: number, handle: string) => {
  const handleBytes = new Bytes(Registry, handle);
  const claimHandlePayload = Registry.createType('ClaimHandle', {
    baseHandle: handleBytes,
    expiration
  });

  return claimHandlePayload;
};

export const payloadAddProvider = (expiration: number, providerId: string, schemaIds: number[]) => {
  schemaIds.sort();
  const claimHandlePayload = Registry.createType('AddProvider', {
    authorizedMsaId: providerId,
    expiration,
    schemaIds
  });

  return claimHandlePayload;
};

export const fetchBlockNumber = async (url: string): Promise<number> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'chain_getHeader',
        params: []
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch block number');
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (data.result) {
      return Number(data.result.number);
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
