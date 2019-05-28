
import * as api from '@/api/axios.js'
const state = {
  cfData: [],
  gdyyData: [],
  scfx_hdl: [],
  scfx_jsl: [],
  gdclqk: [],
  jhtd: [],
  gztd: []
}

const mutations = {
  setFetchCf (state, data) {
    state.cfData = data.items
  },
  setFetchGdyy (state, data) {
    state.gdyyData = data.items
  },
  setScfx_hdl (state, data) {
    state.scfx_hdl = data.items
  },
  setScfx_jsl (state, data) {
    state.scfx_jsl = data.items
  },
  setGdclqk (state, data) {
    state.gdclqk = data.items
  },
  setJhtd (state, data) {
    state.jhtd = data.items
  },
  setGztd (state, data) {
    state.gztd = data.items
  }
}
const actions = {
  async fetchCf ({
    commit
  }, params) {
    let options = { zblx: 'repeat' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setFetchCf', res)
  },
  async fetchGdyy ({
    commit
  }, params) {
    let options = { zblx: 'drgdyy' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setFetchGdyy', res)
  },
  async fetchScfx_hdl ({
    commit
  }, params) {
    let options = { zblx: 'scfx_hdl' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setScfx_hdl', res)
  },
  async fetchScfx_jsl ({
    commit
  }, params) {
    let options = { zblx: 'scfx_jsl' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setScfx_jsl', res)
  },
  async fetchGdclqk ({
    commit
  }, params) {
    let options = { zblx: 'gdclqk' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setGdclqk', res)
  },
  async fetchGztd ({
    commit
  }, params) {
    let options = { zblx: 'gztd' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setGztd', res)
  },
  async fetchJhtd ({
    commit
  }, params) {
    let options = { zblx: 'jhtd' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setJhtd', res)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
