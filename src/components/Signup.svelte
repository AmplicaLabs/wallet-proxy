<script lang="ts">
  import RadialStepper from '$components/RadialStepper.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';
  import One from '$components/One.svelte';
  import Handle from '$components/Handle.svelte';
  import Three from '$components/Three.svelte';
  import Last from '$components/Last.svelte';

  let currentActive = 0;
  let steps = ['Choose Wallet', 'Choose Handle', 'Something Else', 'Register'];
  let progressBar;
  let components = [One, Handle, Three, Last];

  const handleProgress = (stepIncrement) => {
    const newValue = currentActive + stepIncrement;
    if (newValue < 0 || newValue > steps.length - 1) {
      return;
    }
    currentActive += stepIncrement;
    progressBar.handleProgress(stepIncrement);
  };

  const stepFinished = (): boolean => {
    if (currentActive < steps.length - 1) {
      return false;
    }
    return true;
  };
</script>

<main>
  <ProgressBar {steps} bind:this={progressBar} />
  <RadialStepper
    bind:currentStep={currentActive}
    stepCount={steps.length}
    stepTitle={steps[currentActive]}
  />
<!--  <div id="forms-container" class="flex flex-col md:w-500px md:mx-auto xl:px-120">-->
  <div id="forms-container" class="flex flex-col md:w-600 items-center items-stretch mx-auto my-12px">
    <svelte:component this={components[currentActive]} />
  </div>
  <div class="step-button flex sm:justify-between md:justify-around max-w-800">
    <button
      class={currentActive === 0 ? 'btn-disabled' : 'btn-primary'}
      on:click|preventDefault={() => handleProgress(-1)}
    >
      Back
    </button>
    <button
      class={currentActive === steps.length - 1 ? 'btn-disabled' : 'btn-primary'}
      on:click|preventDefault={() => handleProgress(+1)}
    >
      Next
    </button>
  </div>
</main>
