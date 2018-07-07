<template lang='pug'>
  div
    .container(:style="{background: `hsl(${bg.hue}, ${bg.saturation}%, ${bg.lightness}%)`}")
      .title(:style="{color: `hsl(${clockColor.hue}, ${clockColor.saturation}%, ${clockColor.lightness}%)`, fontSize: $store.state.settings.title.fontSize + 'px'}") {{ time }}
      .subtitle(:style="{color: $store.state.settings.dateTitle.color, fontSize: $store.state.settings.dateTitle.fontSize + 'px'}") {{ date }}
      .subtitle(:style="{color: $store.state.settings.locationTitle.color, fontSize: $store.state.settings.locationTitle.fontSize + 'px'}") Los Angeles, California
      input.searchbar(type='text' placeholder='Search Google')
      Settings
</template>

<script>
import Logo from '~/components/Logo.vue'
import Settings from '@/components/Settings.vue'

export default {
  components: {
    Settings
  },
  data () {
    return {
      date: '',
      time: '',
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
  },
  computed: {
    bg () {
      return {
        hue: this.$store.state.settings.page.bgColor.hue,
        saturation: this.$store.state.settings.page.bgColor.saturation,
        lightness: this.$store.state.settings.page.bgColor.lightness
      }
    },
    clockColor () {
      return {
        hue: this.$store.state.settings.title.color.hue,
        saturation: this.$store.state.settings.title.color.saturation,
        lightness: this.$store.state.settings.title.color.lightness
      }
    },
  },
  mounted: function () {
    this.getTime();
    this.getDate();

    this.$store.subscribe((mutation, state) => {
      localStorage.setItem('clock-settings', JSON.stringify(this.$store.state.settings));
    });

    this.$store.commit('initialiseSettings');
  },
}
</script>
