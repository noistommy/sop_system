import axios from 'axios'

const apiConfig = axios.create({
  baseURL: 'http://172.16.10.202:18080',
  // baseURL: '',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.accessToken}`
  }
})

export default apiConfig
