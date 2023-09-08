<script>
  import {base} from '$app/paths';
  import SelectWallet from '$components/SelectWallet.svelte';
  import { page } from "$app/stores";

  export let is_local = !!$page.data.is_local;
  export let schemas = $page.data.schemas;
  export let endpoint = $page.data.endpoint;

  const testEndpointData = {
    rococo: {
      ws: encodeURIComponent('wss://rpc.rococo.frequency.xyz'),
      http: encodeURIComponent('https://rpc.rococo.frequency.xyz'),
    },
    localhost: {
      ws: encodeURIComponent('ws://127.0.0.1:9944'),
      http: encodeURIComponent('http://localhost:9944')
    },
    schemas: 'tombstone%2Cbroadcast%2Creplay%2Creaction%2Cprofile%2Cupdate%2CpublicKey%2CpublicFollows%2CprivateFollows%2CprivateConnections'
  }
</script>

<div class="text-center mt-7">
  <h1 class="mt-4 text-2xl text-aqua text-center">Sign in</h1>
  <p>Choose a wallet to connect and sign in.</p>
</div>
<div class="mt-8">
  <SelectWallet/>
</div>

<div class="pt-8 w-350 flex flex-col mx-auto">
  <p class="font-bold text-xl">Using Websocket endpoints:</p>
  <ul class="text-2xl list-disc">
    <li class="">
      <a href="{base}/?rpc={testEndpointData.rococo.ws}&schemas={testEndpointData.schemas}" class="text-aqua underline">Sign in (rococo WebSocket)</a>
    </li>
    {#if is_local}
      <li class="">
        <a href="{base}/?rpc={testEndpointData.localhost.ws}&schemas={testEndpointData.schemas}" class="text-aqua underline">Sign in (localhost
          WebSocket)</a>
      </li>
    {/if}
    <li class="">
      <a href="{base}/?rpc={testEndpointData.rococo.http}&schemas={testEndpointData.schemas}" class="text-aqua underline">Sign in (rococo HTTP)</a>
    </li>
    {#if is_local}
      <li class="">
        <a href="{base}/?rpc={testEndpointData.localhost.http}&schemas={testEndpointData.schemas}" class="text-aqua underline">Sign in (localhost HTTP)</a>
      </li>
    {/if}
  </ul>
  { is_local }
  { endpoint }
  { schemas }
</div>
