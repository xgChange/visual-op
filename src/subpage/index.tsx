import { Vue, Component } from 'vue-property-decorator'
import ComTemplate from './template/index'
import { SelectedComData } from '@/subpage/utils/index'
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

  render() {
    const comProps = {
      props: {
        allComponentsData: this.allComponentsData
      }
    }
    return (
      <div class="subpage">
        <ComTemplate {...comProps}></ComTemplate>
      </div>
    )
  }
}
