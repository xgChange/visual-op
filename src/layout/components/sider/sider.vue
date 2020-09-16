<template>
  <a-menu theme="dark" mode="inline" :default-selected-keys="['/']" @click="changePages">
    <template v-for="item in menuData">
      <a-menu-item v-if="!item.childrens" :key="item.key">
        <a-icon :type="item.iconType" v-if="item.hasIcon" />
        <span>{{ item.content }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menuInfo="item"></sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { menuData } from './menu'
import subMenu from './submenu.vue'

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
  private info = '这是左边导航栏内容'
  private menuData = menuData

  changePages(item: Item) {
    console.log(item.domEvent)
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
  // .ant-menu-submenu{
  //   #000c17
  //   #001529
  // }
}
</style>
