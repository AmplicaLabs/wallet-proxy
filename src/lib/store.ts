import { writable } from 'svelte/store';
import type { AuthorizationSignatures } from "$lib/storeTypes";
import type {InjectedAccount} from "@polkadot/extension-inject/types";

export const HandleStore = writable<string>('');
export const SelectedWalletStore = writable<string>('');
export const SelectedWalletAccountsStore = writable<InjectedAccount[]>([]);

export const SelectedSigningKey = writable<string>('');

const defaultSignatureStore: AuthorizationSignatures = {
  claimHandle: [], authorizedDelegationAndSchemas: []
}
export const SignatureStore = writable<AuthorizationSignatures>(
  defaultSignatureStore
)

export const clearStore = () => {
  HandleStore.set('');
  SelectedWalletStore.set('');
  SelectedWalletAccountsStore.set([]);
  SelectedSigningKey.set('');
  SignatureStore.set(defaultSignatureStore);
}