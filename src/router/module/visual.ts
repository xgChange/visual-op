/**
 * @description 可视化界面路由 有权限(admin)
 */

export default {
  path: '/visual',
  component: () => import('@/views/visual/index.vue'),
  name: '/visual',
  meta: {
    title: '可视化编辑',
    role: ['admin'],
    iconType: 'reconciliation',
    hidden: false // 是否显示在菜单
  }
}
