<template lang="pug">
.locator-container
  input.locator(
    type="text" 
    :placeholder="placeholder" 
    @keydown.enter="selectZone" 
    @keydown.down="down"
    @keydown.up="up"
    @focus="inputFlag = 1" 
    @blur="onBlur" 
    @input="input"
    ref="locationInput"
  )
  .autocomplete
    .item(
      v-for="zone, index in suggestions" 
      :key="index"
      :class="{highlighted: isActive(index)}" 
      @mouseover="hoverZone(index)" 
      @mousedown="selectZone"
      ) {{ zone.place }}
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
      type: Object,
      required: true
    },
  },
  data () {
    return {
      // 0 closes dropdown, 1 opens dropdown
      inputFlag: 0,
      // input to search string
      searchInput: '',
      // currently selected in dropdown
      selectedItem: 0,
    }
  },
  methods: {
    // selected zone in input array is set
    selectZone: function (e) {
      // remove this and replace with referance to zone array
      let zone = this.suggestions[this.selectedItem];
      // close autocomplete
      this.inputFlag = 0;
      // commit zone!
      this.commitZone(zone);
      // blur input
      this.$refs.locationInput.blur();
    },
    commitZone: function (zone) {
      // commit zone to store
      if (zoneNames.includes(zone.tZ)) {
        this.$store.commit('updateTZ', zone);
      }
    },
    onBlur: function () {
      this.inputFlag = 0;
      this.searchInput = '';
      this.clear();
    },
    clear: function () {
      this.$refs.locationInput.value = '';
    },
    hoverZone: function (index) {
      this.selectedItem = index;
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
    input: function (e) {
      // set search string
      this.searchInput = e.target.value;
      // sync with text box 
      this.placeholder = e.target.value;
      // open dropdown
      this.inputFlag = 1;
    },
    search: function (searchString) {
      searchString = searchString.toUpperCase();
      let results = [];
      if (searchString && this.inputFlag) {
        results = zoneNames.filter((zone) => {
          // get city and compare search string
          return zone.split("/").reverse()[0].toUpperCase().indexOf(searchString) !== -1;
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
      let city = toTitleCase(arr[arr.length - 1].split("_").join(" "));
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
    placeholder () {
      return this.timeZone.place;
    },
  },
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
  line-height: 2.5em;
  cursor: pointer;
}
.highlighted {
  background: #09f;
  color: white;
}
</style>
