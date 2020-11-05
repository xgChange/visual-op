<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class MySvg extends Vue {
  @Prop({
    type: String,
    default: ''
  })
  private iconClass!: string

  set iconName(val: string) {
    this.iconName = `#icon-${this.iconClass}`
  }

  get iconName() {
    return this.iconName
  }
}
</script>

<style></style>
