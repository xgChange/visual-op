import { RouteConfig } from 'vue-router'
import MyLayout from '../layout/index.vue'

const routes: Array<RouteConfig> = [
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

export default routes
