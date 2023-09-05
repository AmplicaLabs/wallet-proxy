<script lang="ts">
  import { page } from '$app/stores';
  import { DSNPSchemas } from '$lib/dsnpSchemas';
  import type { SchemaData } from '$lib/dsnpSchemas';
  import { HandleStore, SelectedWalletStore, SelectedSigningKey } from '../lib/store';
  import { getHandleSignature, getDelegationAndPermissionSignature } from '$lib/signing';
  import { onMount } from 'svelte';

  // eslint-disable-next-line @typescript-eslint/no-unused-var

  let polkadotHandleSignature: string;
  let polkadotDelegationAndPermissionSignature: string;
  export let formFinished = polkadotDelegationAndPermissionSignature !== '' &&
    polkadotHandleSignature !== '';

  let schemas: [string, SchemaData][] = [];

  onMount(() => {
    let inputSchemas = $page.url.searchParams.get('schemas')?.split(',');

    schemas = (inputSchemas || [])
      .filter((inputSchema) => !!DSNPSchemas[inputSchema])
      .map((inputSchema) => [inputSchema, DSNPSchemas[inputSchema]]);
  });

  async function signDelegationAndPermissions() {
    polkadotDelegationAndPermissionSignature = await getDelegationAndPermissionSignature(
      $SelectedWalletStore,
      $SelectedSigningKey,
      $page.data.endpoint,
      '1',
      schemas.map((schema) => schema[1].id.mainnet)
    );
    formFinished = true;
  }

  async function handleHandle(event) {
    polkadotHandleSignature = await getHandleSignature(
      $SelectedWalletStore,
      $SelectedSigningKey,
      $page.data.endpoint,
      $HandleStore
    );
  }
</script>

<p class="text-3xl text-center">Review & Sign</p>
<div class="flex flex-col space-between">
  <div>
    <p class="text-2xl">Account-key</p>
    {$SelectedSigningKey}
  </div>
  <div>
    <p class="text-2xl">Handle</p>
    {$HandleStore}
    <p>
      <button
        class="text-gray-900 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-3 py-2.5 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        on:click={handleHandle}>handle sign</button
      >
    </p>
  </div>
  <div>
    <div>
      <p class="text-2xl">Delegation Grant</p>
      <p>Authorize Acme App with MSA 1 to be your delegate</p>
    </div>
    <div>
      <span class="text-2xl">Schema Grant</span>
      {#each schemas as schema, index}
        <ul class="text-gray-900 border-y-1 p-3 m-2">
          <li>Name: {schema[0]}</li>
          <li>Schema-id: {schema[1].id.mainnet}</li>
          <li>
            description: {schema[1].description}
          </li>
        </ul>
      {/each}
    </div>

    <button
      class="text-gray-900 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-3 py-2.5 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      on:click={signDelegationAndPermissions}>delegation sign</button
    >
  </div>
</div>
<ul>
  Debug
  <li>
    schemas: {JSON.stringify($page.url.searchParams.get('schemas')?.split(','))}
  </li>
  <li>
    polkadotHandleSignature: {polkadotHandleSignature}
  </li>

  <li>
    polkadotDelgationAndPermissionSignature: {polkadotDelegationAndPermissionSignature}
  </li>
</ul>
