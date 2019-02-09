// import Vue from "vue";
import * as types from '../mutation-types'
import { login, logout } from '../actions'

const state = {
  accessToken: null
}

const mutations = {
  [types.LOGIN] (state, payload) {
    state.accessToken = payload.accessToken
  },
  [types.LOGOUT] (state) {
    state.accessToken = null
  }
}

const actions = { login, logout }

export default {
  actions,
  state,
  mutations
}
