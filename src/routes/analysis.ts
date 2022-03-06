export default [
  {
    path: '/main/analysis',
    redirect: '/main/analysis/overview',
    component: () => import('/src/views/Main/Analysis/index.vue'),
    meta: {
      title: '系统总览'
    }
  },

  {
    path: '/main/analysis/overview',
    component: () => import('/src/views/Main/Analysis/Overview.vue'),
    meta: {
      title: '核心技术'
    }
  },

  {
    path: '/main/analysis/dashboard',
    component: () => import('/src/views/Main/Analysis/Dashboard.vue'),
    meta: {
      title: '商品统计'
    }
  }
]
