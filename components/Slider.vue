<template lang="pug">
input.slider(type="range" :min="min" :max="max" :value="value" @input="$emit('slide', {name: name, val: $event.target.value})")
</template>
<script>
export default {
  props: {
    min: String,
    max: String,
    value: String,
    name: String
  },
}
</script>
<style scoped>
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
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #fff; /* Green background */
    border: none;
    border-radius: 50%;
    cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
    -moz-appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #fff; /* Green background */
    border: 1px solid #aaa;
    border-radius: 50%;
    cursor: pointer; /* Cursor on hover */
}
.slider::-moz-range-track {
  background: transparent;
}
</style>
