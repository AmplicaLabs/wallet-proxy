import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Handle from '$components/Handle.svelte';

describe('Handle component', () => {
  it('renders', async () => {
    const { getByRole } = render(Handle);
    const handleInput = getByRole('textbox') as HTMLInputElement;
    expect(handleInput).toBeInTheDocument();
    expect(handleInput.placeholder).toBe('enter your desired handle');
  });

  it('validates a handle', async () => {
    const user = userEvent.setup();

    const { component, getByRole } = render(Handle);
    const handleInput = getByRole('textbox') as HTMLInputElement;

    await user.type(handleInput, 'Bobbay');
    expect(handleInput.value).toEqual('Bobbay');

    await waitFor(
      () => {
        const cmp = component.$$;
        expect(cmp.ctx[cmp.props['formFinished']]).toBe(true);
      },
      { timeout: 1100 }
    );

  });
});
