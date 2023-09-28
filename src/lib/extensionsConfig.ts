import TalismanIcon from '$components/icons/TalismanRedIcon.svelte';
import PolkadotIcon from '$components/icons/Polkadot.svelte';
import SubWallet from '$components/icons/SubWallet.svelte';

export type Extension = {
  displayName: string;
  injectedName: string;
  downloadUrl: Record<string, string>;
  logo: Record<string, any>;
};

export const extensionsConfig: Array<Extension> = [
  {
    displayName: 'Polkadot',
    injectedName: 'polkadot-js',
    downloadUrl: {
      chrome:
        'https://chrome.google.com/webstore/detail/talisman-polkadot-and-eth/fijngjgcjhjmmpcmkeiomlglpeiijkld',
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/'
    },
    logo: { component: PolkadotIcon, size: '5em' }
  },
  {
    displayName: 'Talisman',
    injectedName: 'talisman',
    downloadUrl: {
      chrome:
        'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd',

      firefox: ''
    },
    logo: { component: TalismanIcon, size: '5em' }
  },
  {
    displayName: 'SubWallet',
    injectedName: 'subwallet-js',
    downloadUrl: {
      chrome: 'https://chrome.google.com/webstore/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
      firefox: '',
    },
    logo: { component: SubWallet, size: '6em'},
  }
];
