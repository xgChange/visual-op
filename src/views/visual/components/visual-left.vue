<template>
  <div class="visual-edit-left">
    <div class="list-box" v-for="li in utilsModuleList" :key="li.id">
      <div class="list-title" @click="expandContainer">
        <a-icon :type="isExpand ? 'caret-down' : 'caret-right'"></a-icon>
        {{ li.title }}
      </div>
      <collapse-transition>
        <div class="list-container" v-show="isExpand">
          <div class="list-container-box" v-for="item in li.content" :key="item.id">
            <my-svg :iconClass="item.iconName" class="list-box-icon"></my-svg>
            <span>{{ item.text }}</span>
          </div>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CollapseTransition from '@/components/collapse-transition'
import { utilsData } from '@/mock/data/visual'

@Component({
  components: {
    CollapseTransition
  }
})
export default class VisualLeftCom extends Vue {
  private isExpand = true
  private utilsModuleList = utilsData

  expandContainer() {
    this.isExpand = !this.isExpand
  }
}
</script>

<style lang="scss" scoped>
.visual-edit-left {
  box-shadow: 0px 0px 2px #ccc;
  background: white;
  padding: 10px;
  user-select: none;
  .list-box {
    // width: 240px;
    .list-title {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: rgb(64, 169, 255);
      }
    }
    .list-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0 16px 0 16px;
      .list-container-box {
        height: 70px;
        width: 70px;
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
