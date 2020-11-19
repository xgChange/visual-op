<template>
  <div class="i-input-content">
    <div class="i-input-content_left">
      <div class="i-input-search-box">
        <my-svg iconClass="input" class="i-input-search-box_icon" :style="orderStyleObj"></my-svg>
        <input
          type="text"
          :value="currentValue"
          :placeholder="placeholder"
          class="i-input-search-box_input"
          @input="handleInput"
          @keyup.enter="handleSearch"
        />
        <my-svg iconClass="x" class="i-input-search-box_xicon" :style="xIconStyle" @click.native="deleteValue"></my-svg>
      </div>
    </div>
    <div class="i-input-content_right" v-if="showAction" @click="handleCancle">
      取消
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'

enum IconPosition {
  left = 1,
  right
}

type positionType = keyof typeof IconPosition

@Component
export default class MyInput extends Vue {
  @Prop({ type: String, default: '' }) value!: string
  @Prop({ type: Boolean, default: false }) showAction!: boolean
  @Prop({ type: String, default: '请输入关键字' }) placeholder!: string
  @Prop({
    type: String,
    default: 'left',
    validator: val => {
      return ['left', 'right'].indexOf(val) !== -1
    }
  })
  iconPosition!: positionType

  private currentValue = ''
  private showXIcon = false

  get orderStyleObj() {
    return {
      order: this.iconPosition === 'left' ? '' : IconPosition[this.iconPosition],
      paddingLeft: this.iconPosition === 'left' ? '5px' : '0',
      paddingRight: this.iconPosition === 'left' ? '0' : '5px'
    }
  }

  get xIconStyle() {
    return {
      visibility: this.showXIcon === true ? '' : 'hidden'
    }
  }

  deleteValue() {
    this.currentValue = ''
    this.showXIcon = false
  }

  @Emit('cancle')
  handleCancle(e: Event) {
    this.currentValue = ''
    return e
  }

  @Emit('input')
  handleInput(e: Event) {
    const targetValue = (e.target as HTMLInputElement).value
    this.currentValue = targetValue
    this.showXIcon = true
    return targetValue
  }

  @Emit('search')
  handleSearch() {
    return this.currentValue
  }

  @Watch('currentValue')
  onWatchValue(val: string) {
    this.currentValue = val
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';

input {
  background: none;
  outline: none;
  border: none;
  padding: 0 rem(3) 0 rem(7);

  &:focus {
    border: none;
  }
  &::placeholder {
    font-size: rem(14);
    color: #c8c9ce;
  }
}

.i-input-content {
  display: flex;
  align-items: center;
  &_left {
    border: 1px solid #ccc;
    padding: rem(7) 0 rem(7) 0;
    background: #f7f8fa;
    border-radius: 5px;
    .i-input-search-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      &_input {
        vertical-align: middle;
      }
      &_icon {
        font-size: rem(18);
        vertical-align: middle;
      }
      &_xicon {
        font-size: rem(15);
        vertical-align: middle;
        color: #ccc;
        padding-right: 2px;
      }
    }
  }
  &_right {
    font-size: rem(15);
    padding: 0 rem(8);
    color: #323233;
    cursor: pointer;
    user-select: none;
  }
}
</style>
