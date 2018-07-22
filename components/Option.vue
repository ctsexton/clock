<template lang="pug">
.setting-container
  .banner(@click="open = !open")
    div {{ params.label }}
    .choose-color(:style="{background: `hsl(${params.color.hue}, ${params.color.saturation}%, ${params.color.lightness}%)`}") 
  .bay(:class="{bay__open: open}")
    HSL(:element="identity" :color="params.color")
    Size(v-if="params.size !== null" :element="identity" :size="params.size")
</template>
<script>
import HSL from "@/components/HSL";
import Size from "@/components/Size";
export default {
  components: {
    HSL,
    Size
  },
  props: {
    identity: String,
    params: Object
  },
  data () {
    return {
      open: false
    }
  }
}
</script>
<style scoped>
.banner {
  background-color: #ddd;
  color: black;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  line-height: 2em;
  cursor: pointer;
  border-top: 1px solid #aaa;
}
.banner:hover {
  background-color: #eee;
}
.setting-container {
  display: block;
  width: 100%;
  font-size: 1.1em;
  line-height: 2em;
  line-height: 2em;
  background-color: transparent;
}
.bay {
  padding: 0;
  height: 0;
  overflow: hidden;
}
.bay__open {
  padding: 0.5em;
  height: auto;
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
