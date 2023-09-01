import type { InjectedExtension, InjectedWindow } from '@polkadot/extension-inject/types';

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
    let res = await wallet.enable(originName);

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

export { onReady, walletConnector, isWalletInstalled };
