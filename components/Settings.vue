<template lang="pug">
.settings-bar(:class='{settingsBar__reveal: settingsOpen}')
  .subtitle.settings-title Settings
  .locator-container
    input.locator(type="text" :placeholder="timeZone_readable")
  div(v-for="obj, index in colorSettings" :key="obj.label")
    ColorOption(:label="obj.label" :settingsPath="obj.dataset" :colorVal="obj.val")
    FontOption(v-if="fontSettings[index].label !== null" :label="fontSettings[index].label" :settingsPath="fontSettings[index].dataset" :fontVal="fontSettings[index].val")
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
    timeZone: {
      type: String,
      required: true
    },
    timeZone_readable: {
      type: String,
      required: true
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
          label: 'Background',
          dataset: ["page", "bgColor"],
          val: this.$store.state.settings.page.bgColor
        },
        { 
          label: 'Time',
          dataset: ["title", "color"],
          val: this.$store.state.settings.title.color
        },
        { 
          label: 'Date',
          dataset: ["dateTitle", "color"],
          val: this.$store.state.settings.dateTitle.color
        },
        { 
          label: 'Location',
          dataset: ["locationTitle", "color"],
          val: this.$store.state.settings.locationTitle.color
        },
      ];
    },
    fontSettings () {
      return [
        {
          label: null,
          dataset: null,
          val: null
        },
        {
          label: 'Size',
          dataset: ["title", "fontSize"],
          val: this.$store.state.settings.title.fontSize
        },
        {
          label: 'Size',
          dataset: ["dateTitle", "fontSize"],
          val: this.$store.state.settings.dateTitle.fontSize
        },
        {
          label: 'Size',
          dataset: ["locationTitle", "fontSize"],
          val: this.$store.state.settings.locationTitle.fontSize
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
.locator-container {
  display: block;
  background: white;
  width: 100%;
  font-size: 16px;
  padding: 0.5em;
  border-top: 1px solid black;
}
.locator {
  width: 100%;
  height: 2em;
  border: 1px solid #bbb;
  font-size: 16px;
  padding: 5px;
}
</style>
