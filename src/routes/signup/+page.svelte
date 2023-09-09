<script lang="ts">
  import { walletConnector } from '$lib/wallet';
  import { onMount } from 'svelte';
  /** @type {import('./$types').PageData} */
  import { page } from '$app/stores';

  import ProgressBar from '$components/ProgressBar.svelte';
  import RadialStepper from '$components/RadialStepper.svelte';
  import Handle from '$components/Handle.svelte';
  import ReviewSign from '$components/ReviewSign.svelte';
  import { ExtrinsicHelper } from '$lib/chain/extrinsicHelpers';
  import SelectAddress from '$components/SelectAddress.svelte';
  import { SelectedWalletAccountsStore, SelectedWalletStore, SignatureStore } from '$lib/store';

  let currentActive = 0;
  let steps = ['Select Address', 'Choose Handle', 'Register'];
  let progressBar;

  let components = [SelectAddress, Handle, ReviewSign];

  // when the form is complete, valid, and/or changes submitted successfully, the form
  // should set this to true so the Next button is enabled.
  let formFinished = false;
  $: enableNext = currentActive < steps.length && formFinished;
  $: enablePrevious = currentActive > 0;

  onMount(async () => {
    try {
      const extension = await walletConnector($SelectedWalletStore, 'Acme App');
      let accounts = await extension.accounts.get();
      $SelectedWalletAccountsStore = accounts.map((account) => account.address);
      formFinished = true;
      await ExtrinsicHelper.initialize($page.data.endpoint);
    } catch (e: any) {
      console.error(e.toString());
    }
  });
  const handleProgress = (stepIncrement) => {
    const newValue = currentActive + stepIncrement;
    if (newValue < 0 || newValue > steps.length - 1) {
      return;
    }
    currentActive += stepIncrement;
    progressBar.handleProgress(stepIncrement);
    formFinished = false;
  };
  const sendSignatureToApp = () => {
    window.opener.postMessage(
      JSON.stringify({
        message: 'PROXY:SIGNATURE',
        signatures: {
          handle: $SignatureStore.claimHandle,
          delegation: $SignatureStore.authorizedDelegationAndSchemas,
        }
      }),
      'http://localhost:5174'
    );
  }
  const handlePrevious = () => {
    handleProgress(-1);
  };

  const handleNext = () => {
    if (formFinished) {
      if (currentActive < steps.length - 1) {
        handleProgress(1);

      } else {
        console.debug('sending signatures')
        if (window.opener) {
          {
            sendSignatureToApp();
            window.close()
          }        }
      }
    }
  };
</script>

<main class="grow-1">
  <h1 class="mt-4 text-2xl text-aqua text-center">Sign up</h1>
  <ProgressBar {steps} bind:this={progressBar} />
  <RadialStepper
    bind:currentStep={currentActive}
    stepCount={steps.length}
    stepTitle={steps[currentActive]}
  />
  <div
    id="forms-container"
    class="flex flex-col px-8 md:w-720 items-center items-stretch mx-auto my-12px"
  >
    <svelte:component this={components[currentActive]} bind:formFinished />
  </div>
  <div class="flex xs:justify-between sm:justify-between md:justify-around">
    <button
      class={currentActive === 0 ? 'btn-disabled' : 'btn-primary'}
      on:click|preventDefault={handlePrevious}
      disabled={!enablePrevious}
    >
      Back
    </button>
    <button
      class={enableNext ? 'btn-primary' : 'btn-disabled'}
      disabled={!enableNext}
      on:click|preventDefault={handleNext}
    >
      {currentActive < steps.length - 1 ? "Next" : "Finish"}
    </button>
  </div>
</main>
