<template>
  <div class="i-nav-bar-content">
    <div class="i-nav-bar-left" @click="handleLeftClick">
      <my-svg iconClass="leftArrow" v-if="leftArrow" class="i-nav-bar-left_icon"></my-svg>
      <span v-if="leftText !== ''">{{ leftText }}</span>
      <slot name="left" v-if="leftText === ''"></slot>
    </div>
    <div class="i-nav-bar-title">
      <span v-if="title !== ''">{{ title }}</span>
      <slot name="middle" v-else></slot>
    </div>
    <div class="i-nav-bar-right" @click="handleRightClick">
      <span v-if="rightText !== ''">{{ rightText }}</span>
      <slot name="right" v-if="rightText === ''"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class INavBar extends Vue {
  @Prop({ type: Boolean, default: true }) leftArrow!: boolean
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
  background: white;
  padding: 16px 0;
  user-select: none;
  position: relative;

  .i-nav-bar-left {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    align-items: center;
    font-size: rem(15);
    padding: 0 0 0 rem(16);
    color: #1989fa;
    cursor: pointer;
  }
  .i-nav-bar-right {
    position: absolute;
    display: flex;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    font-size: rem(15);
    padding: 0 rem(16) 0 0;
    color: #1989fa;
    cursor: pointer;
  }
  .i-nav-bar-title {
    margin: 0 auto;
    font-size: rem(17);
    font-weight: 500;
  }
}
</style>
