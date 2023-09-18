// Generic helper functions that do not depend on any Polkadot or other specialized libraries
// Please keep imports As Low As Reasonably Achievable

// Parses the URL, looks for an rpc searchParam, parses the value as a URL
// and verifies that it at least uses a WebSocket protocol
export const getRpcEndpointFromURL = (url: URL): { endpoint?: string; error?: string } => {
  try {
    const rpcEndpoint = url?.searchParams.get('rpc');
    if (!rpcEndpoint) {
      throw new Error('An `rpc` searchParam is required.');
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

export const isWebSocket = (url: string): boolean => {
  let parsed = new URL(url);
  return parsed.protocol === 'wss:' || parsed.protocol === 'ws:';
};
