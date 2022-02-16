import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    component: () => import('../components/Home.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
