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
         iconType: 'bank',
       },
       children: [
         {
           path: '/',
           name: 'Home',
           component: () => import('../views/Home.vue'),
           meta: {
             hidden: true,
           },
         },
       ],
     },
     {
       path: '/login',
       name: '/login',
       meta: {
         title: '登录',
         hidden: true,
       },
       component: () => import('../views/login/index.vue'),
     },
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
       hidden: false, // 是否显示在菜单
     },
   }
   ```

2. 解决 Vue router 报 **NavigationDuplicated**(重复导航到同一路由) 和 **Redirected when going from**错误

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

3. 在 vuex 中新增 permission 模块(可参考 vuex 在 ts 中的写法)

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

4. 新增 src/permission.ts 文件，在里面进行路由拦截控制

   **tips: 如果没有 token，则会跳转到 login 页面，但是进入 login 页面之前又会执行 beforeEach 钩子，造成无限递归。所以最好加一个判断，跳出递归。**

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

5. 至此，根据权限动态加载路由就实现了~ (侧边的菜单栏可以通过 vuex 中的 PermissionModule.routes，递归生成一二三级菜单)

## 布局方面

1. 垂直水平居中

```css
/* 使用 flex margin来实现水平垂直居中 */
.parent {
  display: flex; /*或者 justify-content: center*/
}

.child {
  margin: 0 auto;
}

/* 使用定位来撑起盒子; child盒子设置top和bottom它的高度和parent一样 */
.parent {
  position: relative;
  padding: 16px 0;
}
.child {
  position: absolute;
  top: 0;
  bottom: 0;
}
```

## 关于 vue 中的事件监听($emit、$on、$listeners)

1. Vue 中的$emit、$on 等，使用的是**发布订阅模式**

   `如果在同一个事件名上监听多个事件，则在emit的时候会触发所有监听的事件。`

2. 关于 **$listeners** 的一些注意事项

   > 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

   `只包含了v-on监听器的(@事件名)`

   **所以通过 v-on="$listeners"传下去的事件可以通过后面组件this.$emit 去触发，发布订阅模式(触发所有事件名监听的事件)**

   `例如在 subpage -> i-search -> i-input 三层组件中`

   ```html
   <!-- subpage组件 -->
   <i-search
     v-model="inputValue"
     iconPosition="right"
     placeholder="请输入关键字搜索"
     showAction
     class="nav-bar-content_iSearch"
     @search="handleSearch"
     @cancle="handleCancle"
   ></i-search>
   ```

   ```html
   <!-- i-search组件通过$listners将父作用域与本作用域v-on监听事件传递下去 -->
   <i-input
     type="text"
     v-model="currentValue"
     v-bind="$attrs"
     v-on="$listeners"
     class="i-search-content_left-box_input"
     @enter="handleSearch"
   ></i-input>
   ```

   ```typescript
     /*
       在i-input中，可以通过emit('input')，触发在subpage和i-search中监听的@input事件
     */
     @Emit('input')
     handleInput(e: Event) {
       const value = (e.target as HTMLInputElement).value
       this.currentValue = value
       return value
     }
   ```

3. 关于 **$attrs**

   > 简单点就是包含父作用域中，没有写进 props 里面的 attribute 属性(class 和 style 除外)

   `通常搭配inheritAttrs使用，它的作用主要是子组件没有用props去接收父组件传过来的attribute，不会显示在html标签中`

## 关于搭建 vue test 环境(jest)

1. 基于现在的 vue-cli

```bash
  # @vue/unit-jest
  vue add @vue/unit-jest

  # 之前需要安装, jest、@types/jest、@vue/cli-plugin-unit-jest

  # 可能下载完成后，构建时会报错，看下面.
```

2. 在 tsconfig.json

```json
{
  "types": [
    "jest" // 增加一个jest
  ]
}
```

3. 加 jsdom 支持

```javascript
export default {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'], // test文件的正则
}
```

4. case

```javascript
import { mount } from '@vue/test-utils'
import HelloWorld from '../components/HelloWorld'

describe('hello world', () => {
  const wrapper = mount(HelloWorld)

  it('test', () => {
    expect(wrapper.html()).toContain('<span>hello world </span>')
  })
})
```

## 增加
