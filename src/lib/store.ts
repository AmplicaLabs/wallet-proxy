import { writable } from "svelte/store";
import type { InjectedAccount, InjectedExtension } from '@polkadot/extension-inject/types';

export const WalletInfoStore = writable({})

export const HandleStore = writable('');