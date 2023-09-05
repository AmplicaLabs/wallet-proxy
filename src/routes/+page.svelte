<script>
  import { page } from '$app/stores';
  /** @type {import('./$types').PageData} */
  // we can access `data.posts` because it's returned from
  // the parent layout `load` function
  export let data;

  const testEndpointData = {
    rococo: {
      ws: encodeURIComponent('wss://rpc.rococo.frequency.xyz'),
      http: encodeURIComponent('http:/rococo.frequency.xyz'),
    },
    localhost: {
      ws: encodeURIComponent('wss://127.0.0.1:9944'),
      http: encodeURIComponent('http://localhost:5174')
    },
    schemas: 'tombstone%2Cbroadcast%2Creplay%2Creaction%2Cprofile%2Cupdate%2CpublicKey%2CpublicFollows%2CprivateFollows%2CprivateConnections'
  }

</script>
<div class="p-12">
  <ul>
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
</div>
