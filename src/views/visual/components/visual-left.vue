<template>
  <div class="visual-edit-left">
    <div class="list-box">
      <div class="list-title" @click="expandContainer">
        <a-icon :type="isExpand ? 'caret-down' : 'caret-right'"></a-icon>
        常用
      </div>
      <collapse-transition>
        <div class="list-container" v-show="isExpand">
          <div class="list-container-box">
            <a-icon type="home" class="list-box-icon" />
            <span>文本</span>
          </div>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CollapseTransition from '@/components/collapse-transition'

@Component({
  components: {
    CollapseTransition
  }
})
export default class VisualLeftCom extends Vue {
  private isExpand = true

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
    .list-title {
      height: 45px;
      line-height: 45px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: rgb(64, 169, 255);
      }
    }
    .list-container {
      display: flex;
      flex-direction: row;
      .list-container-box {
        height: 70px;
        width: 70px;
        text-align: center;
        font-size: 14px;
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
