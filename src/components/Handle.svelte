<script lang="ts">
  import { HandleStore } from '../lib/store';

  let handleIsValid: boolean = false;
  let debounceTimer;

  export let formFinished = false;
  export let endpoint;

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

    handleIsValid =
      $HandleStore.length >= handleCharsMin &&
      $HandleStore.length <= handleCharsMax &&
      utf8Encode.encode($HandleStore).length <= handleBytesMax;
  };
  const doClaimHandle = (_evt: Event) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    formFinished = true;
  };
</script>

<div class="pt-4">Your handle is a named connection to your DSNP Identity.</div>
<div class="pt-4">Choose a unique handle to associate it with your DSNP account.</div>
<form class="pt-4">
  <input
    id="handle"
    class="w-80 mr-8"
    placeholder="enter your desired handle"
    bind:value={$HandleStore}
    on:keyup={debounceCheck}
  />
  <button
    class={handleIsValid ? 'btn-primary' : 'btn-disabled'}
    on:click|preventDefault={doClaimHandle}
    disabled={!handleIsValid}
  >
    Claim this handle
  </button>
</form>
<div class="hidden">{endpoint}</div>
