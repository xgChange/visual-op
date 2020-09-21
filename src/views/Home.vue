<template>
  <div>
    这是home
    <button @click="handle">点击</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  components: {}
})
export default class Home extends Vue {
  get userInfo() {
    return UserModule.userInfo
  }

  async handle() {
    await UserModule.Login({ userName: 'admin', password: '123' })
    // console.log(UserModule.userInfo, 'asddd')
  }
}
</script>

<style></style>
