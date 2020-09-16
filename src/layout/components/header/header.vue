<template>
  <a-layout-header class="myheader-container">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="showMenu" />
  </a-layout-header>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MyHeader extends Vue {
  private info = 'header214'
  @Prop({
    default: false
  })
  private collapsed!: boolean

  @Emit()
  showMenu() {
    return !this.collapsed
  }
}
</script>

<style lang="scss" scoped>
.myheader-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 15px;
  background: #fff;
  height: 60px;
  .trigger {
    line-height: 60px;
  }
}
</style>
