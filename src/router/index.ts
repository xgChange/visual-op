import Vue from 'vue'
import VueRouter, { RawLocation } from 'vue-router'
import { constantRoutes } from './routes'

Vue.use(VueRouter)

// 解决重复引用同一个路由的问题，重写push
const _push = VueRouter.prototype.push
VueRouter.prototype.push = function(location: RawLocation) {
  return (_push.call(this, location) as any).catch((err: Error) => err)
}

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes
  })

const router = createRouter()

export default router
