<template lang="pug">
.color-panel
  Slider.color-wheel(:onInput="transmit" :value="color.hue" :type="'hue'" :element="element" min="0" max="360" :style="{backgroundImage: `linear-gradient(90deg, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%), hsl(150, 100%, 50%), hsl(180, 100%, 50%), hsl(210, 100%, 50%), hsl(240, 100%, 50%), hsl(270, 100%, 50%), hsl(300, 100%, 50%), hsl(330, 100%, 50%), hsl(360, 100%, 50%))`}")
  Slider.color-wheel(:onInput="transmit" :type="'saturation'" :element="element" min="0" max="100" :value="color.saturation" :style="{backgroundImage: `linear-gradient(90deg, hsl(${color.hue}, 0%, ${color.lightness}%), hsl(${color.hue}, 100%, ${color.lightness}%))`}")
  Slider.color-wheel(:onInput="transmit" :type="'lightness'" :element="element" min="0" max="100" :value="color.lightness" :style="{backgroundImage: `linear-gradient(90deg, hsl(${color.hue}, ${color.saturation}%, 0%), hsl(${color.hue}, ${color.saturation}%, 100%))`}")
</template>
<script>
import Slider from '@/components/Slider'
export default {
  components: {
    Slider
  },
  props: {
    element: {
      type: Array,
      required: true
    },
    color: {
      type: Object,
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
.color-panel {
  padding: 5px;
}
.color-wheel {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 0;
  height: 20px;
  border-radius: 10px;
}
</style>
