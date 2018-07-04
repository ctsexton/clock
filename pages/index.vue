<template lang='pug'>
  div
    .container(:style='{backgroundColor: settings.page.bgColor}')
      .title(:style='{color: settings.title.color}') {{ time }}
      .subtitle(:style='{color: settings.subtitle.color}') {{ date }}
      .subtitle(:style='{color: settings.subtitle.color}') Los Angeles, California
      input.searchbar(type='text' placeholder='Search Google')
      .settings-bar(:class='{settingsBar__reveal: settingsOpen}')
        .subtitle Settings
        ul
          li Background Color:
            input.choose-color(type='color' v-model='settings.page.bgColor')
          li Clock Font Color:
            input.choose-color(type='color' v-model='settings.title.color')
          li Date/Location Font Color:
            input.choose-color(type='color' v-model='settings.subtitle.color')
        img.settings-icon(src='@/static/settings-black.svg' @click='toggleSettings()')
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
  },
  data () {
    return {
      date: '',
      time: '',
      settingsOpen: false,
      settings: {
        page: {
          fontSize: '100px',
          color: '#35495e',
          bgColor: '#dddddd',
        },
        title: {
          fontSize: '100px',
          color: '#35495e',
        },
        subtitle: {
          fontSize: '100px',
          color: '#35495e',
        },
      }
    }
  },
  methods: {
    getTime: function () {
      this.time = new Date().toLocaleString('en-US', {timeZone: 'America/Los_Angeles', hour: 'numeric', minute: 'numeric', second: 'numeric'});
      setTimeout(this.getTime, 1000);
    },
    getDate: function () {
      this.date = new Date().toLocaleString('en-US', {timeZone: 'America/Los_Angeles', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
    },
    toggleSettings: function () {
      this.settingsOpen = !this.settingsOpen;
    }
  },
  mounted: function () {
    this.getTime();
    this.getDate();
    if (localStorage.getItem('cts-pageData')) this.settings = JSON.parse(localStorage.getItem('cts-pageData'));
  },
  watch: {
    settings: {
      handler() {
        localStorage.setItem('cts-pageData', JSON.stringify(this.settings));
      },
      deep: true,
    }
  }
}
</script>
