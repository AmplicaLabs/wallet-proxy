/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import type { ApiPromise, ApiRx } from '@polkadot/api';
import { firstValueFrom } from 'rxjs';
import type { SignedBlock } from '@polkadot/types/interfaces';
import { connect, connectPromise } from './apiConnection';

export class ExtrinsicHelper {
  public static api: ApiRx;

  public static apiPromise: ApiPromise;

  public static async initialize(providerUrl: string) {
    if (providerUrl.length === 0) {
      console.error("providerUrl cannot be empty: ")
      return;
    }
    ExtrinsicHelper.api = await connect(providerUrl);
    // For single state queries (api.query), ApiPromise is better
    ExtrinsicHelper.apiPromise = await connectPromise(providerUrl);
  }

  public static async getGenesisHash(): Promise<string> {
    const hash = await ExtrinsicHelper.api.runtimeMetadata.hash;
    return hash.toString();
  }
  public static async getBlockNumber(): Promise<number> {
    return (await ExtrinsicHelper.getLastBlock()).block.header.number.toNumber();
  }

  public static async getLastBlock(): Promise<SignedBlock> {
    return firstValueFrom(ExtrinsicHelper.api.rpc.chain.getBlock());
  }
}
