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
    role: ['admin']
  },
  children: [
    {
      path: 'simple-test',
      component: () => import('@/views/test/index.vue'),
      name: 'testpages',
      meta: {
        title: '测试页面',
        role: ['admin'],
        hidden: true // 是否显示在菜单
      }
    }
  ]
}
