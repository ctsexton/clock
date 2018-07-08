<template lang='pug'>
  div
    .container(:style="{background: `hsl(${bg.hue}, ${bg.saturation}%, ${bg.lightness}%)`}")
      .title(:style="{color: `hsl(${clockColor.hue}, ${clockColor.saturation}%, ${clockColor.lightness}%)`, fontSize: $store.state.settings.title.fontSize + 'px'}") {{ time }}
      .subtitle(:style="{color: `hsl(${dateColor.hue}, ${dateColor.saturation}%, ${dateColor.lightness}%)`, fontSize: $store.state.settings.dateTitle.fontSize + 'px'}") {{ date }}
      .subtitle(:style="{color: `hsl(${locationColor.hue}, ${locationColor.saturation}%, ${locationColor.lightness}%)`, fontSize: $store.state.settings.locationTitle.fontSize + 'px'}") {{ timeZone.place }}
      form(id="search" action="https://www.google.com/search" method="get")
        input.searchbar(type="search" name="q" placeholder="Search Google")
      Settings(:timeZone="timeZone")
</template>

<script>
import Logo from '~/components/Logo.vue'
import Settings from '@/components/Settings.vue'

let objColor = function (path) {
  let obj = path;
  return {
    hue: obj.color.hue,
    saturation: obj.color.saturation,
    lightness: obj.color.lightness
  }
}
export default {
  components: {
    Settings
  },
  data () {
    return {
      time: '',
    }
  },
  methods: {
    getTime: function () {
      this.time = new Date().toLocaleString('en-US', {timeZone: this.timeZone.tZ, hour: 'numeric', minute: 'numeric', second: 'numeric'});
      setTimeout(this.getTime, 1000);
    },
  },
  computed: {
    date () {
      return new Date().toLocaleString('en-US', {timeZone: this.timeZone.tZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});

    },
    timeZone () {
      return this.$store.state.settings.timeZone;
    },
    bg () {
      let obj = this.$store.state.settings.page;
      return {
        hue: obj.bgColor.hue,
        saturation: obj.bgColor.saturation,
        lightness: obj.bgColor.lightness
      }
    },
    clockColor () {
      return objColor(this.$store.state.settings.title);
    },
    dateColor () {
      return objColor(this.$store.state.settings.dateTitle);
    },
    locationColor () {
      let obj = this.$store.state.settings.locationTitle;
      return {
        hue: obj.color.hue,
        saturation: obj.color.saturation,
        lightness: obj.color.lightness
      }
    },
  },
  mounted: function () {
    this.getTime();

    this.$store.subscribe((mutation, state) => {
      localStorage.setItem('clock-settings', JSON.stringify(this.$store.state.settings));
    });

  },
  beforeCreate: function () {
    this.$store.commit('initialiseSettings');
  }
}
</script>
