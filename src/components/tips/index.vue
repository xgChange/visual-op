<template>
  <div
    class="myTips-container"
    :style="tipStyle"
    v-if="isShow"
    @mouseenter="handleMouse($event, 'enter')"
    @mouseleave="handleMouse($event, 'leave')"
  >
    <div class="myTips-container-content">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
interface XyObj {
  x: number
  y: number
}

@Component
export default class MyTips extends Vue {
  @Prop({ type: String, default: '编辑模块' }) text!: string
  @Prop({
    type: Object,
    default: () => {
      return {
        x: 0,
        y: 0
      }
    }
  })
  xyObj!: XyObj

  private isShow = false

  get tipStyle() {
    return {
      top: this.xyObj.y + 'px',
      left: this.xyObj.x + 'px'
    }
  }

  add() {
    this.isShow = true
  }

  // 移出组件
  close() {
    this.isShow = false
  }

  handleMouse(e: Event, name: string) {
    const target = e.currentTarget
    if (target) {
      if (name === 'leave') {
        this.close()
        this.$emit('onClose', 'leave')
      } else {
        this.$emit('onEnter', 'enter')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.myTips-container {
  position: absolute;
  background: #fff;
  color: black;
  height: 38px;
  width: 78px;
  line-height: 38px;
  text-align: center;
  box-shadow: 5px 4px 10px 2px #ccc;
  border-radius: 5px;
  font-size: 14px;
  &:hover {
    color: #fe714b;
    cursor: pointer;
  }
}
</style>
