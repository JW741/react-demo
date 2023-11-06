// axios封装
import axios from 'axios'
import { getToken, clearToken } from './token'
import router from '@/router'
import { message } from 'antd'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前将token携带
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // token失效
    if (error.response.status === 401) {
      clearToken()
      router.navigate('/login')
      window.location.reload()
    
    return Promise.reject(error)
  }
)

export default request
