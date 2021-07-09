import { VNode } from 'vue'

import * as tsx from 'vue-tsx-support'

const HelloWorld = tsx.componentFactoryOf().create({
  props: {
    myName: { type: String, required: false, default: 'tt' },
    info: { type: String, required: false },
  },
  data() {
    return {
      count: 1,
    }
  },
  render(): VNode {
    return (
      <div>
        <button
          id="my_btn"
          onClick={() => {
            this.count += 1
          }}
        >
          点击
        </button>
        <span class="span1">{this.count}</span>
        <span>hello world {this.myName}</span>
      </div>
    )
  },
})

export default HelloWorld
