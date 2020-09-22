/**
 * @description user接口
 */
import { FormUserInfo, ResponseData, LoginResponseData } from '@/utils/interface/index'

const user = {
  userName: 'admin',
  password: '123'
}

export const login = (d: { body: string }) => {
  const bodyData: FormUserInfo = JSON.parse(d.body)
  const { userName, password } = bodyData
  let res: ResponseData<LoginResponseData>
  if (userName !== user.userName) {
    res = {
      code: 10000,
      msg: '用户名不存在',
      result: {}
    }
  } else if (password !== user.password) {
    res = {
      code: 10001,
      msg: '密码不正确',
      result: {}
    }
  } else {
    res = {
      code: 200,
      msg: '',
      result: {
        token: `token${userName}2020`
      }
    }
  }
  return res
}

export const getUserInfo = (d: { url: string }) => {
  // const token =
  const url = d.url
  console.log(url)
}
