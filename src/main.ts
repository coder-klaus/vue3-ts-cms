import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Icons from '@element-plus/icons'
import router from './router'
import App from './App.vue'

import { useLoginStore } from './store/index'

import 'normalize.css'

const app = createApp(App)
app.use(createPinia())

const store = useLoginStore()
store.initStore()

// 必须在注册完动态路由以后 才可以去匹配对应的路由对象
app.use(router)

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.mount('#app')
