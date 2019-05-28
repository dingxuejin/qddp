
import * as api from '@/api/axios.js'
const state = {
  rxgdlxData: [],
  rxgdqy: [],
  clwgdlx: [],
  clwgdqy: [],
  tsgdqy: [],
  tsgdlx: [],
  ykdydj: [],
  ykgdzt: [],
  ykgdqy: [],
  ykgdlx: []

}

const mutations = {
  setRxgdlx (state, data) {
    state.rxgdlxData = data.items
  },
  setRxgdqy (state, data) {
    state.rxgdqy = data.items
  },
  setClwgdqy (state, data) {
    state.clwgdqy = data.items
  },
  setClwgdlx (state, data) {
    state.clwgdlx = data.items
  },
  setTsgdqy (state, data) {
    state.tsgdqy = data.items
  },
  setYkgdlx (state, data) {
    state.ykgdlx = data.items
  },
  setYkgdzt (state, data) {
    state.ykgdzt = data.items
  },
  setYkdydj (state, data) {
    state.ykdydj = data.items
  },
  setYkgdqy (state, data) {
    state.ykgdqy = data.items
  },
  setTsgdlx (state, data) {
    state.tsgdlx = data.items
  }
}
const actions = {
  async fetchRxgdlx ({
    commit
  }, params) {
    let options = { zblx: 'rxgdlx' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setRxgdlx', res)
  },
  async fetchRxgdqy ({
    commit
  }, params) {
    let options = { zblx: 'rxgdqy' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setRxgdqy', res)
  },
  async fetchClwgdlx ({
    commit
  }, params) {
    let options = { zblx: 'clwgdlx' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setClwgdlx', res)
  },
  async fetchClwgdqy ({
    commit
  }, params) {
    let options = { zblx: 'clwgdqy' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setClwgdqy', res)
  },
  async fetchTsgdlx ({
    commit
  }, params) {
    let options = { zblx: 'tsgdlx' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setTsgdlx', res)
  },
  async fetchYkgdlx ({
    commit
  }, params) {
    let options = { zblx: 'ykgdlx' }
    options.dataFlag = params.dataFlag
    // options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setYkgdlx', res)
  },
  async fetchYkdydj ({
    commit
  }, params) {
    let options = { zblx: 'ykdydj' }
    options.dataFlag = params.dataFlag
    // options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setYkdydj', res)
  },
  async fetchYkgdzt ({
    commit
  }, params) {
    let options = { zblx: 'ykgdzt' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setYkgdzt', res)
  },
  async fetchYkgdqy ({
    commit
  }, params) {
    let options = { zblx: 'ykgdqy' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setYkgdqy', res)
  },
  async fetchtTsgdqy ({
    commit
  }, params) {
    let options = { zblx: 'tsgdqy' }
    options.dataFlag = params.dataFlag
    options.orgNo = params.orgNo
    let res = await api.get95598Data(options)
    commit('setTsgdqy', res)
  }

}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
