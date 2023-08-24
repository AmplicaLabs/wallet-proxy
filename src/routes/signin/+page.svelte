<script lang="ts">
	import MetaMaskIcon from '$components/MetaMaskIcon.svelte';
	import TalismanIcon from '$components/TalismanRedIcon.svelte';
	import PolkadotIcon from '$components/Polkadot.svelte';
	import SelectWallet from '$components/SelectWallet.svelte';
	import AmplicaLogo from '$lib/assets/amplica-logo.png';
</script>

<div class="py-2 max-w-sm">
	<img src={AmplicaLogo} alt="Amplica Logo" width="50%" />
</div>

<div class="mt-3">
	<SelectWallet />
</div>
