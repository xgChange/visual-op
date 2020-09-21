<template>
  <div class="my-login-container">
    <div class="my-login-middle">
      <div class="my-login-middle-top">
        <div class="title">
          <img src="../../assets/svg/logo.svg" alt="logo" />
          <span>登录</span>
        </div>
      </div>
      <div class="my-login-middle-main">
        <my-form @on-submit="submit"></my-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import MyForm from './components/form.vue'
import { UserInfo } from '@/utils/interface/index'

@Component({
  components: {
    MyForm
  }
})
export default class Login extends Vue {
  async submit(data: UserInfo | undefined) {
    if (data) {
      await UserModule.Login(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-login-container {
  height: 100%;
  background: #f0f2f5;
  .my-login-middle {
    position: relative;
    width: 100%;
    min-height: 100%;
    background: url('../../assets/svg/background.svg') no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    .my-login-middle-top {
      text-align: center;
      .title {
        img {
          height: 44px;
          vertical-align: middle;
        }
        span {
          font-size: 28px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 600;
          vertical-align: middle;
          letter-spacing: 5px;
          padding: 0 0 0 5px;
        }
      }
    }
  }
  .my-login-middle-main {
    width: 368px;
    min-width: 260px;
    margin: 20px auto;
  }
}
</style>
