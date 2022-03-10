export default [
  {
    path: '/main/product',
    redirect: '/main/product/category',
    component: () => import('/src/views/index.vue')
  },

  {
    path: '/main/product/category',
    component: () => import('/src/views/Product/Category.vue')
  },

  {
    path: '/main/product/goods',
    component: () => import('/src/views/Product/Goods.vue')
  }
]
