/**
 * @description vuex的user模块
 */
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '../index'
import { UserInfo } from '@/utils/interface'

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
    console.log(this.userInfo)
  }

  @Action
  async Login(userInfo: UserInfo) {
    // const {userName, password} = userInfo
    this.SET_USERINFO(userInfo)
  }
}

export const UserModule = getModule(User)
