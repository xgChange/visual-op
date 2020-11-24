<template>
  <form class="i-form-content">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { Rules } from 'async-validator'
import { PropType } from 'vue'
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'

export interface ModelInterface {
  [index: string]: string
}

@Component
export default class IForm extends Vue {
  @Prop({ type: Object as PropType<ModelInterface> }) model!: any
  @Prop({ type: Object as PropType<Rules> }) rules!: Rules

  @Provide() formModel = this
}
</script>

<style lang="scss" scoped></style>
