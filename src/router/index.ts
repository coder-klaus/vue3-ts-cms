import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main/analysis/overview'
  },

  {
    path: '/login',
    component: () => import('../views/Login/index.vue')
  },

  {
    path: '/main',
    redirect: '/main/analysis/overview',
    name: 'main',
    component: () => import('../App.vue')
  },

  {
    path: '/:notFound(.*)',
    component: () => import('../views/NotFound.vue')
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

router.beforeEach(to => {
  const token = Cookies.get('token')

  if (!token && to.path !== '/login') return '/login'
})

export default router
