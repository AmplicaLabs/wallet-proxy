<script lang="ts">
  /** @type {import('./$types').PageData} */

  import ProgressBar from '$components/ProgressBar.svelte';
  import RadialStepper from '$components/RadialStepper.svelte';
  import Handle from '$components/Handle.svelte';
  import ReviewSign from '$components/ReviewSign.svelte';
  import SelectAddress from '$components/SelectAddress.svelte';
  import { SignatureStore } from '$lib/store';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let currentActive = 0;
  let steps = ['Select Address', 'Choose Handle', 'Register'];
  let progressBar;

  let components = [SelectAddress, Handle, ReviewSign];

  // when the form is complete, valid, and/or changes submitted successfully, the form
  // should set this to true so the Next button is enabled.
  let formFinished = false;
  $: enableNext = currentActive < steps.length && formFinished;
  $: enablePrevious = currentActive > 0;

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
          delegation: $SignatureStore.authorizedDelegationAndSchemas
        }
      }),
      '*'
    );
  };
  const handlePrevious = () => {
    if (currentActive === 0) {
      goto(`${base}/signin?${$page.url.searchParams}`);
    }
    handleProgress(-1);
  };

  const handleNext = () => {
    if (formFinished) {
      if (currentActive < steps.length - 1) {
        handleProgress(1);
      } else {
        console.debug('sending signatures');
        if (window.opener) {
          {
            sendSignatureToApp();
            window.close();
          }
        }
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
    nextStepTitle={currentActive < steps.length - 1 ? 'Next: ' + steps[currentActive + 1] : ''}
  />
  <div
    id="forms-container"
    class="flex flex-col px-8 md:w-720 items-center items-stretch mx-auto my-12px"
  >
    <svelte:component this={components[currentActive]} bind:formFinished />
    <div class="flex xs:justify-between sm:justify-between md:justify-around mt-2 mb-8">
      <button
        class='btn-primary'
        on:click|preventDefault={handlePrevious}
      >
        Back
      </button>
      <button
        class={enableNext ? 'btn-primary' : 'btn-disabled'}
        disabled={!enableNext}
        on:click|preventDefault={handleNext}
      >
        {currentActive < steps.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  </div>
</main>
