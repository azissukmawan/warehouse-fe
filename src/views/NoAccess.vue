<template>
  <main class="flex flex-1 h-screen items-center justify-center bg-monday-background">
    <div class="flex flex-col items-center gap-8 text-center max-w-md px-6">
      <!-- Icon -->
      <div class="flex size-24 rounded-full bg-monday-blue/10 items-center justify-center">
        <img
          src="@/assets/images/icons/key-grey.svg"
          class="size-12"
          alt="no access icon"
          @error="handleIconError"
        >
      </div>

      <!-- Text Content -->
      <div class="flex flex-col gap-3">
        <h1 class="font-bold text-3xl text-monday-black">Akses Tidak Tersedia</h1>
        <p class="font-medium text-monday-gray leading-relaxed">
          Akun Anda (role: <span class="font-semibold text-monday-black">{{ userRole || 'tidak diketahui' }}</span>)
          belum memiliki akses ke halaman manapun.
        </p>
        <p class="font-medium text-monday-gray leading-relaxed">
          Hubungi administrator untuk mendapatkan hak akses yang sesuai.
        </p>
      </div>

      <!-- User Info Card -->
      <div class="w-full rounded-3xl border border-monday-border bg-white p-5 flex flex-col gap-3 text-left">
        <p class="font-semibold text-sm text-monday-gray uppercase tracking-wide">Informasi Akun</p>
        <div class="flex items-center justify-between">
          <span class="font-medium text-monday-gray">Email</span>
          <span class="font-semibold">{{ userEmail || '-' }}</span>
        </div>
        <hr class="border-monday-border">
        <div class="flex items-center justify-between">
          <span class="font-medium text-monday-gray">Role</span>
          <span
            class="font-semibold px-3 py-1 rounded-full text-sm"
            :class="userRole ? 'bg-monday-blue/10 text-monday-blue' : 'bg-red-100 text-red-600'"
          >
            {{ userRole || 'Belum ada role' }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col gap-3 w-full">
        <button
          @click="handleLogout"
          class="btn btn-primary w-full font-bold flex items-center justify-center gap-2"
          :disabled="loggingOut"
        >
          <div v-if="loggingOut" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {{ loggingOut ? 'Keluar...' : 'Keluar dari Akun' }}
        </button>

        <button
          @click="handleRetry"
          class="btn btn-primary-opacity w-full font-semibold"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'NoAccess',
  data() {
    return {
      loggingOut: false,
    }
  },
  computed: {
    userRole() {
      const authStore = useAuthStore()
      return authStore.userRole || ''
    },
    userEmail() {
      const authStore = useAuthStore()
      return authStore.currentUser?.email || ''
    },
  },
  methods: {
    async handleLogout() {
      this.loggingOut = true
      try {
        const authStore = useAuthStore()
        await authStore.logout()
        this.$router.push('/')
      } catch (error) {
        console.error('Logout error:', error)
        this.$router.push('/')
      } finally {
        this.loggingOut = false
      }
    },
    handleRetry() {
      // Coba redirect ke URL yang sesuai dengan role
      const authStore = useAuthStore()
      const redirectUrl = authStore.getRedirectUrl()
      if (redirectUrl && redirectUrl !== '/no-access') {
        this.$router.push(redirectUrl)
      } else {
        // Jika masih tidak ada akses, logout
        this.handleLogout()
      }
    },
    handleIconError(event) {
      event.target.style.display = 'none'
    },
  },
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>
