import { isFunction, u8aWrapBytes, u8aToHex } from '@polkadot/util';
import type { U8aLike } from '@polkadot/util/types';
import {TypeRegistry, Bytes, U8aFixed} from '@polkadot/types';
import { walletConnector } from './wallet';
import { getBlockNumber } from '$lib/chain/util';
import type {SignInAuthorization} from "$lib/storeTypes";
import {DefaultSignInSignatureStore} from "$lib/store";
import RLP from "rlp";

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

export async function getDelegationAndPermissionSignature(
  walletName: string,
  account: string,
  endpoint: string,
  providerId: string,
  schemasIds: number[]
): Promise<U8aLike> {
  const blockNumber = await getBlockNumber(endpoint);
  const expiration = blockNumber + 50;
  const addProviderPayload = payloadAddProvider(expiration, providerId, schemasIds);

  return await signPayloadWithExtension(walletName, account, addProviderPayload.toU8a());
}

export async function getHandleSignature(
  walletName: string,
  account: string,
  endpoint: string,
  handleName: string
): Promise<U8aLike> {
  const blockNumber = await getBlockNumber(endpoint);
  const expiration = blockNumber + 50;
  const handlePayload = payloadHandle(expiration, handleName);

  return await signPayloadWithExtension(walletName, account, handlePayload.toU8a());
}

// use EIP-712 standard to create a payload to sign, and signs it using selected extension
export async function getSignInSignature(wallet: string,  address: string): Promise<SignInAuthorization> {
  let authorization = DefaultSignInSignatureStore;
  authorization.eip712Payload.address = address;
  const payload = JSON.stringify(authorization.eip712Payload);
  const encoded = RLP.encode(payload);
  authorization.signature = await signPayloadWithExtension(wallet, address, encoded);
  return authorization;
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
  return Registry.createType('ClaimHandle', {
    baseHandle: handleBytes,
    expiration
  });
};

export const payloadAddProvider = (expiration: number, providerId: string, schemaIds: number[]) => {
  schemaIds.sort();
  return Registry.createType('AddProvider', {
    authorizedMsaId: providerId,
    expiration,
    schemaIds
  });
};

