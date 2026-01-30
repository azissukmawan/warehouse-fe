<template>
    <div id="Top-Bar" class="flex items-center w-full gap-6 mt-[30px] mb-6">
      <div class="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
        <div class="flex flex-col gap-[6px] w-full">
          <h1 class="font-bold text-2xl">{{ title }}</h1>
          <router-link v-if="breadcrumbText" :to="breadcrumbLink" class="flex items-center gap-[6px] text-monday-gray font-semibold">
            <img src="@/assets/images/icons/arrow-left-grey.svg" class="size-4 flex shrink-0" alt="icon">
            {{ breadcrumbText }}
          </router-link>
        </div>
        <div class="flex items-center flex-nowrap gap-3">
          <a href="#">
            <div class="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
              <img src="@/assets/images/icons/search-normal-black.svg" class="size-6" alt="icon">
            </div>
          </a>
          <a href="#">
            <div class="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
              <img src="@/assets/images/icons/notification-black.svg" class="size-6" alt="icon">
            </div>
          </a>
          <div class="relative w-fit">
            <div class="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden">
              <img src="@/assets/images/icons/crown-black-fill.svg" class="size-6" alt="icon">
            </div>
            <p class="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]">PRO</p>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3 h-[92px] bg-white w-fit rounded-3xl p-[18px] relative">
        <div class="flex rounded-full overflow-hidden size-14">
          <div v-if="userLoading" class="flex size-full items-center justify-center bg-monday-gray-background">
            <img src="@/assets/images/icons/loading.svg" class="size-6 animate-spin" alt="loading">
          </div>
          <img v-else :src="currentUser?.avatar || '/src/assets/images/photos/photos-1.png'" class="size-full object-cover" alt="photo">
        </div>
        <div class="flex flex-col gap-1 min-w-[120px] max-w-[160px] w-fit">
          <div v-if="userLoading" class="flex flex-col gap-1">
            <div class="h-5 bg-monday-gray-background rounded animate-pulse"></div>
            <div class="h-4 bg-monday-gray-background rounded animate-pulse w-16"></div>
          </div>
          <template v-else>
            <p class="font-semibold">{{ currentUser?.name || userName }}</p>
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/user-grey.svg" class="size-4" alt="icon"> 
              {{ currentUser?.roles || userRole }}
            </p>
          </template>
        </div>
        <button 
          @click="handleLogout" 
          class="flex w-6 h-6 items-center justify-center hover:opacity-70 transition-opacity cursor-pointer relative z-10" 
          title="Logout"
          type="button"
        >
          <img src="@/assets/images/icons/logout.svg" class="flex size-6 shrink-0 pointer-events-none" alt="icon">
        </button>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirm" class="fixed inset-0 z-50 flex items-center justify-center">
      <div @click="cancelLogout" class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative bg-white rounded-3xl p-6 w-96 max-w-[90vw]">
        <div class="flex items-center gap-4 mb-6">
          <div class="flex size-12 rounded-full bg-red-100 items-center justify-center">
            <img src="@/assets/images/icons/logout.svg" class="size-6" alt="logout">
          </div>
          <div>
            <h3 class="font-bold text-xl">Konfirmasi Logout</h3>
            <p class="text-monday-gray">Apakah Anda yakin ingin keluar?</p>
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="cancelLogout" class="flex-1 px-4 py-2 border border-monday-border rounded-2xl font-medium hover:bg-monday-gray-background transition-colors">
            Batal
          </button>
          <button @click="confirmLogout" class="flex-1 px-4 py-2 bg-red-500 text-white rounded-2xl font-medium hover:bg-red-600 transition-colors">
            Logout
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { removeAuthToken } from '@/js/api'

  const router = useRouter()
  const authStore = useAuthStore()

  // Reactive data
  const userLoading = ref(false)
  const showLogoutConfirm = ref(false)

  // Props untuk komponen top bar merchant
  const props = defineProps({
    title: {
      type: String,
      default: 'Merchant Overview'
    },
    userName: {
      type: String,
      default: 'Raratih Aqilla'
    },
    userRole: {
      type: String,
      default: 'Keeper'
    },
    breadcrumbText: {
      type: String,
      default: null
    },
    breadcrumbLink: {
      type: String,
      default: '/transactions'
    }
  })

  // Computed properties
  const currentUser = computed(() => {
    return authStore.currentUser
  })

  // Methods
  const handleLogout = () => {
    showLogoutConfirm.value = true
  }

  const confirmLogout = async () => {
    try {
      // Logout dari auth store (akan menghapus semua localStorage data)
      await authStore.logout()
      
      // Hapus token dari API service juga
      removeAuthToken()
      
      // Redirect ke halaman login
      router.push('/')
      
    } catch (error) {
      console.error('Error during logout:', error)
      // Tetap redirect ke login meskipun ada error
      router.push('/')
    } finally {
      showLogoutConfirm.value = false
    }
  }

  const cancelLogout = () => {
    showLogoutConfirm.value = false
  }

  const handleKeydown = (event) => {
    if (event.key === 'Escape' && showLogoutConfirm.value) {
      cancelLogout()
    }
  }

  // Lifecycle
  onMounted(async () => {
    // Fetch current user data if authenticated
    if (authStore.isLoggedIn) {
      userLoading.value = true
      try {
        await authStore.fetchCurrentUser()
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        userLoading.value = false
      }
    }
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeydown)
  })

  // Cleanup
  import { onUnmounted } from 'vue'
  onUnmounted(() => {
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleKeydown)
  })
  </script>

  <style scoped>
  .transition-300 {
    transition: all 0.3s ease;
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }

  /* Ensure logout button is clickable */
  button[title="Logout"] {
    position: relative;
    z-index: 10;
    pointer-events: auto;
  }

  button[title="Logout"]:hover {
    transform: scale(1.05);
  }
  </style> 