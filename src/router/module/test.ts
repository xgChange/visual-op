/**
 * @description 递归菜单组件 admin
 */

export default {
  path: '/test',
  name: 'testMenu',
  component: () => import('@/test/index.vue'),
  meta: {
    title: '测试组件',
    role: ['normal'],
    hidden: true
  },
  children: [
    {
      path: 'simple-test2',
      component: () => import('@/test/components/collapse.vue'),
      name: 'testSimple2',
      meta: {
        title: 'collapse',
        role: ['normal'],
        hidden: true // 是否显示在菜单
      }
    }
  ]
}
