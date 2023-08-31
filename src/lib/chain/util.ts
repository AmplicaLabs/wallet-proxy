import type { KeyringPair } from '@polkadot/keyring/types';
import { Keyring } from '@polkadot/api';
import { getKeyring, setKeyring } from '$lib/chain/apiConnection';

// Basic utilities
// For use w/ localhost testing
export function createKeys(uri: string): KeyringPair {
  let kr = getKeyring();
  if (!kr) {
    kr = new Keyring({ type: 'sr25519' });
  }
  setKeyring(kr);
  return kr.addFromUri(uri);
}
