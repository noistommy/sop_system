import * as types from './mutation-types'
import doAsync from './async-util'

// import { TestApi } from '@/api/Test'

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

// export const getAsync = async (context) => {
//   context.commit(types.GET_INFO_ASYNC.BASE, { type: types.GET_INFO_ASYNC.PENDING, value: true })
//   try {
//     const response = await TestApi.getData()
//     console.log(response)
//     context.commit(types.GET_INFO_ASYNC.BASE, { type: types.GET_INFO_ASYNC.SUCCESS, response: response, statusCode: response.status })
//     context.commit(types.GET_INFO_ASYNC.BASE, { type: types.GET_INFO_ASYNC.PENDING, value: false })

//   } catch (error) {
//     context.commit(types.GET_INFO_ASYNC.BASE, { type: types.GET_INFO_ASYNC.PENDING, value: false })

//     console.log(error)
//   }
// }
