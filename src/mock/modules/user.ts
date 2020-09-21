/**
 * @description user接口
 */
import { UserInfo } from '@/utils/interface/index'

const user = {
  userName: 'admin',
  password: '123'
}

export const login = (d: { body: string }) => {
  const bodyData: UserInfo = JSON.parse(d.body)
  const { userName, password } = bodyData
  if (userName !== user.userName) {
    return {
      code: 10000,
      msg: '用户名不存在'
    }
  } else if (password !== user.password) {
    return {
      code: 10001,
      msg: '密码不正确'
    }
  } else {
    return {
      code: 200,
      msg: '',
      token: `token${userName}2020`
    }
  }
}
