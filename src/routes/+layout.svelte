<script lang="ts">
  import AmplicaWhite from '$lib/assets/amplica/Amplica_White.svg';
  import BottomLeftBars from '$lib/assets/frequency/bottom-left-bars.png';
  import TopRightBars from '$lib/assets/frequency/top-right-bars.png';

  import { HandleStore, SelectedWalletStore, SelectedWalletAccountsStore } from '../lib/store';
  import { page } from '$app/stores';

  const logoClasses = 'w-1/5  absolute left-8 left-0 max-w-sm ';
</script>

<head>
  <title>Amplica Labs: Connect</title>
</head>
<div class="min-h-full flex flex-col box-border">
  <header class="py-2 relative mt-0 grow-0 shrink-0">
    <img class={logoClasses + 'top-4'} src={AmplicaWhite} alt="Amplica Logo" width="100%" />
    <img
      class="absolute top-0 w-1/3 right-0 max-w-md"
      src={TopRightBars}
      alt="Stylish Oscillation Top Bars"
    />
  </header>

  <slot />

  <footer class="-z-40 grow-0 shrink-0">
    <img class={logoClasses + 'bottom-8'} src={AmplicaWhite} alt="Amplica Logo" width="100%" />
    <img
      class="w-1/5 max-w-sm absolute left-0 bottom-0"
      src={BottomLeftBars}
      alt="Decorative Oscillation Bottom Bars"
    />
  </footer>
</div>
