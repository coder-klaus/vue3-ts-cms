<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/main/analysis/overview" custom v-slot="{ navigate }">
          <el-dropdown-item @click="navigate">核心技术</el-dropdown-item>
        </router-link>

        <router-link to="/main/analysis/dashboard" custom v-slot="{ navigate }">
          <el-dropdown-item @click="navigate">商品统计</el-dropdown-item>
        </router-link>

        <el-dropdown-item divided @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Cookie from 'js-cookie'
import { useLoginStore } from '/src/store'

const store = useLoginStore()
const name = store.userInfoRef?.name

const router = useRouter()

const loginOut = () => {
  localStorage.removeItem('menus')
  localStorage.removeItem('userInfo')
  Cookie.remove('token')
  router.push('/login')
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>
