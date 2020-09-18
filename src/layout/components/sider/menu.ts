/**
 * @description 菜单项
 */

interface MenuItem {
  id: number
  key: string
  hasIcon: boolean
  content: string
  iconType?: string
  childrens?: MenuItem[]
}

const menuData: MenuItem[] = [
  {
    id: 1,
    key: '/',
    hasIcon: true,
    content: '首页',
    iconType: 'bank'
  },
  {
    id: 2,
    key: 'visualization',
    hasIcon: true,
    iconType: 'reconciliation',
    content: '可视化编辑'
  },
  {
    id: 3,
    key: 'testMenu',
    hasIcon: true,
    iconType: 'code-sandbox',
    content: '测试菜单',
    childrens: [
      {
        id: 4,
        key: 'testMenu-sub-1',
        content: '测试递归子菜单',
        hasIcon: false,
        childrens: [
          {
            id: 5,
            key: 'testMenu-sub-2',
            content: '测试递归子子菜单',
            hasIcon: false
          }
        ]
      }
    ]
  }
]

export { menuData, MenuItem }
