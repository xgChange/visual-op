<template>
  <a-menu
    theme="dark"
    mode="inline"
    :default-selected-keys="activeKeys"
    :default-open-keys="activeKeys.length > 1 ? [activeKeys[0]] : ['']"
    @click="changePages"
  >
    <template v-for="item in menuData">
      <template v-if="!item.meta.hidden">
        <a-menu-item v-if="!item.children" :key="item.name">
          <a-icon :type="item.meta.iconType" v-if="item.meta.iconType" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <a-menu-item v-else-if="item.children && item.children.length === 0" :key="item.name">
          <a-icon :type="item.meta.iconType" v-if="item.meta.iconType" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.name" :menuInfo="item"></sub-menu>
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import subMenu from './submenu.vue'
import { PermissionModule } from '@/store/modules/permission'
import { matchRouteParentName } from '@/utils/index'

interface Item {
  domEvent: MouseEvent
  item: Vue
  key: string
  keyPath: string[]
}

@Component({
  components: {
    subMenu
  }
})
export default class MySider extends Vue {
  private menuData = this.filterChildren

  get routes() {
    return PermissionModule.routes
  }

  get activeKeys() {
    return PermissionModule.activeKeys
  }

  get filterChildren() {
    this.routes.forEach(item => {
      if (item.children) {
        item.children = item.children.filter(route => {
          if (route.meta && route.meta.hidden) {
            return false
          } else {
            return true
          }
        })
      }
    })
    return this.routes
  }

  changePages(item: Item) {
    // 获取父route
    const parentRoute = matchRouteParentName(item.key, this.routes)
    let childrenPath = ''

    // 获取子route
    if (parentRoute.children && parentRoute.children.length > 0) {
      childrenPath = parentRoute.children.find((r: any) => r.name === item.key).path
    }
    childrenPath = childrenPath === '' ? '' : `/${childrenPath}`

    // 完整route
    this.$router.push({
      path: `${parentRoute.path}${childrenPath}`
    })
  }
}
</script>

<style lang="scss" scoped>
.mysider-container {
  min-width: 220px;
  .ant-menu-item {
    margin-top: 0;
    height: 56px;
    line-height: 56px;
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
}
</style>
