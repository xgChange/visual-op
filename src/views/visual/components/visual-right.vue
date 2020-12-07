<template>
  <div class="visual-edit-right">
    <div class="card-container">
      <a-tabs default-active-key="1" @change="handleChange" type="card">
        <a-tab-pane key="1" tab="基础"> ceshi </a-tab-pane>
        <a-tab-pane key="2" tab="高级"> Content of Tab Pane 2 </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class VisualRightCom extends Vue {
  handleChange(activeKey: string) {
    console.log('ceshi', activeKey)
  }
}
</script>

<style lang="scss" scoped>
.visual-edit-right {
  user-select: none;
  height: auto;
  width: 100%;
  .card-container {
    background: #fff;
    overflow: hidden;
    /deep/ .ant-tabs-nav {
      width: 99%;
      .ant-tabs-tab-active {
        background: white !important;
      }
      .ant-tabs-tab {
        width: 50%;
        border: none;
        background: #f7f7f7;
        text-align: center;
      }
    }
    /deep/ .ant-tabs-top-content {
      padding: 0 20px 0 20px;
    }
  }
}
</style>
