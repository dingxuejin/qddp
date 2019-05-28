import * as api from '@/api/axios.js'
const state = {
  showMap: 'gis', // ‘gis’显示gis地图，‘maptalks’显示maptalks地图
  // showMap: 'maptalks', // ‘gis’显示gis地图，‘maptalks’显示maptalks地图
  options: {},
  tsOptions: {},
  xxkxx: [],
  areaId: null
}

const mutations = {
  setArea (state, data) {
    state.areaId = data
  },
  setShowMap (state, data) {
    state.showMap = data
  },
  setOptions (state, data) {
    let options = {
      zblx: 'dtqxgdydfb'
    }
    options.dataFlag = data.dataFlag
    options.orgNo = data.orgNo
    state.options = options
  },
  setTsOptions (state, data) {
    let options = {
      zblx: 'dttsgdydfb'
    }
    options.dataFlag = data.dataFlag
    options.orgNo = data.orgNo
    state.tsOptions = options
  },
  setXxkxx (state, data) {
    let opp = {
      '370202': '370202',
      '370203': '370203',
      '370211': '3740223',
      '370212': '370212',
      '370213': '370213',
      '370214': '370214',
      '370281': '3740220',
      '370282': '3740221',
      '370283': '3740222',
      '370285': '3740224',
      '3702': '370202'
    }
    if (data.items && data.items.length > 0) {
      let newData = data.items.map(val => {
        val.ORG_NO = opp[val.ORG_NO]
        return val
      })
      state.xxkxx = newData
    }
  }
}
const actions = {
  async fetchXxkxx ({
    commit
  }) {
    let options = {
      zblx: 'xxkxx'
    }
    let res = await api.get95598Data(options)

    commit('setXxkxx', res)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
