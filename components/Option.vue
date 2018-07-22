<template lang="pug">
.container
  .banner
    .text {{ label }}
    .choose-color(:style="{background: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`}") 
  HSL(v-on:transmit="updateColor" :element='settingsPath' :color="color")
  .size(v-if="params.size")
    .text Size:
    Slider.sizeSlider(min="1" max="20" :path="settingsPath" :value="fontVal" :onInput="updateFont")
</template>
<script>
import Slider from '@/components/Slider';
import HSL from "@/components/HSL"
export default {
  components: {
    Slider,
    HSL
  },
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
