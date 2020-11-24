<template>
  <form class="i-form-content">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { ModelInterface, Rules } from '../../utils/interface'
import IFormItem from './form-item.vue'

@Component
export default class IForm extends Vue {
  @Prop({ type: Object as PropType<ModelInterface> }) model!: ModelInterface
  @Prop({ type: Object as PropType<Rules> }) rules!: Rules

  @Provide() formModel = this

  private childrenDep: IFormItem[] = []

  created() {
    this.$on('on-item-add', (v: IFormItem) => {
      this.childrenDep.push(v)
    })
  }

  submit(callback: CallableFunction = new Function()) {
    return new Promise((resolve, reject) => {
      let count = 0
      let flag = true
      this.childrenDep.forEach(ch => {
        ch.validate('', (errMsg: string) => {
          if (errMsg) {
            flag = false
          }
          if (++count === this.childrenDep.length) {
            resolve(flag)
            callback(flag)
          }
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped></style>
