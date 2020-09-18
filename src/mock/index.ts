/**
 * @description mock 接口
 */

import Mock from 'mockjs'

Mock.setup({
  timeout: '500-1000'
})

Mock.mock('/api/user/login', () => {
  return 'fffasdasd'
})

export default Mock
