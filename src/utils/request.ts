/**
 * @description 封装axios
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UserModule } from '@/store/modules/user'

const httpService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

httpService.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (UserModule.token) {
      config.headers.Authorization = 'Bearer ' + UserModule.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

httpService.interceptors.response.use(
  (res: AxiosResponse) => {
    // const { code } = res.data
    // if (code === 200) {
    //   return res
    // }
    return res
    // 做一些错误处理
  },
  error => {
    return Promise.reject(error)
  }
)

export default httpService
