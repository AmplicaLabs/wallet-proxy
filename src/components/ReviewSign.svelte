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
  const buttonClasses = 'btn-banner md:w-500 sm:text-2xl md:text-3xl mt-0 ml-4 h-full';
  const labelClasses = 'text-teal-200 basis-1/4 self-center';
</script>

<div class="xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-thin">
  <p class="text-teal-200">Review & Sign with</p>
  <p>{$SelectedSigningKey}</p>
</div>
<div class="mt-12">
  <div class={buttonSectionClasses}>
    <label for="claimHandle" class={labelClasses}>
      Click to authorize <span class="font-bold text-teal-50">{dAppName}</span> to create your handle
    </label>
    <div>
      <button id="claimHandle" class={buttonClasses} on:click|preventDefault={handleHandle}>
        I Claim
        <span class="text-aqua font-thin">{$HandleStore}</span> As My Handle
      </button>
    </div>
  </div>
  <div class={buttonSectionClasses}>
    <label for="authorizeDelegate" class={labelClasses}>
      Click to authorize <span class="font-bold text-teal-50">{dAppName}</span> to create your account,
      and to post on your behalf.
    </label>
    <div>
      <button id="authorizeDelegate" class={buttonClasses} on:click|preventDefault={signDelegationAndPermissions}>
        I Authorize {dAppName}
      </button>
    </div>
  </div>
</div>
<div class="mt-16">
  <div>
    <p class="text-2xl">Delegation Grant</p>
    <p>Authorize Acme App with MSA 1 to be your delegate</p>
  </div>
  <p class="text-2xl">Schema Grants:</p>
  <div class="flex flex-wrap">
    {#each schemas as schema, index}
      <ul class="text-white border-2 border-gray-300 p-3 m-2 basis-1/4">
        <li class="font-bold">Name: {schema[0]}</li>
        <li>Schema-id: {schema[1].id.mainnet}</li>
        <li>
          description: {schema[1].description}
        </li>
      </ul>
    {/each}
  </div>
</div>
<ul>
  Debug
  <li>
    schemas: {JSON.stringify($page.url.searchParams.get('schemas')?.split(','))}
  </li>
  <li>
    polkadotHandleSignature: {$SignatureStore.claimHandle}
  </li>

  <li>
    polkadotDelgationAndPermissionSignature: {$SignatureStore.authorizedDelegationAndSchemas}
  </li>
</ul>
