<template>
  <div id="app">
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="text-center">
        <div class="loading-spinner mx-auto mb-4"></div>
        <p class="text-gray-600">Loading...</p>
      </div>
    </div>
    <div v-else-if="hasError" class="error-container">
      <div class="text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h1>
        <p class="text-gray-600 mb-4">{{ errorMessage }}</p>
        <button @click="retryLoad" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Coba Lagi
        </button>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth'

export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
      hasError: false,
      errorMessage: ''
    }
  },
  async mounted() {
    await this.initializeApp()
  },
  methods: {
    async initializeApp() {
      try {
        this.isLoading = true
        this.hasError = false
        this.errorMessage = ''
        
        const authStore = useAuthStore()
        await authStore.checkAuth()
        
        this.isLoading = false
      } catch (error) {
        console.error('Error in App mounted:', error)
        this.hasError = true
        this.errorMessage = 'Gagal memuat aplikasi. Silakan refresh halaman.'
        this.isLoading = false
      }
    },
    retryLoad() {
      this.initializeApp()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Lexend Deca', sans-serif;
}
</style> 