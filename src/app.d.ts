// See https://kit.svelte.dev/docs/types#app

import { InjectedWindowProvider } from '@polkadot/extension-inject/types';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  interface Window {
    injectedWeb3?: Record<string, InjectedWindowProvider>;
  }
}

export {};
