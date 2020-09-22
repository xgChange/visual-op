/**
 * @description vuex的user模块
 */
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '../index'
import { UserInfo, LoginResponseData } from '@/utils/interface'
import { UserApi } from '@/api/index'
import { message as Message } from 'ant-design-vue'

export interface MyUserState {
  userInfo: UserInfo
  token: string
}

@Module({ name: 'user', store, dynamic: true, namespaced: true })
class User extends VuexModule implements MyUserState {
  token = ''
  userInfo = { userName: '', password: '' }

  @Mutation
  private SET_USERINFO(userInfo: UserInfo) {
    this.userInfo = userInfo
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Action
  async Login(userInfo: UserInfo) {
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
  async getUserInfo(token: string) {
    // 处理获取用户信息
  }
}

export const UserModule = getModule(User)
