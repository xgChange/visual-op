import { Vue, Component } from 'vue-property-decorator'
// import { IInput } from './components/input'

@Component
export default class Subpage extends Vue {
  created() {
    window.$subpage = this
    console.log()
  }

  // 渲染某个组件
  renderComponent(type: string) {
    //
  }

  renderChildren() {
    // return <IInput></IInput>
  }

  renderSubpage() {
    // const children = this.renderChildren()
    return <div class="subpage"></div>
  }

  render() {
    return this.renderSubpage()
  }
}
