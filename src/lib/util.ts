// Generic helper functions that do not depend on any Polkadot or other specialized libraries
// Please keep imports As Low As Reasonably Achievable

// Parses the URL, looks for an rpc searchParam, parses the value as a URL
// and verifies that it at least uses a WebSocket protocol
export const getRpcEndpointFromURL = (url: any): { endpoint?: string; error?: string } => {
  let endpoint = '';
  try {
    let parsedURL = new URL(url);
    endpoint = parsedURL?.searchParams.get('rpc') || '';
    if (!endpoint) {
      throw new Error('An `rpc` searchParam is required.');
    }
    let parsedEndpoint = new URL(endpoint);
    if (parsedEndpoint.protocol !== 'ws:' && parsedEndpoint.protocol !== 'wss:') {
      throw new Error(`${endpoint} must be a WebSocket URL`)
    }
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
