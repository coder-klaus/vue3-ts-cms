<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './components/LoginPanel/index.vue'
</script>

<style scoped>
.login {
  background: url('./images/login-bg.svg') center/contain no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
