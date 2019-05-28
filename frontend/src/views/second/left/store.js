
import * as api from '@/api/axios.js'
const state = {
  gfzlzs: [],
  gfshxy: [],
  gfyzzqs: [],
  gffltj: [],
  gfqxfb: []
}

const mutations = {
  setGfzlzs (state, data) {
    state.gfzlzs = data.items
  },
  setGfshxy (state, data) {
    state.gfshxy = data.items
  },
  setGfyzzqs (state, data) {
    state.gfyzzqs = data.items
  },
  setGffltj (state, data) {
    state.gffltj = data.items
  },

  setGfqxfb (state, data) {
    state.gfqxfb = data.items
  }
}
const actions = {
  async fetchGfzlzs ({
    commit
  }, params) {
    let options = { zblx: 'gfzlzs' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setGfzlzs', res)
  },
  async fetchGfshxy ({
    commit
  }, params) {
    let options = { zblx: 'gfshxy' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setGfshxy', res)
  },
  async fetchGfyzzqs ({
    commit
  }, params) {
    let options = { zblx: 'gfyzzqs' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setGfyzzqs', res)
  },
  async fetchGffltj ({
    commit
  }, params) {
    let options = { zblx: 'gffltj' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setGffltj', res)
  },
  async fetchGfqxfb ({
    commit
  }, params) {
    let options = { zblx: 'gfqxfb' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setGfqxfb', res)
  }

}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
