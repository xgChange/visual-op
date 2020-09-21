/**
 * @description vuex的user模块
 */
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '../index'
import { UserInfo } from '@/utils/interface'
import { UserApi } from '@/api/index'

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
    // const {userName, password} = userInfo
    const info = await UserApi.login(userInfo)
    console.log('登录返回的', info)
    // this.SET_USERINFO(userInfo)
  }

  @Action
  async getUserInfo(token: string) {
    // 处理获取用户信息
  }
}

export const UserModule = getModule(User)
