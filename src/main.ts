import { setupStyles } from './styles'
import { setupRouter } from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

const app = createApp(App)
setupStyles()
setupRouter(app)
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => app.component(key, component))

app.mount('#app')
