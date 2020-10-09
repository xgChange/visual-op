# 一些笔记记录

## 环境配置

```javascript
  // 各个环境配置项的权重大小
  .env.[mode].local > .env.[mode] > .env.local > .env
```

## 动态加载路由，实现路由权限控制

1. 将路由分为 **动态路由** 和 **固定路由**

    `固定路由：是一些不随用户权限改变的路由，比如/login、/register、/404等`

    `动态路由：跟随用户权限改变的路由`

    参数说明：
    ```javascript
      {
        name: '/',  // 因为我后面生成侧边栏时，要用到 :key="name", 而通过菜单的点击事件，正好可以获取 name， 然后进行跳转
        meta: {
          hidden: false, // 是否在菜单栏中显示该路由
          iconType: ''  // 菜单项的icon
        }
      }
    ```

    ```javascript
      // src/router/routes.ts

      // 无权限路由，固定路由
      import UserRoute from './module/user'
      import TestRoute from './module/test'
      import VisualRoute from './module/visual'
    
      export const constantRoutes: Array<RouteConfig> = [
        {
          path: '/',
          component: MyLayout,
          name: '/',
          redirect: '/',
          meta: {
            title: '首页',
            hidden: false,
            iconType: 'bank'
          },
          children: [
            {
              path: '/',
              name: 'Home',
              component: () => import('../views/Home.vue'),
              meta: {
                hidden: true
              }
            }
          ]
        },
        {
          path: '/login',
          name: '/login',
          meta: {
            title: '登录',
            hidden: true
          },
          component: () => import('../views/login/index.vue')
        }
      ]
    
      export const asyncRoutes: Array<RouteConfig> = [UserRoute, TestRoute, VisualRoute]
    ```

    ```javascript      
      // src/router/module/visual.vue 中
      export default {
        path: '/visual',
        component: () => import('@/views/visual/index.vue'),
        name: '/visual',
        meta: {
          title: '可视化编辑',
          role: ['admin'],
          iconType: 'reconciliation',
          hidden: false // 是否显示在菜单
        }
      }
    ```

2. 解决Vue router 报 **NavigationDuplicated**(重复导航到同一路由) 和 **Redirected when going from**错误

    `这是因为在vue router升级到3.1之后，$router.push()方法改成了Promise，所以需要catch push方法产生的错误`

    ```javascript
      // src/router/index.ts 中
      import Vue from 'vue'
      import VueRouter, { RawLocation } from 'vue-router'
      import { constantRoutes } from './routes'

      Vue.use(VueRouter)

      // 解决重复引用同一个路由的问题，重写push
      const _push = VueRouter.prototype.push
      VueRouter.prototype.push = function(location: RawLocation) {
        return (_push.call(this, location) as any).catch((err: Error) => err)
      }

      const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: constantRoutes
      })

      export default router
    ```

3. 在vuex中新增permission模块(可参考vuex在ts中的写法)

    ```javascript
      // src/store/modules/permission.ts
      
      // @description 判断是否有权限，设置meta.role
      function hasPermission(route: RouteConfig, role: string) {
        if (route.meta && route.meta.role && route.meta.role.length) {
          // 返回是否有 用户对应的权限
          return route.meta.role.includes(role)
        } else {
          // 如果没有设置则为公用
          return true
        }
      }

      // @description 过滤在route.ts中设置的asyncRoutes
      function filterAsyncRoutes(routes: RouteConfig[], role: string) {
        const res: RouteConfig[] = []
        routes.forEach(item => {
          if (hasPermission(item, role)) {
            if (item.children) {
              item.children = filterAsyncRoutes(item.children, role)
            }
            res.push(item)
          }
        })

        return res
      }
      
      @Mutation
      SET_ROUTES(routes: RouteConfig[]) {
        this.routes = constantRoutes.concat(routes)
        this.asyncRoutes = routes
      }

      @Action
      GenerateRoutes(role: string) {
        // 如果是admin，则拿到全部的路由
        let tempRoutes = []
        if (role === 'admin') {
          tempRoutes = asyncRoutes
        } else {
          tempRoutes = filterAsyncRoutes(asyncRoutes, role)
        }
        this.SET_ROUTES(tempRoutes)
      }
    ```

4. 新增src/permission.ts 文件，在里面进行路由拦截控制

    **tips: 如果没有token，则会跳转到login页面，但是进入login页面之前又会执行beforeEach钩子，造成无限递归。所以最好加一个判断，跳出递归。**

    ```javascript
      import router from './router/index'
      import { UserModule } from '@/store/modules/user'
      import { PermissionModule } from '@/store/modules/permission'
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
                const role = await UserModule.getUserInfo()
                PermissionModule.GenerateRoutes(role)
                
                // 通过router的addRoutes方法可以实现动态加载路由
                router.addRoutes(PermissionModule.asyncRoutes)
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
    ```

5. 至此，根据权限动态加载路由就实现了~ (侧边的菜单栏可以通过vuex中的 PermissionModule.routes，递归生成一二三级菜单)