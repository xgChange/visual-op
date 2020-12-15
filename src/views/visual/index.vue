<template>
  <div class="visual-container">
    <div class="visual-top-container">
      <div class="top-text">商城模板110</div>
      <div class="top-btns">
        <a-button type="default" shape="round" size="large" @click="onExport"> 导出 </a-button>
        <a-button type="default" shape="round" size="large"> 预览 </a-button>
        <a-button type="default" shape="round" size="large" @click="onSave"> 保存 </a-button>
      </div>
    </div>
    <a-row class="visual-main-container">
      <a-col :span="5" class="visual-main-left">
        <visual-left-com :menuData="utilsData" @itemClick="itemClick"></visual-left-com>
      </a-col>
      <a-col :span="11" class="visual-main-mid">
        <div class="visual-simulate">
          <iframe ref="subIframe" src="/subpage.html" width="100%" height="100%"></iframe>
        </div>
      </a-col>
      <a-col :span="8" class="visual-main-right">
        <div class="right-box">
          <visual-right-com></visual-right-com>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VisualLeftCom from './components/visual-left.vue'
import { utilsData } from '@/mock/data/visual'
import VisualRightCom from './components/visual-right.vue'
import { ComItemProps } from '@/subpage/utils/index'

@Component({
  components: {
    VisualLeftCom,
    VisualRightCom
  }
})
export default class Visual extends Vue {
  private utilsData = utilsData
  private $subpage = {} as Vue

  mounted() {
    window.$editor = this
    // 通过postmessage，iframe组件向父组件传值
    window.addEventListener('message', e => {
      const { childData } = e.data
      this.handleChildData(childData)
    })
  }

  onExport() {
    console.log('导出')
  }

  onSave() {
    console.log('保存')
  }

  // 在iframe里面调用，初始化变量
  iframeLoad() {
    const subpage = (this.$refs.subIframe as HTMLIFrameElement).contentWindow?.$subpage
    if (subpage) {
      this.$subpage = subpage
    }
  }

  itemClick(id: number, comName: string) {
    this.$subpage.$emit('on-message', id, comName)
  }

  handleChildData(childData: ComItemProps) {
    console.log(childData)
  }
}
</script>

<style lang="scss" scoped>
.visual-container {
  padding-top: 2px;
  width: 100%;
  height: 100%;
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
    display: flex;
    flex-direction: row;
    height: calc(100% - 70px);
    .visual-main-left {
      min-width: 290px;
      box-shadow: 0px 0px 2px #ccc;
      background: white;
    }
    .visual-main-mid {
      padding: 20px 0 20px 0;
      display: flex;
      justify-content: center;
      min-width: 450px;
      .visual-simulate {
        width: 375px;
        box-shadow: 0 0 10px #ccc;
        border-radius: 10px;
      }
    }
    .visual-main-right {
      min-width: 400px;
      box-shadow: 0px 0px 2px #ccc;
      background: white;
    }
  }
}
</style>
