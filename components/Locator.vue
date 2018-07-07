<template lang="pug">
.locator-container
  input.locator(
    type="text" 
    :placeholder="timeZone_readable" 
    @keydown.enter="selectZone" 
    @keydown.down="down"
    @keydown.up="up"
    @focus="inputFlag = 1" 
    @blur="inputFlag = 0" 
    @input="searchInput = $event.target.value"
  )
  .autocomplete
    .item(v-for="zone, index in suggestions" :class="{highlighted: isActive(index)}") {{ zone.place }}
</template>
<script>
let zones = require('countries-and-timezones');
let timezones = zones.getAllTimezones();
let zoneNames = Object.keys(timezones);
// convert string To Title Case
let toTitleCase = function (str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
      searchInput: '',
      selectedItem: 0
    }
  },
  methods: {
    // upon hitting enter, selected zone in input array is set
    selectZone: function () {
      // remove this and replace with referance to zone array
      let zone = this.suggestions[this.selectedItem].tZ;

      // commit zone to store
      if (zoneNames.includes(zone)) {
        this.$store.commit('updateTZ', zone);
      } else {
      }
    },
    isActive: function (index) {
      return this.selectedItem === index;
    },
    down: function () {
      if (this.selectedItem < this.suggestions.length - 1) {
        this.selectedItem++;
      }
    },
    up: function () {
      if (this.selectedItem > 0) {
        this.selectedItem--;
      }
    },
    search: function (searchString) {
      searchString = searchString.toUpperCase();
      let results = [];
      if (searchString && this.inputFlag) {
        results = zoneNames.filter((zone) => {
          return zone.toUpperCase().indexOf(searchString) !== -1;
        });
      }
      // side effect - set selected result to first item on every search query
      this.selectedItem = 0;
      // returns a list of raw timezones matching the search string
      return results;
    },
    
    // convert timezone to human readable add city here??
    toReadable: function (zone) {
      let arr = zone.split("/");
      let city = toTitleCase(arr[1].split("_").join(" "));
      let country = zones.getCountriesForTimezone(zone)[0].name;
      return city + ', ' + country;
    },
  },
  computed: {
    // contains array of autcomplete suggestions
    suggestions () {
      let list = this.search(this.searchInput);
      list = list.map((el) => {
        return {
          tZ: el,
          place: this.toReadable(el)
        }});
      return list;

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
