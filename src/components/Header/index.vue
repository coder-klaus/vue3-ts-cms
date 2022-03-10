<template>
  <div class="header">
    <el-icon class="el-expend" @click="handleClick">
      <expand v-if="isExpend" />
      <fold v-else />
    </el-icon>

    <div class="content">
      <BreadCrumb :crumbs="readonly(crumbs)" />
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, readonly } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumb, { ICrumb } from './components/BreadCrumb'
import UserInfo from './components/UserInfo.vue'
import menuMap from '/src/utils/menuMap'

// eslint-disable-next-line no-undef
const emit = defineEmits(['changeCollapse'])

const isExpend = ref(false)
const route = useRoute()
const crumbs = ref<ICrumb[]>([])

const handleClick = () => {
  isExpend.value = !isExpend.value
  emit('changeCollapse', isExpend.value)
}

const generateCrumbs = (path: string) => {
  if (!path.length) return

  const menu = menuMap.get(path)

  if (menu) {
    crumbs.value.unshift({
      path,
      name: menu.name
    })
  }
  const paths = path.split('/')
  paths.pop()
  generateCrumbs(paths.join('/'))
}

watch(
  () => route.path,
  newV => {
    crumbs.value = []
    generateCrumbs(newV)
  },
  {
    immediate: true
  }
)
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
