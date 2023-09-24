import { getRpcEndpointFromURL } from '$lib/util';
/** @type {import('./$types').PageLoad} */

export function load({ url }: any) {
  const dAppName = url.searchParams.dAppName || 'AcmeApp';
  return {
    endpoint: getRpcEndpointFromURL(url),
    schemas: url.searchParams.schemas,
    selectedWallet: url.searchParams.selectedWallet,
    dAppName
  };
}
