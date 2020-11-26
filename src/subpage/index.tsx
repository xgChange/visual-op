import { Vue, Component } from 'vue-property-decorator'
import ComponentObj from './plugin/index'
// import { IInput } from './components/input'

@Component
export default class Subpage extends Vue {
  created() {
    window.$subpage = this
  }

  // 渲染某个组件
  renderComponent(type = 'IInput') {
    // const component = ComponentObj[type]
    // return component
  }

  renderChildren() {
    const type = 'IInput'
    const TT = ComponentObj[type]
    // const component = this.renderComponent()
    return <TT></TT>
  }

  renderSubpage() {
    const children = this.renderChildren()
    return <div class="subpage">{children}</div>
  }

  render() {
    return this.renderSubpage()
  }
}
