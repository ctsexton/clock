import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      settings: {
        page: {
          fontSize: '100px',
          color: '#35495e',
          bgColor: '#dddddd',
        },
        title: {
          fontSize: '100px',
          color: '#35495e',
        },
        subtitle: {
          fontSize: '100px',
          color: '#35495e',
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
      initialiseSettings (state) {
        if(localStorage.getItem('clock-settings')) {
          // Replace settings with stored
          state.settings = JSON.parse(localStorage.getItem('clock-settings'));
        }
      }
    },
  })
}

export default createStore
