<template>
  <div>
    <Form v-bind="formConfig" v-model="roleRef" @search="search">
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

    <FromTable
      :config="tableConfig"
      :data="rolesRef"
      :query-data="roleRef"
      :total="totalRef"
      @fetchData="fetchRoles"
      pagename="role"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Form from '/src/components/Form/index.vue'
import FromTable from '/src/components/FormTable/index.vue'
import { checkPremission } from '/src/hooks/usePremission'
import { formConfig } from './config/search.config'
import { tableConfig } from './config/table.config'
import { getList } from '../../../api/fetch'
import { IFetch } from '/src/types'
import { IRole } from './types'

interface IRes {
  list: IRole[]
  totalCount: number
}

const totalRef = ref(0)
const rolesRef = ref<IRole[]>([])

const isQuery = checkPremission('role', 'query')

const defaultRole = {
  id: '',
  name: '',
  intro: '',
  createAt: '',
  updateAt: ''
}

const roleRef = ref<Partial<IRole>>(defaultRole)

const fetchRoles = async (query: Partial<IRole> = {}) => {
  if (!isQuery) return

  const { data: res } = await getList<Partial<IRole> & IFetch, IRes>('role', {
    offset: 0,
    size: 10,
    ...query
  })

  const { list: users, totalCount: total } = res
  totalRef.value = total
  rolesRef.value = users
}

const reset = async () => {
  roleRef.value = defaultRole
  fetchRoles()
}

const search = () => {
  fetchRoles(roleRef.value)
}

fetchRoles()
</script>

<style scoped>
.search-footer {
  text-align: right;
}

.header,
.search-footer {
  padding: 15px;
}
</style>
