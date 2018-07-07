<template lang="pug">
div
  .setting-container
    .text {{ label }}
    .choose-color(:style="{background: `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`}") 
  ColorSlider(v-on:transmit="updateColor" :element='settingsPath' :hueVal="hueVal" :satVal="satVal" :lightVal="lightVal")
</template>
<script>
import ColorSlider from "@/components/ColorSlider"
export default {
  components: {
    ColorSlider
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
    colorVal: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateColor: function (message) {
      this.$store.commit('updateColor', message);
    },
    postHue: function (value) {
      console.log(value);
    }
  },
  computed: {
    hueVal () {
      return this.colorVal.hue;
    },
    satVal () {
      return this.colorVal.saturation;
    },
    lightVal () {
      return this.colorVal.lightness;
    }
  }
}
</script>
<style scoped>
.setting-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  font-size: 18px;
  line-height: 2em;
  border-top: solid 1px #aaa;
  background-color: #ddd;
}
.text {
  text-align: left;

}
.choose-color {
  display: inline-block;
  min-height: 1.5em;
  min-width: 1.5em;
  border: none;
  margin: 0;
  padding: 0;
}
</style>
