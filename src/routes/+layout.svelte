<script lang="ts">
  import FrequencyIcon from '$lib/assets/frqcy-circle-grad.png';
  import Signup from '$components/Signup.svelte';
</script>

<header class="py-2">
  <div class="max-w-sm">
    <img src={FrequencyIcon} alt="Amplica Logo" width="10%" />
  </div>
</header>

<slot />

<footer class="mt-20 fixed bottom-4 left-8 -z-40">
  <div class="max-w-sm">
    <img src={FrequencyIcon} alt="Amplica Logo" width="10%" />
  </div>
</footer>
