/**
 * @description user 接口
 */

import Axios from '@/utils/request'
import { UserInfo } from '@/utils/interface/index'

const login = (data: UserInfo) => {
  return Axios({
    url: '/user/login',
    method: 'post',
    data
  })
}

export default {
  login
}
