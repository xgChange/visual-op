import Vue from 'vue'
import Vuex from 'vuex'
import { MyUserState } from './modules/user'
import { MyPermission } from './modules/permission'

Vue.use(Vuex)

interface MyRootState {
  user: MyUserState
  permission: MyPermission
}

export default new Vuex.Store<MyRootState>({})
