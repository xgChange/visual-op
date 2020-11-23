<template>
  <div class="i-form-item-content">
    <div class="i-form-item-label" v-if="label">{{ label }}</div>
    <div class="i-form-item-slot">
      <slot></slot>
      <!-- <div class="i-form-item-slot_error">错误提示</div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'
import AValidator from 'async-validator'

@Component
export default class IFormItem extends Vue {
  @Prop({ type: String, default: '' }) label!: string

  @Inject('formModel') private formModel!: Vue
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
