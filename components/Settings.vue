<template lang="pug">
.settings-bar(:class='{settingsBar__reveal: settingsOpen}')
  .subtitle.settings-title Settings
  ColorOption(v-for='obj in colorSettings' :label="obj.label" :settingsPath="obj.dataset" :colorVal="obj.val")
  img.settings-icon(src='@/static/settings-black.svg' @click='toggleSettings()')
</template>
<script>
import ColorOption from '@/components/ColorOption';
export default {
  components: {
    ColorOption
  },
  props: {
    settings: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      settingsOpen: false,
    }
  },
  methods: {
    toggleSettings: function () {
      this.settingsOpen = !this.settingsOpen;
    },
  },
  computed: {
    colorSettings () {
      return [
        { 
          label: 'Background Color',
          dataset: ["page", "bgColor"],
          val: this.$store.state.settings.page.bgColor
        },
        { 
          label: 'Clock Color',
          dataset: ["title", "color"],
          val: this.$store.state.settings.title.color
        },
        { 
          label: 'Date/Location Color',
          dataset: ["subtitle", "color"],
          val: this.$store.state.settings.subtitle.color
        },
      ];
    }
  },
}
</script>
<style scoped>
.settings-bar {
  position: absolute;
  height: 100vh;
  width: 400px;
  top: 0;
  left: -400px;
  transition: left 500ms;
  background-color: #999;
}
.settingsBar__reveal {
  left: 0;
}
.settings-icon {
  position: absolute;
  cursor: pointer;
  top: 0;
  right: -60px;
  width: 60px;
  padding: 10px;
}
.settings-title {
  background-color: white;
  padding: 10px;
}
.color-box {
  display: inline-block;
  min-height: 1em;
  min-width: 50px;
  margin: 0 0 0 20px;
}
</style>
