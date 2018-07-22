<template lang='pug'>
  body 
    Settings(:timeZone="timeZone")
    .container(:style="{background: `hsl(${bg.hue}, ${bg.saturation}%, ${bg.lightness}%)`}")
      .title(:style="{color: `hsl(${clockFormat.color.hue}, ${clockFormat.color.saturation}%, ${clockFormat.color.lightness}%)`, fontSize: `${clockFormat.size}` + 'vh'}") {{ time }}
      .subtitle(:style="{color: `hsl(${dateFormat.color.hue}, ${dateFormat.color.saturation}%, ${dateFormat.color.lightness}%)`, fontSize: `${dateFormat.size}` + 'vh'}") {{ date }}
      .subtitle(:style="{color: `hsl(${locationFormat.color.hue}, ${locationFormat.color.saturation}%, ${locationFormat.color.lightness}%)`, fontSize: `${locationFormat.size}` + 'vh'}") {{ timeZone.place }}
      form.searchbox(id="search" action="https://www.google.com/search" method="get")
        input.searchbar(type="search" name="q" placeholder="Search Google")
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
      return this.$store.state.settings.elements.background.color;
    },
    clockFormat () {
      return this.$store.state.settings.elements.clock;
    },
    dateFormat () {
      return this.$store.state.settings.elements.date;
    },
    locationFormat () {
      return this.$store.state.settings.elements.place;
    },
  },
  mounted: function () {
    this.getTime();

    this.$store.subscribe((mutation, state) => {
      try {
        localStorage.setItem('settings_21_07_18', JSON.stringify(state.settings));
      } catch (e) {}
    });

  },
  beforeCreate: function () {
    this.$store.commit('initialiseSettings');
  }
}
</script>
