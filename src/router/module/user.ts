/**
 * @description 异步加载 用户路由 (修改用户密码), 不在菜单
 */

import Layout from '@/layout/index.vue'

export default {
  path: '/user',
  component: Layout,
  name: 'userMenu',
  meta: {
    title: '用户管理',
    role: ['normal', 'admin'],
    hidden: false // 是否显示在菜单
  },
  children: [
    {
      path: 'normal',
      component: () => import('@/views/user/index.vue'),
      name: 'userNormal',
      meta: {
        title: 'normal的页面',
        role: ['normal']
      }
    },
    {
      path: 'admin',
      component: () => import('@/views/user/index.vue'),
      name: 'userAdmin',
      meta: {
        title: 'admin的页面',
        role: ['admin']
      }
    },
    {
      path: 'all',
      component: () => import('@/views/user/index.vue'),
      name: 'userAll',
      meta: {
        title: 'All的页面'
      }
    }
  ]
}
