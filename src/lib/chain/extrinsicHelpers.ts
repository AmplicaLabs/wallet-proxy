/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import type {ApiRx} from '@polkadot/api';
import {first, firstValueFrom} from 'rxjs';
import type {SignedBlock} from '@polkadot/types/interfaces';
import {connect} from './apiConnection';
import {isWebSocket} from '$lib/util';
import type {MsaInfo} from "$lib/storeTypes";

export class ExtrinsicHelper {
  public static api: ApiRx;

  public static apiPromise: ApiPromise;

  public static async initialize(providerUrl: string) {
    if (isWebSocket(providerUrl)) {
      if (providerUrl.length === 0) {
        console.error('providerUrl cannot be empty: ');
        return;
      }
      ExtrinsicHelper.api = await connect(providerUrl);
    } else {
      console.log('will not initialize: non-WebSocket endpoint');
    }
  }

  public static async getGenesisHash(url: string): Promise<string> {
    if (!ExtrinsicHelper.api) {
      await ExtrinsicHelper.initialize(url);
    }
    const hash = await ExtrinsicHelper.api.runtimeMetadata.hash;
    return hash.toString();
  }

  // No guard needed for this since we're checking the endpoint upstream
  public static async getBlockNumber(url: string): Promise<number> {
    if (!ExtrinsicHelper.api) {
      await ExtrinsicHelper.initialize(url);
    }
    return (await ExtrinsicHelper.getLastBlock()).block.header.number.toNumber();
  }

  static async getLastBlock(url: string): Promise<SignedBlock> {
    if (!ExtrinsicHelper.api) {
      await ExtrinsicHelper.initialize(url);
    }
    return firstValueFrom(ExtrinsicHelper.api.rpc.chain.getBlock());
  }

  public static async getMsaInfo(url: string, address: string): Promise<MsaInfo> {
    if (!ExtrinsicHelper.api) {
      await ExtrinsicHelper.initialize(url);
    }
    const result =  (await firstValueFrom(ExtrinsicHelper.api.query.msa.publicKeyToMsaId(address)));
    const msaId = result
    .unwrapOrDefault()
    .toNumber();
    if (msaId > 0) {
      const handleResult = (await firstValueFrom(ExtrinsicHelper.api.query.handles.msaIdToDisplayName(msaId)))
      .unwrapOrDefault();
      const handle = handleResult[0].toHuman();
      return {msaId, handle};
    } else {
      return {msaId: 0, handle: ''};
    }
  }
}
