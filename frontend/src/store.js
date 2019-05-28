import Vue from 'vue'
import Vuex from 'vuex'
import Page from './views/store.js'
import FirstLeft from './views/first/left/store.js'
import FirstRight from './views/first/right/store.js'
import SecondLeft from './views/second/left/store.js'
import SecondRight from './views/second/right/store.js'
import Map from './views/map/store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    Page,
    FirstLeft,
    FirstRight,
    SecondLeft,
    SecondRight,
    Map
  }
})
