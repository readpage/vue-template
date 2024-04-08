import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import "./assets/styles/index.scss"
import pinia from './store'
import router from './router'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')