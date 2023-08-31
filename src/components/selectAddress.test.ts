import '@testing-library/jest-dom';
import {getByRole, getByText, render, waitFor} from "@testing-library/svelte";
import SelectAddress from "./SelectAddress.svelte";
import {WalletInfoStore} from "$lib/store";

describe('SelectAddress component', () => {
  beforeEach(() => {
    WalletInfoStore.update(info => info = {});
  })
  it('renders', async () => {
    WalletInfoStore.update(info => info = {
      injectedExtension: {
        accounts: [
          {address: '0xabcd1234', name: 'Foo'},
          {address: '0xdeadbeef', name: 'Bar'},
        ]
      },
    })
    const {getByText, getAllByRole} = render(SelectAddress, {formFinished: false});
    expect(getByText('Select an account')).toBeInTheDocument();
    expect(getByText('Choose an account to use')).toBeInTheDocument();
  })
})