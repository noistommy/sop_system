import * as types from './mutation-types'
import doAsync from './async-util'

import AuthApi from '@/api/Auth'

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
  return AuthApi.login(loginData).then(result => {
    console.log(result)
    commit('LOGIN')
    return result.data
  }).catch(error => {
    console.log(error.response)
    if (error.response.data != null) {
      return error.response.data
    }
  })
}

export const logout = ({ commit }) => {
  return AuthApi.logout().then(result => {
    commit('LOGOUT')
  })
}
