/**
 * @description user 接口
 */

import Axios from '@/utils/request'
import { UserInfo, ResponseData } from '@/utils/interface/index'

const login = <T>(data: UserInfo) => {
  return Axios.post<ResponseData<T>>('/user/login', data)
}

export default {
  login
}
