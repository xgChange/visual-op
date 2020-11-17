<template>
  <div class="i-nav-bar-content">
    <div class="i-nav-bar-left" @click="handleLeftClick">
      <my-svg iconClass="leftArrow" v-if="leftArrow" class="i-nav-bar-left_icon"></my-svg>
      <span v-if="leftText !== ''">{{ leftText }}</span>
      <slot name="left"></slot>
    </div>
    <div class="i-nav-bar-title">{{ title }}</div>
    <div class="i-nav-bar-right" @click="handleRightClick">
      <span v-if="rightText !== ''">{{ rightText }}</span>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class INavBar extends Vue {
  @Prop({ type: Boolean, default: false }) leftArrow!: boolean
  @Prop({ type: String, default: '' }) leftText!: string
  @Prop({ type: String, default: '' }) rightText!: string
  @Prop({ type: String, default: '' }) title!: string

  @Emit('leftClick')
  handleLeftClick(event: Event) {
    return event
  }

  @Emit('rightClick')
  handleRightClick(event: Event) {
    return event
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';

.i-nav-bar-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  padding: 16px 0;
  font-size: rem(17);
  vertical-align: middle;
  user-select: none;

  .i-nav-bar-left {
    &_icon {
      font-size: rem(18);
    }
    padding: 0 rem(16);
    color: #1989fa;
    cursor: pointer;
  }
  .i-nav-bar-right {
    padding: 0 rem(16);
    color: #1989fa;
    cursor: pointer;
  }
  .i-nav-bar-title {
    font-size: rem(18);
    font-weight: 500;
  }
}
</style>
