<template>
  <div class="i-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ICollapse extends Vue {}
</script>

<style lang="scss" scoped></style>
