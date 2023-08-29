<script lang="ts">
  import Signup from '$components/Signup.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
  console.log("data.endpoint: ", data?.endpoint)
</script>

<h1 class="text-xl text-green-500 text-center">Sign up</h1>

<Signup endpoint={data.endpoint}/>
