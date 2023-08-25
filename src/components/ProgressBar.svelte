<script lang="ts">
  export let steps = [];
  let circles, progress;
  let currentStep = 1;

  export const handleProgress = (stepIncrement) => {
    // don't do anything if trying to go past bounds.
    if (
      (currentStep >= steps.length && stepIncrement > 0) ||
      (currentStep <= 1 && stepIncrement < 0)
    ) {
      return;
    }
    circles = document.getElementsByClassName('circle');
    if (stepIncrement === -1) {
      circles[currentStep - 1].classList.remove('active');
    } else {
      circles[currentStep].classList.add('active');
    }
    currentStep += stepIncrement;
    const actives = document.getElementsByClassName('active');
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';
  };

  const circleClass = (i: number): string => {
    return 'circle m-auto ' + (i === 0 ? 'active' : '');
  };
</script>

<div class="px-16 md:p-12">
  <div
    class="progress-container sm:hidden md:flex justify-between relative mb-30 max-w-800"
    bind:this={circles}
  >
    <div class="progress" bind:this={progress} />
    {#each steps as step, i}
      <div class="flex flex-col justify-items-center">
        <div class={circleClass(i)} data-title={step}>{i + 1}</div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  $bg: #fff;
  $text: #999;
  $border: #e0e0e0;
  $circle-active: #3498db;

  .progress-container::before {
    content: '';
    background-color: #e0e0e0;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    z-index: -1;
  }

  .progress {
    background-color: #3498db;
    transform: translateY(-50%);
    transition: 0.4s ease;
    position: absolute;
    top: 50%;
    left: 0;
    height: 4px;
    width: 0%;
    z-index: -1;
  }

  .circle {
    background-color: $bg;
    color: $text;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid $border;
    transition: 0.4s ease;
    cursor: pointer;
  }

  .circle::after {
    content: attr(data-title) ' ';
    position: absolute;
    bottom: 35px;
    color: $text;
    transition: 0.4s ease;
  }

  .circle.active::after {
    color: $circle-active;
  }

  .circle.active {
    border-color: $circle-active;
  }
</style>
