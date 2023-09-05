<script lang="ts">
  import { onMount } from 'svelte';
  import type { InjectedAccount } from '@polkadot/extension-inject/types';
  import {SelectedWalletStore, SelectedSigningKey} from "$lib/store";
  import {getAccounts, onReady} from "$lib/wallet";

  let validAccountsArray: Array<InjectedAccount> = [];
  let errorMessage = '';
  export let formFinished = false;

  SelectedSigningKey.subscribe((key) => {
    if (key !== '' ) { formFinished = true;}
  });

  onMount(async () => {
    await onReady();
    try {
      const accountsArray = await getAccounts($SelectedWalletStore);
      if (accountsArray.length === 0) {
        errorMessage =
          'This wallet has no account keys associated with it. Please create at least one account key in your selected wallet.';
      } else {
        validAccountsArray = accountsArray;
      }
    } catch (e: Error) {
      console.error('Error: ', e.message);
    }
  });
</script>

{#if errorMessage !== ''}
  <div id="error" class="text-red-600 font-xl">{errorMessage}</div>
{:else}
  <p class="text-2xl"><label for="signing-address">Choose an account to use</label></p>
  <p>SigningKey: {$SelectedSigningKey}</p>
  <div class="mt-8">
    <fieldset>
      <legend>Select an account</legend>
      {#each validAccountsArray as account}
        <div>
          <input type="radio" bind:group={$SelectedSigningKey} value={account.address}/>
          <label>{account.name}: {account.address}</label>
        </div>
      {/each}
    </fieldset>
  </div>
{/if}
