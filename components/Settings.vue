<template lang="pug">
.settings-bar(:class='{settingsBar__reveal: settingsOpen}')
  .subtitle.settings-title Settings
  ColorOption(v-for="obj in colorSettings" :key="obj.label" :label="obj.label" :settingsPath="obj.dataset" :colorVal="obj.val")
  FontOption(v-for="obj in fontSettings" :key="obj.label" :label="obj.label" :settingsPath="obj.dataset" :fontVal="obj.val")
  button.resetButton(v-on:click='reset') Reset To Defaults
  .icons
    img.settings-icon(src='@/static/settings-black.svg' @click='toggleSettings()')
    img.pointer-icon(v-if='firstOpen' src='@/static/arrow.png')
    .icon-text(v-if='firstOpen') Click Here to Change Appearance!
</template>
<script>
import ColorOption from '@/components/ColorOption';
import FontOption from '@/components/FontOption';
export default {
  components: {
    ColorOption,
    FontOption
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
    reset: function () {
      this.$store.commit('resetSettings');
      //console.log('reset!!');
    }
  },
  computed: {
    firstOpen () {
      if (!localStorage.getItem('clock-settings') && !this.settingsOpen) {
        return true;
      } else {
        return false;
      }
    },
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
    },
    fontSettings () {
      return [
        {
          label: 'Clock Size',
          dataset: ["title", "fontSize"],
          val: this.$store.state.settings.title.fontSize
        },
        {
          label: 'Date Size',
          dataset: ["subtitle", "fontSize"],
          val: this.$store.state.settings.subtitle.fontSize
        }
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
.icons {
  position: absolute;
  top: 0;
  right: 0;
  height: 0;
}
.settings-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  padding: 10px;
  cursor: pointer;
}
.pointer-icon {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 75px;
}
.icon-text {
  position: absolute;
  top: 100px;
  left: 125px;
  width: 200px;
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
.resetButton {
  width: 100%;
  display: block;
  font-size: 16px;
  line-height: 3em;
  background: #000;
  color: white;
  cursor: pointer;
  border: none;
}
.resetButton:hover {
  background-color: #333;

}
</style>
