<template lang="pug">
.settings-bar(:class='{settingsBar__reveal: settingsOpen}')
  .subtitle Settings
  ul
    li Background Color:
      input.choose-color(type='color' data-path='["page", "bgColor"]' @input="updateColor" :value='bgColor') 
    li Clock Color:
      input.choose-color(type='color' data-path='["title", "color"]' @input="updateColor" :value='clockColor')
    li Date/Location Color:
      input.choose-color(type='color' data-path='["subtitle", "color"]' @input="updateColor" :value='dateLocColor')
  img.settings-icon(src='@/static/settings-black.svg' @click='toggleSettings()')
</template>
<script>
export default {
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
    updateColor: function (e) {
      let info = {
        color: e.target.value,
        path: e.target.dataset.path
      };
      this.$store.commit('updateColor', info);
    }
  },
  computed: {
    bgColor () {
      return this.$store.state.settings.page.bgColor;
    },
    clockColor () {
      return this.$store.state.settings.title.color;
    },
    dateLocColor () {
      return this.$store.state.settings.subtitle.color;
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
  background-color: white;
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
ul {
  text-align: left;
}
li {
  list-style: none;
  display: block;
  margin: 10px 0;
}
.color-box {
  display: inline-block;
  min-height: 1em;
  min-width: 50px;
  margin: 0 0 0 20px;
}
</style>
