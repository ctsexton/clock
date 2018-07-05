import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      settings: {
        page: {
          fontSize: '100px',
          color: '#c4c0b3',
          bgColor: '#c4c0b3',
        },
        title: {
          fontSize: '100',
          color: '#1c3d60',
        },
        subtitle: {
          fontSize: '100px',
          color: '#5e7084',
        },
      },
      defaultSettings: {
        page: {
          fontSize: '100px',
          color: '#c4c0b3',
          bgColor: '#c4c0b3',
        },
        title: {
          fontSize: '100',
          color: '#1c3d60',
        },
        subtitle: {
          fontSize: '100px',
          color: '#5e7084',
        },
      }
    },
    mutations: {
      increment (state) {
        state.counter++
      },
      updateColor (state, info) {
        let path = info.settingsPath;
        state.settings[path[0]][path[1]] = info.color;
      },
      updateFont (state, info) {
        let path = info.settingsPath;
        state.settings[path[0]][path[1]] = info.fontSize;
      },
      initialiseSettings (state) {
        if(localStorage.getItem('clock-settings')) {
          // Replace settings with stored
          Object.assign(state.settings, JSON.parse(localStorage.getItem('clock-settings')));
        }
      },
      resetSettings (state) {
        state.settings = JSON.parse(JSON.stringify(state.defaultSettings));
      }
    },
  })
}

export default createStore
