import { get } from 'svelte/store';
import { options } from '@frequency-chain/api-augment';
import { ApiRx, WsProvider, ApiPromise, Keyring } from '@polkadot/api';
import { firstValueFrom } from 'rxjs';

export async function connect(providerUrl: string | string[] | undefined): Promise<ApiRx> {
  const provider = new WsProvider(providerUrl);
  const apiObservable = ApiRx.create({ provider, ...options });
  return firstValueFrom(apiObservable);
}

export async function connectPromise(providerUrl: string | string[] ): Promise<ApiPromise> {
  const provider = new WsProvider(providerUrl);
  const apiPromise = await ApiPromise.create({
    provider,
    throwOnConnect: true,
    throwOnUnknown: true,
    ...options,
  });
  await apiPromise.isReady;
  return apiPromise;
}
