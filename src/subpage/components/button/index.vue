<!--button有四种状态, 普通、hover、active、focus-->
<template>
  <button :class="buttonClass" :type="nativeType" :style="colorStyle" @click="handleClick">
    <div class="i-button-content_box" :class="{ [`i-button-content_box_${iconPosition}`]: true }">
      <my-svg :iconClass="icon" v-if="icon" class="box_icon"></my-svg>
      <span class="box_text"><slot></slot></span>
    </div>
  </button>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger'
type ButtonSize = 'large' | 'small' | 'mini' | 'normal'
type NativeType = 'button' | 'reset' | 'submit'

@Component
export default class IButton extends Vue {
  @Prop({ type: String as PropType<ButtonType>, default: 'default' }) type!: ButtonType
  @Prop({ type: String as PropType<ButtonSize>, default: 'normal' }) size!: ButtonSize
  @Prop({ type: String as PropType<NativeType>, default: 'button' }) nativeType!: NativeType
  @Prop({ type: String, default: '' }) color!: string
  @Prop({ type: String, default: '' }) icon!: string
  @Prop({
    type: String,
    default: 'right',
    validator: (v: string) => {
      return ['left', 'right'].indexOf(v) !== -1
    }
  })
  iconPosition!: string

  private prefixClass = 'i-button'

  get buttonClass() {
    return ['i-button-content', `${this.prefixClass}-${this.type}`, `${this.prefixClass}-${this.size}`]
  }

  get colorStyle() {
    return {
      background: this.color
    }
  }

  @Emit('click')
  handleClick(e: Event) {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';
@import './index.scss';

.i-button-content {
  border: none;
  &:focus {
    outline: none;
  }
  .i-button-content_box {
    display: flex;
    justify-content: center;
    align-items: center;
    &_left {
      > .box_icon {
        order: 1;
        font-size: 1.1em;
      }
      > .box_text {
        order: 2;
        margin-left: 2px;
      }
    }
    &_right {
      > .box_icon {
        order: 2;
        font-size: 1.1em;
      }
      > .box_text {
        order: 1;
        margin-right: 2px;
      }
    }
  }
}
</style>
