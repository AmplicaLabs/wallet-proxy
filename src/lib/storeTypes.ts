import type { U8aLike } from '@polkadot/util/types';

export type SignInAuthorization = {
  signature: U8aLike;
  eip712Payload: {
    protocol: string;
    chainId: string;
    chainPrefix: number;
    address: string;
  }
}

export type AuthorizationSignatures = {
  claimHandle: U8aLike;
  authorizedDelegationAndSchemas: U8aLike;
};

export type MsaInfo = {
  msaId: number,
  handle: string,
}