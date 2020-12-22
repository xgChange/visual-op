import { Vue, Component } from 'vue-property-decorator'
import ComTemplate from './template/index'
import { SelectedComData, ComItemProps } from '@/subpage/utils/index'
import { ComponentsKeys } from '@/subpage/plugin/index'

interface PostData {
  name: string
  childData: ComItemProps
  eleCoordinate?: any
  [index: string]: any
}

@Component
export default class Subpage extends Vue {
  private $parentEditor = {} as Vue
  private allComponentsData: SelectedComData[] = []
  private hasParentEditor = false // 是否存在 $parentEditor

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
    // 判断是否存在 $parentEditor
    if (this.$parentEditor) {
      ;(this.$parentEditor as any).iframeLoad()
      this.hasParentEditor = true
    } else {
      this.hasParentEditor = false
    }
  }

  onTipsClick(item: ComItemProps) {
    window.parent.postMessage(
      {
        ...item
      },
      '*'
    )
  }

  render() {
    const comProps = {
      props: {
        allComponentsData: this.allComponentsData,
        hasParentEditor: this.hasParentEditor
      },
      on: {
        onTipsClick: this.onTipsClick
      }
    }
    return (
      <div class="subpage">
        <ComTemplate {...comProps}></ComTemplate>
      </div>
    )
  }
}
