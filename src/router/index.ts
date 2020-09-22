import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRoutes } from './routes'

Vue.use(VueRouter)

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes
  })

const router = createRouter()

export default router
