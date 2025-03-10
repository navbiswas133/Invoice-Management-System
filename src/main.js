// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#3B82F6', 
          secondary: '#EFF6FF', // Light blue background
          accent: '#10B981',   // Green accent
          error: '#EF4444',    // Red for errors
        }
      }
    }
  }
})

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')