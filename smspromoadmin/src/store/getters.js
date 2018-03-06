export const getters = {
    appTitle (state) {
      return state.appName
    },
    getUser (state) {
      return state.user
    },
    getUserInfo (state) {
      return state.userInfo
    },
    getError (state) {
      return state.error
    },
    getLoading (state) {
      return state.loading
    },
    getPage (state) {
      return state.page
    }
  }