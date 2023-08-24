<script>
  export let stepCount = 0;
  export let currentStep = 0;
  export let stepTitle = ''
  $: progressPercent =  ((currentStep) * 100 / stepCount)

</script>

<div class="md:hidden flex items-center">
  <div class="set-size charts-container">
    <div class={`pie-wrapper progress-${progressPercent} style-2`}>
      <span class="label">{progressPercent}<span class="smaller">%</span></span>
      <div class="pie">
        <div class="left-side half-circle"></div>
        <div class="right-side half-circle"></div>
      </div>
      <div class="shadow"></div>
    </div>
  </div>
  <p class="pl-8 text-3xl text-blue-400">{stepTitle}</p>
</div>


<style lang="scss">
  @use "sass:math";
  // -- vars
  $bg-color: #34495e;
  $default-size: 1em;
  $label-font-size: math.div($default-size ,3);
  $label-font-size-redo: $default-size * 3;

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
  .set-size {
    font-size: 6em;
  }

  .charts-container {
    &:after {
      clear: both;
      content: '';
      display: table;
    }
  }

  .pie-wrapper {
    @include size($default-size, $default-size);
    float: left;
    margin: 15px;
    position: relative;

    &:nth-child(3n + 1) {
      clear: both;
    }

    $half-default-size: math.div($default-size, 2);
    .pie {
      @include size(100%, 100%);
      clip: rect(0, $default-size, $default-size, $half-default-size);
      left: 0;
      position: absolute;
      top: 0;

      .half-circle {
        @include size(100%, 100%);
        border: math.div($default-size, 10) solid #3498db;
        border-radius: 50%;
        clip: rect(0, $half-default-size, $default-size, 0);
        left: 0;
        position: absolute;
        top: 0;
      }
    }

    $redo-10: math.div($label-font-size-redo, 10);

    .label {
      background: $bg-color;
      border-radius: 50%;
      bottom: $redo-10;
      color: #ecf0f1;
      cursor: default;
      display: block;
      font-size: $label-font-size;
      left: $redo-10;
      line-height: $label-font-size-redo * .70;
      position: absolute;
      right: $redo-10;
      text-align: center;
      top: $redo-10;

      .smaller {
        color: #bdc3c7;
        font-size: .5em;
        vertical-align: super;
      }
    }

    .shadow {
      @include size(100%, 100%);
      border: math.div($default-size , 10) solid #bdc3c7;
      border-radius: 50%;
    }

    &.style-2 {
      .label {
        background: none;
        color: #7f8c8d;

        .smaller {
          color: #bdc3c7;
        }
      }
    }

    &.progress-0 {
      @include draw-progress(0, #bdc3c7);
    }
    &.progress-20 {
      @include draw-progress(20, #3498db);
    }
    &.progress-25 {
      @include draw-progress(25, #009900);
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
