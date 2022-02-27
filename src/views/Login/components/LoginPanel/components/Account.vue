<template>
  <el-form ref="formEl" :model="account" label-width="70px" :rules="rules">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="account.name"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { useLoginStore } from '/src/store/index.ts'
import { Field } from './type'

const loginStore = useLoginStore()

const formEl = ref<InstanceType<typeof ElForm>>()

interface Account {
  name: string
  password: string
}

const accountdFromLocal: Account | undefined = JSON.parse(localStorage.getItem('account') || '{}')

const account = reactive({
  name: accountdFromLocal?.name ?? '',
  password: accountdFromLocal?.password ?? ''
})

const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },

    {
      pattern: /[a-z0-9A-Z]{4,10}/,
      message: '用户名必须是4~10个字母或者数字~',
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

const login = (isSaveAccount: boolean) => {
  if (!formEl.value) return

  formEl.value.validate((valid, fields) => {
    if (valid) {
      if (isSaveAccount) {
        localStorage.setItem('account', JSON.stringify(account))
      } else {
        localStorage.removeItem('account')
      }

      loginStore.login(account)
    } else {
      const { name, password } = fields as Field

      if (name) {
        // eslint-disable-next-line no-undef
        ElMessage.error(name[0].message)
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
