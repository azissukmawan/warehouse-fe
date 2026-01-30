<template>
    <main class="flex flex-1 h-screen items-center">
      <div class="flex flex-col h-screen overflow-hidden rounded-tr-[32px] pl-[30px] pt-[46px] w-[685px] shrink-0 blue-gradient">
        <p class="font-semibold text-lg text-monday-lime-green-char">— Manage Stock and Merchants</p>
        <p class="font-extrabold text-[42px] uppercase text-white mt-4 mb-[30px]">Optimized Inventory,<br>Effortless Workflow 🎯 </p>
        <div class="flex flex-1 overflow-hidden rounded-tl-[20px]">
          <img 
            src="@/assets/images/backgrounds/bg-image-1.png" 
            class="size-full object-cover object-left-top" 
            alt="image"
            @error="handleImageError"
            @load="handleImageLoad"
          >
        </div>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <form @submit.prevent="handleLogin" class="flex flex-col w-[435px] shrink-0 rounded-3xl gap-10 p-6 bg-white">
          <img 
            src="@/assets/images/logos/logo.svg" 
            class="w-[203px] mx-auto" 
            alt="logo"
            @error="handleLogoError"
            @load="handleLogoLoad"
          >
          <div class="flex flex-col gap-[30px]">
            <div class="flex flex-col gap-3 text-center">
              <p class="font-semibold text-2xl">Hey🙌🏻, Welcome Back!</p>
              <p class="font-medium text-monday-gray">Login to your account to continue!</p>
            </div>
            
            <!-- Error Message -->
            <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ errorMessage }}
            </div>
            
            <div class="flex flex-col gap-4 w-full">
              <label class="group relative">
                <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                  <img 
                    src="@/assets/images/icons/sms-grey.svg" 
                    class="flex size-6 shrink-0" 
                    alt="icon"
                    @error="handleIconError"
                  >
                </div>
                <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                  Your email address
                </p>
                <input 
                  v-model="form.email"
                  type="email" 
                  class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
                  placeholder=""
                  required
                  :disabled="loading"
                >
              </label>
              <label class="group relative">
                <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                  <img src="@/assets/images/icons/lock-grey.svg" class="flex size-6 shrink-0" alt="icon">
                </div>
                <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                  Your password
                </p>
                <input 
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'" 
                  class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-16 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 tracking-[0.3em]" 
                  placeholder=""
                  required
                  :disabled="loading"
                >
                <button 
                  @click="togglePassword" 
                  type="button" 
                  class="absolute transform -translate-y-1/2 top-1/2 right-6"
                  :disabled="loading"
                >
                  <img src="@/assets/images/icons/eye-grey.svg" class="flex size-6 shrink-0" alt="icon">
                </button>
              </label>
              <p class="font-medium text-sm text-monday-gray">Forget Password? <a href="#" class="font-semibold text-monday-blue hover:underline">Reset Password</a></p>
            </div>
            <button 
              type="submit" 
              class="btn btn-primary w-full font-bold flex items-center justify-center gap-2"
              :disabled="loading"
            >
              <div v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {{ loading ? 'Signing In...' : 'Sign In' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </template>
  
  <script>
  import { useAuthStore } from '@/stores/auth'
  
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        showPassword: false,
        loading: false,
        errorMessage: ''
      }
    },
    methods: {
      async handleLogin() {
        this.loading = true
        this.errorMessage = ''
        
        try {
          const authStore = useAuthStore()
          await authStore.login(this.form)
          
          // Redirect berdasarkan role user
          const redirectUrl = authStore.getRedirectUrl()
          this.$router.push(redirectUrl)
          
        } catch (error) {
          console.error('Login failed:', error)
          
          // Handle specific error cases
          if (error.message.includes('fetch') || error.message.includes('network')) {
            this.errorMessage = 'Tidak dapat terhubung ke server. Pastikan server API berjalan.'
          } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
            this.errorMessage = 'Email atau password salah. Silakan coba lagi.'
          } else {
            this.errorMessage = error.message || 'Login gagal. Silakan coba lagi.'
          }
        } finally {
          this.loading = false
        }
      },
      togglePassword() {
        this.showPassword = !this.showPassword
      },
      handleImageError(event) {
        console.error('Image failed to load:', event.target.src)
        // Set background color sebagai fallback jika gambar tidak bisa dimuat
        event.target.style.display = 'none'
        event.target.parentElement.style.backgroundColor = '#1053D5'
      },
      handleImageLoad(event) {
        console.log('Image loaded successfully:', event.target.src)
      },
      handleLogoError(event) {
        console.error('Logo failed to load:', event.target.src)
        // Set background color sebagai fallback jika logo tidak bisa dimuat
        event.target.style.display = 'none'
        event.target.parentElement.style.backgroundColor = '#1053D5'
      },
      handleLogoLoad(event) {
        console.log('Logo loaded successfully:', event.target.src)
      },
      handleIconError(event) {
        console.error('Icon failed to load:', event.target.src)
        // Set background color sebagai fallback jika icon tidak bisa dimuat
        event.target.style.display = 'none'
        event.target.parentElement.style.backgroundColor = '#1053D5'
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style> 