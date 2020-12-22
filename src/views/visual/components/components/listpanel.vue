<!-- 列表panel -->
<template>
  <div class="my-list-panel">
    <div class="my-list-panel-container">
      <div class="my-list-panel-container-box">
        <div class="box-title">模块标题</div>
        <div class="box-component">
          <a-input />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class MyListPanel extends Vue {
  @Prop({ type: Array, default: () => [] }) listData!: []
}
</script>

<style lang="scss" scoped>
.my-list-panel {
  width: 100%;
  height: 100%;
  &-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    &-box {
      display: flex;
      flex-direction: row;
      .box-title {
        flex: 1;
        line-height: 32px;
      }
      .box-component {
        flex: 4;
      }
    }
  }
}
</style>
