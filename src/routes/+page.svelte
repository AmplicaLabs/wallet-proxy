<script>
  /** @type {import('./$types').PageData} */
  // we can access `data.posts` because it's returned from
  // the parent layout `load` function
  export let data;
</script>

{#if data.error}
  <div class="rounded-lg border-2 mt-8 p-8">
    <p class="text-2xl text-blue-700">Error getting WebSocket endpoint</p>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <p class="text-xl mt-8 text-red-600">{@html data.error}</p>
  </div>
{:else}
  <ul>
    <li>
      <a href="/signin?rpc={data.endpoint}">Sign in</a>
    </li>
    <li>
      <a href="/signup?rpc={data.endpoint}">Sign up</a>
    </li>
  </ul>
{/if}
