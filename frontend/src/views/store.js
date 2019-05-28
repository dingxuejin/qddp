
const state = {
  pageIndex: 1
}

const mutations = {
  setPageIndex (state, data) {
    if (state.pageIndex === 1) {
      state.pageIndex = 2
    } else {
      state.pageIndex = 1
    }
  }
}
const actions = {
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
