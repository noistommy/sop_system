// import Vue from "vue";
import * as types from '../mutation-types'
import { login, logout } from '../actions'

const state = {
  // accessToken: null,
  userInfo: {
    userId: '',
    userName: '',
    userCode: ''
  }
}

const mutations = {
  [types.LOGIN] (state, patload) {
    console.log(patload, 'Ready to Login')
  },
  [types.LOGIN_SUCCESS] (state, payload) {
    state.userInfo.userId = payload.oprtrId
    state.userInfo.userName = payload.oprtrNm
    state.userInfo.userCode = payload.oprtrFgCd
    localStorage.userInfo = state.userInfo
  },
  [types.LOGIN_FAILED] (state, message) {
    console.log(message)
    state.userInfo = null
    delete localStorage.userInfo
  },
  [types.LOGOUT] (state) {
    state.userInfo = null
    delete localStorage.userInfo
  }
}

const actions = { login, logout }

export default {
  actions,
  state,
  mutations
}
