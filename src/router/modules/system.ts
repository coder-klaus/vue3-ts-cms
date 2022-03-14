export default [
  {
    path: '/main/system',
    redirect: '/main/system/user',
    component: () => import('/src/views/index.vue')
  },

  {
    path: '/main/system/user',
    component: () => import('/src/views/System/User/index.vue')
  },

  {
    path: '/main/system/department',
    component: () => import('/src/views/System/Department.vue')
  },

  {
    path: '/main/system/menu',
    component: () => import('../../views/System/Menu/index.vue')
  },

  {
    path: '/main/system/role',
    component: () => import('../../views/System/Role/index.vue')
  }
]
