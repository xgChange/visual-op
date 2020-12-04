/**
 * @description render functional
 */
import Vue, { CreateElement, RenderContext } from 'vue'
import { ComItemProps, ComSlotsDataItem } from '../utils/index'
import { hasVModelComponent } from '../utils/constance'

interface FuncProp {
  componentData: ComItemProps
}

/**
 * @description 处理配置文件中的事件
 */
const produceEvents = function(events: string[], typeName: string) {
  const paramsOn = Object.create(null)
  events.forEach((item: string) => {
    paramsOn[item] = function(str: string) {
      console.log(`测试事件-${typeName}`, str)
    }
  })
  return paramsOn
}

/**
 * @description 处理配置文件中的slots项
 */
const produceSlotData = function(h: CreateElement, slots: ComSlotsDataItem[]) {
  if (!slots) return {}
  const scopedSlots = Object.create(null)
  slots.forEach((item: ComSlotsDataItem) => {
    if (item.name) {
      scopedSlots[item.name] = function() {
        let value = item.contentCom?.props.value
        const typeName = item.name ? item.name : ''
        const events = item.contentCom?.events ? item.contentCom?.events : []
        let params = Object.create(null)
        params = {
          props: {
            ...item.contentCom?.props
          },
          on: {
            input: (str: string) => {
              console.log('插槽内的input', str)
              if (item.contentCom && hasVModelComponent.includes(item.contentCom.comName)) {
                if (value !== undefined) {
                  value = str
                }
              }
            }
          }
        }
        params.on = Object.assign(params.on, produceEvents(events, typeName))
        return h(item.contentCom?.comName, {
          ...params
        })
      }
    }
  })
  return scopedSlots
}

export default Vue.extend({
  functional: true,
  props: {
    componentData: {
      type: Object
    }
  },
  render: (h: CreateElement, ctx: RenderContext<FuncProp>) => {
    console.log('ddd', ctx.props.componentData, ctx)
    const { data, typeName } = ctx.props.componentData
    const scopedSlots = data && data.slots ? produceSlotData(h, data.slots) : {}
    const props = data && data.props ? data.props : {}
    const events = data && data.events ? data.events : []

    const params = {
      props: {
        ...props
      },
      on: {
        input: function(str: string) {
          if (hasVModelComponent.includes(typeName)) {
            if (data) {
              data.value = str
              console.log('组件内的input', data.value)
            }
          }
        }
      },
      scopedSlots: scopedSlots
    }
    params.on = Object.assign(params.on, produceEvents(events, typeName))
    const ComTypeName = typeName
    return <ComTypeName {...params}></ComTypeName>
  }
})
