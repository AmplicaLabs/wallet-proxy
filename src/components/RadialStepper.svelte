<script>
  export let stepCount = 0;
  export let currentStep = 0;
  export let stepTitle = ''
  $: progressPercent =  ((currentStep+1) * 100 / stepCount)

</script>

<div class="md:hidden flex align-middle">
  <div class="set-size charts-container">
    <div class={`pie-wrapper progress-${progressPercent} style-2`}>
      <span class="label">{progressPercent}<span class="text-sm">%</span></span>
      <div class="pie">
        <div class="left-side half-circle"></div>
        <div class="right-side half-circle"></div>
      </div>
      <div class="shadow"></div>
    </div>
  </div>
  <p class="pl-8 pt-4 text-3xl text-blue-400">{stepTitle}</p>
</div>


<style lang="scss">
  @use "sass:math";
  // -- vars
  $bg-color: #34495e;
  $circle-size: 4em;
  $label-font-size: math.div($circle-size,5);

  // -- mixins
  @mixin size($width, $height) {
    height: $height;
    width: $width;
  }

  @mixin draw-progress($progress, $color) {
    .pie {
      .half-circle {
        border-color: $color;
      }

      // change to right side
      .left-side {
        transform: rotate($progress * 3.6deg);
      }

      @if $progress <= 50 {
        .right-side {
          display: none;
        }
      } @else {
        clip: rect(auto, auto, auto, auto);

        .right-side {
          transform: rotate(180deg);
        }
      }
    }
  }

  // -- selectors
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  
  .charts-container {
    &:after {
      clear: both;
      content: '';
      display: table;
    }
  }

  .pie-wrapper {
    @include size($circle-size, $circle-size);
    position: relative;

    &:nth-child(3n + 1) {
      clear: both;
    }

    .pie {
      height: 100%;
      width: 100%;
      clip: rect(0, $circle-size, $circle-size, math.div($circle-size, 2));
      left: 0;
      position: absolute;
      top: 0;

      .half-circle {
        height: 100%;
        width: 100%;
        border: math.div($circle-size, 10) solid #3498db;
        border-radius: 50%;
        clip: rect(0,  math.div($circle-size, 2), $circle-size, 0);
        left: 0;
        top: 0;
      }
    }

    .label {
      background: $bg-color;
      border-radius: 50%;
      color: #ecf0f1;
      cursor: default;
      display: block;
      position: absolute;
      top: math.div($circle-size - $label-font-size, 2.5);
      left: math.div($circle-size - $label-font-size, 3);
    }

    .shadow {
      @include size(100%, 100%);
      border: math.div($circle-size , 10) solid #bdc3c7;
      border-radius: 50%;
    }

    &.style-2 {
      .label {
        background: none;
        color: #7f8c8d;
      }
    }

    &.progress-20 {
      @include draw-progress(20, #3498db);
    }
    &.progress-25 {
      @include draw-progress(25, #3498db);
    }
    &.progress-40 {
      @include draw-progress(40, #3498db);
    }
    &.progress-50 {
      @include draw-progress(50, #dd5900);
    }
    &.progress-60 {
      @include draw-progress(60, #dd5900);
    }
    &.progress-75 {
      @include draw-progress(75, #8e44ad);
    }
    &.progress-80 {
      @include draw-progress(80, #8e44ad);
    }
    &.progress-100 {
      @include draw-progress(100, #aa00cc);
    }
  }
</style>
