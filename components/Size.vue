<template lang="pug">
.size
  .text Size:
  Slider.sizeSlider(@slide="update" min="1" max="20" name="size" :value="size")
</template>
<script>
import Slider from "@/components/Slider";
export default {
  components: {
    Slider
  },
  props: {
    size: String,
    element: String
  },
  methods: {
    update: function (val) {
      let message = val;
      message.element = this.element;
      this.$store.commit('updateFont', message);
    }
  }
}
</script>
<style scoped>
.size {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.text {
  text-align: left;
  color: white;
  width: 15%;
  display: inline-block;
}
.sizeSlider {
  width: 85%;
  background: #bbb;
  height: 20px;
  border-radius: 10px;
  display: inline;
}
</style>
