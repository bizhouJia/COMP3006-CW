import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'
import Qs from 'qs'

const service = axios.create({
  baseURL: "http://localhost:3046",
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // Make each request carry a custom token; modify according to actual circumstance
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  }
)

export default service
