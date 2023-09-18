<script lang="ts">
  import { HandleStore } from '$lib/store';
  import { onMount } from 'svelte';

  let debounceTimer;
  export let formFinished = false;

  onMount(() => {
    checkHandle();
  });

  const debounceCheck = (_evt: Event) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      checkHandle();
    }, 400);
  };

  const handleBytesMax = 32;
  const handleCharsMax = 20;
  const handleCharsMin = 3;

  const checkHandle = () => {
    $HandleStore = $HandleStore.trim();
    let utf8Encode = new TextEncoder();

    formFinished =
      $HandleStore.length >= handleCharsMin &&
      $HandleStore.length <= handleCharsMax &&
      utf8Encode.encode($HandleStore).length <= handleBytesMax;
  };

  const inputClasses =
    'w-full mr-8 border-silver rounded bg-white-transparent ' +
    'text-white xs:text-xl sm:text-2xl md:text-3xl ' +
    'placeholder-aqua focus:border-aqua';
</script>

<div class="mt-4 text-2xl">
  Your handle will be linked to your wallet account and your new DSNP Identity.
</div>
<form class="pt-4">
  <input
    id="handle"
    class={inputClasses}
    placeholder="enter your desired handle"
    bind:value={$HandleStore}
    on:keyup={debounceCheck}
    maxlength="20"
  />
</form>
