<script lang="ts">
  import { onMount } from 'svelte';
  import type { InjectedAccount } from '@polkadot/extension-inject/types';
  import {SelectedWalletStore, SelectedSigningKey} from "$lib/store";
  import {getAccounts, onReady} from "$lib/wallet";
  import { page } from "$app/stores";

  let validAccountsArray: Array<InjectedAccount> = [];
  let errorMessage = '';
  export let formFinished = false;

  SelectedSigningKey.subscribe((key) => {
    if (key !== '' ) { formFinished = true;}
  });

  onMount(async () => {
    await onReady();
    try {
      const accountsArray = await getAccounts($SelectedWalletStore, $page.data.endpoint);
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
  <p class="text-2xl"><label for="signing-address">Choose an account for your new DSNP identity:</label></p>
  <div class="mt-8">
    <fieldset>
      {#each validAccountsArray as account}
        <div class="">
          <input type="radio" bind:group={$SelectedSigningKey} value={account.address} id={account.address} class=""/>
          <label for={account.address} class="w-full max-w-full cursor-pointer whitespace-nowrap ws-nowrap">
            <span class="text-2xl ml-4">{account.name}</span>
          </label>
        </div>
      {/each}
    </fieldset>
  </div>
{/if}
