<template>
  <div class="i-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { CollapseActive } from '@/utils/interface/index'

@Component
export default class ICollapse extends Vue {
  @Prop({
    type: Array,
    default: () => {
      return []
    }
  })
  private value!: string[]

  @Prop({
    type: [Boolean, String],
    default: false
  })
  private accordion!: boolean | string

  private currentValue = this.value

  mounted() {
    this.setActiveKey()
  }

  /**
   * @description 子组件的click回传的函数
   * 主要用来判断子组件的isExpand,动态删减this.currentValue的内容
   * 达到切换isExpand的效果
   */
  toggle(val: CollapseActive) {
    const { isExpand, activeName } = val
    const nameIndex = this.currentValue.indexOf(activeName)
    const newActiveName = []
    // 是否开启手风琴，默认只展开一个一个tab
    if (this.accordion) {
      if (!isExpand) {
        newActiveName.push(activeName)
      }
      this.currentValue = newActiveName
    } else {
      if (isExpand) {
        if (nameIndex > -1) {
          this.currentValue.splice(nameIndex, 1)
        }
      } else {
        if (nameIndex < 0) {
          this.currentValue.push(activeName)
        }
      }
    }

    this.$emit('input', this.currentValue)
  }

  setActiveKey() {
    const newActiveName = this.getActiveKey()
    this.$children.forEach((child: any) => {
      const name = child.name
      child.isExpand = newActiveName.includes(name)
    })
  }

  getActiveKey() {
    let newActiveName = this.currentValue
    if (this.accordion && this.currentValue.length > 1) {
      newActiveName = [newActiveName[0]]
    }
    return newActiveName
  }

  @Watch('value')
  onWatchValue(v: string[]) {
    this.currentValue = v
  }

  @Watch('currentValue')
  onWatchCurrentVal() {
    this.setActiveKey()
  }
}
</script>

<style lang="scss" scoped>
.i-collapse {
  height: 100%;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 4px;
  background-color: gray;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(240, 240, 240, 0.6);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: gray;
}
</style>
