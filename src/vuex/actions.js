import * as types from './mutation-types'
import doAsync from './async-util'
// import axios from 'axios'

import AuthApi from '@/api/Auth'
<<<<<<< HEAD
// import { restElement } from 'babel-types';
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e

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
<<<<<<< HEAD
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
=======
  return AuthApi.login(loginData).then(result => {
    commit('LOGIN')
    return result
  }).catch(error => {
    console.log(error)
    return error
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  })
}

export const logout = ({ commit }) => {
  return AuthApi.logout().then(result => {
    commit('LOGOUT')
<<<<<<< HEAD
    return result
  }).catch(error => {
    return error.response
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  })
}
