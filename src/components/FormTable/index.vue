<template>
  <Table
    :config="config"
    :tableData="data"
    :total="total"
    class="user-table"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :show-footer="footer"
    :show-header="header"
  >
    <template #header>
      <el-button v-if="isCreate" class="create-user" type="primary" @click="createData">新建</el-button>
    </template>

    <template #createAt="{ row: { createAt } }">
      {{ dayjs(createAt).format('YYYY-MM-DD HH:mm:ss') }}
    </template>

    <template #updateAt="{ row: { updateAt } }">
      {{ dayjs(updateAt).format('YYYY-MM-DD HH:mm:ss') }}
    </template>

    <template v-for="slot in slotsRef" :key="slot" #[slot]="{ row }">
      <slot :name="slot" :row="row" />
    </template>

    <template #handler="{ row }">
      <el-button type="text" v-if="isEdit" @click="editData(row)">
        <el-icon><edit /></el-icon>
        编辑
      </el-button>
      <el-button type="text" v-if="isDelete" @click="handleDelete(row.id)">
        <el-icon><delete /></el-icon>
        删除
      </el-button>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import dayjs from 'dayjs'
import { delPageData } from '/src/api/fetch'
import { checkPremission } from '/src/hooks/usePremission'
import { ITableConfig } from '/src/components/Table/types'

interface IDataType {
  id: number | string
  [prop: string]: unknown
}

// eslint-disable-next-line no-undef
const emits = defineEmits(['fetchData', 'delData', 'create', 'edit'])

// eslint-disable-next-line no-undef
const props = defineProps({
  config: {
    type: Object as PropType<ITableConfig>,
    required: true
  },

  pagename: {
    type: String,
    default: ''
  },

  total: {
    type: Number,
    default: 0
  },

  data: {
    type: Array as PropType<IDataType[]>,
    required: true
  },

  queryData: {
    type: Object,
    default: () => ({})
  },

  footer: {
    type: Boolean,
    default: true
  },

  header: {
    type: Boolean,
    default: true
  }
})

const currentPageRef = ref(1)
const pageSizeRef = ref(10)

const isCreate = checkPremission(props.pagename, 'create')
const isEdit = checkPremission(props.pagename, 'update')
const isDelete = checkPremission(props.pagename, 'delete')

const pageInfoRef = computed(() => ({
  offset: pageSizeRef.value * (currentPageRef.value - 1),
  size: pageSizeRef.value
}))

const slotsRef = computed(() => {
  const staticSlots = ['createAt', 'updateAt']

  const slots: string[] = []

  props.config.data.forEach(item => {
    if (item.slotName && !staticSlots.includes(item.slotName)) {
      slots.push(item.slotName)
    }
  })

  return slots
})

const handleSizeChange = (pageSize: number) => {
  pageSizeRef.value = pageSize

  emits('fetchData', {
    ...pageInfoRef.value,
    ...props.queryData
  })
}

const handleCurrentChange = (currentPage: number) => {
  currentPageRef.value = currentPage

  emits('fetchData', {
    ...pageInfoRef.value,
    ...props.queryData
  })
}

const handleDelete = async (id: number) => {
  try {
    const list = [...props.data]

    const item = list.find(item => item.id === id)
    const index = list.findIndex(item => item.id === id)

    emits('delData', {
      item,
      id,
      index
    })
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    }
  }
}

const createData = () => emits('create')

const editData = (row: IDataType) => {
  emits('edit', row)
}
</script>

<style scoped>
.create-user {
  display: flow-root;
  margin-left: auto;
}

.user-table {
  border-top: 10px solid #f0f2f5;
}

.el-icon {
  margin-right: 5px;
}
</style>
