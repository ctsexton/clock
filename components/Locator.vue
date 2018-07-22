<template lang="pug">
.component
  .locator-container
    input.locator(
      type="text" 
      :placeholder="timeZone.place" 
      @keydown.enter="selectZone" 
      @keydown.down="down"
      @keydown.up="up"
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
let zoneNames = Object.keys(zones.getAllTimezones());

export default {
  props: {
    timeZone: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      // input to search string
      searchInput: '',
      // currently selected in dropdown
      selectedItem: 0,
    }
  },
  methods: {
    /*
     * Called on typing input to search box
     */
    input: function (e) {
      // set search string
      this.searchInput = e.target.value;
      // sync with text box 
      this.resetSel();
    },
    /*
     * On enter/clicking on zone in dropdown list
     * Trigger actions to occur
     */
    selectZone: function (e) {
      let zone = this.suggestions[this.selectedItem];
      // commit zone to Vuex store
      this.commitZone(zone);
      // blur input
      this.$refs.locationInput.blur();
    },
    // commit zone to Vuex store
    commitZone: function (zone) {
      if (zoneNames.includes(zone.tZ)) {
        this.$store.commit('updateTZ', zone);
      }
    },
    /*
     * Timezone search is performed on every keystroke
     * Triggered by computed property: 'suggestions'
     */
    search: function (searchString) {
      searchString = searchString.toUpperCase().replace(' ', '_');
      // returns a list of raw timezones matching the search string
      return zoneNames.filter((zone) => {
        return zone.toUpperCase().indexOf(searchString) !== -1;
      });
    },
    /*
     * Convert from timezone format to readable
     * "Continent/City_Name" -> "City Name, Country"
     */
    toReadable: function (zone) {
      let arr = zone.split("/");
      let city = this.toTitleCase(arr[arr.length - 1].replace('_', ' '));
      let country = zones.getCountriesForTimezone(zone)[0].name;
      return city + ', ' + country;
    },
    /*
     * Capitalize first letter of every word only
     */
    toTitleCase: function (str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    /*
     * Clear input box on unfocus
     */
    onBlur: function () {
      this.searchInput = '';
      this.clear();
    },
    clear: function () {
      this.$refs.locationInput.value = '';
    },
    /*
     * set selected item upon hover
     */
    hoverZone: function (index) {
      this.selectedItem = index;
    },
    /*
     * Reset selected item to first in list
     */
    resetSel: function () {
      this.selectedItem = 0;
    },
    // Highlight selected item in dropdown list
    isActive: function (index) {
      return this.selectedItem === index;
    },
    // change selected item on down arrow press
    down: function () {
      if (this.selectedItem < this.suggestions.length - 1) {
        this.selectedItem++;
      }
    },
    // change selected item on up arrow press
    up: function () {
      if (this.selectedItem > 0) {
        this.selectedItem--;
      }
    },
  },
  computed: {
    /*
     * Populate list of timezone suggestions based on search input
     */
    suggestions () {
      let list = this.searchInput ? this.search(this.searchInput) : [];
      list = list.map((el) => {
        return {
          tZ: el,
          place: this.toReadable(el)
        }});
      return list;
    },
  },
}
</script>
<style scoped>
.component {
  position: relative;
  display: block;
  background: white;
  width: 100%;
  font-size: 1em;
}
.locator-container {
  padding: 0.5em;
}
.locator {
  width: 100%;
  height: 2em;
  border: 1px solid #bbb;
  padding: 0.5em;
  position: relative;
  font-size: 1em;
}
.autocomplete {
  position: absolute;
  z-index: 1;
  width: 100%;
  display: block;
  max-height: 10em;
  font-size: 1em;
  overflow-y: auto;
  background: white;
}
.item {
  padding: 0 0.5em;
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
