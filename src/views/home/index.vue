<template>
  <el-button type="primary">Home</el-button>
</template>

<script setup lang="ts">
import api from '/src/api/index.ts'

async function fetchData() {
  const res = await api.request({
    url: '/post',
    method: 'post',
    data: {
      name: 'Klaus'
    }
  })
  console.log(res)
}

fetchData()
</script>

<style scoped></style>
