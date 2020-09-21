/**
 * @description mock 接口
 */

import Mock from 'mockjs'
import { login } from './modules/user'

Mock.setup({
  timeout: '500-1000'
})

Mock.mock('/api/user/login', login)

export default Mock
