import { writable } from "svelte/store";
import type { InjectedAccount, InjectedExtension } from '@polkadot/extension-inject/types';

export const storeWalletInfo = writable({})

export const storeHandle = writable('');