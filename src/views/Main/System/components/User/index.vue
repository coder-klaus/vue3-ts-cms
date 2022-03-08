<template>
  <SearchBar v-bind="formConfig" v-model="user">
    <template #header> 表单检索 </template>
  </SearchBar>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import SearchBar from '/src/components/SearchBar/index.vue'
import { IUser } from '/src/components/SearchBar/types'
import { formConfig } from './config'

const user: IUser = reactive({
  id: '',
  name: '',
  sport: '',
  createTime: []
})
</script>
