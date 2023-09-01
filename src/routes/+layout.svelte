<script lang="ts">
  import FrequencyIcon from '$lib/assets/frequency/frqcy-circle-grad.png';
  import AmplicaWhite from '$lib/assets/amplica/amplica_white.svg';

  import {
    HandleStore,
    SelectedWalletStore,
    SelectedWalletAccountsStore,
  } from '../lib/store';
  import { page } from '$app/stores';
</script>

<head>
  <title>Amplica: Wallet Connect</title>
</head>
<header class="py-2 relative mt-0">
  <div class="xs:w-24 sm:w-32 md:w-52 absolute md:left-8 top-0">
    <img src={AmplicaWhite} alt="Amplica Logo" width="100%" />
  </div>
  <div class="xs:text-xl sm:text-2xl md:text-3xl text-center md:mt-8">Wallet Connect</div>
</header>

<slot />

<ul class="mt-8">
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
  <div class="w-60 absolute left-8 top-0">
    <img src={AmplicaWhite} alt="Amplica Logo" width="100%" />
  </div>
</footer>
