<script lang="ts">
  import { page } from '$app/stores';
  import { DSNPSchemas } from '$lib/dsnpSchemas';
  import type { SchemaData } from '$lib/dsnpSchemas';
  import {
    HandleStore,
    SelectedWalletStore,
    SelectedSigningKey,
    SignatureStore
  } from '$lib/store';
  import { getHandleSignature, getDelegationAndPermissionSignature } from '$lib/signing';
  import { onMount } from 'svelte';
  export let formFinished = false;
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
      claimHandle: $SignatureStore.claimHandle
    };
    if ($SignatureStore.claimHandle.length > 0) {
      formFinished = true;
    }
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
    if ($SignatureStore.authorizedDelegationAndSchemas.length > 0) {
      formFinished = true;
    }
  }

  const toggleHelp = (evt: Event) => {
    let el = evt.target as HTMLElement;
    el.nextElementSibling.classList.toggle('hidden');
  };

  const buttonSectionClasses = 'flex flex justify-center';
  const buttonClasses = 'btn-banner md:w-500 sm:text-2xl md:text-3xl mt-0 ml-4 h-full text-aqua';
  const labelClasses = 'text-teal-200 basis-1/4 self-center';
</script>

<div class="mt-4">
  <div class={buttonSectionClasses}>
    <label for="claimHandle" class={labelClasses}>
      Click to authorize <span class="font-bold text-white">{dAppName}</span> to create your handle
    </label>
    <div>
      <button id="claimHandle" class={buttonClasses} on:click|preventDefault={handleHandle}>
        I Claim
        <span class="text-white font-bold">{$HandleStore}</span> As My Handle
      </button>
    </div>
  </div>
  <div class={buttonSectionClasses + ' mt-8'}>
    <label for="authorizeDelegate" class={labelClasses}>
      Click to authorize <span class="font-bold text-white">{dAppName}</span> to create your account,
      and to post on your behalf.
    </label>
    <div>
      <button
        id="authorizeDelegate"
        class={buttonClasses}
        on:click|preventDefault={signDelegationAndPermissions}
      >
        I Authorize <span class="text-white font-bold">{dAppName}</span>
      </button>
    </div>
  </div>
</div>
<div class="mt-16">
  <p class="text-2xl">
    You are authorizing {dAppName} to post the following message types on your behalf:
  </p>
  <div class="flex flex-wrap justify-start mt-8">
    {#each schemas as schema, index}
      <ul class="p-2 m-2 underline">
        <li class="font-thin text-2xl relative">
          {schema[0]}
          <span
            class="text-sm text-aqua absolute ml-1 px-2 py-1 -t-2 cursor-pointer hover:bg-white hover:text-black hover:border-rounded hover:rounded-lg"
            on:mouseenter|preventDefault={toggleHelp}
            on:mouseleave|preventDefault={toggleHelp}>?</span
          >
          <p
            class="hidden text-black bg-white absolute -bottom-80px border-rounded border-aqua rounded-md text-md leading-6 p-4 z-40"
          >
            {schema[1].description}
          </p>
        </li>
      </ul>
    {/each}
  </div>
</div>
