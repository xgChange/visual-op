import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

export default routes
