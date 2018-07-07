<template lang="pug">
.setting-container
  .text {{ label }}
  input.slider.sizeSlider(type='range' min="1" max="200" :data-settingspath='settingsPath' :value='fontVal' @input="updateFont") 
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
  padding: 0 20px;
  font-size: 16px;
  line-height: 2em;
  border-top: solid 1px #aaa;
  background-color: #ddd;
}
.text {
  text-align: left;

}
.sizeSlider {
  width: 80%;
  background: #bbb;
  height: 25px;
}
</style>
