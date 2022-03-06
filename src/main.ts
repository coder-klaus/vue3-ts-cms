import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Icons from '@element-plus/icons'
import router from './router'
import App from './App.vue'

import { useLoginStore } from './store/index'

import 'normalize.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

const store = useLoginStore()
store.initStore()

app.mount('#app')
