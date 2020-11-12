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
    type: Boolean,
    default: false
  })
  private accordion!: boolean

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
    if (isExpand) {
      if (nameIndex > -1) {
        this.currentValue.splice(nameIndex, 1)
      }
    } else {
      if (nameIndex < 0) {
        this.currentValue.push(activeName)
      }
    }
    this.$emit('input', this.currentValue)
  }

  setActiveKey() {
    this.$children.forEach((child: any) => {
      const name = child.name
      child.isExpand = this.currentValue.includes(name)
    })
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

<style lang="scss" scoped></style>
