import Vue from 'vue'
import VueRouter, { RawLocation, Route } from 'vue-router'
import { constantRoutes } from './routes'

Vue.use(VueRouter)

// 解决使用call无法定位正确的类型，由于原声明文件中使用了函数重载，所以重写VueRouter类型
interface MyRouter extends VueRouter {
  push(location: RawLocation): Promise<Route>
}

// 解决重复引用同一个路由的问题，重写push
const _push = (VueRouter.prototype as MyRouter).push
VueRouter.prototype.push = function(location: RawLocation) {
  return _push.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router
