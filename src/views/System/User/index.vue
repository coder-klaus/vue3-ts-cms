<template>
  <div>
    <Form v-bind="formConfig" v-model="searchRef" @search="search">
      <template #header>
        <div class="header">表单检索</div>
      </template>

      <template #footer>
        <div class="search-footer">
          <el-button size="small" type="warning" plain @click="reset">重置</el-button>
          <el-button size="small" type="primary" plain @click="search"> 搜索 </el-button>
        </div>
      </template>
    </Form>

    <FormTable
      :config="tableConfig"
      :data="usersRef"
      :query-data="searchRef"
      :total="totalRef"
      pagename="users"
      @edit="edit"
      @create="create"
      @delData="delUser"
      @fetchData="fetchUsers"
    >
      <template #status="{ row: { enable } }">
        <el-tag :type="enable === 1 ? 'success' : 'danger'">
          {{ enable === 1 ? '开启' : '封禁' }}
        </el-tag>
      </template>
    </FormTable>

    <Modal :title="titleRef" v-model:visible="showDialog" :config="modalConfig" :data="userRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Form from '/src/components/Form/index.vue'
import FormTable from '/src/components/FormTable/index.vue'
import Modal from '/src/components/Modal/index.vue'
import { getList } from '../../../api/fetch'
import { checkPremission } from '/src/hooks/usePremission'
import { formConfig } from './config/search.config'
import { tableConfig } from './config/table.config'
import { modalConfig } from './config/modal.config'
import { IFetch } from '/src/types'
import { IUser } from './types'

interface IRes {
  list: IUser[]
  totalCount: number
}

const totalRef = ref(0)
const usersRef = ref<IUser[]>([])

const isQuery = checkPremission('users', 'query')

const showDialog = ref(false)
const titleRef = ref('新建用户')

const defaultUser = {
  id: '',
  name: '',
  cellphone: '',
  createAt: ''
}

const defaultSearch = {
  id: '',
  name: '',
  cellphone: '',
  createAt: ''
}

const searchRef = ref<Partial<IUser>>(defaultSearch)
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
  searchRef.value = defaultUser
  fetchUsers(searchRef.value)
}

const search = () => fetchUsers(searchRef.value)

const delUser = ({ index }: { index: number }) => {
  usersRef.value.splice(index, 1)
}

const create = () => {
  showDialog.value = true
  titleRef.value = '新建用户'

  const config = modalConfig.formConfig.configs.find(config => config.field === 'password')

  if (config?.isHidden) {
    config.isHidden = false
  }
}

const edit = (row: IUser) => {
  showDialog.value = true
  titleRef.value = '编辑用户'
  userRef.value = row

  const config = modalConfig.formConfig.configs.find(config => config.field === 'password')

  if (config) {
    config.isHidden = true
  }
}

fetchUsers()
</script>

<style lang="scss" scoped>
.search-footer {
  text-align: right;
}

.header,
.search-footer {
  padding: 15px;
}
</style>
