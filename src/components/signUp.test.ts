import '@testing-library/jest-dom';
import {render, waitFor } from '@testing-library/svelte'
import Signup from "$components/Signup.svelte";
import userEvent from '@testing-library/user-event';

describe('Sign up component', () => {
  it('renders correctly and can click next and previous buttons', async () => {
    let user = userEvent.setup();
    const { container, getByText, getByRole} = render(Signup);
    expect(getByText('Choose Wallet')).toBeInTheDocument();
    const backBtn = getByRole('button', {name: 'Back'}) as HTMLButtonElement;
    expect(backBtn).toBeDisabled();

    const nextBtn = getByRole('button', {name: 'Next'}) as HTMLButtonElement;
    expect(nextBtn).toBeEnabled();
    userEvent.click(nextBtn);

    await waitFor(() => {
      expect(getByText('Choose Handle')).toBeInTheDocument();
      expect(backBtn).toBeEnabled();
    })

    userEvent.click(backBtn);

    await waitFor(() => {
      expect(getByText('Choose Wallet')).toBeInTheDocument();
    })
  })
})