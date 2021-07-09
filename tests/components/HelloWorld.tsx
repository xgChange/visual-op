import { PropType, VNode } from 'vue'

import * as tsx from 'vue-tsx-support'

const HelloWorld = tsx.componentFactoryOf().create({
  props: {
    myName: { type: String as PropType<'t1' | 't2'>, required: false, default: 'tt' },
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
        <span>hello world {this.myName}</span>
      </div>
    )
  },
})

export default HelloWorld
