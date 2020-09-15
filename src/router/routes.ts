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
  }
]

export default routes
