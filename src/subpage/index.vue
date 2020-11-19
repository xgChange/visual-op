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
            @cancle="handleCancle"
          ></i-search>
        </template>
      </i-nav-bar>
    </div>
    <!-- <i-input class="subpage-input" type="number" v-model="inputValue" @onBlur="onBlur"></i-input> -->
    {{ inputValue }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import INavBar from './components/nav-bar/index.vue'
import ISearch from './components/search/index.vue'
import IInput from './components/input/input.vue'

@Component({
  components: {
    INavBar,
    ISearch,
    IInput
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

  handleSearch(v: string) {
    console.log('搜索', this.inputValue, v)
  }

  onBlur(v: string) {
    console.log('失焦', v)
  }

  handleCancle() {
    console.log('cancale')
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
          width: rem(200);
        }
      }
    }
  }
  .subpage-input {
    margin-top: 10px;
  }
}
</style>
