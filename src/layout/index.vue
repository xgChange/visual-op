<template>
  <a-layout class="mylayout-container">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible breakpoint="lg" class="mysider-container">
      <my-sider :activeKeys="activeKeys"></my-sider>
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route, RouteConfig } from 'vue-router'
import MyHeader from './components/header/header.vue'
import MySider from './components/sider/sider.vue'
import { PermissionModule } from '@/store/modules/permission'

@Component({
  components: {
    MySider,
    MyHeader
  }
})
export default class MyLayout extends Vue {
  private info = '这是中间内容'
  private collapsed = false
  private activeKeys: string[] = ['/']

  @Watch('$route', { immediate: true })
  watchRoutes(val: Route) {
    console.log(val)
    this.setMenuActive(val)
  }

  get allRoutes() {
    return PermissionModule.routes
  }

  showMenu(data: boolean) {
    this.collapsed = data
  }

  setMenuActive(route: Route) {
    const { name } = route
    this.activeKeys = [name as string]
    console.log(name)
    // console.log(this.findCurrentPath(path, this.allRoutes))
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
