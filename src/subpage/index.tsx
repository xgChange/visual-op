import { Vue, Component } from 'vue-property-decorator'
import ComTemplate from './template/index'
import { SelectedComData, ComItemProps } from '@/subpage/utils/index'
import { ComponentsKeys } from '@/subpage/plugin/index'

@Component
export default class Subpage extends Vue {
  private $parentEditor = {} as Vue
  private allComponentsData: SelectedComData[] = []

  created() {
    this.$on('on-message', (id: string, typeName: string) => {
      if (!ComponentsKeys.includes(typeName)) {
        console.log('没有这个组件')
        return
      }
      const obj: SelectedComData = {
        key: typeName,
        name: typeName
      }
      this.allComponentsData.push(obj)
    })
  }

  mounted() {
    window.$subpage = this
    this.$parentEditor = window.parent.$editor
    ;(this.$parentEditor as any).iframeLoad()
  }

  // 通过postmessage，iframe组件向父组件传值
  onSelectedCom(item: ComItemProps) {
    window.parent.postMessage(
      {
        childData: item
      },
      '*'
    )
  }

  render() {
    const comProps = {
      props: {
        allComponentsData: this.allComponentsData
      },
      on: {
        onSelectedCom: this.onSelectedCom
      }
    }
    return (
      <div class="subpage">
        <ComTemplate {...comProps}></ComTemplate>
      </div>
    )
  }
}
