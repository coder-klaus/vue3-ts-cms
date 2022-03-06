export default [
  {
    path: '/main/system',
    redirect: '/main/system/user',
    component: () => import('/src/views/Main/System/index.vue'),
    meta: {
      title: '系统管理'
    }
  },

  {
    path: '/main/system/user',
    component: () => import('../views/Main/System/components/User/index.vue'),
    meta: {
      title: '用户管理'
    }
  },

  {
    path: '/main/system/department',
    component: () => import('/src/views/Main/System/components/Department.vue'),
    meta: {
      title: '部门管理'
    }
  },

  {
    path: '/main/system/menu',
    component: () => import('/src/views/Main/System/components/Menu.vue'),
    meta: {
      title: '菜单管理'
    }
  },

  {
    path: '/main/system/role',
    component: () => import('/src/views/Main/System/components/Role.vue'),
    meta: {
      title: '角色管理'
    }
  }
]
