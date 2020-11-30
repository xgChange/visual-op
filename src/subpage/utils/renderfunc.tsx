/**
 * @description render functional
 */
import Vue, { CreateElement, RenderContext } from 'vue'
import { ComItemProps, ComSlotsDataItem } from '../utils/index'
import { hasVModelComponent } from '../utils/constance'

interface FuncProp {
  componentData: ComItemProps
}

const produceSlotData = function(h: CreateElement, slots: ComSlotsDataItem[]) {
  if (!slots) return {}
  const scopedSlots = Object.create(null)
  slots.forEach((item: ComSlotsDataItem) => {
    if (item.name) {
      scopedSlots[item.name] = function() {
        console.log(item.content.props)
        let value = item.content.props.value
        return h(item.content.comName, {
          props: {
            ...item.content.props
          },
          on: {
            input: (str: string) => {
              if (hasVModelComponent.includes(item.content.comName)) {
                if (value !== undefined) {
                  value = str
                }
              }
            }
          }
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
    let scopedSlots = {}
    if (data) {
      scopedSlots = produceSlotData(h, data.slots)
    }
    const params = {
      props: {
        ...data
      },
      on: {
        input: function(str: string) {
          if (hasVModelComponent.includes(typeName)) {
            if (data) {
              data.value = str
              console.log(data.value)
            }
          }
        }
      },
      scopedSlots: scopedSlots
    }

    const ComTypeName = typeName
    return <ComTypeName {...params}></ComTypeName>
  }
})
