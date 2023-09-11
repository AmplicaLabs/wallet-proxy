<script lang="ts">
  import { page } from '$app/stores';
  import { DSNPSchemas } from '$lib/dsnpSchemas';
  import type { SchemaData } from '$lib/dsnpSchemas';
  import { HandleStore, SelectedWalletStore, SelectedSigningKey, SignatureStore } from '../lib/store';
  import { getHandleSignature, getDelegationAndPermissionSignature } from '$lib/signing';
  import { onMount } from 'svelte';
  export let formFinished = $SignatureStore.claimHandle !== '' &&
    $SignatureStore.authorizedDelegationAndSchemas !== ''
  let schemas: [string, SchemaData][] = [];
  const dAppName = $page.data.dAppName;

  onMount(() => {
    let inputSchemas = $page.url.searchParams.get('schemas')?.split(',');

    schemas = (inputSchemas || [])
      .filter((inputSchema) => !!DSNPSchemas[inputSchema])
      .map((inputSchema) => [inputSchema, DSNPSchemas[inputSchema]]);
  });

  async function signDelegationAndPermissions() {
    const authorizedDelegationAndSchemas = await getDelegationAndPermissionSignature(
      $SelectedWalletStore,
      $SelectedSigningKey,
      $page.data.endpoint,
      '1',
      schemas.map((schema) => schema[1].id.mainnet)
    );
    $SignatureStore = {
      authorizedDelegationAndSchemas,
      claimHandle: $SignatureStore.claimHandle,
    };
    formFinished = true;
  }

  async function handleHandle(_event) {
    const claimHandle = await getHandleSignature(
      $SelectedWalletStore,
      $SelectedSigningKey,
      $page.data.endpoint,
      $HandleStore
    );
    $SignatureStore = {
      claimHandle,
      authorizedDelegationAndSchemas: $SignatureStore.authorizedDelegationAndSchemas
    };
  }

  const buttonSectionClasses = 'flex flex justify-center mt-8';
  const buttonClasses = 'btn-banner md:w-500 sm:text-2xl md:text-3xl mt-0 ml-4 h-full text-aqua';
  const labelClasses = 'text-teal-200 basis-1/4 self-center';
</script>

<div class="mt-12">
  <div class={buttonSectionClasses}>
    <label for="claimHandle" class={labelClasses}>
      Click to authorize <span class="font-bold text-white">{dAppName}</span> to create your handle
    </label>
    <div>
      <button id="claimHandle" class={buttonClasses} on:click|preventDefault={handleHandle}>
        I Claim
        <span class="text-white font-thin">{$HandleStore}</span> As My Handle
      </button>
    </div>
  </div>
  <div class={buttonSectionClasses}>
    <label for="authorizeDelegate" class={labelClasses}>
      Click to authorize <span class="font-bold text-white">{dAppName}</span> to create your account,
      and to post on your behalf.
    </label>
    <div>
      <button id="authorizeDelegate" class={buttonClasses} on:click|preventDefault={signDelegationAndPermissions}>
        I Authorize <span class="text-white font-thin">{dAppName}</span>
      </button>
    </div>
  </div>
</div>
<div class="mt-16">
  <p class="text-2xl">You are authorizing {dAppName} to post the following message types on your behalf:</p>
  <div class="flex flex-wrap justify-evenly mt-8">
    {#each schemas as schema, index}
      <ul class="border-2 p-2 m-2">
        <li class="font-thin text-2xl">{schema[0]}</li>
      </ul>
    {/each}
  </div>
</div>
