/**
 * @description 加载tips组件
 */

import Tips from './index.vue'
import Vue from 'vue'
interface TipsProp {
  text: string
  xyObj: {
    x: number
    y: number
  }
}

let instance = Object.create(null)

// 判断对象是否为空
function hasObjectNull(obj: any) {
  return Object.keys(obj).length === 0
}

// 将tips实例挂载到body上
function newInstance(options: TipsProp, event: any) {
  const instance = new Vue({
    render: h => {
      return h(Tips, {
        props: {
          ...options
        },
        on: {
          ...event
        }
      })
    }
  })

  const component = instance.$mount()
  document.body.appendChild(component.$el)
  const tips = instance.$children[0]
  return {
    add() {
      ;(tips as any).add()
      return tips
    },
    close() {
      ;(tips as any).close()
    }
  }
}

// 创建实例
function createTips(option: TipsProp, event: any) {
  instance = newInstance(option, event)
  return instance.add()
}

export default {
  open(option: TipsProp, event: any) {
    return createTips(option, event)
  },

  close() {
    if (!hasObjectNull(instance)) {
      instance.close()
    }
  }
}
