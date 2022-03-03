import axios from 'axios'
import store from '@/store'
const reuqest = axios.create({
  baseURL: '',
  timeout: 1000
})

// 添加请求拦截器
reuqest.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.bankType = 0
  // 携带token
  if (store.state.user.tokens) {
    config.headers.authorization = store.state.user.tokens.accessToken
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
reuqest.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default reuqest
