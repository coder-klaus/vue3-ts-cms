<template>
  <el-container class="main">
    <el-aside :width="collapse ? '60px' : '210px'">
      <Sidebar :collapse="collapse" />
    </el-aside>
    <el-container class="page">
      <el-header class="page-header">
        <Header @changeCollapse="handleChangeCollapse" />
      </el-header>
      <el-main class="page-content">
        <div class="content">
          <router-view v-slot="{ Component }">
            <Transition mode="out-in" name="fade">
              <component :is="Component" />
            </Transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '/src/components/Sidebar/index.vue'
import Header from '/src/components/Header/index.vue'

const collapse = ref(false)

const handleChangeCollapse = () => {
  collapse.value = !collapse.value
}
</script>

<style scoped lang="scss">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.content {
  background-color: #fff;
}

.el-header {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
  height: 48px;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-avtive {
  transition: all 0.5s ease;
}
</style>
