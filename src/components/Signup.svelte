<script lang="ts">
  export let endpoint;

  import RadialStepper from '$components/RadialStepper.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';
  import SelectWallet from '$components/SelectWallet.svelte';
  import Handle from '$components/Handle.svelte';
  import ReviewSign from '$components/ReviewSign.svelte';
  import Last from '$components/Last.svelte';

  let currentActive = 0;
  let steps = ['Choose Wallet', 'Choose Handle', 'Review & Sign'];
  let progressBar;
  let components = [SelectWallet, Handle, ReviewSign, Last];

  // when the form is complete, valid, and/or changes submitted successfully, the form
  // should set this to true so the Next button is enabled.
  let formFinished;
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
    formFinished = undefined;
  };
</script>

<main>
  <ProgressBar {steps} bind:this={progressBar} />
  <RadialStepper
    bind:currentStep={currentActive}
    stepCount={steps.length}
    stepTitle={steps[currentActive]}
  />

  <div class="flex flex-col px-8 md:w-200 items-center mx-auto">
    <svelte:component this={components[currentActive]} bind:formFinished {endpoint} />
  </div>
  <div class="flex sm:justify-between md:justify-around">
    <button
      class={currentActive === 0 ? 'btn-disabled' : 'btn-primary'}
      on:click|preventDefault={handlePrevious}
      disabled={!enablePrevious}
    >
      Back
    </button>
    <button
      class={formFinished ? 'btn-primary' : 'btn-disabled'}
      disabled={!formFinished}
      on:click|preventDefault={handleNext}
    >
      {currentActive < steps.length - 1 ? 'Next' : 'Finish'}
    </button>
  </div>
</main>
