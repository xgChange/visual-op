/**
 * @description 公共的接口信息
 */

export interface FormUserInfo {
  userName: string
  password: string
}

export interface LoginResponseData {
  token: string
}

export interface UserData {
  userName: string
  nickName: string
  age: number
  role: string
}

export interface ResponseData<T> {
  code: number
  msg: string
  result: T
}
