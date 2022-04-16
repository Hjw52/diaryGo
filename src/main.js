import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import router from './router'
import * as icons from '@element-plus/icons-vue'

const app = createApp(App).use(router).use(ElementPlus)
Object.keys(icons).forEach(key => {
    app.component(key,icons[key])
})
app.mount('#app')
