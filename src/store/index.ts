import Vue from 'vue'
import Vuex from 'vuex'
import { MyUserState } from './modules/user'

Vue.use(Vuex)

interface MyRootState {
  user: MyUserState
}

export default new Vuex.Store<MyRootState>({})
