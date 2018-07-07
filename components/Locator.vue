<template lang="pug">
.locator-container
  input.locator(type="text" :placeholder="timeZone_readable" @keydown.enter="selectZone" @focus="inputFlag = 1" @blur="inputFlag = 0" @input="searchStr = $event.target.value")
  .autocomplete
    .item(v-for="zone, index in autoComplete" :class="{highlighted: isActive(index)}") {{ zone }}
</template>
<script>
let zones = require('countries-and-timezones');
let timeZones = zones.getAllTimezones();
let zoneArray = Object.keys(timeZones);
let toTitleCase = function (str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
let toReadable = function (str) {
  let arr = str.split("/");
  return arr[1].split("_").join(" ") + ', ' + arr[0]; 
};
let toFormatted = function (str) {
  let arr = str.split(",");
  arr = arr.map(el => {return el.trim().replace(" ", "_")});
  return arr.reverse().join("/");
};

export default {
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
      inputFlag: 0,
      searchStr: '',
      selectedItem: 0
    }
  },
  methods: {
    selectZone: function (e) {
      zone = toFormatted(e.target.value);
      if (timeZones.includes(zone)) {
        this.$store.commit('updateTZ', zone);
      }
    },
    isActive: function (index) {
      return this.selectedItem === index;
    },
    search: function (searchString) {
      searchString = toFormatted(searchString).toUpperCase();
      let results = [];
      if (searchString && this.inputFlag) {
        results = zoneArray.filter((zone) => {
          return zone.toUpperCase().indexOf(searchString) !== -1;
        });
      }
      let countries = results.map((zone) => {
        return zones.getCountriesForTimezone(zone)[0].name;
      });
      let cities = results.map((zone) => {
        return toTitleCase(zone.split("/")[1].replace("_", " "));
      });
      let formatted = cities.map((city, index) => {
        return city + ', ' + countries[index];
      });
      return formatted;
    },
  },
  computed: {
    autoComplete () {
      return this.search(this.searchStr);
    },
  }
}
</script>
<style scoped>
.locator-container {
  position: relative;
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
  position: relative;
}
.autocomplete {
  z-index: 100;
  width: 100%;
  display: block;
  max-height: 10em;
  font-size: 16px;
  overflow-y: auto;
  position: absolute;
  top: 3em;
  left: 0;
  background: white;
}
.item {
  width: 100%;
  display: block;
  line-height: 1em;
  height: 1.5em;
}
.highlighted {
  background: black;
  color: white;
}
</style>
