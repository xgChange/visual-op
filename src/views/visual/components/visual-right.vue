<template>
  <div class="visual-edit-right">
    <div class="card-container">
      <a-tabs default-active-key="1" @change="handleChange" type="card">
        <a-tab-pane key="1" tab="基础">
          <my-list-panel :listData="comPropsData" v-on="$listeners" @onRadioChange="handleRadioChange"></my-list-panel>
        </a-tab-pane>
        <a-tab-pane key="2" tab="高级"> Content of Tab Pane 2 </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import MyListPanel from './components/listpanel.vue'
import { comPropsData } from '@/mock/data/com-data'
import { ComItemProps } from '@/subpage/utils/index'
import { PropType } from 'vue'

@Component({
  components: {
    MyListPanel
  }
})
export default class VisualRightCom extends Vue {
  @Prop({ type: Object as PropType<ComItemProps> }) comData!: ComItemProps

  private comPropsData: any[] = []

  @Watch('comData')
  watchListData(v: ComItemProps) {
    if (Object.keys(v).length !== 0) {
      this.comPropsData = comPropsData.filter(item => item.name === v.typeName)
    }
  }

  handleChange(activeKey: string) {
    console.log('ceshi', activeKey)
  }

  handleRadioChange(v: any) {
    console.log(v)
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
    ::v-deep .ant-tabs-nav {
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
    ::v-deep .ant-tabs-top-content {
      padding: 0 20px 0 20px;
    }
  }
}
</style>
