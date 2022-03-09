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
    component: () => import('../views/System/Department.vue')
  },

  {
    path: '/main/system/menu',
    component: () => import('../views/System/Menu.vue')
  },

  {
    path: '/main/system/role',
    component: () => import('../views/System/Role.vue')
  }
]
