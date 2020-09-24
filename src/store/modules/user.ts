/**
 * @description vuex的user模块
 */
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '../index'
import { FormUserInfo, LoginResponseData, UserData } from '@/utils/interface'
import { UserApi } from '@/api/index'
import { message as Message } from 'ant-design-vue'

export interface MyUserState {
  userInfo: UserData
  token: string
}

@Module({ name: 'user', store, dynamic: true, namespaced: true })
class User extends VuexModule implements MyUserState {
  token = (localStorage.getItem('mytoken') as string) || ''
  userInfo = {} as UserData

  @Mutation
  private SET_USERINFO(userInfo: UserData) {
    this.userInfo = userInfo
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Action
  async Login(userInfo: FormUserInfo) {
    try {
      const info = await UserApi.login<LoginResponseData>(userInfo)
      const { token } = info.data.result
      if (token) {
        this.SET_TOKEN(token)
        localStorage.setItem('mytoken', token)
        return true
      }
    } catch (error) {
      Message.error(error.message)
    }
  }

  @Action
  resetToken() {
    this.SET_TOKEN('')
    localStorage.removeItem('mytoken')
  }

  @Action
  async getUserInfo() {
    try {
      const info = await UserApi.getUserInfo<UserData>(this.token)
      this.SET_USERINFO(info.data.result)
      return info.data.result.role
    } catch (error) {
      // 获取用户失败
      Message.error(error.message)
      this.resetToken()
      throw error
    }
  }
}

export const UserModule = getModule(User)
