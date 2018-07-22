<template lang="pug">
  .settings-container(:class='{settingsContainer__reveal: settingsOpen}')
    .settings-title(:class="{ invertedBg: nightMode }") Settings
      .icons
        img.settings-icon(
          :src="nightMode ? 'settings-white.svg' : 'settings-black.svg'" 
          @click="settingsOpen = !settingsOpen"
          :class="{ settingsIcon__inside: settingsOpen }"
          )
    .settings-panel
      Locator(:timeZone="timeZone")
      .option(v-for="obj, index in colorSettings" :key="obj.label")
        ColorOption(:label="obj.label" :settingsPath="obj.dataset" :color="obj.val")
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
    reset: function () {
      this.$store.commit('resetSettings');
    }
  },
  computed: {
    nightMode () {
      if (this.$store.state.settings.page.bgColor.lightness < 50) {
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
  left: 0;
  top: 0;
  transform: translateX(-100%);
  min-height: 100vh;
  transition: transform 500ms;
  font-family: 'Sunflower', sans-serif;
  font-size: 1rem;
  background-color: #303030;
  z-index: 5;
}
@media screen and (min-width: 600px) {
  .settings-container {
    width: 20vw;
    min-width: 500px;
  }
}
.settingsContainer__reveal {
  transform: translateX(0%);
}
.settings-panel {
  display: block;
  overflow-y: auto;
  height: calc(100vh - 2.5em - 20px);
}
.option {
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
.settings-title {
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid black;
  font-size: 2.5em;
  line-height: 1em;
  text-align: center;
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
  background-color: #222;
}
@media screen and (max-width: 599px) {
  .invertedBg {
    background-color: black;
    color: white;
  }
}
</style>
