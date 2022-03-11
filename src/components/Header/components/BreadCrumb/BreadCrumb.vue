<template>
  <el-breadcrumb separator="/" class="bread-crumb">
    <transition-group name="breadcrumb">
      <template v-for="crumb in crumbs" :key="crumb.name">
        <el-breadcrumb-item :to="{ path: crumb.path }" class="bread-crumb-item">
          {{ crumb.name }}
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
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

<style lang="scss" scoped>
.bread-crumb {
  .bread-crumb-item::v-deep {
    .el-breadcrumb__inner {
      font-weight: 400;
    }

    &:last-child {
      .el-breadcrumb__inner {
        color: #97a8be;
      }
    }
  }
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
}

.breadcrumb-move,
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s ease;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
