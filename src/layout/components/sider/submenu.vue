<template functional>
  <a-sub-menu :key="props.menuInfo.name" v-if="!props.menuInfo.meta.hidden">
    <span slot="title">
      <a-icon :type="props.menuInfo.meta.iconType" v-if="item.meta.iconType" />
      <span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.name">
        <a-icon :type="item.meta.iconType" v-if="item.meta.iconType" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.name" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
/**
 * @description 使用functional 函数式组件用来递归菜单项。无状态、没有data、this
 */
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'

@Component
export default class SubMenu extends Vue {
  @Prop() private menuInfo!: RouteConfig
}
</script>
