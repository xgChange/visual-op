<template>
  <div class="my-test">
    <h1>这是组件测试页面</h1>
    <div class="test-components">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Test extends Vue {}
</script>

<style lang="scss" scoped>
.my-test {
  .test-components {
    padding: 20px;
  }
}
</style>
