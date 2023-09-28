<script lang="ts">
  import {onMount} from 'svelte';
  import {
    MsaInfoStore,
    SelectedWalletAccountsStore,
    SelectedWalletStore,
    SelectedSigningKey,
    SignInSignatureStore, SignatureStore
  } from '$lib/store';
  import {onReady} from '$lib/wallet';
  import {page} from '$app/stores';
  import {ExtrinsicHelper} from '$lib/chain/extrinsicHelpers';
  import { getSignInSignature} from "$lib/signing";
  import type {InjectedAccount} from "@polkadot/extension-inject/types";

  let errorMessage = '';
  export let formFinished = false;

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
        await ExtrinsicHelper.initialize($page.data.endpoint);
      }
    } catch (e: Error) {
      errorMessage = 'There was a problem: ' + e.message;
    }
  });
  const sendSignatureToApp = () => {
    window.opener.postMessage(
      JSON.stringify({
        message: 'PROXY:SIGN_IN_SIGNATURE',
        signInAuthorization: $SignInSignatureStore,
      }),
      '*'
    );
  };

  const handleSignIn = async (_evt: Event) => {
    $SignInSignatureStore = await getSignInSignature($SelectedWalletStore, $SelectedSigningKey);
    console.info("HEREEEEE window.opener: ", window.opener);
    if (window.opener) {
      sendSignatureToApp();
    } else {
      console.log($SignInSignatureStore);
    }
  }
  const signInLabel = (account: InjectedAccount) => {
    if ($MsaInfoStore[account.address].handle !== '') {
      return $MsaInfoStore[account.address].handle
    } else {
      return `${account.name} (MSA Id: ${$MsaInfoStore[account.address].msaId})`
    }
  }
</script>

{#if errorMessage !== ''}
  <div id="error" class="text-red-600 font-xl">{errorMessage}</div>
{:else}
  <div class="mt-8">
    <fieldset>
      {#each $SelectedWalletAccountsStore as account}
        {#if $MsaInfoStore[account.address] }
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
              <span class="text-2xl ml-4">
                Sign in as {signInLabel(account)}
              </span>
          </label>
        </div>
        {/if}
      {/each}
    </fieldset>
    <button class="btn-primary" on:click|preventDefault={handleSignIn}>Go</button>
  </div>
{/if}
