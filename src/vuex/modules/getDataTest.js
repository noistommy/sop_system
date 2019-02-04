import Vue from 'vue'
import * as types from '../mutation-types'
import { getAsync, getAsync1 } from '../actions'

const state = {
  tester: 'tester'
}

const mutations = {}

Object.keys(types).forEach(type => {
  mutations[types[type].BASE] = (state, payload) => {
    switch (payload.state) {
      case types[type].PENDING:
        return Vue.set(state, types[type].loadingKey, payload.value)

      case types[type].SUCCESS:
        console.log(payload, state)
        Vue.set(state, types[type].statusCode, payload.statusCode)
        return Vue.set(state, types[type].stateKey, payload.data)

      case types[type].FAILURE:
        return Vue.set(state, types[type].statusCode, payload.statusCode)
    }
  }
})

const actions = { getAsync, getAsync1 }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
