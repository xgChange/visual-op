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
    <div class="subpage-form">
      <i-from :model="formModel" :rules="rules" ref="IForm" @onPrimarySubmit="primarySubmit">
        <i-form-item label="用户名" prop="user">
          <i-input v-model="formModel.user" placeholder="请输入账号"></i-input>
        </i-form-item>
        <i-form-item label="密码" prop="pass">
          <i-input v-model="formModel.pass" placeholder="请输入密码"></i-input>
        </i-form-item>
        <i-button>登录</i-button>
      </i-from>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import INavBar from './components/nav-bar/index.vue'
import ISearch from './components/search/index.vue'
import IInput from './components/input/input.vue'
import { IFrom, IFormItem } from './components/form/index'
import { ObjectPropStr } from './utils/index'
import IButton from './components/button/index.vue'

@Component({
  components: {
    INavBar,
    ISearch,
    IInput,
    IFrom,
    IFormItem,
    IButton
  }
})
export default class SubPage extends Vue {
  private leftText = '返回'
  private inputValue = ''
  private formModel = {
    user: '',
    pass: ''
  }
  private rules = {
    user: [
      { type: 'string', required: true, message: '用户名不能为空', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在3-5位', trigger: 'blur' }
    ],
    pass: [{ required: true, message: '密码不能为空', trigger: 'change' }]
  }

  $refs!: {
    IForm: IFrom
  }

  leftClick(e: Event) {
    console.log('左边', e)
    this.$refs.IForm.reset()
  }

  primarySubmit(v: ObjectPropStr) {
    console.log(v)
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
    this.$refs.IForm.submit().then(res => {
      console.log(res, this.formModel)
    })
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
