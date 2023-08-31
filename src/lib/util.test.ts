import { getRpcEndpointFromURL } from "$lib/util";

const colonSlashSlash = '%3A%2F%2F'
describe('getEndpointFromURL', () => {
  [
    {name: 'when there is no rpc searchParam',
      url: 'http://foo.bar',
      expectMatch: 'An `rpc` URL parameter is required.'},
    {name: 'when the rpc searchParam is not a valid URL',
      url: 'http://foo.bar/?rpc=sdfkljsdflk',
      expectMatch: 'Invalid URL: sdfkljsdflk'},
    {name: 'when there is no endpoint searchParam',
      url: `http://foo.bar/?rpc=http${colonSlashSlash}bar.pt`,
      expectMatch: 'http://bar.pt must be a WebSocket URL'},
  ].forEach(testCase => {
    it(`returns error ${testCase.name}`, () => {
      const res = getRpcEndpointFromURL(testCase.url);
      expect(res.error?.includes(testCase.expectMatch));
    });
  });

  describe('happy paths', () => {
    const testUrls = [
      'rpc.rococo.frequency.xyz',
      'frequency-rpc.dwellir.com',
      '1.rpc.frequency.xyz',
      'frequency-polkadot.api.onfinality.io',
    ]
    testUrls.forEach((rpcEndpoint) => {
      it("works for " + rpcEndpoint, () => {
        const url = `http://myfancydApp.com/?rpc=wss%3A%2F%2F${rpcEndpoint}`;
        const res = getRpcEndpointFromURL(url);
        expect(res.error).toBeUndefined();
        expect(res.endpoint).toEqual('wss://' + rpcEndpoint);
      })
    });
  })

});