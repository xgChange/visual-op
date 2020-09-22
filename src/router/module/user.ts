/**
 * @description 异步加载 用户路由 (修改用户密码), 不在菜单
 */

import Layout from '@/layout/index.vue'

export default {
  path: '/user',
  component: Layout,
  name: 'user',
  meta: {
    isMenu: false,
    role: ['normal', 'admin']
  },
  children: [
    {
      path: 'update',
      component: () => import('@/views/user/index.vue'),
      name: 'userUpdate',
      meta: {
        title: '修改密码',
        isMenu: false,
        role: ['normal', 'admin']
      }
    }
  ]
}
