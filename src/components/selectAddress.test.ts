import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import SelectAddress from './SelectAddress.svelte';

describe.skip('SelectAddress component', () => {
  it('renders', async () => {
    const { getByText } = render(SelectAddress, { formFinished: false });
    expect(getByText('Select an account')).toBeInTheDocument();
    expect(getByText('Choose an account to use')).toBeInTheDocument();
  });
});
