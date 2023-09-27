import type { U8aLike } from '@polkadot/util/types';

export type AuthorizationSignatures = {
  claimHandle: U8aLike;
  authorizedDelegationAndSchemas: U8aLike;
};

export type MsaInfo = {
  msaId: number,
  handle: string,
}