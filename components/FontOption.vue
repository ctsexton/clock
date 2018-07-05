<template lang="pug">
.setting-container
  .text {{ label }}
  input.slider(type='range' min="1" max="200" :data-settingspath='settingsPath' :value='fontVal' @input="updateFont") 
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    settingsPath: {
      type: Array,
      required: true
    },
    fontVal: {
      type: String,
      required: true
    }
  },
  methods: {
    updateFont: function (e) {
      let arr = e.target.dataset.settingspath.split(",");
      let info = {
        fontSize: e.target.value,
        settingsPath: arr
      };
      this.$store.commit('updateFont', info);
    }
  },
}
</script>
<style scoped>
.setting-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  font-size: 16px;
  line-height: 3em;
  border-top: solid 1px #aaa;
  background-color: #ddd;
}
.text {
  text-align: left;

}
.slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 75%; /* Full-width */
    height: 25px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
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
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
}
</style>
