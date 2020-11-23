<template>
  <form class="i-form-content">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'

@Component
export default class IForm extends Vue {
  @Prop({ type: Object }) model!: any

  @Provide()
  formModel = this
}
</script>

<style lang="scss" scoped></style>
