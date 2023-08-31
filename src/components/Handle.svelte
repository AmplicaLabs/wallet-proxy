<script lang="ts">
  import {Bytes} from "@polkadot/types";
  import {ExtrinsicHelper} from "$lib/chain/extrinsicHelpers";
  import {HandleStore} from "$lib/store";

  let maybeHandle: string = '';
  let debounceTimer;
  const signingKeyName = ExtrinsicHelper.signingKeys?.name;
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
      maybeHandle.length >= handleCharsMin &&
      maybeHandle.length <= handleCharsMax &&
      utf8Encode.encode(maybeHandle).length <= handleBytesMax;
    if (formFinished) {
      HandleStore.update((handle) => handle = maybeHandle);
    }
  };
</script>

<div class="pt-4">Your handle will be linked to your {signingKeyName} account and your new DSNP Identity.</div>
<div class="pt-4">
  Enter a handle and click 'Claim this Handle'. You will be asked to sign with your wallet.
</div>
<form class="pt-4">
  <input
    id="handle"
    class="w-80 mr-8"
    placeholder="enter your desired handle"
    bind:value={maybeHandle}
    on:keyup={debounceCheck}
  />
</form>