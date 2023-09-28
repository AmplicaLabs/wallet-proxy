import {ExtrinsicHelper} from '$lib/chain/extrinsicHelpers';
import {isWebSocket} from '$lib/util';
import type {InjectedAccount} from "@polkadot/extension-inject/types";
import type {MsaInfo} from "$lib/storeTypes";
import type {U8aLike} from "@polkadot/util/types";

const fetchQuery = async (url: string, method: string, params: Array<any>) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch block number');
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.result;
}
const fetchBlockNumber = async (url: string): Promise<number> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'chain_getHeader',
        params: []
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch block number');
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (data.result) {
      return Number(data.result.number);
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchGenesisHash = async (url: string) => {
  // @ts-ignore
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'chain_getBlockHash',
        params: []
      })
    });

    if (!response.ok) {
      console.error({response});
      throw new Error('Failed to fetch genesis hash');
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (data.result) {
      return data.result;
    }

    throw new Error('Invalid response format');
  } catch (e: Error) {
    console.error(e.message);
  }
};

const fetchMsaInfo = async(url: string, address: string): Promise<MsaInfo> => {
  const result = await fetchQuery(url, 'msa_getMsaIdFromPublicKey', [address]);
  const msaId = Number(result.number);
  const handle = await fetchQuery(url, 'handles_getDisplayHandleFromMsaId', [msaId]);
  return { msaId, handle };
}
// Basic utilities
// For use w/ localhost testing

export const getBlockNumber = async (url: string): Promise<number> => {
  return isWebSocket(url) ? await ExtrinsicHelper.getBlockNumber(url) : await fetchBlockNumber(url);
};

export const getGenesisHash = async (url: string): Promise<string> => {
  return isWebSocket(url) ? await ExtrinsicHelper.getGenesisHash(url) : await fetchGenesisHash(url);
};


export const getMsaInfo = async (accounts: Array<InjectedAccount>, url: string): Promise<Record<string, MsaInfo>> => {
  let msaInfos: Record<string, MsaInfo> = {}
  for (const injectedAccount of accounts) {
    let info: MsaInfo = isWebSocket(url) ?
      await ExtrinsicHelper.getMsaInfo(url, injectedAccount.address) :
      await fetchMsaInfo(url, injectedAccount.address);
    if (info.msaId > 0) {
      msaInfos[injectedAccount.address] = info;
    }
  }
  return msaInfos;
}