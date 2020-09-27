/**
 * @description user接口
 */
import { FormUserInfo, ResponseData, LoginResponseData, UserData } from '@/utils/interface/index'
import { paramsToObj } from '@/utils/index'

const userTable = [
  {
    userName: 'admin',
    password: '123',
    nickName: '小池',
    age: 22
  },
  {
    userName: 'dy',
    password: '123',
    nickName: '小段',
    age: 22
  }
]

export const login = (d: { body: string }) => {
  const bodyData: FormUserInfo = JSON.parse(d.body)
  const { userName, password } = bodyData
  let res: ResponseData<LoginResponseData>
  const result = {} as LoginResponseData
  if (userTable.every(item => item.userName !== userName)) {
    res = {
      code: 10000,
      msg: '用户名不存在',
      result
    }
  } else if (userTable.some(item => item.userName === userName && item.password !== password)) {
    res = {
      code: 10001,
      msg: '密码不正确',
      result
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
  const url = d.url
  const parmasObj = paramsToObj(url)
  const token = parmasObj.token
  let res: ResponseData<UserData>
  if (token.includes('admin')) {
    res = {
      code: 200,
      msg: '',
      result: {
        userName: userTable[0].userName,
        nickName: userTable[0].nickName,
        age: userTable[0].age,
        role: 'admin'
      }
    }
  } else if (token.includes('dy')) {
    res = {
      code: 200,
      msg: '',
      result: {
        userName: userTable[1].userName,
        nickName: userTable[1].nickName,
        age: userTable[1].age,
        role: 'normal'
      }
    }
  } else {
    const result = {} as UserData
    res = {
      code: 10002,
      msg: '该用户不存在，获取信息失败',
      result
    }
  }
  return res
}
