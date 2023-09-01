<script lang="ts">
  import Icon from '@iconify/svelte';
  import baselineDownload from '@iconify/icons-ic/baseline-download';
  import threeDotsLoading from '@iconify/icons-eos-icons/three-dots-loading';
  import { onMount } from 'svelte';
  import { extensionsConfig } from '$lib/extensionsConfig';
  import type { Extension } from '$lib/extensionsConfig';
  import { onReady, isWalletInstalled, walletConnector } from '$lib/wallet';
  import type { InjectedExtension } from '@polkadot/extension-inject/types';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import {
    SelectedWalletStore,
    SelectedWalletAccountsStore,
    InjectedWeb3Store
  } from '../lib/store';

  // TODO: change to false and then set to true when wallet selection is complete
  // eslint-disable-next-line @typescript-eslint/no-unused-var
  export let formFinished = true;
  export let endpoint;

  let isLoading = false;
  let selectedWalletAccounts: Array<string>;

  export let extensions: Array<Extension> = [];
  let injectedWeb3: any;

  onMount(async () => {
    injectedWeb3 = await onReady();
    $InjectedWeb3Store = injectedWeb3;
    extensions = extensionsConfig;
  });

  async function handleSelectedWallet(injectedName: string) {
    let extension: InjectedExtension;
    isLoading = true;

    $SelectedWalletStore = injectedName;

    try {
      extension = await walletConnector(injectedName, 'Acme App');
      let accounts = await extension.accounts.get();

      $SelectedWalletAccountsStore = accounts.map((account) => account.address);

      isLoading = false;

      goto(`/signup?${$page.url.searchParams}`);
    } catch (error) {
      isLoading = false;
      console.log('Extension not installed - close window and redirect');
      return;
    }
  }
</script>

<div class="flex flex-col gap-2">
  {#each extensions as extension, index}
    <button
      type="button"
      class="text-gray-900 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-3 py-2.5 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      on:click={() => handleSelectedWallet(extension.injectedName)}
    >
      <div class="flex items-center justify-center gap-3">
        <div class="basis-3/12">
          <svelte:component this={extension.logo.component} size={extension.logo.size} />
        </div>
        <div class="text-left basis-6/12">
          <div class="text-xl">{extension.displayName}</div>
          <span class="text-xs italic antialiased">Sign-in with {extension.displayName} wallet</span
          >
        </div>
        <div class="basis-1/12 w-4">
          {#if !isWalletInstalled(extension.injectedName)}
            <Icon icon={baselineDownload} width="30" height="30" />
          {/if}
          {#if isLoading && $SelectedWalletStore == extension.injectedName}
            <Icon icon={threeDotsLoading} width="55" height="55" />
          {/if}
        </div>
      </div>
    </button>
  {/each}
</div>

<div>Debug</div>
Injected Web3: {JSON.stringify(window.injectedWeb3)}
