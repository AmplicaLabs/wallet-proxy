<script lang="ts">
  import FrequencyIcon from '$lib/assets/frequency/frqcy-circle-grad.png';
  import Signup from '$components/Signup.svelte';
  import {
    HandleStore,
    SelectedWalletStore,
    SelectedWalletAccountsStore,
  } from '../lib/store';
  import { page } from '$app/stores';
</script>
<head>
  <title>Amplica Wallet Connect</title>
</head>
<header class="py-2 relative">
  <div class="w-12 fixed left-60 top-35">
    <img src={FrequencyIcon} alt="Amplica Logo" width="100%" />
  </div>
  <div class="text-4xl text-center">Amplica Wallet Connect</div>
</header>

<slot />

<ul>
  <li>
    HandleStore: {$HandleStore}
  </li>
  <li>
    SelectedWalletStore: {$SelectedWalletStore}
  </li>
  <li>
    SelectedWalletAccountsStore: {$SelectedWalletAccountsStore}
  </li>
  <li>
    $page.data.endpoint: {$page.data.endpoint}
  </li>
  <li>
    $page.data.schemas : {$page.data.schemas}
  </li>
  <li>
    $page.url.searchParams: {$page.url.searchParams}
  </li>
</ul>

<footer class="mt-20 fixed bottom-4 left-8 -z-40">
  <!-- <div class="max-w-sm">
    <img src={FrequencyIcon} alt="Amplica Logo" width="10%" />
  </div> -->
</footer>
