import {writable} from 'svelte/store';
import type {AuthorizationSignatures, MsaInfo, SignInAuthorization} from '$lib/storeTypes';
import type {InjectedAccount} from '@polkadot/extension-inject/types';

export const HandleStore = writable<string>('');
export const SelectedWalletStore = writable<string>('');
export const SelectedWalletAccountsStore = writable<InjectedAccount[]>([]);
export const SelectedSigningKey = writable<string>('');
export const MsaInfoStore = writable<Record<string, MsaInfo>>({});

const DefaultSignatureStore: AuthorizationSignatures = {
  claimHandle: [],
  authorizedDelegationAndSchemas: []
};
export const SignatureStore = writable<AuthorizationSignatures>(DefaultSignatureStore);
export const DefaultSignInSignatureStore: SignInAuthorization = {
  eip712Payload: {
    address: '',
    chainId: "frequency-mainnet",
    chainPrefix: 42,
    protocol: "dsnp"
  }, signature: ''
}

export const SignInSignatureStore = writable<SignInAuthorization>(DefaultSignInSignatureStore);
