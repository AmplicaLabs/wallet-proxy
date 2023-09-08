import { getRpcEndpointFromURL } from '$lib/util';

export function load({ url }: any) {
  return {
    ...getRpcEndpointFromURL(url),
    schemas: url.searchParams.get('schemas')
  };
}
