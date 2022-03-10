<template>
  <SearchBar v-bind="formConfig" v-model="userRef">
    <template #header> 表单检索 </template>
  </SearchBar>

  <Table :configs="tableConfig" :tableData="usersRef" class="user-table">
    <template #status="{ row: { enable } }">
      <el-tag :type="enable === 1 ? 'success' : 'danger'">
        {{ enable === 1 ? '开启' : '封禁' }}
      </el-tag>
    </template>

    <template #createAt="{ row: { createAt } }">
      {{ dayjs(createAt).format('YYYY-MM-DD HH:mm:ss') }}
    </template>

    <template #updateAt="{ row: { updateAt } }">
      {{ dayjs(updateAt).format('YYYY-MM-DD HH:mm:ss') }}
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import dayjs from 'dayjs'
import { getUsers } from '/src/api/users'
import SearchBar from '/src/components/SearchBar/index.vue'
import Table from '/src/components/Table/index.vue'
import { ISearchUser } from '/src/components/SearchBar/types'
import { formConfig, tableConfig } from './config'
import { IFetchUser, IUser } from './types'

interface IRes {
  list: IUser[]
  totalCount: number
}

const totalRef = ref(0)
const usersRef = ref<IUser[]>([])

const userRef: Ref<ISearchUser> = ref({
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

<style lang="scss" scoped>
.user-table {
  padding: 15px;
  border-top: 10px solid #f0f2f5;
}
</style>
