import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    component: () => import('../views/home/inde.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
