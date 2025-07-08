import { createApp } from 'vue'
import { setupStyles } from './styles'
import { setupRouter } from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import pinia from './store'

const app = createApp(App)

// 设置store
app.use(pinia)

// 设置样式
setupStyles()

// 设置路由
setupRouter(app)

// 注册Element Plus图标
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => app.component(key, component))

app.mount('#app')
