import { createApp } from 'vue'
import App from './app.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/pages'
import { createPinia } from 'pinia'

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).use(pinia).mount('#app')
