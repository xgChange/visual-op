/**
 * @description 权限控制路由
 */

import router from './router/index'
import { UserModule } from '@/store/modules/user'

router.beforeEach((to, from, next) => {
  if (UserModule.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 如果没有userInfo
      if (Object.keys(UserModule.userInfo).length === 0) {
        UserModule.getUserInfo().then(res => {
          //
        })
      }
    }
  } else {
    next('/login')
  }
})
