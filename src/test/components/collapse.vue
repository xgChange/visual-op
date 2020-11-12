<template>
  <i-collapse v-model="activeKey">
    {{ activeKey }}
    <i-collapse-item name="1" header="标题1">sddd</i-collapse-item>
    <i-collapse-item name="2" header="标题2">s2ddd</i-collapse-item>
  </i-collapse>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ICollapse from '@/components/collapse/collapse.vue'
import ICollapseItem from '@/components/collapse/collapse-item.vue'

@Component({
  components: {
    ICollapse,
    ICollapseItem
  }
})
export default class CollapseTest extends Vue {
  private activeKey = ['1', '2']
}
</script>

<style></style>
