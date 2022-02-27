import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import { useLoginStore } from './store/index'

import 'normalize.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const store = useLoginStore()
store.initStore()

app.mount('#app')
