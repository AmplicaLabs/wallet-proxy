import { getEndpointFromURL } from '$lib/util';
/** @type {import('./$types').PageLoad} */

// wss%3A%2F%2F0.rpc.frequency.xyz
// wss%3A%2F%2Frpc.rococo.frequency.xyz

export function load({ url }: any) {
  return getEndpointFromURL(url);
}
