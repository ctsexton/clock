<template lang="pug">
.setting-container
  .text {{ label }}
  input.slider.sizeSlider(type='range' min="1" max="20" :data-settingspath='settingsPath' :value='fontVal' @input="updateFont") 
</template>
<script>
var _ = require('lodash');
let updateThrottle = _.throttle(function (e) { 
  let arr = e.target.dataset.settingspath.split(",");
  let info = {
    fontSize: e.target.value,
    settingsPath: arr
  };
  this.$store.commit('updateFont', info);
}, 70);
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
      updateThrottle.call(this, e);
    },
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
  padding: 0 5px 0 10px;
  font-size: 1em;
  line-height: 2em;
  background-color: transparent;
}
.text {
  text-align: left;
  color: white;

}
.sizeSlider {
  width: 80%;
  background: #bbb;
  height: 20px;
  border-radius: 10px;
}
</style>
