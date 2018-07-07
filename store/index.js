import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      defaultSettings: {},
      settings: {
        timeZone: 'America/Los_Angeles',
        page: {
          fontSize: '100px',
          color: '#c4c0b3',
          bgColor: {
            hue: '200',
            saturation: '100',
            lightness: '50'
          },
        },
        title: {
          fontSize: '100',
          color: {
            hue: '250',
            saturation: '50',
            lightness: '30'
          },
        },
        subtitle: {
          fontSize: '42',
          color: {
            hue: '250',
            saturation: '50',
            lightness: '50'
          },
        },
        dateTitle: {
          fontSize: '42',
          color: {
            hue: '250',
            saturation: '50',
            lightness: '50'
          },
        },
        locationTitle: {
          fontSize: '42',
          color: {
            hue: '250',
            saturation: '50',
            lightness: '50'
          },
        }
      },
    },
    mutations: {
      increment (state) {
        state.counter++
      },
      updateColor (state, info) {
        let path = info.path;
        state.settings[path[0]][path[1]][info.type] = info.value;
      },
      updateFont (state, info) {
        let path = info.settingsPath;
        state.settings[path[0]][path[1]] = info.fontSize;
      },
      updateTZ (state, input) {
        state.settings.timeZone = input;
      },
      initialiseSettings (state) {
        setTimeout(function () {
          state.defaultSettings = JSON.parse(JSON.stringify(state.settings));
          if(localStorage.getItem('clock-settings')) {
            // Replace settings with stored
            Object.assign(state.settings, JSON.parse(localStorage.getItem('clock-settings')));
          }
        },0);
      },
      resetSettings (state) {
        state.settings = JSON.parse(JSON.stringify(state.defaultSettings));
      }
    },
  })
}

export default createStore
