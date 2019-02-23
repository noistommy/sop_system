// import Vue from "vue";
import * as types from '../mutation-types'
import { login, logout } from '../actions'

const state = {
  // accessToken: null,
  userInfo: {
    userId: '001',
    userName: 'naem',
    userCode: 'S0400100'
  }
}

const mutations = {
  [types.LOGIN] (state) {
    console.log('Ready to Login')
  },
  [types.LOGIN_SUCCESS] (state, payload) {
    state.userInfo.userId = payload.oprtrId
    state.userInfo.userName = payload.oprtrNm
    state.userInfo.userCode = payload.oprtrFgCd
    // localStorage.accessToken = payload.sessionId
  },
  [types.LOGIN_FAILED] (state, message) {
    console.log(message)
    state.userInfo = null
    // delete localStorage.accessToken
  },
  [types.LOGOUT] (state) {
    state.userInfo = null
    delete localStorage.accessToken
  }
}

const actions = { login, logout }

export default {
  actions,
  state,
  mutations
}
