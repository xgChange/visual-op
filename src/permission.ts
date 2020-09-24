/**
 * @description 权限控制路由
 */

import router from './router/index'
import { UserModule } from '@/store/modules/user'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  console.log(UserModule.token)
  if (UserModule.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (Object.keys(UserModule.userInfo).length === 0) {
        try {
          await UserModule.getUserInfo()
          next({ path: to.path, replace: true })
          // next()
        } catch (error) {
          // 获取用户信息失败，重新登录
          next('/login')
        }
      } else {
        next()
      }
    }
  } else {
    // 解决无线递归进入login页面
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
