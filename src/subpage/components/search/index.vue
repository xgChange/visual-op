<template>
  <div class="i-search-content">
    <div class="i-search-content_left">
      <div class="i-search-content_left-box">
        <my-svg iconClass="input" class="i-search-content_left-box_icon" :style="orderStyleObj"></my-svg>
        <i-input
          type="text"
          @input="handleInput"
          v-bind="$attrs"
          v-on="$listeners"
          class="i-search-content_left-box_input"
          :value="currentValue"
          @enter="handleSearch"
        ></i-input>
        <my-svg
          iconClass="x"
          class="i-search-content_left-box_xicon"
          :style="xIconStyle"
          @click.native="deleteValue"
        ></my-svg>
      </div>
    </div>
    <div class="i-search-content_right" v-if="showAction" @click="handleCancle">
      取消
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import IInput from '@/subpage/components/input/input.vue'

enum IconPosition {
  left = 1,
  right
}

type positionType = keyof typeof IconPosition

@Component({
  components: {
    IInput
  }
})
export default class MySearch extends Vue {
  @Prop({ type: String, default: '' }) value!: string
  @Prop({ type: Boolean, default: false }) showAction!: boolean
  @Prop({
    type: String,
    default: 'left',
    validator: val => {
      return ['left', 'right'].indexOf(val) !== -1
    }
  })
  iconPosition!: positionType

  private currentValue = this.value
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

  @Emit('input')
  deleteValue() {
    this.currentValue = ''
    this.showXIcon = false
    return this.currentValue
  }

  @Emit('cancle')
  handleCancle(e: Event) {
    this.currentValue = ''
  }

  @Emit('search')
  handleSearch(v: string) {
    return v
  }

  @Watch('currentValue', { immediate: true })
  onWatchValue(val: string) {
    this.showXIcon = val ? true : false
    this.currentValue = val
  }

  handleInput(v: string) {
    this.currentValue = v
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';

.i-search-content {
  display: flex;
  align-items: center;
  &_left {
    border: 1px solid #ccc;
    background: #f7f8fa;
    border-radius: 5px;
    &-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      &_input {
        vertical-align: middle;
        background: transparent;
        padding-left: rem(5);
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
