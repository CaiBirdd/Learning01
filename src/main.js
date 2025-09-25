// import './assets/main.css' 万恶之首 样式混乱都是引入这玩意导致的！！！

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import '@/styles/common.scss'
import { LazyPlugin } from './directives'
import { componentPlugin } from './components'

//pinia持久化 也就是存到local
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)


app.use(router)

app.mount('#app')
app.use(LazyPlugin)
app.use( componentPlugin)