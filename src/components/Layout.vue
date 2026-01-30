<template>
    <div id="main-container" class="flex flex-1">
      <!-- Sidebar -->
      <aside class="relative flex h-auto w-[280px] shrink-0 bg-white">
        <div class="flex flex-col fixed top-0 w-[280px] shrink-0 pt-[30px] px-4 gap-[30px]">
          <img src="@/assets/images/logos/logo.svg" class="h-8 w-fit" alt="logo">
          <div class="flex flex-col gap-5 mb-5 h-full">
            <!-- Main Menu -->
            <nav class="flex flex-col gap-4">
              <p class="font-medium text-monday-gray">Main Menu</p>
              <ul class="flex flex-col gap-2">
                <li class="group" :class="{ active: $route.path === '/overview' }">
                  <router-link to="/overview" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                    <div class="relative flex size-6 shrink-0">
                      <img src="@/assets/images/icons/home-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                      <img src="@/assets/images/icons/home-blue-fill.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                    </div>
                    <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                      Overview
                    </p>
                    <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                  </router-link>
                </li>
                <li class="group" :class="{ active: $route.path.startsWith('/products') }">
                  <router-link to="/products" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                    <div class="relative flex size-6 shrink-0">
                      <img src="@/assets/images/icons/bag-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                      <img src="@/assets/images/icons/bag-blue-fill.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                    </div>
                    <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                      Products
                    </p>
                    <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                  </router-link>
                </li>
                <li class="group" :class="{ active: $route.path.startsWith('/categories') }">
                  <router-link to="/categories" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                    <div class="relative flex size-6 shrink-0">
                      <img src="@/assets/images/icons/note-2-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                      <img src="@/assets/images/icons/note-2-blue-fill.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                    </div>
                    <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                      Categories
                    </p>
                    <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                  </router-link>
                </li>
                <li class="group" :class="{ active: $route.path.startsWith('/warehouses') }">
                  <router-link to="/warehouses" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                    <div class="relative flex size-6 shrink-0">
                      <img src="@/assets/images/icons/buildings-2-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                      <img src="@/assets/images/icons/buildings-2-blue-fill.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                    </div>
                    <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                      Warehouses
                    </p>
                    <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                  </router-link>
                </li>
                <li class="group" :class="{ active: $route.path.startsWith('/merchants') }">
                  <router-link to="/merchants" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                    <div class="relative flex size-6 shrink-0">
                      <img src="@/assets/images/icons/shop-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                      <img src="@/assets/images/icons/shop-blue-fill.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                    </div>
                    <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                      Merchants
                    </p>
                    <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                  </router-link>
                </li>
              </ul>
            </nav>
  
            <!-- Account Settings -->
            <nav class="flex flex-col gap-4">
              <p class="font-medium text-monday-gray">Account Settings</p>
              <ul class="flex flex-col gap-2">
                <li class="group" :class="{ active: $route.path.startsWith('/roles') }">
                  <router-link to="/roles" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                    <div class="relative flex size-6 shrink-0">
                      <img src="@/assets/images/icons/stickynote-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                      <img src="@/assets/images/icons/stickynote-blue-fill.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                    </div>
                    <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                      Roles
                    </p>
                    <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                  </router-link>
                </li>
                <li class="group flex flex-col" :class="{ active: isUserMenuActive }">
                  <button @click="toggleUserMenu" :class="[
                    'flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 transition-300',
                    isUserMenuActive ? 'bg-monday-blue/10' : ''
                  ]">
                    <div class="relative flex size-6 shrink-0">
                      <img src="@/assets/images/icons/user-square-black.svg" :class="[
                        'size-6 absolute transition-300']" alt="icon">
                    </div>
                    <p :class="[
                      'font-medium transition-300 w-full text-left',
                      isUserMenuActive ? 'text-monday-blue' : ''
                    ]">
                      Manage User
                    </p>
                    <img :src="userMenuExpanded ? '/src/assets/images/icons/arrow-circle-down.svg' : '/src/assets/images/icons/arrow-circle-up.svg'" class="size-6 flex shrink-0 transition-300" alt="icon">
                  </button>
                  <div v-show="userMenuExpanded" class="flex">
                    <div class="flex w-[56px] shrink-0 justify-end items-start">
                      <img src="@/assets/images/icons/accordion-branch.svg" class="w-[28px]" alt="icon">
                    </div>
                    <ul class="flex flex-col gap-1 w-full">
                      <li class="group" :class="{ active: $route.path === '/users' }">
                        <router-link to="/users" :class="[
                          'flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 transition-300',
                          $route.path === '/users' ? 'bg-monday-blue/10' : ''
                        ]">
                          <div class="relative flex size-6 shrink-0">
                            <img src="@/assets/images/icons/profile-2user-black.svg" :class="[
                              'size-6 absolute transition-300',
                              $route.path === '/users' ? 'opacity-0' : 'opacity-100'
                            ]" alt="icon">
                            <img src="@/assets/images/icons/profile-2user-blue-fill.svg" :class="[
                              'size-6 absolute transition-300',
                              $route.path === '/users' ? 'opacity-100' : 'opacity-0'
                            ]" alt="icon">
                          </div>
                          <p :class="[
                            'font-medium transition-300 w-full',
                            $route.path === '/users' ? 'text-monday-blue' : ''
                          ]">
                            Users List
                          </p>
                          <div :class="[
                            'w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue transition-300',
                            $route.path === '/users' ? 'flex' : 'hidden'
                          ]"></div>
                        </router-link>
                      </li>
                      <li class="group" :class="{ active: $route.path === '/users-roles' }">
                        <router-link to="/users-roles" :class="[
                          'flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 transition-300',
                          $route.path === '/users-roles' ? 'bg-monday-blue/10' : ''
                        ]">
                          <div class="relative flex size-6 shrink-0">
                            <img src="@/assets/images/icons/profile-tick-black.svg" :class="[
                              'size-6 absolute transition-300',
                              $route.path === '/users-roles' ? 'opacity-0' : 'opacity-100'
                            ]" alt="icon">
                            <img src="@/assets/images/icons/profile-tick-blue.svg" :class="[
                              'size-6 absolute transition-300',
                              $route.path === '/users-roles' ? 'opacity-100' : 'opacity-0'
                            ]" alt="icon">
                          </div>
                          <p :class="[
                            'font-medium transition-300 w-full',
                            $route.path === '/users-roles' ? 'text-monday-blue' : ''
                          ]">
                            Assign Role
                          </p>
                          <div :class="[
                            'w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue transition-300',
                            $route.path === '/users-roles' ? 'flex' : 'hidden'
                          ]"></div>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="group">
                  <a href="#" class="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300">
                    <div class="relative flex size-6 shrink-0">
                      <img src="@/assets/images/icons/setting-black.svg" class="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300" alt="icon">
                      <img src="@/assets/images/icons/setting-black.svg" class="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300" alt="icon">
                    </div>
                    <p class="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
                      Settings
                    </p>
                    <div class="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300"></div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
  
      <!-- Main Content -->
      <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
        <!-- Top Bar -->
        <div id="Top-Bar" class="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div class="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div class="flex flex-col gap-[6px] w-full">
              <h1 class="font-bold text-2xl">{{ pageTitle }}</h1>
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
                <p class="font-semibold">{{ currentUser?.name || 'User' }}</p>
                <p class="flex items-center gap-1 font-medium text-monday-gray">
                  <img src="@/assets/images/icons/user-grey.svg" class="size-4" alt="icon"> 
                  {{ currentUser?.roles || 'User' }}
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
  
        <!-- Page Content -->
        <slot></slot>
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
  
  <script>
  import { useAuthStore } from '@/stores/auth'
  import { removeAuthToken } from '@/js/api'
  
  export default {
    name: 'Layout',
    props: {
      pageTitle: {
        type: String,
        default: 'Dashboard'
      },
      breadcrumbText: {
        type: String,
        default: null
      },
      breadcrumbLink: {
        type: String,
        default: '/products'
      }
    },
    data() {
      return {
        userMenuExpanded: false,
        userLoading: false,
        showLogoutConfirm: false
      }
    },
    setup() {
      const authStore = useAuthStore()
      return { authStore }
    },
    computed: {
      isUserMenuActive() {
        return this.$route.path === '/users' || 
               this.$route.path === '/users-roles' ||
               this.$route.path.startsWith('/users/add') || 
               this.$route.path.startsWith('/users/edit')
      },
      currentUser() {
        return this.authStore.currentUser
      }
    },
    watch: {
      '$route'(to) {
        // Auto expand user menu when accessing user-related pages
        if (to.path === '/users' || 
            to.path === '/users-roles' ||
            to.path.startsWith('/users/add') || 
            to.path.startsWith('/users/edit')) {
          this.userMenuExpanded = true
        }
      }
    },
    async mounted() {
      // Auto expand user menu on initial load if on user-related page
      if (this.isUserMenuActive) {
        this.userMenuExpanded = true
      }
      
      // Fetch current user data if authenticated
      if (this.authStore.isLoggedIn) {
        this.userLoading = true
        try {
          await this.authStore.fetchCurrentUser()
        } catch (error) {
          console.error('Error loading user data:', error)
        } finally {
          this.userLoading = false
        }
      }
      
      // Add keyboard event listener
      document.addEventListener('keydown', this.handleKeydown)
    },
    
    beforeUnmount() {
      // Remove keyboard event listener
      document.removeEventListener('keydown', this.handleKeydown)
    },
    methods: {
      toggleUserMenu() {
        this.userMenuExpanded = !this.userMenuExpanded
      },
      handleLogout() {
        this.showLogoutConfirm = true
      },
      
      async confirmLogout() {
        try {
          // Logout dari auth store (akan menghapus semua localStorage data)
          await this.authStore.logout()
          
          // Hapus token dari API service juga
          removeAuthToken()
          
          // Redirect ke halaman login
          this.$router.push('/')
          
        } catch (error) {
          console.error('Error during logout:', error)
          // Tetap redirect ke login meskipun ada error
          this.$router.push('/')
        } finally {
          this.showLogoutConfirm = false
        }
      },
      
      cancelLogout() {
        this.showLogoutConfirm = false
      },
      
      handleKeydown(event) {
        if (event.key === 'Escape' && this.showLogoutConfirm) {
          this.cancelLogout()
        }
      }
    }
  }
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