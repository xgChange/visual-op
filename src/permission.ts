/**
 * @description 权限控制路由
 */

import router from './router/index'
import { UserModule } from '@/store/modules/user'
import NProgress from 'nprogress'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (UserModule.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (Object.keys(UserModule.userInfo).length === 0) {
        try {
          await UserModule.getUserInfo()
          next({ path: to.path, replace: true })
        } catch (error) {
          // 获取用户信息失败，重新登录
          next('/login')
        }
      } else {
        // 如果获取了用户信息，则 go on
        next()
      }
    }
  } else {
    // 解决无限递归进入login页面
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
