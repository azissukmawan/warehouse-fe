import { defineStore } from 'pinia'
import { APP_CONFIG } from '@/config/app'
import { getMerchants, clearAllLocalStorageData } from '@/js/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    merchantData: null
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    userRole: (state) => state.user?.roles || null,
    currentMerchant: (state) => state.merchantData
  },

  actions: {
    async login(credentials) {
      try {
        // Panggilan API login langsung menggunakan fetch
        const response = await fetch(`${APP_CONFIG.API.BASE_URL}${APP_CONFIG.API.LOGIN_ENDPOINT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Login failed')
        }

        const data = await response.json()
        
        // Sesuaikan dengan response API yang Anda berikan
        const { token, user } = data.data

        this.user = {
          id: user.id,
          email: user.email,
          roles: user.roles,
          name: user.email.split('@')[0], // Fallback name dari email
          avatar: '/src/assets/images/photos/photos-1.png' // Default avatar
        }
        this.token = token
        this.isAuthenticated = true

        // Simpan ke localStorage
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user', JSON.stringify(this.user))

        // Jika user adalah keeper, fetch dan simpan data merchant
        if (user.roles?.toLowerCase() === 'keeper') {
          await this.fetchAndStoreMerchantData()
        }

        return data
      } catch (error) {
        console.error('Login error:', error)
        throw new Error(error.message || 'Login gagal. Silakan coba lagi.')
      }
    },

    async fetchAndStoreMerchantData() {
      try {
        if (!this.user?.id) {
          console.error('User ID not found')
          return
        }

        // Fetch merchant data dengan keeper_id
        const response = await getMerchants(`?keeper_id=${this.user.id}`)
        
        if (response.data) {
          const merchantData = Array.isArray(response.data) ? response.data : [response.data]
          
          // Simpan merchant data tanpa merchant_products ke localStorage
          const merchantDataForStorage = merchantData.map(merchant => ({
            id: merchant.id,
            name: merchant.name,
            address: merchant.address,
            photo: merchant.photo,
            phone: merchant.phone,
            keeper_id: merchant.keeper_id,
            keeper_name: merchant.keeper_name
          }))

          this.merchantData = merchantDataForStorage
          localStorage.setItem('merchant_data', JSON.stringify(merchantDataForStorage))
        }
      } catch (error) {
        console.error('Error fetching merchant data:', error)
      }
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.merchantData = null

      // Hapus semua data dari localStorage
      this.clearLocalStorageData()
    },

    // Method untuk reset state ke default
    resetState() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.merchantData = null
    },

    // Method untuk menghapus semua data localStorage
    clearLocalStorageData() {
      clearAllLocalStorageData()
      this.resetState()
    },

    async checkAuth() {
      try {
        const token = localStorage.getItem('auth_token')
        const user = localStorage.getItem('user')
        const merchantData = localStorage.getItem('merchant_data')

        if (token && user) {
          this.token = token
          this.user = JSON.parse(user)
          this.isAuthenticated = true
          
          // Load merchant data jika ada
          if (merchantData) {
            this.merchantData = JSON.parse(merchantData)
          }
          
          return true
        }

        return false
      } catch (error) {
        console.error('Error in checkAuth:', error)
        // Clear invalid data
        this.clearLocalStorageData()
        return false
      }
    },

    async fetchCurrentUser() {
      try {
        // Import getUserById secara dinamis untuk menghindari circular dependency
        const { getUserById } = await import('@/js/api')
        const response = await getUserById(this.user.id)
        
        if (response.data) {
          // Update user data tapi pertahankan role dari login
          this.user = {
            id: response.data.id,
            email: response.data.email,
            name: this.user.name || response.data.email.split('@')[0],
            roles: this.user.roles, // Pertahankan role dari login
            avatar: response.data.photo || '/src/assets/images/photos/photos-1.png'
          }

          
          // Update localStorage
          localStorage.setItem('user', JSON.stringify(this.user))
        }
        
        return response
      } catch (error) {
        console.error('Error fetching current user:', error)
        // Jika gagal fetch user, gunakan data dari localStorage
        return this.user
      }
    },

    // Method untuk mendapatkan redirect URL berdasarkan role
    getRedirectUrl() {
      const role = this.user?.roles?.toLowerCase()
      
      switch (role) {
        case 'keeper':
          return '/merchant-overview'
        case 'manager':
          return '/overview'
        default:
          return '/overview' // Default fallback
      }
    },

    // Method untuk cek apakah user punya akses ke route tertentu
    hasAccess(requiredRole) {
      const userRole = this.user?.roles?.toLowerCase()
      
      // Role hierarchy (dari yang paling tinggi ke rendah)
      const roleHierarchy = {
        'manager': 2,
        'keeper': 1
      }
      
      const userLevel = roleHierarchy[userRole] || 0
      const requiredLevel = roleHierarchy[requiredRole] || 0
      
      return userLevel >= requiredLevel
    },

    // Method untuk mendapatkan merchant data dari localStorage
    getMerchantData() {
      if (this.merchantData) {
        return this.merchantData
      }
      
      const storedData = localStorage.getItem('merchant_data')
      if (storedData) {
        this.merchantData = JSON.parse(storedData)
        return this.merchantData
      }
      
      return null
    },

    // Method untuk refresh merchant data
    async refreshMerchantData() {
      if (this.user?.roles?.toLowerCase() === 'keeper') {
        await this.fetchAndStoreMerchantData()
      }
    }
  }
}) 