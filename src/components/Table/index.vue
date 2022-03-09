<template>
  <el-table :data="tableData" border stripe>
    <template v-for="config in configs" :key="config.prop">
      <el-table-column
        :prop="config.prop"
        :label="config.label"
        :width="config.width"
        :align="config.align ?? 'center'"
      >
        <template #default="{ row }">
          <slot :name="config.slotName ?? config.prop" :row="row">
            {{ row[config.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ItableConfig } from './types'

// eslint-disable-next-line no-undef
defineProps({
  configs: {
    type: Array as PropType<ItableConfig[]>,
    required: true
  },

  tableData: {
    type: Array,
    required: true
  }
})
</script>

<style scoped></style>
