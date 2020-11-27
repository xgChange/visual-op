/**
 * @description render functional
 */
import Vue, { CreateElement, RenderContext } from 'vue'
import { ComItemProps } from '../utils/index'

interface FuncProp {
  componentData: ComItemProps
}

export default Vue.extend({
  functional: true,
  props: {
    componentData: {
      type: Object
    }
  },
  render: (h: CreateElement, ctx: RenderContext<FuncProp>) => {
    console.log('ddd', ctx.props.componentData)
    const params = {
      props: {
        componentData: ctx.props.componentData
      }
    }
    return h(ctx.props.componentData.typeName, params)
  }
})
