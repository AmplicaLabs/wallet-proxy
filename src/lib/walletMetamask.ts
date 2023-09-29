import {MetaMaskSDK, SDKProvider} from '@metamask/sdk';

// See:
// https://docs.metamask.io/wallet/how-to/connect/set-up-sdk/
// https://docs.metamask.io/wallet/how-to/sign-data/
// https://metamask.github.io/test-dapp/#personalSign
// TODO: docs seem to imply that you need an Ethereum mainnet contract to verify against,
// for EIP-712 signing. This appears to be to prevent phishing attacks.
// Maybe what we want for sign in is 'Sign in with Ethereum' aka SIWE:
// https://docs.metamask.io/wallet/how-to/sign-data/siwe/
// https://docs.login.xyz/libraries/typescript
export const instantiateSDK = (options: any): SDKProvider => {
  const MMSDK = new MetaMaskSDK(options);
  return MMSDK.getProvider(); // You can also access via window.ethereum
}


export const getAccounts = async (sdk: SDKProvider) => {
  let res = await sdk.request(
    { method: 'eth_requestAccounts', params: [] }
  );
}

export const signTypedDataV4 = async (sdk: SDKProvider) => {

}