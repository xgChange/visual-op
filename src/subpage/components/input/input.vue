<template>
  <input
    class="i-input-content"
    :type="type"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
    @keyup.enter="handleEnter"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Mixins } from 'vue-property-decorator'
import EmitterMixins from '@/mixins/emitter'

@Component({
  inheritAttrs: false
})
export default class IInput extends Mixins(EmitterMixins) {
  @Prop({ type: String, default: '' }) value!: string
  @Prop({ type: String, default: '请输入文字' }) placeholder!: string
  @Prop({
    type: String,
    default: 'text',
    validator: val => {
      return ['text', 'password', 'number'].indexOf(val) !== -1
    }
  })
  type!: string

  private currentValue = this.value

  @Emit('input')
  handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value
    this.currentValue = value
    this.dispatch('IFormItem', 'on-change')
    return value
  }

  @Emit('enter')
  handleEnter() {
    return this.currentValue
  }

  @Emit('onBlur')
  handleBlur() {
    this.dispatch('IFormItem', 'on-blur')
    return this.currentValue
  }

  @Watch('value')
  watchCurrentValue(val: string) {
    this.currentValue = val
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';

input {
  background: none;
  outline: none;
  border: none;
  padding: 0;
  width: 100%;
  height: rem(25);

  &:focus {
    border: none;
  }
  &::placeholder {
    font-size: 12px;
    color: #c8c9ce;
  }
  &[type='number'] {
    -moz-appearance: textfield;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }
  }
}
.i-input-content {
  background: white;
}
</style>
