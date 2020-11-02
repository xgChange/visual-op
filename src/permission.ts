/**
 * @description 权限控制路由
 */

import router from './router/index'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import NProgress from 'nprogress'
import { Route, NavigationGuardNext } from 'vue-router'
import { matchRoutePath } from '@/utils/index'

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
          // 动态添加标题
          if (to.meta.title) {
            document.title = to.meta.title
          }
          // 设置activeKeys
          const pathName = matchRoutePath(to.path, PermissionModule.routes).name // 根据to.path去匹配符合的route
          const selectedKeys = []
          // 去适配有二级菜单以上，刷新页面时，菜单不展开
          if (to.path.slice(1).indexOf('/') !== -1) {
            const parentPath = to.path.slice(1).split('/')[0]
            const parentKey = matchRoutePath(parentPath, PermissionModule.routes).name
            selectedKeys.unshift(parentKey)
          }
          selectedKeys.push(pathName)
          PermissionModule.SaveActiveKeys(selectedKeys)

          next({ path: to.path, query: to.query, params: to.params })
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
