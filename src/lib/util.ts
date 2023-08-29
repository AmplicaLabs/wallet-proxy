// Generic helper functions that do not depend on any polkadot or other specialized libraries
// Please keep imports as low as reasonably achievable
export const getEndpointFromURL = (url: any):
  {endpoint?: string, error?: string}  => {
  try {
    const endpoint = url?.searchParams.get('endpoint');
    if (!endpoint) { return { error: 'An `endpoint` URL parameter is required.<br>'} }
    new URL(endpoint);
    return { endpoint }
  } catch (e: any) {
    const error = [
      (e?.message ? e.message : "Unknown error with"),
      `<span class="font-bold mt-8">Request URL:</span> ${url}`,
    ].join('<br>');
    return {
      error: error
    }
  }
}
