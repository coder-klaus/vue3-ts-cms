import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    component: () => import('../views/Home/index.vue')
  },

  {
    path: '/login',
    component: () => import('../views/Login/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach(to => {
  const token = Cookies.get('token')

  if (!token && to.path !== '/login') return '/login'
})

export default router
