<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules" :wrapper-col="wrapperCol">
    <a-form-model-item ref="userName" prop="userName">
      <a-input
        v-model="form.userName"
        placeholder="用户名：admin"
        size="large"
        @blur="
          () => {
            $refs.userName.onFieldBlur()
          }
        "
      />
    </a-form-model-item>
    <a-form-model-item ref="password" prop="password">
      <a-input
        v-model="form.password"
        placeholder="密码：123"
        size="large"
        @blur="
          () => {
            $refs.password.onFieldBlur()
          }
        "
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="wrapperCol">
      <a-button type="primary" @click="onSubmit" block size="large" :loading="isLoading">
        登录
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { FormModel } from 'ant-design-vue'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MyForm extends Vue {
  private wrapperCol = { span: 20, offset: 2 }
  private form = {
    userName: '',
    password: ''
  }
  private rules = {
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }

  $refs!: {
    ruleForm: FormModel
  }

  @Prop({
    type: Boolean,
    default: false
  })
  private isLoading!: boolean

  @Emit()
  async onSubmit() {
    try {
      await this.$refs.ruleForm.validate()
      return this.form
    } catch (error) {
      return error
    }
  }

  resetForm() {
    this.$refs.ruleForm.resetFields()
  }
}
</script>

<style lang="scss" scoped></style>
