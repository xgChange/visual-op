<template>
  <div class="i-collapse-item">
    <div class="collapse-title" @click="expandContainer">
      <a-icon :type="isExpand ? 'caret-down' : 'caret-right'"></a-icon>
      <span>{{ header }}</span>
    </div>
    <collapse-transition>
      <div class="collapse-item-container" v-show="isExpand">
        <slot></slot>
      </div>
    </collapse-transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CollapseTransition from '@/components/transition/collapse-transition'
import Collapse from './collapse.vue'

@Component({
  components: {
    CollapseTransition
  }
})
export default class ICollpaseItem extends Vue {
  @Prop({
    type: String
  })
  private name!: string

  @Prop({
    type: String
  })
  private header!: string

  private isExpand = false

  expandContainer() {
    ;(this.$parent as Collapse).toggle({
      isExpand: this.isExpand,
      activeName: this.name
    })
  }
}
</script>

<style lang="scss" scoped>
.i-collapse-item {
  .collapse-title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: rgb(64, 169, 255);
    }
  }
}
</style>
