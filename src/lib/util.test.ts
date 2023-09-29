import { getRpcEndpointFromURL } from '$lib/util';

describe('getEndpointFromURL', () => {
  [
    {
      name: 'when there is no rpc searchParam',
      url: new URL('http://foo.bar'),
      expectMatch: 'An `rpc` searchParam is required.'
    },
    {
      name: 'when the rpc searchParam is not a valid URL',
      url: new URL('http://foo.bar/?rpc=sdfkljsdflk'),
      expectMatch: 'Invalid URL: sdfkljsdflk'
    },
  ].forEach((testCase) => {
    it(`returns error ${testCase.name}`, () => {
      const res =
      expect(() =>   getRpcEndpointFromURL(testCase.url) )
      .toThrowError(testCase.expectMatch);
    });
  });

  describe('happy paths', () => {
    const testUrls = [
      'rpc.rococo.frequency.xyz',
      'frequency-rpc.dwellir.com',
      '1.rpc.frequency.xyz',
      'frequency-polkadot.api.onfinality.io'
    ];
    testUrls.forEach((rpcEndpoint) => {
      it('works for ' + rpcEndpoint, () => {
        const url = new URL(`http://myfancydApp.com/?rpc=wss%3A%2F%2F${rpcEndpoint}`);
        const res = getRpcEndpointFromURL(url);
        expect(res).toEqual('wss://' + rpcEndpoint);
      });
    });
  });
});
