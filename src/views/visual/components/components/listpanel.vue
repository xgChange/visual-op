<!-- 列表panel -->
<template>
  <div class="my-list-panel">
    <div class="my-list-panel-container" v-for="item in listData" :key="item.name">
      <div class="my-list-panel-container-box" v-for="(prop, index) in item.props" :key="index">
        <div class="box-title">{{ prop.cnName }}</div>
        <div class="box-component">
          <component
            :is="comKey(prop.comType)"
            :typeName="prop.enName"
            :value="prop.value"
            @radioChange="handleRadioChange"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import MyRadio from '@/components/radio/index.vue'

enum ComponentType {
  radio = 'MyRadio',
  input = 'AInput',
  palette = 'AInput'
}

type comType = keyof typeof ComponentType

@Component({
  components: {
    MyRadio
  }
})
export default class MyListPanel extends Vue {
  @Prop({ type: Array, default: () => [] }) listData!: []

  // 动态切换需要填充的组件
  comKey(type: comType) {
    return ComponentType[type]
  }

  handleRadioChange(v: any) {
    this.$emit('onRadioChange', v)
  }
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
      padding-bottom: 10px;
      .box-title {
        flex: 2;
        line-height: 32px;
        text-align: left;
      }
      .box-component {
        flex: 4;
        /deep/ .ant-radio-wrapper {
          width: 46%;
        }
      }
    }
  }
}
</style>
