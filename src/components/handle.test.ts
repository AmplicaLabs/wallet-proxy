import '@testing-library/jest-dom';
import {render } from '@testing-library/svelte'
import Handle from "$components/Handle.svelte";

describe('Handle component', () => {
  it('renders', async () => {
    const {getByText, getByRole} = render(Handle);
    expect(getByText('Choose your handle')).toBeInTheDocument();
    expect(getByText('Choose your handle')).toBeInTheDocument();

    const handleInput = getByRole('textbox') as HTMLInputElement;
    expect(handleInput).toBeInTheDocument();
    expect(handleInput.placeholder).toBe('enter your desired handle');
    const claimBtn = getByRole('button', {name: 'Claim this handle'});
    expect(claimBtn).toBeInTheDocument();
    expect(claimBtn as HTMLButtonElement).toBeDisabled();
  })

  it('validates a handle', async () => {
    let handleFormFinished;
    const validHandle = 'Bobbay';
    const invalidHandle = 'Bo';

    const { getByRole } = render(Handle, {formFinished: handleFormFinished})
  })
})