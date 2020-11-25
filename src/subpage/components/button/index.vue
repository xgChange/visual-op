<!--button有四种状态, 普通、hover、active、focus-->
<template>
  <button :class="buttonClass" type="button">
    <slot>button</slot>
  </button>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger'
type ButtonSize = 'large' | 'small' | 'mini' | 'normal'

@Component
export default class IButton extends Vue {
  @Prop({ type: String as PropType<ButtonType>, default: 'default' }) type!: string
  @Prop({ type: String as PropType<ButtonSize>, default: 'small' }) size!: string

  private prefixClass = 'i-button'

  get buttonClass() {
    return ['i-button-content', `${this.prefixClass}-${this.type}`, `${this.prefixClass}-${this.size}`]
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';
@import './index.scss';

.i-button-content {
  // color: white;
  border: none;
  &:focus {
    outline: none;
  }
}
</style>
