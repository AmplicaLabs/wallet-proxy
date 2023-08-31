<script lang="ts">
  import {onMount} from "svelte";
  import {ExtrinsicHelper} from "$lib/chain/extrinsicHelpers";
  import type {InjectedAccount} from "@polkadot/extension-inject/types";
  import {storeWalletInfo} from "$lib/store";

  let validAccounts: Record<string, InjectedAccount> = {};
  let validAccountsArray: Array<InjectedAccount> = [];
  let selectedOption = '';
  let errorMessage = '';
  let injectedExtension;

  storeWalletInfo.subscribe((info) => injectedExtension = info.injectedExtension);

  export let formFinished = false;

  const handleAddressSelection = (evt: Event) => {
    let address = (evt.target as HTMLInputElement).value;
    updateSigningKeys(address);
  }

  const updateSigningKeys = (address: string) => {
    const signingKeys: InjectedAccount = validAccounts[address];
    storeWalletInfo.update((info) => info = {...info, signingKeys})
    formFinished = true;
  }

  onMount(async () => {
    try {
      if (!injectedExtension) {
        errorMessage = 'No supported extension found; please install it first.';
        console.error(errorMessage)
        return;
      }

      let chainGenesis = await ExtrinsicHelper.getGenesisHash();
      let allAccounts = await injectedExtension.accounts.get();
      if (allAccounts.length === 0) {
        errorMessage = 'This wallet has no account keys associated with it. Please create at least one account key in your selected wallet.'
      }
      allAccounts.forEach((a: InjectedAccount) => {
        // display only the accounts allowed for this chain
        if (!a.genesisHash || chainGenesis === a.genesisHash) {
          validAccounts[a.address] = a;
          validAccountsArray.push(a);
        }
      });
    } catch (e: any) {
      console.error('Error: ', e);
    }
  });
</script>
{#if errorMessage !== '' }
  <div id='error' class="text-red-600 font-xl">{errorMessage}</div>
{:else }
  <p class="text-2xl"><label for='signing-address'>Choose an account to use</label></p>
  <div class="mt-8">
    <fieldset>
      <legend>Select an account</legend>
      {#each Object.keys(validAccounts) as address }
        <div>
          <input type="radio" id={address} name='selectedOption' value={address}
                 checked={address === selectedOption ? 'checked' : ''}
                 on:click={handleAddressSelection}
          />
          <label for={address}>{validAccounts[address].name}: {address}</label>
        </div>
      {/each}
    </fieldset>
  </div>
{/if}
