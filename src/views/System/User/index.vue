<template>
  <div>
    <SearchBar v-bind="formConfig" v-model="userRef" @search="search">
      <template #header> 表单检索 </template>
      <template #footer>
        <div class="search-footer">
          <el-button size="small" type="warning" plain @click="reset">重置</el-button>
          <el-button size="small" type="primary" plain @click="search"> 搜索 </el-button>
        </div>
      </template>
    </SearchBar>

    <FormTable
      :config="tableConfig"
      :data="usersRef"
      :query-data="userRef"
      :total="totalRef"
      @fetchData="fetchUsers"
      pagename="users"
    >
      <template #status="{ row: { enable } }">
        <el-tag :type="enable === 1 ? 'success' : 'danger'">
          {{ enable === 1 ? '开启' : '封禁' }}
        </el-tag>
      </template>
    </FormTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from '/src/components/SearchBar/index.vue'
import FormTable from '/src/components/FormTable/index.vue'
import { getList } from '../../../api/fetch'
import { checkPremission } from '/src/hooks/usePremission'
import { formConfig } from './config/search.config'
import { tableConfig } from './config/table.config'
import { IFetch } from '/src/types'
import { IUser } from './types'

interface IRes {
  list: IUser[]
  totalCount: number
}

const totalRef = ref(0)
const usersRef = ref<IUser[]>([])

const isQuery = checkPremission('users', 'query')

const defaultUser = {
  id: '',
  name: '',
  cellphone: '',
  createAt: ''
}

const userRef = ref<Partial<IUser>>(defaultUser)

const fetchUsers = async (query: Partial<IUser> = {}) => {
  if (!isQuery) return false

  const { data: res } = await getList<Partial<IUser> & IFetch, IRes>('users', {
    offset: 0,
    size: 10,
    ...query
  })

  const { list: users, totalCount: total } = res
  totalRef.value = total
  usersRef.value = users
}

const reset = async () => {
  userRef.value = defaultUser
  fetchUsers(userRef.value)
}

const search = () => fetchUsers(userRef.value)

fetchUsers()
</script>

<style lang="scss" scoped>
.search-footer {
  text-align: right;
}
</style>
