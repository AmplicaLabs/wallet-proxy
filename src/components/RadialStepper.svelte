<script lang="ts">
  export let stepCount = 0;
  export let currentStep = 0;
  export let stepTitle = '';
  $: progressPercent = Math.floor(Math.fround((currentStep * 100) / stepCount));
</script>

<div class="md:hidden flex items-center">
  <div class="set-size charts-container">
    <div class={`pie-wrapper progress-${progressPercent} style-2`}>
      <span class="label">{progressPercent}<span class="smaller">%</span></span>
      <div class="pie">
        <div class="left-side half-circle" />
        <div class="right-side half-circle" />
      </div>
      <div class="shadow" />
    </div>
  </div>
  <p class="pl-8 text-3xl text-blue-400">{stepTitle}</p>
</div>

<style lang="scss">
  @use 'sass:math';
  // -- vars
  $silver: #d3d3d3;
  $aqua: #69b9cd;
  $lilac: rgb(243, 206, 255, 0.4);
  $teal-dark: #3498db;
  $teal-light-trans: rgb(175, 235, 244, 0.4);
  $teal-dark-trans: rgb(84, 158, 170, 0.4);
  $lilac: rgb(243, 206, 255, 0.4);
  $periwinkle: rgb(120, 159, 243, 0.4);
  $cobalt: #4b64ff;
  $white-transparent: rgb(254, 255, 255, 0.1);
  $teal-dark-3: #007da1;
  $teal-black: #293b59;
  $bg-gradient: linear-gradient(to bottom right, $teal-black, $teal-dark);
  $bg: $silver;
  $text: white;
  $border: $silver;
  $circle-active: $aqua;

  $bg-color: white;
  $default-size: 1em;
  $label-font-size: math.div($default-size, 3);
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
        border: math.div($default-size, 10) solid $circle-active;
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
      color: transparent;
      cursor: default;
      display: block;
      font-size: $label-font-size;
      left: $redo-10;
      line-height: $label-font-size-redo * 0.7;
      position: absolute;
      right: $redo-10;
      text-align: center;
      top: $redo-10;

      .smaller {
        color: white;
        font-size: 0.5em;
        vertical-align: super;
      }
    }

    .shadow {
      @include size(100%, 100%);
      border: math.div($default-size, 10) solid #bdc3c7;
      border-radius: 50%;
    }

    &.style-2 {
      .label {
        background: none;
        color: white;

        .smaller {
          color: #white;
        }
      }
    }

    &.progress-0 {
      @include draw-progress(0, black);
    }
    &.progress-25 {
      @include draw-progress(25, $circle-active);
    }
    &.progress-33 {
      @include draw-progress(33, $circle-active);
    }
    &.progress-50 {
      @include draw-progress(50, $circle-active);
    }
    &.progress-66 {
      @include draw-progress(66, $circle-active);
    }
    &.progress-75 {
      @include draw-progress(75, $circle-active);
    }
    &.progress-100 {
      @include draw-progress(100, $circle-active);
    }
  }
</style>
