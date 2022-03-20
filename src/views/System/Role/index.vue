<template>
  <div>
    <Form v-bind="formConfig" v-model="searchRoleRef" @search="search">
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
      :query-data="searchRoleRef"
      :total="totalRef"
      @edit="edit"
      @create="create"
      @delData="delRole"
      @fetchData="fetchRoles"
      pagename="role"
    />

    <Modal
      :title="titleRef"
      v-model:visible="showDialog"
      v-model:data="roleRef"
      :config="modalConfig"
      @confirm="confirm"
    >
      <el-tree
        :data="menusRef"
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        :default-checked-keys="checkedKeysRef"
        show-checkbox
        @check="handleKeyChanged"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Form from '/src/components/Form/index.vue'
import FromTable from '/src/components/FormTable/index.vue'
import Modal from '/src/components/Modal/index.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { checkPremission } from '/src/hooks/usePremission'
import { formConfig } from './config/search.config'
import { tableConfig } from './config/table.config'
import { modalConfig } from './config/modal.config'
import { getList, patchPageData, createPageData, delPageData } from '../../../api/fetch'
import { IFetch, IMenu } from '/src/types'
import { IRole } from './types'

interface IRes {
  list: IRole[]
  totalCount: number
}

interface IMenuRes {
  list: IMenu[]
  totalCount: number
}

const totalRef = ref(0)
const rolesRef = ref<IRole[]>([])
const menusRef = ref<IMenu[]>([])
const checkedKeysRef = ref<number[]>([])

const isQuery = checkPremission('role', 'query')

const showDialog = ref(false)
const titleRef = ref('新建角色')

const defaultRole = {
  name: '',
  intro: '',
  menuList: []
}

const searchRoleRef = ref<Partial<IRole>>(defaultRole)
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

const fetchMenus = async () => {
  const {
    data: { list }
  } = await getList<Partial<IMenu> & IFetch, IMenuRes>('menu', {
    offset: 0,
    size: 1000 // 确保可以拉取到所有的数据
  })

  menusRef.value = [...list]
}

fetchRoles()
fetchMenus()

const reset = async () => {
  roleRef.value = defaultRole
  fetchRoles()
}

const search = () => fetchRoles(searchRoleRef.value)

const confirm = async (v: IRole) => {
  const opt = v.id ? '更新' : '新建'
  let code

  try {
    const { name, intro, menuList } = v
    if (v.id) {
      // edit role
      const { code: _code } = await patchPageData(`/role/${v.id}`, { name, intro, menuList })
      code = _code
    } else {
      // create role
      const { code: _code } = await createPageData('/role', { name, intro, menuList })
      code = _code
    }

    if (code === 0) {
      ElMessage({
        message: `${opt}角色成功`,
        type: 'success'
      })

      fetchRoles()
    } else {
      ElMessage.error(`${opt}角色失败`)
    }
  } catch (e) {
    if (e instanceof Error) {
      ElMessage.error(`${opt}角色失败`)

      console.error(e.message)
    }
  }
}

const delRole = async ({ index, id }: { index: number; id: number }) => {
  rolesRef.value.splice(index, 1)
  await delPageData(`/role/${id}`)
}

const create = () => {
  showDialog.value = true
  titleRef.value = '新建角色'
  roleRef.value = defaultRole
}

const recurseCheckedIds = (menus: IMenu[] | number[], menuIds: number[] = []) => {
  menus.forEach(menu => {
    if (typeof menu === 'number') return

    if (menu.children?.length) {
      recurseCheckedIds(menu.children, menuIds)
    }

    if (!menu.children) {
      menuIds.push(menu.id)
    }
  })
}

const edit = (row: IRole) => {
  showDialog.value = true
  titleRef.value = '编辑角色'

  const menus: number[] = []

  roleRef.value = row

  recurseCheckedIds(row.menuList, menus)

  checkedKeysRef.value = menus
}

const handleKeyChanged = (
  _: never,
  { checkedKeys, halfCheckedKeys }: { checkedKeys: number[]; halfCheckedKeys: number[] }
) => {
  roleRef.value.menuList = [...checkedKeys, ...halfCheckedKeys]
}
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
