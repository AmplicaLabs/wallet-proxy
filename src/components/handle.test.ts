import '@testing-library/jest-dom';
import {render} from '@testing-library/svelte'
import {waitFor} from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Handle from "$components/Handle.svelte";

describe('Handle component', () => {
  it('renders', async () => {
    const {getByText, getByRole} = render(Handle);
    const handleInput = getByRole('textbox') as HTMLInputElement;
    expect(handleInput).toBeInTheDocument();
    expect(handleInput.placeholder).toBe('enter your desired handle');
    const claimBtn = getByRole('button', {name: 'Claim this handle'});
    expect(claimBtn).toBeInTheDocument();
    expect(claimBtn as HTMLButtonElement).toBeDisabled();
  })

  it('validates a handle', async () => {
    let user = userEvent.setup();

    const { component, getByRole } = render(Handle)
    const handleInput = getByRole('textbox') as HTMLInputElement;
    const claimBtn = getByRole('button', {name: 'Claim this handle'});

    await user.type(handleInput, 'Bobbay');
    expect(handleInput.value).toEqual('Bobbay');

    await waitFor(() => {
      expect(claimBtn).toBeEnabled();
    }, { timeout: 1100});

    await user.click(claimBtn);
    let cmp = component.$$;
    expect(cmp.ctx[cmp.props["formFinished"]]).toBe(true)
  })
})