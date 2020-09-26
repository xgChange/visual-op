/**
 * @description 异步加载 用户路由 (修改用户密码), 不在菜单
 */

import Layout from '@/layout/index.vue'

export default {
  path: '/user',
  component: Layout,
  name: '/user',
  meta: {
    role: ['normal', 'admin'],
    hidden: true // 是否显示在菜单
  },
  children: [
    {
      path: 'normal',
      component: () => import('@/views/user/index.vue'),
      name: '/user/normal',
      meta: {
        title: 'normal的页面',
        role: ['normal']
      }
    },
    {
      path: 'admin',
      component: () => import('@/views/user/index.vue'),
      name: '/user/admin',
      meta: {
        title: 'admin的页面',
        role: ['admin']
      }
    },
    {
      path: 'all',
      component: () => import('@/views/user/index.vue'),
      name: '/user/all',
      meta: {
        title: 'All的页面'
      }
    }
  ]
}
