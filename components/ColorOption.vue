<template lang="pug">
div
  .setting-container
    .text {{ label }}
    .choose-color(:style="{background: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`}") 
  HSL(v-on:transmit="updateColor" :element='settingsPath' :color="color")
</template>
<script>
import HSL from "@/components/HSL"
export default {
  components: {
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
    color: {
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
