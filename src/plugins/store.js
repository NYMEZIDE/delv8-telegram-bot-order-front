import { createStore } from '@/services/store'

export const storePlugin = {
  install: (app) => {
    app.config.globalProperties.$store = createStore()
  }
}
