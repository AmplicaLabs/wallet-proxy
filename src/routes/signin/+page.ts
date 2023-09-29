import { getRpcEndpointFromURL } from '$lib/util';

export function load({ url }: any) {
  return {
    endpoint: getRpcEndpointFromURL(url),
    schemas: url.searchParams.get('schemas'),
  };
}
