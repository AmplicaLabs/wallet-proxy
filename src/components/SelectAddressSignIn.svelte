<script lang="ts">
  import {onMount} from 'svelte';
  import type {InjectedAccount} from '@polkadot/extension-inject/types';
  import {MsaInfoStore, SelectedWalletAccountsStore, SelectedSigningKey} from '$lib/store';
  import {onReady} from '$lib/wallet';
  import {page} from '$app/stores';
  import {ExtrinsicHelper} from '$lib/chain/extrinsicHelpers';

  let errorMessage = '';
  export let formFinished = false;
  export let signIn;

  SelectedSigningKey.subscribe((key) => {
    if (key !== '') {
      formFinished = true;
    }
  });

  onMount(async () => {
    await onReady();
    if ($SelectedWalletAccountsStore.length === 0) {
      errorMessage =
        'This wallet has no account keys associated with it. Please create at least one account key in your selected wallet.';
    }
    try {
      if (!ExtrinsicHelper.api) {
        ExtrinsicHelper.initialize($page.data.endpoint);
      }
    } catch (e: Error) {
      errorMessage = 'There was a problem: ' + e.message;
    }
  });
</script>

{#if errorMessage !== ''}
  <div id="error" class="text-red-600 font-xl">{errorMessage}</div>
{:else}
  <p class="text-2xl">

    <label for="signing-address">Choose an account:</label>
  </p>
  <div class="mt-8">
    <fieldset>
      {#each $SelectedWalletAccountsStore as account}
        <div class="px-12">
          <input
            type="radio"
            bind:group={$SelectedSigningKey}
            value={account.address}
            id={account.address}
            class=""
          />
          <label
            for={account.address}
            class="w-full max-w-full cursor-pointer whitespace-nowrap ws-nowrap"
          >
            {#if $MsaInfoStore[account.address] }
              <span class="text-2xl ml-4">
                Sign in as
                {$MsaInfoStore[account.address].handle} (MSA Id: {$MsaInfoStore[account.address].msaId})
              </span>
            {:else}
              <span class="text-2xl ml-4">Create a new account with {account.name}</span>
            {/if}
          </label>
        </div>
      {/each}
    </fieldset>
  </div>
{/if}
