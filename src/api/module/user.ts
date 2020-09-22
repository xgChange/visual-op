/**
 * @description user 接口
 */

import Axios from '@/utils/request'
import { FormUserInfo, ResponseData } from '@/utils/interface/index'

const login = <T>(data: FormUserInfo) => {
  return Axios.post<ResponseData<T>>('/user/login', data)
}

const getUserInfo = <T>(token: string) => {
  return Axios.get<ResponseData<T>>('/user/getInfo', {
    params: {
      token
    }
  })
}

export default {
  login,
  getUserInfo
}
