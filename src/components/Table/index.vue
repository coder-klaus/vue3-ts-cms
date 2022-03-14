<template>
  <div>
    <div class="header" v-if="showHeader">
      <slot name="header" />
    </div>

    <el-table :data="tableData" border stripe v-bind="config.expand">
      <el-table-column
        v-if="config.showIndex?.label"
        :index="indexMethod"
        type="index"
        :label="config.showIndex.label"
        :width="config.showIndex?.width ?? 80"
        :align="config.showIndex?.align ?? 'center'"
      />

      <template v-for="item in config.data" :key="item.prop">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :align="item.align ?? 'center'">
          <template #default="{ row }">
            <slot :name="item.slotName ?? item.prop" :row="row">
              {{ row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>

      <template v-if="config.handler">
        <el-table-column
          :label="config.handler.label"
          :width="config.handler.width"
          :align="config.handler.align ?? 'center'"
        >
          <template #default="{ row }">
            <slot :name="config.handler.slotName" :row="row" />
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          class="pagination"
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { ITableConfig } from './types'

// eslint-disable-next-line no-undef
const emits = defineEmits(['handleSizeChange', 'handleCurrentChange'])

// eslint-disable-next-line no-undef
defineProps({
  config: {
    type: Object as PropType<ITableConfig>,
    required: true
  },

  tableData: {
    type: Array,
    required: true
  },

  total: {
    type: Number,
    default: 0
  },

  showFooter: {
    type: Boolean,
    default: true
  },

  showHeader: {
    type: Boolean,
    default: true
  }
})

const currentPage = ref(1)
const pageSize = ref(10)

const indexMethod = (index: number) => index + pageSize.value * (currentPage.value - 1) + 1

const handleSizeChange = (pageSize: number) => emits('handleSizeChange', pageSize)

const handleCurrentChange = (currentPage: number) => emits('handleCurrentChange', currentPage)
</script>

<style scoped>
.header,
.footer {
  padding: 15px;
}

.pagination {
  justify-content: flex-end;
}
</style>
