<template lang="pug">
div
  input.color-wheel.slider(v-on:input="transmit" :value="hueVal" :data-type="'hue'" :data-element="element" type="range" min="0" max="360" :style="{backgroundImage: `linear-gradient(90deg, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%), hsl(150, 100%, 50%), hsl(180, 100%, 50%), hsl(210, 100%, 50%), hsl(240, 100%, 50%), hsl(270, 100%, 50%), hsl(300, 100%, 50%), hsl(330, 100%, 50%), hsl(360, 100%, 50%))`}")
  input.color-wheel.slider(v-on:input="transmit" :data-type="'saturation'" :data-element="element" type="range" min="0" max="100" :value="satVal" :style="{backgroundImage: `linear-gradient(90deg, hsl(${hueVal}, 0%, ${lightVal}%), hsl(${hueVal}, 100%, ${lightVal}%))`}")
  input.color-wheel.slider(v-on:input="transmit" :data-type="'lightness'" :data-element="element" type="range" min="0" max="100" :style="{backgroundImage: `linear-gradient(90deg, hsl(${hueVal}, ${satVal}%, 0%), hsl(${hueVal}, ${satVal}%, 100%))`}")
</template>
<script>
export default {
  props: {
    element: {
      type: Array,
      required: true
    },
    hueVal: {
      type: String,
      required: true
    },
    satVal: {
      type: String,
      required: true
    },
    lightVal: {
      type: String,
      required: true
    }
  },
  methods: {
    transmit: function (e) {
      this.$emit('transmit', {value: e.target.value, type: e.target.dataset.type, path: e.target.dataset.element.split(",")});
    }
  }
}
</script>
<style scoped>
.color-wheel {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 25px;
}
.slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    outline: none; /* Remove outline */
    opacity: 0.9; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */ 
.slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 10px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: rgba(0,0,0,0.7); /* Green background */
    border: 2px solid #fff;
    cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
    width: 10px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
}
</style>
