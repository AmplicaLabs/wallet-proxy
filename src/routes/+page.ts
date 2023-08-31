import { getRpcEndpointFromURL } from '$lib/util';
/** @type {import('../$types').PageLoad} */

export function load({ url }: any) {
  return getRpcEndpointFromURL(url);
}
