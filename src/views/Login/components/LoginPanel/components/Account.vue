<template>
  <el-form ref="formEl" :model="account" label-width="70px" :rules="rules">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="account.username"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password"></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { Field } from './type'

const formEl = ref<InstanceType<typeof ElForm>>()

const account = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },

    {
      pattern: /[a-z0-9A-Z]{5,10}/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],

  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur'
    },

    {
      pattern: /^[a-z0-9A-Z]{3,}$/,
      message: '用户名必须是3位以上的字母或者数字~',
      trigger: 'blur'
    }
  ]
}

const login = () => {
  if (!formEl.value) return

  formEl.value.validate((valid, fields) => {
    if (valid) {
      console.log('login')
    } else {
      const { username, password } = fields as Field

      if (username) {
        // eslint-disable-next-line no-undef
        ElMessage.error(username[0].message)
      } else if (password) {
        // eslint-disable-next-line no-undef
        ElMessage.error(password[0].message)
      }
    }
  })
}

// eslint-disable-next-line no-undef
defineExpose({
  login
})
</script>

<style scoped></style>
