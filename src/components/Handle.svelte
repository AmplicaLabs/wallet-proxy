<script lang="ts">
  import { HandleStore } from '../lib/store';

  import {Bytes} from "@polkadot/types";
  import {ExtrinsicHelper} from "$lib/chain/extrinsicHelpers";

  let maybeHandle: string = '';
  let debounceTimer;
  const signingKeyName = ExtrinsicHelper.signingKeys?.name;
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

    formFinished =
      $HandleStore.length >= handleCharsMin &&
      $HandleStore.length <= handleCharsMax &&
      utf8Encode.encode($HandleStore).length <= handleBytesMax;
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
    bind:value={$HandleStore}
    on:keyup={debounceCheck}
  />
</form>