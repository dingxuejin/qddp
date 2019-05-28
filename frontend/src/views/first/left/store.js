
import * as api from '@/api/axios.js'
const state = {
  gdtbqsData: [],
  drgd24dfb: [],
  drgdsl: [],
  ddrqxhj: [],
  scfx_gzpcsc: [],
  drgdfl: []
}
// 'gdtbqsData', 'drgd24dfb'
const mutations = {
  setGdtbqsData (state, data) {
    state.gdtbqsData = data.items
  },
  setDrgd24dfb (state, data) {
    state.drgd24dfb = data.items
  },
  setDrgdsl (state, data) {
    state.drgdsl = data.items
  },
  setDrgdfl (state, data) {
    state.drgdfl = data.items
  },
  setDdrqxhj (state, data) {
    state.ddrqxhj = data.items
  },
  setScfx_gzpcsc (state, data) {
    state.scfx_gzpcsc = data.items
  }
}
const actions = {
  async fetchGdtbqs ({
    commit
  }, params) {
    let options = { zblx: 'gdqsfx' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setGdtbqsData', res)
  },
  async fetchDrgd24dfb ({
    commit
  }, params) {
    let options = { zblx: 'drgd24dfb' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setDrgd24dfb', res)
  },
  async fetchDdrqxhj ({
    commit
  }, params) {
    let options = { zblx: 'drqxhj' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setDdrqxhj', res)
  },
  async fetchDrgdsl ({
    commit
  }, params) {
    let options = { zblx: 'drgdsl' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setDrgdsl', res)
  },
  async fetchDrgdfl ({
    commit
  }, params) {
    let options = { zblx: 'drgdfl' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setDrgdfl', res)
  },
  async fetchScfx_gzpcsc ({
    commit
  }, params) {
    let options = { zblx: 'scfx_gzpcsc' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setScfx_gzpcsc', res)
  }

}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
