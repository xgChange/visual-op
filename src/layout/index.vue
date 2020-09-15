<template>
  <a-layout class="mylayout-container">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible breakpoint="lg" class="mysider-container">
      <my-sider></my-sider>
    </a-layout-sider>

    <a-layout class="mylayout-right-container">
      <my-header :collapsed="collapsed" @show-menu="showMenu"></my-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MyHeader from './components/header.vue'
import MySider from './components/sider.vue'

@Component({
  components: {
    MySider,
    MyHeader
  }
})
export default class MyLayout extends Vue {
  private info = '这是中间内容'
  private collapsed = false

  showMenu(data: boolean) {
    this.collapsed = data
  }
}
</script>

<style lang="scss" scoped>
.mylayout-container {
  width: 100%;
  height: 100%;
  .mylayout-right-container {
    display: flex;
    flex: 1;
  }
}
</style>
