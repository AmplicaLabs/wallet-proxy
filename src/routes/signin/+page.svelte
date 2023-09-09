<script lang="ts">
  import SelectWallet from '$components/SelectWallet.svelte';
  import {onMount} from "svelte";

  function handleMessage(event) {
    if (event.origin !== 'http://localhost:5174') return;
    console.log('message from window', event);

    const appDomain = event.origin;

    console.log('event.origin', appDomain);
    event.source?.postMessage('respond from open window...', appDomain);
  }

  const unsubscribe = () => {
    // do any other clean up here
    window.removeEventListener('message', handleMessage);
  }

  // I'm not sure this will be retained if we go to signup
  onMount(() => {
    if (window.opener) {
      window.addEventListener('message', handleMessage, false);
      window.opener.postMessage('PROXY:READY');
      return unsubscribe;
    }
  });

</script>

<div class="text-center mt-7">
  <h1 class="mt-4 text-2xl text-aqua text-center">Sign in</h1>
  <p>Choose a wallet to connect and sign in.</p>
</div>
<div class="mt-8">
  <SelectWallet />
</div>
