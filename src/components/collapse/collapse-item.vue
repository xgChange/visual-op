<template>
  <div class="i-collapse-item">
    <div class="list-title" @click="expandContainer">
      <a-icon :type="isExpand ? 'caret-down' : 'caret-right'"></a-icon>
      <span>title</span>
    </div>
    <collapse-transition>
      <div class="list-container" v-show="isExpand">
        <div class="list-container-box">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CollapseTransition from '@/components/transition/collapse-transition'

@Component({
  components: {
    CollapseTransition
  }
})
export default class ICollpaseItem extends Vue {
  private isExpand = true

  expandContainer() {
    console.log('dd')
  }
}
</script>

<style lang="scss" scoped>
.i-collapse-item {
}
</style>
