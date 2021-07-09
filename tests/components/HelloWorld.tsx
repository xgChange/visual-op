import { VNode } from 'vue'

import * as tsx from 'vue-tsx-support'

const HelloWorld = tsx.componentFactoryOf().create({
  props: {
    myName: { type: String, required: false },
    info: { type: String, required: false },
  },
  render(): VNode {
    return <span>hello world {this.myName}</span>
  },
})

export default HelloWorld
