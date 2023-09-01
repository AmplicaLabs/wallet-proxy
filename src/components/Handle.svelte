<script lang="ts">
  import { HandleStore } from '../lib/store';

  let debounceTimer;
  // TODO: set to address name
  const signingKeyName = '';
  export let formFinished = false;

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

<div class="pt-4">
  Your handle will be linked to your wallet account and your new DSNP Identity.
</div>
<div class="pt-4">
  Enter a handle and click 'Claim this Handle'. You will be asked to sign with your wallet.
</div>
<form class="pt-4">
  <input
    id="handle"
    class={inputClasses}
    placeholder="enter your desired handle"
    bind:value={$HandleStore}
    on:keyup={debounceCheck}
  />
</form>
