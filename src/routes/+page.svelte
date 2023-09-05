<script>
  import { page } from '$app/stores';
  /** @type {import('./$types').PageData} */
  // we can access `data.posts` because it's returned from
  // the parent layout `load` function
  export let data;

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
<div class="p-12">
  <p class="font-bold text-xl">Using Websocket endpoints:</p>
  <ul class="text-2xl">
    <li class="list-disc">
      <a href="/signin?rpc={testEndpointData.rococo.ws}" class="text-indigo-500 underline">Sign in (rococo WebSocket)</a>
    </li>
    <li class="list-disc">
      <a href="/signin?rpc={testEndpointData.localhost.ws}" class="text-indigo-500 underline">Sign in (localhost WebSocket)</a>
    </li>
    <li class="list-disc">
      <a href="/signup?rpc={testEndpointData.rococo.ws}&schemas={testEndpointData.schemas}" class="text-indigo-500 underline">Sign up (rococo WebSocket)</a>
    </li>
    <li class="list-disc">
      <a href="/signup?rpc={testEndpointData.localhost.ws}&schemas={testEndpointData.schemas}" class="text-indigo-500 underline">Sign up (localhost WebSocket)</a>
    </li>
  </ul>

  <p class="mt-12 font-bold text-xl">Using HTTP endpoints</p>
  <ul class="text-2xl">
    <li class="list-disc">
      <a href="/signin?rpc={testEndpointData.rococo.http}" class="text-indigo-500 underline">Sign in (rococo HTTP)</a>
    </li>
    <li class="list-disc">
      <a href="/signin?rpc={testEndpointData.localhost.http}" class="text-indigo-500 underline">Sign in (localhost HTTP)</a>
    </li>
    <li class="list-disc">
      <a href="/signup?rpc={testEndpointData.rococo.http}&schemas={testEndpointData.schemas}" class="text-indigo-500 underline">Sign up (rococo HTTP)</a>
    </li>
    <li class="list-disc">
      <a href="/signup?rpc={testEndpointData.localhost.http}&schemas={testEndpointData.schemas}" class="text-indigo-500 underline">Sign up (localhost HTTP)</a>
    </li>
  </ul>
</div>
