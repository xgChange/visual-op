/**
 * @description 可视化界面路由 有权限(admin)
 */

export default {
  path: '/visual',
  component: () => import('@/views/visual/index.vue'),
  name: 'visual',
  meta: {
    title: '可视化编辑',
    isMenu: true,
    role: ['admin']
  }
}
