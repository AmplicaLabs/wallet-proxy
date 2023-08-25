<script lang="ts">
  import RadialStepper from '$components/RadialStepper.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';
  import One from '$components/One.svelte';
  import Two from '$components/Two.svelte';
  import Three from '$components/Three.svelte';
  import Last from '$components/Last.svelte';

  let currentActive = 0;
  let steps = ['Choose Wallet', 'Connect', 'Something Else', 'Register'];
  let progressBar;
  let components = [One, Two, Three, Last];

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
  <svelte:component this={components[currentActive]} />
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
