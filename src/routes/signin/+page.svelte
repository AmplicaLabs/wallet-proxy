<script lang="ts">
  import SelectWallet from '$components/SelectWallet.svelte';
  import {onMount} from 'svelte';
  import SelectAddressSignIn from "$components/SelectAddressSignIn.svelte";

  let showSelectAddress = false;
  function handleMessage(event) {
    return
    // if (event.origin !== 'http://localhost:5173') {
    //   return;
    // }

    // const appDomain = event.origin;
    // event.source?.postMessage('respond from open window...', appDomain);
  }

  const unsubscribe = () => {
    // do any other clean up here
    window.removeEventListener('message', handleMessage);
  };

  onMount(() => {
    if (window.opener) {
      window.addEventListener('message', handleMessage, false);
      window.opener.postMessage(JSON.stringify({method: 'PROXY:READY'}), '*');
      return unsubscribe;
    }
  });

</script>
<div class="text-center mt-7">
  <h1 class="mt-4 text-2xl text-aqua text-center">Sign in</h1>
</div>
<div class="mt-8">
  {#if  showSelectAddress}
    <div class="p-8 mx-auto">
      <SelectAddressSignIn/>
    </div>
  {:else}
    <SelectWallet bind:showSelectAddress/>
  {/if}
</div>
