import { RouteConfig } from 'vue-router'
import MyLayout from '../layout/index.vue'
import UserRoute from './module/user'
import TestRoute from './module/test'
import VisualRoute from './module/visual'

// 无权限路由
export const constantRoutes: Array<RouteConfig> = [
  {
    path: '/',
    component: MyLayout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/login/index.vue')
  }
]

// 异步加载路由
export const asyncRoutes: Array<RouteConfig> = [UserRoute, TestRoute, VisualRoute]
