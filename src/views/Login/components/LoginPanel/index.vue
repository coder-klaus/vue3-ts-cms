<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="activeTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><avatar /></el-icon>
            账号登录
          </span>
        </template>

        <Account ref="accountCpn" />
      </el-tab-pane>
    </el-tabs>

    <el-checkbox v-model="isSaveAccount" label="记住密码" class="save-account" />

    <el-button type="primary" class="login" @click="login">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Avatar } from '@element-plus/icons-vue'
import Account from './components/Account.vue'

const activeTab = ref('account')
const isSaveAccount = ref(true)

if (localStorage.getItem('account') && !isSaveAccount.value) {
  isSaveAccount.value = true
}

type AccountCpn = (InstanceType<typeof Account> & { login: (needSave: boolean) => void }) | null
const accountCpn = ref<AccountCpn>(null)

const login = () => {
  accountCpn.value?.login(isSaveAccount.value)
}
</script>

<style scoped lang="scss">
.login-panel {
  width: 320px;
  text-align: center;

  .login {
    width: 100%;
    margin-top: 20px;
  }

  .save-account {
    display: flex;
    justify-content: end;
    margin-top: 10px;
  }
}
</style>
