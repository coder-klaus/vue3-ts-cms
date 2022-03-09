export default [
  {
    path: '/main/story',
    redirect: '/main/story/chat',
    component: () => import('/src/views/index.vue')
  },

  {
    path: '/main/story/chat',
    component: () => import('/src/views/Story/Chat.vue')
  },

  {
    path: '/main/story/list',
    component: () => import('/src/views/Story/List.vue')
  }
]
