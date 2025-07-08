import { setupStyles } from './styles'
import { setupRouter } from './router'

import App from './App.vue'

const app = createApp(App)
setupStyles()
setupRouter(app)

app.mount('#app')
