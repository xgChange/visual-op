<template>
  <div class="visual-container">
    <div class="visual-top-container">
      <div class="top-text">
        商城模板110
      </div>
      <div class="top-btns">
        <a-button type="default" shape="round" size="large" @click="onExport">
          导出
        </a-button>
        <a-button type="default" shape="round" size="large">
          预览
        </a-button>
        <a-button type="default" shape="round" size="large" @click="onSave">
          保存
        </a-button>
      </div>
    </div>
    <a-row class="visual-main-container">
      <a-col :span="5" class="visual-main-left">
        <visual-left-com></visual-left-com>
      </a-col>
      <a-col :span="10" class="visual-main-mid">
        <div class="visual-simulate">
          <iframe src="/subpage.html" width="100%" height="100%"></iframe>
        </div>
      </a-col>
      <a-col :span="9" class="visual-main-right">
        <div class="right-box">
          right box
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VisualLeftCom from './components/visual-left.vue'

@Component({
  components: {
    VisualLeftCom
  }
})
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
  margin-top: 2px;
  width: 100%;
  .visual-top-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 15px 0 15px;
    background: white;
    box-shadow: 0 3px 5px #ccc;
    .top-text {
      line-height: 45px;
    }
    .top-btns {
      button {
        &:last-child {
          margin-right: 0px;
        }
        &:nth-child(odd) {
          border-color: rgb(64, 169, 255);
          color: rgb(64, 169, 255);
        }
        &:hover {
          background: rgb(64, 169, 255);
          color: white;
        }
        margin-right: 15px;
      }
    }
  }
  .visual-main-container {
    min-width: 1420px;
    display: flex;
    flex-direction: row;
    .visual-main-left {
      max-width: 428px;
      box-shadow: 0px 0px 2px #ccc;
      background: white;
    }
    .visual-main-mid {
      padding: 20px 0 20px 0;
      display: flex;
      justify-content: center;
      .visual-simulate {
        width: 375px;
        height: 667px;
        box-shadow: 0 0 10px #ccc;
        border-radius: 10px;
      }
    }
    .visual-main-right {
      // min-width: 645px;
    }
  }
}
</style>
