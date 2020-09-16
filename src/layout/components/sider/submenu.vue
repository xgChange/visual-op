<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <a-icon :type="props.menuInfo.iconType" v-if="props.menuInfo.hasIcon" /><span>{{ props.menuInfo.content }}</span>
    </span>
    <template v-for="item in props.menuInfo.childrens">
      <a-menu-item v-if="!item.childrens" :key="item.key">
        <a-icon :type="item.iconType" v-if="item.hasIcon" />
        <span>{{ item.content }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
/**
 * @description 使用functional 函数式组件用来递归菜单项。无状态、没有data、this
 */
import { Vue, Component, Prop } from 'vue-property-decorator'
import { MenuItem } from './menu'

@Component
export default class SubMenu extends Vue {
  @Prop() private menuInfo!: MenuItem[]
}
</script>
