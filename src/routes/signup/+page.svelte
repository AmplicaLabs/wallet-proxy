<script lang="ts">
  import Signup from '$components/Signup.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1 class="mt-4 text-2xl text-aqua text-center">Sign up</h1>

<Signup endpoint={data.endpoint} />
