// import Vue from "vue";
import * as types from '../mutation-types'
import { login, logout } from '../actions'

const state = {
  accessToken: null
}

const mutations = {
  [types.LOGIN] (state) {
    console.log('Ready to Login')
  },
  [types.LOGIN_SUCCESS] (state, payload) {
    state.accessToken = payload.sessionId
    localStorage.accessToken = payload.sessionId
  },
  [types.LOGIN_FAILED] (state, message) {
    console.log(message)
    state.accessToken = null
    delete localStorage.accessToken
  },
  [types.LOGOUT] (state) {
    state.accessToken = null
    delete localStorage.accessToken
  }
}

const actions = { login, logout }

export default {
  actions,
  state,
  mutations
}
