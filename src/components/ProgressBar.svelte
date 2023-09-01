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
    return 'circle m-auto text-xl  ' + (i === 0 ? 'active' : '');
  };
</script>

<div class="px-16 md:p-12 mt-12">
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
  $silver: #D3D3D3;
  $aqua: #69B9CD;
  $teal-light: rgb(175,235,244, 0.4);
  $teal-dark: rgb(84,158,170,0.4);
  $lilac: rgb(243,206,255, 0.4);
  $periwinkle: rgb(120,159,243,0.4);
  $cobalt: #4B64FF;
  $white-transparent: rgb(254,255,255,.1);
  $teal-dark-3: #007DA1;
  $teal-black: #293B59;
  $bg-gradient: linear-gradient(to bottom right, $teal-black, $teal-dark);
  $bg: $silver;
  $text: white;
  $border: $silver;
  $circle-active: $aqua;

  .progress-container::before {
    content: '';
    background-color: $teal-dark-3;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 6px;
    width: 100%;
    z-index: -1;
  }

  .progress {
    background-color: $aqua;
    transform: translateY(-50%);
    transition: 0.4s ease;
    position: absolute;
    top: 50%;
    left: 0;
    height: 6px;
    width: 0;
    z-index: -1;
  }

  .circle {
    background-color: $teal-black;
    color: $text;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 6px solid $border;
    transition: 0.4s ease;
    cursor: pointer;
  }

  .circle::after {
    content: attr(data-title) ' ';
    position: absolute;
    bottom: 75px;
    color: $text !important;
    transition: 0.4s ease;
  }

  .circle.active::after {
    color: $circle-active;
  }

  .circle.active {
    border-color: $circle-active;
    box-shadow: 0 4px 12px rgba(50,75,150,1);
    transition: 0.4s ease;
  }
</style>
