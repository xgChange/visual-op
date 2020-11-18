<template>
  <div class="subpage">
    <div class="subpage-nav-bar">
      <i-nav-bar leftArrow :leftText="leftText" @leftClick="leftClick" class="nav-bar-content">
        <template #right>
          <i-search
            v-model="inputValue"
            iconPosition="right"
            placeholder="请输入关键字搜索"
            showAction
            class="nav-bar-content_iSearch"
            @search="handleSearch"
          ></i-search>
        </template>
      </i-nav-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import INavBar from './components/nav-bar/index.vue'
import ISearch from './components/search/index.vue'

@Component({
  components: {
    INavBar,
    ISearch
  }
})
export default class SubPage extends Vue {
  private leftText = '返回'
  private inputValue = ''

  leftClick(e: Event) {
    console.log('左边', e)
  }

  rightClick(e: Event) {
    console.log('右边', e)
  }

  handleSearch(v1: string, v2: Event) {
    //
    console.log(this.inputValue)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';
.subpage {
  font-size: rem(37.5);
  .subpage-nav-bar {
    .nav-bar-content {
      height: 32px;
      padding: 5px 0;
      /deep/ .i-nav-bar-right {
        padding-right: 0;
        cursor: unset;
      }
      .nav-bar-content_iSearch {
        /deep/ .i-input-search-box_input {
          width: 200px !important;
        }
      }
    }
  }
}
</style>
