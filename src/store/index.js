import Vue from 'vue'
import Vuex from 'vuex'
import { permission } from './permission'

Vue.use(Vuex)

const TOKEN_KEY ='90uf9sd9f79'
const getToken =  () => localStorage.getItem(TOKEN_KEY)
const setToken = token => localStorage.setItem(TOKEN_KEY, token)
const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export default new Vuex.Store({
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN (state, token) {
      setToken(token)
      state.token = token
    },
    REMOVE_TOKEN (state) {
      removeToken()
      state.token = ''
    }
  },
  actions: {
    login ({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('SET_TOKEN', '12345')
          resolve()
        }, 1000)
      })
    },
    logout ({ commit }) {
      commit('REMOVE_TOKEN')
    }
  },
  modules: {
    permission
  }
})
