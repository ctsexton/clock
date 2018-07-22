import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      defaultSettings: {},
      settings: {
        timeZone: {
          tZ: 'America/Los_Angeles',
          place: 'Los Angeles, United States'
        },
        elements: {
          background: {
            label: 'Background',
            color: {
              hue: '200',
              saturation: '100',
              lightness: '50'
            },
            size: null
          },
          clock: {
            label: 'Clock',
            color: {
              hue: '250',
              saturation: '50',
              lightness: '30'
            },
            size: '10'
          },
          date: {
            label: 'Date',
            color: {
              hue: '250',
              saturation: '50',
              lightness: '50'
            },
            size: '5'
          },
          place: {
            label: 'Location',
            color: {
              hue: '250',
              saturation: '50',
              lightness: '50'
            },
            size: '5'
          },
        },
      },
    },
    mutations: {
      increment (state) {
        state.counter++
      },
      updateColor (state, info) {
        state.settings.elements[info.element].color[info.name] = info.val;
      },
      updateFont (state, info) {
        state.settings.elements[info.element].size = info.val;
      },
      updateTZ (state, input) {
        state.settings.timeZone = input;
      },
      initialiseSettings (state) {
        state.defaultSettings = JSON.parse(JSON.stringify(state.settings));
        if(localStorage.getItem('settings_21_07_18')) {
          // Replace settings with stored
          Object.assign(state.settings, JSON.parse(localStorage.getItem('settings_21_07_18')));
        }
      },
      resetSettings (state) {
        state.settings = JSON.parse(JSON.stringify(state.defaultSettings));
      }
    },
  })
}

export default createStore
