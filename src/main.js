import { createApp } from 'vue'
import { router } from './services/router'
import { storePlugin } from './plugins/store'
import App from './App.vue'

const app = createApp(App)

app.use(router)
  .use(storePlugin)
  .mount('#app')
