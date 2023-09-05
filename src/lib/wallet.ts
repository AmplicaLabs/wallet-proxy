import type {InjectedAccount, InjectedExtension, InjectedWindow} from '@polkadot/extension-inject/types';
import {ExtrinsicHelper} from "$lib/chain/extrinsicHelpers";

const isWalletInstalled = function (injectedName: string): boolean {
  if (window.injectedWeb3) {
    return injectedName in (window as any as InjectedWindow)?.injectedWeb3;
  }

  return false;
};

const walletConnector = async function (
  injectedName: string,
  originName: string
): Promise<InjectedExtension> {
  const wallet = window?.injectedWeb3?.[injectedName];

  if (!wallet) {
    throw new Error(`Wallet extension ${injectedName} not found`);
  }

  if (wallet.enable) {
    const res = await wallet.enable(originName);

    return {
      ...res,
      name: injectedName,
      version: wallet.version || ''
    };
  }

  if (wallet.connect) {
    return await wallet.connect(originName);
  }

  throw new Error('No connect(..) or enable(...) hook found');
};

async function onReady<T = InjectedWindow>(): Promise<T | null> {
  if (document.readyState !== 'loading') {
    const { injectedWeb3 } = window;
    return injectedWeb3 ? (injectedWeb3 as unknown as T) : null;
  }

  await new Promise<void>((resolve) => window.addEventListener('load', resolve));

  const { injectedWeb3 } = window;
  return injectedWeb3 ? (injectedWeb3 as unknown as T) : null;
}

const getAccounts = async (injectedName: string): Promise<Array<InjectedAccount>> => {
  const extension = await walletConnector(injectedName, 'Acme App');
  let chainGenesis = await ExtrinsicHelper.getGenesisHash();
  const allAccounts = await extension.accounts.get();
  return allAccounts.filter((a: InjectedAccount) => !a.genesisHash || (chainGenesis === a.genesisHash));
}

export { onReady, walletConnector, isWalletInstalled, getAccounts};
