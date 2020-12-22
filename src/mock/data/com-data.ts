/**
 * @description 组件props数据
 */
export const comPropsData = [
  {
    name: 'IButton',
    props: [
      {
        enName: 'type',
        cnName: '按钮颜色',
        value: ['primary', 'default', 'info', 'warning', 'danger'],
        comType: 'radio'
      },
      {
        enName: 'size',
        cnName: '按钮大小',
        value: ['large', 'small', 'mini', 'normal'],
        comType: 'radio'
      },
      {
        enName: 'content',
        cnName: '按钮内文字',
        value: '按钮',
        comType: 'input'
      },
      {
        enName: 'color',
        cnName: '自定义按钮颜色',
        value: '',
        comType: 'palette'
      }
    ]
  },
  {
    name: 'IInput',
    props: [
      {
        enName: 'value',
        cnName: '输入框内的值',
        value: '',
        comType: 'input'
      },
      {
        enName: 'placeholder',
        cnName: '输入框占位',
        value: '请输入文字',
        comType: 'input'
      },
      {
        enName: 'type',
        cnName: '类型',
        value: ['text', 'password', 'number'],
        comType: 'radio'
      }
    ]
  }
]
