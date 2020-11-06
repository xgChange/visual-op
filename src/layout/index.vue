<template>
  <a-layout class="mylayout-container">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible breakpoint="lg" class="mysider-container">
      <my-sider :activeKeys="activeKeys"></my-sider>
    </a-layout-sider>

    <a-layout class="mylayout-right-container">
      <my-header :collapsed="collapsed" @show-menu="showMenu"></my-header>
      <a-layout-content class="right-main">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import MyHeader from './components/header/header.vue'
import MySider from './components/sider/sider.vue'
import { PermissionModule } from '@/store/modules/permission'
import { matchRoutePath } from '@/utils/index'

@Component({
  components: {
    MySider,
    MyHeader
  }
})
export default class MyLayout extends Vue {
  private collapsed = false
  private activeKeys: string[] = []

  showMenu(data: boolean) {
    this.collapsed = data
  }

  @Watch('$route', { immediate: true })
  watchRoute(val: Route) {
    // 设置activeKeys
    const pathName = matchRoutePath(val.path, PermissionModule.routes).name // 根据to.path去匹配符合的route
    const selectedKeys = []
    // 去适配有二级菜单以上，刷新页面时，菜单展开
    if (val.path.slice(1).indexOf('/') !== -1) {
      const parentPath = val.path.slice(1).split('/')[0]
      const parentKey = matchRoutePath(parentPath, PermissionModule.routes).name
      selectedKeys.unshift(parentKey)
    }
    selectedKeys.push(pathName)
    this.activeKeys = selectedKeys
    // PermissionModule.SaveActiveKeys(selectedKeys)
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
    .right-main {
      overflow: hidden;
    }
  }
}
</style>
