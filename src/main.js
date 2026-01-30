import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'
import { useAuthStore } from './stores/auth'

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Inisialisasi auth store dengan error handling
try {
  const authStore = useAuthStore()
  // Check auth secara async tapi jangan tunggu hasilnya
  authStore.checkAuth().catch(error => {
    console.error('Error checking auth:', error)
  })
} catch (error) {
  console.error('Error initializing auth store:', error)
}

// Global error handler untuk Vue
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
}

app.mount('#app') 
