<template>
  <el-card>
    <template #header>
      <span>{{ title }}</span>
    </template>
    <slot />
  </el-card>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
withDefaults(
  // eslint-disable-next-line no-undef
  defineProps<{
    title: string
  }>(),
  {
    title: ''
  }
)
</script>

<style scoped>
.row {
  margin-top: 10px;
}
</style>
