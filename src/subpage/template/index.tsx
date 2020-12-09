/**
 * 1. 循环数组应该是 循环 json里面的componentData
 */
import { Vue, Component, Prop } from 'vue-property-decorator'
import TemRender from '@/subpage/utils/renderfunc.tsx'
import { SelectedComData, ComJsonData, ComItemProps } from '../utils/index'
import { PropType } from 'vue'
import componentJsonData from './index.json'
import { PropValidator } from 'vue/types/options'
import './index.scss'

const prefixClass = 'subpage'

@Component
export default class ComTemplate extends Vue {
  @Prop({ type: Array as PropType<SelectedComData[]> }) allComponentsData!: SelectedComData[]

  hasDashBorder = false

  // 从json找组件的data
  getComponentData(name: string) {
    const jsonData: ComJsonData = JSON.parse(JSON.stringify(componentJsonData))
    let componentData = jsonData.componentsData.find(item => item.typeName === name)
    if (!componentData) {
      componentData = {
        typeName: name
      }
    }
    return componentData
  }

  // 分配组件的prop
  getComponentProps(item: SelectedComData) {
    let componentData = this.getComponentData(item.name)
    componentData = componentData ? componentData : ({} as ComItemProps)
    return {
      props: {
        componentData: componentData as PropValidator<any>
      }
    }
  }

  mouseEvent(e: Event, flag: boolean) {
    const target = e.currentTarget
    if (target) {
      this.hasDashBorder = flag
    }
  }

  render() {
    return (
      <div class={`${prefixClass}-template`}>
        {this.allComponentsData.map(item => (
          <div
            class={{
              [`${prefixClass}-template-${item.name}`]: true,
              [`${prefixClass}-dashBorder`]: this.hasDashBorder
            }}
            onmouseenter={(e: Event) => this.mouseEvent(e, true)}
            onmouseleave={(e: Event) => this.mouseEvent(e, false)}
          >
            <TemRender {...this.getComponentProps(item)}></TemRender>
          </div>
        ))}
      </div>
    )
  }
}
