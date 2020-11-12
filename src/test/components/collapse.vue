<template>
  <i-collapse>
    <i-collapse-item>sddd</i-collapse-item>
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
export default class CollapseTest extends Vue {}
</script>

<style></style>
