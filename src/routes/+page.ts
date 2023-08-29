import { getEndpointFromURL } from '$lib/util';
/** @type {import('../$types').PageLoad} */

export function load({ url }: any) {
  return getEndpointFromURL(url);
}
