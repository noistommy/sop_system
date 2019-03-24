// import Vue from "vue";
import * as types from '../mutation-types'
import { login, logout } from '../actions'

const state = {
  // accessToken: null,
  userInfo: null
}

const mutations = {
  [types.LOGIN] (state, payload) {
    console.log(payload, 'Ready to Login')
  },
  [types.LOGIN_SUCCESS] (state, payload) {
    console.log(payload)
    if (payload) {
      state.userInfo = payload.oprtrFgCd
      localStorage.userInfo = payload.oprtrFgCd
    }
  },
  [types.LOGIN_FAILED] (state, message) {
    console.log(message)
    state.userInfo = null
    if (localStorage.userInfo) {
      delete localStorage.userInfo
    }
  },
  [types.LOGOUT] (state) {
    state.userInfo = {
      userId: '',
      userName: '',
      userCode: ''
    }
    delete localStorage.userInfo
  }
}

const actions = { login, logout }

export default {
  actions,
  state,
  mutations
}
