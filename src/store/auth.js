export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    getUser ({ user }) {
      return user
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    login ({ commit }, { username, password }) {
      const currentUser = {
        username,
        password
      }

      localStorage.setItem('user', JSON.stringify(currentUser))

      commit('setUser', currentUser)
    },
    logout ({ commit }) {
      localStorage.removeItem('user')
      
      commit('setUser', null)
    },
    validateSession ({ commit }) {
      const user = localStorage.getItem('user')

      if (user) {
        commit('setUser', JSON.parse(user))
      }
    }
  },
}
