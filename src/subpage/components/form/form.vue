<template>
  <form class="i-form-content" @submit="primarySubmit">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { ModelInterface } from '../../utils/interface'
import { Rules } from 'async-validator'
import IFormItem from './form-item.vue'

@Component
export default class IForm extends Vue {
  @Prop({ type: Object as PropType<ModelInterface> }) model!: ModelInterface
  @Prop({ type: Object as PropType<Rules> }) rules!: Rules
  @Prop({ type: [String, Number], default: 86 }) labelWidth!: string | number

  @Provide() formModel = this

  private childrenDep: IFormItem[] = []

  created() {
    this.$on('on-item-add', (v: IFormItem) => {
      this.childrenDep.push(v)
    })

    this.$on('on-item-remove', (v: IFormItem) => {
      const index = this.childrenDep.indexOf(v)
      this.childrenDep.splice(index, 1)
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

  reset() {
    this.childrenDep.forEach(ch => {
      ch.reset()
    })
  }

  primarySubmit(e: Event) {
    e.preventDefault()
    this.submit().then(res => {
      if (res) {
        this.$emit('onPrimarySubmit', this.model)
      }
    })
  }
}
</script>

<style lang="scss" scoped></style>
