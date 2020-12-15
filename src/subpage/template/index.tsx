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

  selectedComIndex = -1

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

  /**
   * @description 处理鼠标移动事件
   * @param e Event
   * @param index 索引
   * @param eventName 事件名
   * @param item json中的数据
   */
  mouseEvent(e: Event, index: number, eventName: string, item?: SelectedComData) {
    const target = e.currentTarget
    if (target) {
      const dataIndex = (target as HTMLElement).dataset.index
      if (dataIndex === `${index}`) {
        if (eventName === 'leave') {
          this.selectedComIndex = -1
          return
        }
        this.selectedComIndex = index
        if (item) {
          this.$emit('onSelectedCom', this.getComponentData(item.name))
        }
      }
    }
  }

  render() {
    return (
      <div class={`${prefixClass}-template`}>
        {this.allComponentsData.map((item, index) => (
          <div
            class={{
              [`${prefixClass}-template-${item.name}`]: true,
              [`${prefixClass}-dashBorder`]: this.selectedComIndex === index
            }}
            data-index={index}
            onmouseenter={(e: Event) => this.mouseEvent(e, index, 'enter', item)}
            onmouseleave={(e: Event) => this.mouseEvent(e, index, 'leave')}
          >
            <TemRender {...this.getComponentProps(item)}></TemRender>
          </div>
        ))}
      </div>
    )
  }
}
