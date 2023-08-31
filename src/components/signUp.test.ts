import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import Signup from '$components/Signup.svelte';

describe.skip('Sign up component', () => {
  it('renders correctly and can click next and previous buttons', async () => {
    const { getByText, getByRole } = render(Signup);
    expect(getByText('Choose Wallet')).toBeInTheDocument();
    const backBtn = getByRole('button', { name: 'Back' }) as HTMLButtonElement;
    expect(backBtn).toBeDisabled();

    const nextBtn = getByRole('button', { name: 'Next' }) as HTMLButtonElement;
    expect(nextBtn).not.toBeEnabled();
  });
});
