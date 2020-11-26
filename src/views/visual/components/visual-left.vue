<template>
  <i-collapse v-model="activeKeys" class="visual-edit-left">
    <i-collapse-item v-for="li in menuData" :key="li.id" :name="`${li.id}`" :header="li.title" class="list-box">
      <div class="list-container">
        <div class="list-container-box" v-for="box in li.content" :key="box.id" @click="handleClick(box.id)">
          <my-svg :iconClass="box.iconName" class="list-box-icon"></my-svg>
          <span>{{ box.text }}</span>
        </div>
      </div>
    </i-collapse-item>
  </i-collapse>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import CollapseTransition from '@/components/transition/collapse-transition'
import { UtilsInterface } from '@/mock/data/visual'
import { ICollapse, ICollapseItem } from '@/components/collapse/index.ts'

@Component({
  components: {
    CollapseTransition,
    ICollapse,
    ICollapseItem
  }
})
export default class VisualLeftCom extends Vue {
  @Prop({
    type: Array
  })
  private menuData!: UtilsInterface[]

  private activeKeys!: string[]

  @Watch('menuData', { deep: true, immediate: true })
  onWatchMenuData(v: UtilsInterface[]) {
    this.activeKeys = v.map(item => `${item.id}`)
  }

  @Emit('itemClick')
  handleClick(id: number) {
    return id
  }
}
</script>

<style lang="scss" scoped>
.visual-edit-left {
  padding: 10px 10px 10px 15px;
  user-select: none;
  height: auto;

  .list-box {
    padding-bottom: 10px;
    .list-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0 16px 0 16px;
      .list-container-box {
        height: 70px;
        width: 75px;
        font-size: 14px;
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .list-box-icon {
          margin-bottom: 10px;
          font-size: 30px;
        }
        &:hover {
          box-shadow: 0px 5px 10px rgba(148, 54, 21, 0.14);
          color: rgb(64, 169, 255);
        }
      }
    }
  }
}
</style>
