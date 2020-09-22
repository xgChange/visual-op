/**
 * @description mock 接口
 */

import Mock from 'mockjs'
import { login, getUserInfo } from './modules/user'

Mock.setup({
  timeout: '500-1000'
})

Mock.mock('/api/user/login', login)
Mock.mock(RegExp('/api/user/getInfo'), 'get', getUserInfo)

export default Mock
