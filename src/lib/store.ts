import { writable } from 'svelte/store';

export const HandleStore = writable<string>('');
export const SelectedWalletStore = writable<string>('');
export const SelectedWalletAccountsStore = writable<string[]>([]);
export const InjectedWeb3Store = writable();
