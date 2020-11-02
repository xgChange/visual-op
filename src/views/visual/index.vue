<template>
  <div class="visual-container">
    <button @click="handleClick">点击</button>
    <!-- <iframe src="/subpage.html" frameborder="1" width="375" height="667"></iframe> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Visual extends Vue {
  test = '这是测试页面'

  handleClick() {
    this.$router.push({
      path: '/test/simple-test2',
      query: {
        plan: 'ddd'
      }
    })
  }
}
</script>

<style></style>
