<template>
  <el-menu
    :default-active="activeIndex + ''"
    class="nav-menu"
    active-text-color="#ffd04b"
    background-color="#001529"
    text-color="#fff"
    :collapse="collapse"
    :collapse-transition="false"
  >
    <template v-for="menu in menus" :key="menu.id">
      <template v-if="menu.children && !!menu.children.length">
        <!-- 一级菜单 -->
        <el-sub-menu :index="menu.id + ''">
          <template #title>
            <el-icon v-if="menu.icon">
              <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>

          <template v-for="submenu in menu.children" :key="submenu.id">
            <!-- 二级菜单 -->
            <router-link :to="submenu.url" custom v-slot="{ navigate }">
              <el-menu-item :index="submenu.id + ''" @click="navigate">
                <el-icon v-if="submenu.icon">
                  <component :is="submenu.icon" />
                </el-icon>
                <span>{{ submenu.name }}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-sub-menu>
      </template>

      <template v-else>
        <router-link :to="menu.url" custom v-slot="{ navigate }">
          <!-- 一级菜单 -->
          <el-menu-item :index="menu.id + ''" @click="navigate">
            <el-icon v-if="menu.icon">
              <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.name }}</span>
          </el-menu-item>
        </router-link>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '/src/store'
import { IMenu } from '/src/types'

const store = useLoginStore()

const route = useRoute()

// eslint-disable-next-line no-undef
defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

// 对后端返回的icon字符串 进行格式化
function formatIcon(menus: IMenu[]) {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (menu.icon) {
      // eslint-disable-next-line prefer-destructuring
      menu.icon = menu.icon.split('-')[2]
    }

    if (menu.children) {
      formatIcon(menu.children)
    }
  }
}

const menus = store.menusRef
const menuMap: Map<string, IMenu> = new Map()

const generateMenuMap = (menus: IMenu[]) => {
  for (const menu of menus) {
    if (menu.url) {
      menuMap.set(menu.url, menu)
    }

    if (menu.children) {
      generateMenuMap(menu.children)
    }
  }

  return menuMap
}

const activeIndex = ref(0)

const calcActiveIndex = (menus: IMenu[]) => {
  generateMenuMap(menus)
  const currentPath = route.path

  const currentRoute = menuMap.get(currentPath)

  if (currentRoute) {
    activeIndex.value = currentRoute.id
  }
}

if (menus) {
  formatIcon(menus)
  calcActiveIndex(menus)
}

watch(
  () => route.path,
  newV => {
    const currentRoute = menuMap.get(newV)

    if (currentRoute) {
      activeIndex.value = currentRoute.id
    }
  }
)
</script>

<style scoped lang="scss">
.nav-menu {
  height: 100%;
  background-color: #001529;
  border-right: none;
}

.foo {
}
</style>