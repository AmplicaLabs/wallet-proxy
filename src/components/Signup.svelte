<script lang="ts">
  import { onMount } from 'svelte';

  import RadialStepper from '$components/RadialStepper.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';
  import SelectWallet from '$components/SelectWallet.svelte';
  import Handle from '$components/Handle.svelte';
  import ReviewSign from '$components/ReviewSign.svelte';
  import { ExtrinsicHelper } from '$lib/chain/extrinsicHelpers';
  import SelectAddress from './SelectAddress.svelte';
  import {page} from '$app/stores';


  let currentActive = 0;
  let steps = ['Choose Wallet', 'Select Address', 'Choose Handle', 'Register'];
  let progressBar;
  let components = [SelectWallet, SelectAddress, Handle, ReviewSign];

  // when the form is complete, valid, and/or changes submitted successfully, the form
  // should set this to true so the Next button is enabled.
  let formFinished = false;
  $: enableNext = currentActive < steps.length - 1 && formFinished;
  $: enablePrevious = currentActive > 0;

  const handlePrevious = () => {
    handleProgress(-1);
  };

  const handleNext = () => {
    if (formFinished) {
      handleProgress(1);
    }
  };
  const handleProgress = (stepIncrement) => {
    const newValue = currentActive + stepIncrement;
    if (newValue < 0 || newValue > steps.length - 1) {
      return;
    }
    currentActive += stepIncrement;
    progressBar.handleProgress(stepIncrement);
    formFinished = false;
  };

  onMount(async () => {
    try {
      await ExtrinsicHelper.initialize($page.data.endpoint);
    } catch (e: any) {
      console.error(e.toString());
    }
  });
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
      Next
    </button>
  </div>
</main>
