import axios from 'axios'
import BASE_URL from '@/api/config'
import { EventBus } from '@/util'

const apiConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// apiConfig.interceptors.request.use((config) => {
//   EventBus.$emit('before-request')
//   return config
// })
// apiConfig.interceptors.response.use((response) => {
//   EventBus.$emit('after-response')
//   return response
// })

export default apiConfig
