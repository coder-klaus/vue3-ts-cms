<template>
  <FormTable :config="tableConfig" :data="menuRef" :footer="false" :header="false">
    <template #type="{ row }">
      {{ row.type === 1 ? '一级菜单' : row.type === 2 ? '二级菜单' : '操作' }}
    </template>
    <template #permission="{ row }">
      {{ row.permission ? row.permission : '所有人' }}
    </template>
  </FormTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getList } from '../../../api/fetch'
import FormTable from '/src/components/FormTable/index.vue'
import { tableConfig } from './table.config'
import { IMenu } from '/src/types'

interface IRes {
  list: IMenu[]
  totalCount: number
}

const menuRef = ref<IMenu[]>([])

const fetchMenu = async () => {
  const { data } = await getList<Record<string, unknown>, IRes>('menu', {})
  menuRef.value = data.list
}

fetchMenu()
</script>

<style scoped></style>
