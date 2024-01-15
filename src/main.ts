import './assets/main.css'

import './index.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Vue3TouchEvents from 'vue3-touch-events'

import VueGoogleMaps from '@fawmi/vue-google-maps'

import App from './App.vue'
import router from './router'

import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(Vue3TouchEvents)

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDBPVXjHFfyrSRrAigJhDKapwxuwWGTWuc'
    // language: 'de',
  }
})

app.use(Vue3Toasity, {
  autoClose: 3000
  // ...
} as ToastContainerOptions)

app.use(LoadingPlugin, {
  color: 'red'
})

app.use(router)

app.mount('#app')
