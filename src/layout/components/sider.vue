<template>
  <a-menu theme="dark" mode="inline" :default-selected-keys="['1']"> </a-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import menuData from './menu'

@Component
export default class MySider extends Vue {
  private info = '这是左边导航栏内容'
  private menuData = menuData
}
</script>

<style lang="scss" scoped>
.mysider-container {
  min-width: 220px;
  .ant-menu-item {
    margin-top: 0;
    height: 60px;
    line-height: 60px;
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
}
</style>
