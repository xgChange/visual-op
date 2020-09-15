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
    key: 'home',
    hasIcon: false,
    content: '首页'
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
        content: '测试子菜单',
        hasIcon: false
      }
    ]
  }
]

export default menuData
