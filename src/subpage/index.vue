<template>
  <div class="subpage">
    <i-nav-bar leftArrow :leftText="leftText" title="标题" @leftClick="leftClick" @rightClick="rightClick">
      <template #right>
        <span>右边</span>
        <!-- <my-svg iconClass="rightArrow-copy"></my-svg> -->
      </template>
    </i-nav-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import INavBar from './components/nav-bar/index.vue'

@Component({
  components: {
    INavBar
  }
})
export default class SubPage extends Vue {
  private leftText = ''

  leftClick(e: Event) {
    console.log('左边', e)
  }

  rightClick(e: Event) {
    console.log('右边', e)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/subpage/_mixins.scss';
.subpage {
  font-size: rem(37.5);
}
</style>
