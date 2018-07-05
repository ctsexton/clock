<template lang='pug'>
  div
    .container(:style='{backgroundColor: $store.state.settings.page.bgColor}')
      .title(:style="{color: $store.state.settings.title.color, fontSize: $store.state.settings.title.fontSize + 'px'}") {{ time }}
      .subtitle(:style='{color: $store.state.settings.subtitle.color}') {{ date }}
      .subtitle(:style='{color: $store.state.settings.subtitle.color}') Los Angeles, California
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
