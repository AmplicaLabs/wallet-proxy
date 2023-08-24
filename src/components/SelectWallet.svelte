<script>
	import TalismanIcon from '$components/icons/TalismanRedIcon.svelte';
	import PolkadotIcon from '$components/icons/Polkadot.svelte';
</script>

<div class="flex flex-col">
	<button
		type="button"
		class="flex flex-col text-gray-900 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 text-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mb-2"
	>
		<div class="flex items-center gap-x-2">
			<PolkadotIcon size="5em" />
			<div class="text-left">
				<div class="text-3xl">Polkadot</div>
				<span class="text-xs italic antialiased">Sign-in with Polkadot wallet</span>
			</div>
		</div>
	</button>
	<button
		type="button"
		class="flex flex-col text-gray-900 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 text-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mb-2"
	>
		<div class="flex items-center gap-x-2">
			<TalismanIcon size="5em" />
			<div class="text-left">
				<div class="text-3xl">Talisman</div>
				<span class="text-xs italic antialiased">Sign-in with Talisman wallet </span>
			</div>
		</div>
	</button>
</div>
