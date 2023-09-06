<script lang="ts">
  import Signup from '$components/Signup.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
</script>
<Signup endpoint={data.endpoint} />
