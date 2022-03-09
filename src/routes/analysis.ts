export default [
  {
    path: '/main/analysis',
    redirect: '/main/analysis/overview',
    component: () => import('/src/views/index.vue')
  },

  {
    path: '/main/analysis/overview',
    component: () => import('../views/Analysis/Overview.vue')
  },

  {
    path: '/main/analysis/dashboard',
    component: () => import('../views/Analysis/Dashboard.vue')
  }
]
