/**
 * @description 可视化界面路由 有权限(admin)
 */
import Layout from '@/layout/index.vue'

export default {
  path: '/visual',
  component: Layout,
  name: 'visualMenu',
  redirect: '/visual',
  meta: {
    title: '可视化编辑',
    role: ['admin'],
    iconType: 'reconciliation',
    hidden: false // 是否显示在菜单
  },
  children: [
    {
      path: '/visual',
      component: () => import('@/views/visual/index.vue'),
      name: 'visualIndex',
      meta: {
        hidden: true,
        title: '可视化编辑'
      }
    }
  ]
}
