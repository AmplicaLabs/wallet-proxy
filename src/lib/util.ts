// Generic helper functions that do not depend on any Polkadot or other specialized libraries
// Please keep imports As Low As Reasonably Achievable

// Parses the URL, looks for an rpc searchParam, parses the value as a URL
// and verifies that it at least uses a WebSocket protocol
export const getRpcEndpointFromURL = (url: URL): { endpoint?: string; error?: string } => {
  let rpcEndpoint = '';
  try {
    rpcEndpoint = url?.searchParams.get('rpc') || '';
    if (!rpcEndpoint) {
      throw new Error('An `rpc` searchParam is required.');
    }
    const parsedEndpoint = new URL(rpcEndpoint);
    if (parsedEndpoint.protocol !== 'ws:' && parsedEndpoint.protocol !== 'wss:') {
      throw new Error(`${rpcEndpoint} must be a WebSocket URL`);
    }
    return { endpoint: rpcEndpoint };
  } catch (e: any) {
    const error = [
      e?.message ? e.message : 'Unknown error with',
      `<span class="font-bold mt-8">Request URL:</span> ${url}`
    ].join('<br>');
    return {
      error: error
    };
  }
};

export const getBlockNumber = async (url: string): Promise<number> => {
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
