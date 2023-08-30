<script lang="ts">
  import DownloadBox from 'virtual:icons/ic/baseline-download';
  import { onMount } from 'svelte';
  import type { InjectedExtension } from '@polkadot/extension-inject/types';
  import { extensionsConfig } from '$lib/extensionsConfig';
  import type { Extension } from '$lib/extensionsConfig';
  import { onReady, isWalletInstalled, walletConnector } from '$lib/wallet';

  // TODO: change to false and then set to true when wallet selection is complete
  // eslint-disable-next-line @typescript-eslint/no-unused-var
  export let formFinished = true;
  export let endpoint;

  let extensions: Array<Extension> = [];
  let injectedWeb3: any;

  onMount(async () => {
    injectedWeb3 = await onReady();
    extensions = extensionsConfig;
  });

  async function handleSelectedWallet(injectedName: string) {
    let extension: InjectedExtension;
    try {
      extension = await walletConnector(injectedName);
    } catch (error) {
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
        <div class="basis-1/12">
          {#if !isWalletInstalled(extension.injectedName)}
            <DownloadBox style="font-size: 1.5em; color: light-grey" />
          {/if}
        </div>
      </div>
    </button>
  {/each}
</div>

<div>Debug</div>
Injected: {JSON.stringify(window.injectedWeb3)}
<p>
  Injected web 3: {JSON.stringify(injectedWeb3)}
</p>
