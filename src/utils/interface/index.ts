/**
 * @description 公共的接口信息
 */

export interface UserInfo {
  userName: string
  nickName?: string
  password: string
}

export interface LoginResponseData {
  token?: string
}

export interface ResponseData<T> {
  code: number
  msg: string
  result: T
}
