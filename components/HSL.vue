<template lang="pug">
div
  Slider.color-wheel(@slide="update" name="hue" :value="color.hue" min="0" max="360" :style="{backgroundImage: `linear-gradient(90deg, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%), hsl(150, 100%, 50%), hsl(180, 100%, 50%), hsl(210, 100%, 50%), hsl(240, 100%, 50%), hsl(270, 100%, 50%), hsl(300, 100%, 50%), hsl(330, 100%, 50%), hsl(360, 100%, 50%))`}")
  Slider.color-wheel(@slide="update" name="saturation" :value="color.saturation" min="0" max="100" :style="{backgroundImage: `linear-gradient(90deg, hsl(${color.hue}, 0%, ${color.lightness}%), hsl(${color.hue}, 100%, ${color.lightness}%))`}")
  Slider.color-wheel(@slide="update" name="lightness" :value="color.lightness" min="0" max="100" :style="{backgroundImage: `linear-gradient(90deg, hsl(${color.hue}, ${color.saturation}%, 0%), hsl(${color.hue}, ${color.saturation}%, 100%))`}")
</template>
<script>
import Slider from '@/components/Slider'
export default {
  components: {
    Slider
  },
  props: {
    element: {
      type: String,
      required: true
    },
    color: {
      type: Object,
      required: true
    }
  },
  methods: {
    update: function (val) {
      let message = val;
      message.element = this.element;
      this.$store.commit('updateColor', message);
    },
  },
}
</script>
<style scoped>
.color-wheel {
  display: block;
  width: 100%;
  margin: 15px 0;
  padding: 0;
  height: 20px;
  border-radius: 10px;
}
</style>
