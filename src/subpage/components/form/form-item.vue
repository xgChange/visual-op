<template>
  <div class="i-form-item-content">
    <div class="i-form-item-label" :style="labelStyle" v-if="label">{{ label }}</div>
    <div class="i-form-item-slot">
      <slot></slot>
      <div class="i-form-item-slot_error" v-if="validateStatus === 'error'">{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import AValidator, { ErrorList, Rules } from 'async-validator'
import { Component, Prop, Inject, Mixins } from 'vue-property-decorator'
import EmitterMixins from '@/mixins/emitter'
import { ObjectPropStr, MyRulesItem, FormModelInter, pxToRem } from '../../utils/index'

@Component
export default class IFormItem extends Mixins(EmitterMixins) {
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) prop!: string

  @Inject('formModel') private formModel!: FormModelInter

  private validateStatus = 'success'
  private errorMsg = ''
  private initData = ''

  mounted() {
    this.dispatch('IForm', 'on-item-add', this)
    this.initData = this.fieldVal
    this.setRules()
  }

  get labelStyle() {
    return {
      width: `${pxToRem(this.formModel.labelWidth)}rem`
    }
  }

  get fieldVal() {
    return this.formModel.model[this.prop]
  }

  set fieldVal(v) {
    this.formModel.model[this.prop] = v
  }

  setRules() {
    this.$on('on-blur', () => {
      this.validate('blur')
    })

    this.$on('on-change', () => {
      console.log(this.formModel.model)
      this.validate('change')
    })
  }

  getRules() {
    const allRules = this.formModel.rules
    const rules = allRules ? allRules[this.prop] : []
    return Array.isArray(rules) ? rules : [rules]
  }

  getFieldRules(trigger: string) {
    const allRules = this.getRules()
    return trigger
      ? allRules.filter(rule => (rule as MyRulesItem).trigger && (rule as MyRulesItem).trigger === trigger)
      : allRules
  }

  validate(trigger: string, callback: CallableFunction = new Function()) {
    const descriptor = {} as Rules
    const model = {} as ObjectPropStr
    const fieldRules = this.getFieldRules(trigger)
    if (fieldRules.length === 0) return

    this.$nextTick(() => {
      descriptor[this.prop] = fieldRules
      model[this.prop] = this.fieldVal
      const validator = new AValidator(descriptor)
      validator.validate(model, {}, (err: ErrorList) => {
        this.validateStatus = err ? 'error' : 'success'
        this.errorMsg = err ? err[0].message : ''
        callback(this.errorMsg)
      })
    })
  }

  reset() {
    this.validateStatus = ''
    this.errorMsg = ''
    this.fieldVal = this.initData
  }

  beforeDestroy() {
    this.dispatch('IForm', 'on-item-remove', this)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';
input {
  &::placeholder {
    font-size: rem(13);
    color: #c8c9ce;
  }
  font-size: 14px;
  color: #323233;
}
.i-form-item-content {
  display: flex;
  background: white;
  padding: 10px 0 10px 16px;
  position: relative;
  user-select: none;
  &::after {
    content: '';
    height: 0.5px;
    border-bottom: 1px solid #ebedf0;
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
  }
  .i-form-item-label {
    width: rem(86);
    font-size: 14px;
    line-height: 25px;
    color: #646566;
  }
  .i-form-item-slot {
    flex: 1;
    display: flex;
    flex-direction: column;
    &_error {
      font-size: 12px;
      color: #ee0a24;
      line-height: 22px;
    }
  }
}
</style>
