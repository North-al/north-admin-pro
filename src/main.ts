import { createApp } from 'vue'
import { setupStyles } from './styles'

import App from './App.vue'

setupStyles()

createApp(App).mount('#app')
