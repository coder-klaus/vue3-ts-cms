export default [
  {
    path: '/main/product',
    redirect: '/main/product/category',
    component: () => import('/src/views/index.vue')
  },

  {
    path: '/main/product/category',
    component: () => import('../views/Product/Category.vue')
  },

  {
    path: '/main/product/goods',
    component: () => import('../views/Product/Goods.vue')
  }
]
