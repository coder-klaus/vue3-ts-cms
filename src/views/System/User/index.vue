<template>
  <SearchBar v-bind="formConfig" v-model="user">
    <template #header> 表单检索 </template>
  </SearchBar>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getUsers } from '/src/api/users'
import SearchBar from '/src/components/SearchBar/index.vue'
import { ISearchUser } from '/src/components/SearchBar/types'
import { formConfig } from './config'
import { IFetchUser, IUser } from './types'

interface IRes {
  list: IUser[]
  totalCount: number
}

const totalRef = ref(0)
const usersRef = ref<IUser[]>([])

const user: ISearchUser = reactive({
  id: '',
  name: '',
  sport: '',
  createTime: []
})

const fetchUsers = async () => {
  const { data: res } = await getUsers<IFetchUser, IRes>({
    offset: 0,
    size: 10
  })

  const { list: users, totalCount: total } = res
  totalRef.value = total
  usersRef.value = users
}

fetchUsers()
</script>
