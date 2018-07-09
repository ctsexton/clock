<template lang="pug">
  .settings-container(:class='{settingsContainer__reveal: settingsOpen}')
    .settings-title(:class="{ invertedBg: darkBg }") Settings
      .icons
        img.settings-icon(
          :src="settingsIcon" 
          @click='toggleSettings()'
          :class="{ settingsIcon__inside: settingsOpen }"
          )
    .settings-panel
      Locator(:timeZone="timeZone")
      div(v-for="obj, index in colorSettings" :key="obj.label")
        ColorOption(:label="obj.label" :settingsPath="obj.dataset" :colorVal="obj.val")
        FontOption(v-if="fontSettings[index].label !== null" :label="fontSettings[index].label" :settingsPath="fontSettings[index].dataset" :fontVal="fontSettings[index].val")
      button.resetButton(v-on:click='reset') Reset To Defaults
</template>
<script>
import ColorOption from '@/components/ColorOption';
import FontOption from '@/components/FontOption';
import Locator from '@/components/Locator';
export default {
  components: {
    ColorOption,
    FontOption,
    Locator
  },
  props: {
    timeZone: {
      type: Object,
      required: true
    },
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
    settingsIcon () {
      if (this.$store.state.settings.page.bgColor.lightness < 50) {
        return '/settings-white.svg';
      } else {
        return '/settings-black.svg';
      }
    },
    darkBg () {
      if (this.$store.state.settings.page.bgColor.lightness < 50) {
        return true;
      } else {
        return false;
      }
    },
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
@import url('https://fonts.googleapis.com/css?family=Sunflower:300');
.settings-container {
  position: absolute;
  display: block;
  width: 100%;
  min-height: 100vh;
  left: -100%;
  transition: left 500ms;
  font-family: 'Sunflower', sans-serif;
  background-color: #393939;
  z-index: 5;
}
@media screen and (min-width: 600px) {
  .settings-container {
    left: -400px;
    width: 400px;
  }
}
.settingsContainer__reveal {
  left: 0!important;
}
.settings-panel {
  display: block;
  overflow-y: auto;
  height: calc(100vh - 2.5em - 20px);
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
  transition: left 500ms;
}
@media screen and (max-width: 599px) {
  .settingsIcon__inside {
    top: 0;
    left: -60px!important;
  }
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
  border-bottom: 1px solid black;
  font-size: 2.5em;
  line-height: 1em;
  text-align: center;
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
  font-size: 1em;
  line-height: 3em;
  background: #000;
  color: white;
  cursor: pointer;
  border: none;
  font-family: 'Sunflower', sans-serif;
}
.resetButton:hover {
  background-color: #333;
}
@media screen and (max-width: 599px) {
  .invertedBg {
    background-color: black;
    color: white;
  }
}
</style>
