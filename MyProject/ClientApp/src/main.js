import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { sortBy } from 'lodash'

import App from './App.vue'
import router from './router'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import './assets/main.css'

let app = createApp(App)
Object.assign(window, { Vue: { component: app.component } })
webix.require(['https://desktopqa/libs/webix-forms/scripts/webix-vue.js'], _main_)

async function _main_() {
  app.use(createPinia())
  app.use(router)

  app.mount('#app')
}
// createApp(App).mount("#app");
