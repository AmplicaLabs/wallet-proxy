// Generic helper functions that do not depend on any Polkadot or other specialized libraries
// Please keep imports As Low As Reasonably Achievable

export const getEndpointFromURL = (url: any): { endpoint?: string; error?: string } => {
  try {
    const endpoint = url?.searchParams.get('endpoint');
    if (!endpoint) {
      return { error: 'An `endpoint` URL parameter is required.<br>' };
    }
    new URL(endpoint);
    return { endpoint };
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
