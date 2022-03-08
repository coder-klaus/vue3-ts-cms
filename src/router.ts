import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
import asyncRoute from '/src/routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main/analysis/overview'
  },

  {
    path: '/login',
    component: () => import('./views/Login/index.vue')
  },

  {
    path: '/main',
    redirect: '/main/analysis/overview',
    name: 'main',
    component: () => import('./views/Home/index.vue')
  },

  {
    path: '/:notFound(.*)',
    component: () => import('./views/NotFound.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export function registerAsyncRoutes(asyncRoute: RouteRecordRaw[]) {
  for (const route of asyncRoute) {
    router.addRoute('main', route)
  }
}

registerAsyncRoutes(asyncRoute)

router.beforeEach(to => {
  const token = Cookies.get('token')

  if (!token && to.path !== '/login') return '/login'
})

export default router
