<template>
  <div class="visual-container">
    <div class="visual-top-container">
      <div class="top-btns">
        <a-button-group size="large">
          <a-button type="primary">导出</a-button>
          <a-button type="primary">保存</a-button>
        </a-button-group>
      </div>
    </div>
    <a-row>
      <a-col :span="6" class="visual-left-container">
        <div class="left-box">
          left box
        </div>
      </a-col>
      <a-col :span="9" class="visual-mid-container">
        <div class="visual-simulate">
          <iframe src="/subpage.html" frameborder="1" width="375" height="667"></iframe>
        </div>
      </a-col>
      <a-col :span="9" class="visual-right-container">
        <div class="right-box">
          right box
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Visual extends Vue {
  onExport() {
    console.log('导出')
  }

  onSave() {
    console.log('保存')
  }
}
</script>

<style lang="scss" scoped>
.visual-container {
  width: 100%;
  height: 100%;
  .visual-top-container {
    .top-btns {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      button {
        width: 120px;
        height: 45px;
      }
    }
  }
  .ant-row {
    width: 100%;
  }
  .visual-left-container {
    height: 100%;
  }
}
</style>
