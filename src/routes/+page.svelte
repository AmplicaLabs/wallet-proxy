<script>
  import {base} from '$app/paths';
  import SelectWallet from '$components/SelectWallet.svelte';
  import { page } from "$app/stores";

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

<div class="pt-8 w-350 flex flex-col mx-auto">
  <p class="font-bold text-xl">Using Websocket endpoints:</p>
  <ul class="text-2xl list-disc">
    <li class="">
      <a href="{base}/signin?rpc={testEndpointData.rococo.ws}&schemas={testEndpointData.schemas}" class="text-aqua underline">Sign in (rococo WebSocket)</a>
    </li>
      <li class="">
        <a href="{base}/signin?rpc={testEndpointData.localhost.ws}&schemas={testEndpointData.schemas}" class="text-aqua underline">Sign in (localhost
          WebSocket)</a>
      </li>
    <li class="">
      <a href="{base}/signin?rpc={testEndpointData.rococo.http}&schemas={testEndpointData.schemas}" class="text-aqua underline">Sign in (rococo HTTP)</a>
    </li>
      <li class="">
        <a href="{base}/signin?rpc={testEndpointData.localhost.http}&schemas={testEndpointData.schemas}" class="text-aqua underline">Sign in (localhost HTTP)</a>
      </li>
  </ul>
</div>
