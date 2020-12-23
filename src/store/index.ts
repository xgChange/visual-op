import Vue from 'vue'
import Vuex from 'vuex'
import { MyUserState } from './modules/user'
import { MyPermission } from './modules/permission'
import { MyTemplate } from './modules/template'

Vue.use(Vuex)

interface MyRootState {
  user: MyUserState
  permission: MyPermission
  template: MyTemplate
}

export default new Vuex.Store<MyRootState>({})
