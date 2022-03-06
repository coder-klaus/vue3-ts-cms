<template>
  <div class="header">
    <el-icon class="el-expend" @click="handleClick">
      <expand v-if="isExpend" />
      <fold v-else />
    </el-icon>

    <div class="content">
      <div>bread</div>
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserInfo from './components/UserInfo.vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['changeCollapse'])

const isExpend = ref(false)

const handleClick = () => {
  isExpend.value = !isExpend.value
  emit('changeCollapse', isExpend.value)
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  width: 100%;

  .el-expend {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
