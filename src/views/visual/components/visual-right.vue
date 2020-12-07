<template>
  <div class="visual-edit-right">
    <div class="card-container">
      <a-tabs default-active-key="1" @change="handleChange" type="card">
        <a-tab-pane key="1" tab="基础">
          Content of Tab Pane 1
        </a-tab-pane>
        <a-tab-pane key="2" tab="高级">
          Content of Tab Pane 2
        </a-tab-pane>
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
  padding: 0px 10px 10px 15px;
  user-select: none;
  height: auto;
  .card-container {
    background: #fff;
    overflow: hidden;
    /deep/ .ant-tabs-nav {
      // width: 50%;
      .ant-tabs-tab-active {
        background: white !important;
      }
      .ant-tabs-tab {
        // width: 100%;
        border: none;
        background: #f7f7f7;
      }
    }
  }
}
</style>
