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
 * @description 处理配置文件中的slots
 */
const generateSlots = function(h: CreateElement, slots: ComSlotsDataItem[]) {
  const scopedSlots = Object.create(null)
  slots.forEach(item => {
    const name = item.name
    const slotInfo = item.info ? item.info : ''

    scopedSlots[name] = function(props: any) {
      const contentCom = item.contentCom
      if (!contentCom || contentCom.length === 0) return slotInfo
      return contentCom.map(content => {
        const childSlot = content.slots ? content.slots : [] // 子节点又有slot
        const slotProps = content.props ? content.props : {}
        const ComName = content.comName
        const events = content.events ? content.events : []
        let propsValue = slotProps.value
        let slotsParams = Object.create(null)
        slotsParams = {
          props: {
            ...slotProps
          },
          on: {}
        }
        // 实现input方法，v-model
        if (hasVModelComponent.includes(ComName)) {
          if (propsValue !== undefined) {
            slotsParams.on.input = function(str: string) {
              propsValue = str
              // console.log('插槽内的input', str, propsValue)
            }
          }
        }
        if (ComName) {
          // 递归 slot
          if (childSlot.length > 0) {
            const childScoped = generateSlots(h, childSlot)
            slotsParams.scopedSlots = childScoped
          }
          slotsParams.on = Object.assign(slotsParams.on, produceEvents(events, ComName))
          return <ComName {...slotsParams}></ComName>
        }
      })
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
    const { data, typeName } = ctx.props.componentData
    const scopedSlots = data && data.slots ? generateSlots(h, data.slots) : {}
    const props = data && data.props ? data.props : {}
    const events = data && data.events ? data.events : []
    let params = Object.create(null)
    params = {
      props: {
        ...props
      },
      scopedSlots,
      on: {}
    }
    // 实现input方法，v-model
    if (hasVModelComponent.includes(typeName)) {
      if (props.value !== undefined) {
        params.on.input = function(str: string) {
          props.value = str
          console.log('父组件input', str)
        }
      }
    }

    params.on = Object.assign(params.on, produceEvents(events, typeName))
    const ComTypeName = typeName
    return <ComTypeName {...params}></ComTypeName>
  }
})
