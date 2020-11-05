/**
 * @description 关于可视化编辑界面的一些假数据
 */

interface Content {
  id: number
  iconName: string
  text: string
}

interface Utils {
  id: number
  title: string
  content: Content[]
}

export const utilsData: Utils[] = [
  {
    id: 10001,
    title: '常用',
    content: [
      {
        id: 1001,
        iconName: 'navbar',
        text: '导航栏'
      },
      {
        id: 1002,
        iconName: 'tabbar',
        text: '底部栏'
      },
      {
        id: 1003,
        iconName: 'swiper',
        text: '轮播图'
      }
    ]
  },
  {
    id: 10002,
    title: '基础',
    content: [
      {
        id: 1004,
        iconName: 'text',
        text: '文本'
      },
      {
        id: 1005,
        iconName: 'image',
        text: '图片'
      },
      {
        id: 1006,
        iconName: 'button',
        text: '按钮'
      },
      {
        id: 1007,
        iconName: 'input',
        text: '输入框'
      },
      {
        id: 1008,
        iconName: 'form',
        text: '表单'
      }
    ]
  }
]
