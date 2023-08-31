import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/svelte';
import Signup from '$components/Signup.svelte';
import userEvent from '@testing-library/user-event';

describe.skip('Sign up component', () => {
  it('renders correctly and can click next and previous buttons', async () => {
    const user = userEvent.setup();
    const { container, getByText, getByRole } = render(Signup);
    expect(getByText('Choose Wallet')).toBeInTheDocument();
    const backBtn = getByRole('button', { name: 'Back' }) as HTMLButtonElement;
    expect(backBtn).toBeDisabled();

    const nextBtn = getByRole('button', { name: 'Next' }) as HTMLButtonElement;
    expect(nextBtn).toBeEnabled();
  });
});
