import * as types from './mutation-types'
import doAsync from './async-util'
// import axios from 'axios'

import AuthApi from '@/api/Auth'
// import { restElement } from 'babel-types';

export const getAsync1 = (context) => {
  return doAsync(context, {
    url: 'https://jsonplaceholder.typicode.com/posts',
    mutationTypes: types.GET_DATA_ASYNC
  })
}

export const getAsync = (context) => {
  return doAsync(context, {
    url: 'https://jsonplaceholder.typicode.com/posts',
    mutationTypes: types.GET_INFO_ASYNC
  })
}

export const setModalData = ({ commit }, setdata) => {
  console.log(setdata)
  return commit('SET_MODAL_STATE', setdata)
}

export const login = ({ commit }, loginData) => {
  commit('LOGIN')
  return AuthApi.login(loginData).then(result => {
    if (result.data.oprtrFgCd) {
      commit('LOGIN_SUCCESS', result.data)
    } else {
      commit('LOGIN_FAILED', 'Not Found SessionId')
    }
    return result
  }).catch(error => {
    console.log(error)
    commit('LOGIN_FAILED', 'Login Error')
    return error.response
  })
}

export const logout = ({ commit }) => {
  return AuthApi.logout().then(result => {
    commit('LOGOUT')
    return result
  }).catch(error => {
    return error.response
  })
}
