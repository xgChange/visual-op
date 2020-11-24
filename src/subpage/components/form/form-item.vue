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
import AValidator, { RuleItem, Rules } from 'async-validator'
import { Vue, Component, Prop, Inject, Mixins } from 'vue-property-decorator'
import EmitterMixins from '@/mixins/emitter'
import { ModelInterface } from './form.vue'

interface MyRulesItem extends RuleItem {
  trigger?: string
}

interface FormModelInter extends Vue {
  model: ModelInterface
  rules: Rules
}

@Component
export default class IFormItem extends Mixins(EmitterMixins) {
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) prop!: string

  @Inject('formModel') private formModel!: FormModelInter

  mounted() {
    this.setRules()
  }

  get fieldVal() {
    return this.formModel.model[this.prop]
  }

  setRules() {
    this.$on('on-blur', () => {
      this.validate('blur')
    })

    this.$on('on-change', () => {
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
    return allRules.filter(rule => (rule as MyRulesItem).trigger && (rule as MyRulesItem).trigger === trigger)
  }

  validate(trigger: string) {
    const descriptor = Object.create(null)
    const model = Object.create(null)
    this.$nextTick(() => {
      const fieldRules = this.getFieldRules(trigger)
      descriptor[this.prop] = fieldRules
      model[this.prop] = this.fieldVal
      console.log(descriptor, model)
      // const validator = new AValidator(descriptor)
      // validator.validate(model).then(res => {
      //   console.log(res)
      // })
    })
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
