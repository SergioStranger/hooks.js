import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './router'
import Clipboard from 'v-clipboard'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css';

createApp(App)
  .use(router)
  .use(Clipboard)
  .provide('notyf', new Notyf({
    duration: 2000,
    ripple: true,
    position: {
      x: 'right',
      y: 'top'
    },
    dismissible: false
  }))
  .mount('#app')