import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useAuthStore } from './stores/auth'
;(async () => {
  const app = createApp(App)
  const vuetify = createVuetify({
    components,
    directives,
  })

  const pinia = createPinia()
  app.use(pinia)

  const auth = useAuthStore()
  await auth.init() // ⏳

  app.use(router)
  app.use(vuetify)

  app.mount('#app')
})()
