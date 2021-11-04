/**
 * @description 权限控制路由
 */

import router from './router/index'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import NProgress from 'nprogress'
import { Route, NavigationGuardNext } from 'vue-router'

const whiteList = ['/login']

router.beforeEach(async (to: Route, from: Route, next: NavigationGuardNext) => {
  NProgress.start()
  if (UserModule.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (Object.keys(UserModule.userInfo).length === 0) {
        try {
          const role = await UserModule.getUserInfo()
          PermissionModule.GenerateRoutes(role)
          router.addRoutes(PermissionModule.asyncRoutes)
          next({ path: to.path, query: to.query, params: to.params })
        } catch (error) {
          // 获取用户信息失败，重新登录
          next('/login')
        }
      } else {
        // 如果获取了用户信息，则 go on
        next()
      }
      // 动态添加标题
      if (to.meta?.title) {
        document.title = to.meta.title
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
