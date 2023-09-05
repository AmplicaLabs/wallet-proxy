import type { KeyringPair } from '@polkadot/keyring/types';
import { Keyring } from '@polkadot/api';
import { ExtrinsicHelper } from "$lib/chain/extrinsicHelpers";
import { isWebSocket } from "$lib/util";

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
      console.error({response})
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
}
// Basic utilities
// For use w/ localhost testing

export const getBlockNumber = async (uri: string): Promise<number> => {
  return isWebSocket(uri) ?
    await ExtrinsicHelper.getBlockNumber() :
    await fetchBlockNumber(uri);
}

export const getGenesisHash = async (uri: string): Promise<string> => {
  return isWebSocket(uri) ?
    await ExtrinsicHelper.getGenesisHash() :
    await fetchGenesisHash(uri)
}

