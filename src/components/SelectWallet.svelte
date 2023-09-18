<script lang="ts">
  import Icon from '@iconify/svelte';
  import baselineDownload from '@iconify/icons-ic/baseline-download';
  import threeDotsLoading from '@iconify/icons-eos-icons/three-dots-loading';
  import { onMount } from 'svelte';
  import { extensionsConfig } from '$lib/extensionsConfig';
  import type { Extension } from '$lib/extensionsConfig';
  import { onReady, isWalletInstalled, getAccounts } from '$lib/wallet';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { SelectedWalletAccountsStore, SelectedWalletStore } from '$lib/store';

  let isLoading = false;

  export let extensions: Array<Extension> = [];

  onMount(async () => {
    await onReady();
    extensions = extensionsConfig;
  });

  async function handleSelectedWallet(injectedName: string) {
    isLoading = true;

    $SelectedWalletStore = injectedName;
    // TODO: use wallet.getAccounts
    try {
      // TODO: use context instead of accessing $page.anything
      $SelectedWalletAccountsStore = await getAccounts(injectedName, $page.data.endpoint);
      goto(`${base}/signup?${$page.url.searchParams}`);
    } catch (error) {
      console.error('problem getting accounts: ', error.message);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="flex flex-col gap-2 xs:mx-12 sm:w-500 md:w-800 mx-auto">
  {#each extensions as extension}
    <button
      type="button"
      class="font-bold btn-banner"
      on:click={() => handleSelectedWallet(extension.injectedName)}
    >
      <div class="flex items-center justify-center gap-3">
        <div class="basis-3/12">
          <svelte:component this={extension.logo.component} size={extension.logo.size} />
        </div>
        <div class="ml-8 text-left basis-5/8">
          <div class="text-3xl">{extension.displayName}</div>
          <span class="text-sm italic antialiased">Sign in with {extension.displayName}</span
          >
        </div>
        <div class="basis-1/12 w-4">
          {#if !isWalletInstalled(extension.injectedName)}
            <Icon icon={baselineDownload} width="30" height="30" />
          {/if}
          {#if isLoading && $SelectedWalletStore === extension.injectedName}
            <Icon icon={threeDotsLoading} width="55" height="55" />
          {/if}
        </div>
      </div>
    </button>
  {/each}
</div>
