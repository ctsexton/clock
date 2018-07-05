<template lang="pug">
.setting-container
  .text {{ label }}
  input.choose-color(type='color' :data-settingspath='settingsPath' :value='colorVal' @input="updateColor") 
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    settingsPath: {
      type: Array,
      required: true
    },
    colorVal: {
      type: String,
      required: true
    }
  },
  methods: {
    updateColor: function (e) {
      let arr = e.target.dataset.settingspath.split(",");
      let info = {
        color: e.target.value,
        settingsPath: arr
      };
      this.$store.commit('updateColor', info);
    }
  },
}
</script>
<style scoped>
.setting-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  font-size: 16px;
  line-height: 3em;
  border-top: solid 1px #aaa;
  background-color: #ddd;
}
.text {
  text-align: left;

}
.choose-color {
  display: inline-block;
  min-height: 40px;
  min-width: 40px;
  margin: 0 0 0 20px;
  border: none;
}
input {
}
</style>
