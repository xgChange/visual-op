/**
 * @description 递归菜单组件 admin
 */

import Layout from '@/layout/index.vue'

export default {
  path: '/test',
  component: Layout,
  name: 'test',
  meta: {
    title: '测试组件',
    isMenu: true,
    role: ['admin']
  },
  children: [
    {
      path: 'simple-test',
      component: () => import('@/views/test/index.vue'),
      name: 'testpages',
      meta: {
        title: '测试页面',
        isMenu: true,
        role: ['admin']
      }
    }
  ]
}
