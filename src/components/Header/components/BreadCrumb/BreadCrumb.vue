<template>
  <div>
    <el-breadcrumb separator="/">
      <template v-for="crumb in crumbs" :key="crumb.name">
        <el-breadcrumb-item v-if="crumb.path" :to="{ path: crumb.path }">
          {{ crumb.name }}
        </el-breadcrumb-item>

        <el-breadcrumb-item v-else>{{ crumb.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { PropType, DeepReadonly } from 'vue'
import { ICrumb } from './types'

// eslint-disable-next-line no-undef
defineProps({
  crumbs: {
    type: Array as PropType<DeepReadonly<ICrumb[]>>,
    required: true
  }
})
</script>
