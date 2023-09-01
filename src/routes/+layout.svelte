<script lang="ts">
  import FrequencyIcon from '$lib/assets/frequency/frqcy-circle-grad.png';
  import Signup from '$components/Signup.svelte';
  import {
    HandleStore,
    SelectedWalletStore,
    SelectedWalletAccountsStore,
    InjectedWeb3Store
  } from '../lib/store';
  import { page } from '$app/stores';
</script>

<header class="py-2">
  <div class="max-w-sm">
    <img src={FrequencyIcon} alt="Amplica Logo" width="10%" />
  </div>
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
    InjectedWeb3Store: {@html JSON.stringify($InjectedWeb3Store)}
  </li>
  <li>
    $page.data.enpoint: {$page.data.endpoint}
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
