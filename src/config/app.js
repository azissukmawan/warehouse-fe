// Konfigurasi default aplikasi
export const APP_CONFIG = {
  // Default state saat aplikasi pertama kali dibuka
  DEFAULT_STATE: {
    isAuthenticated: false,
    currentPage: 'login'
  },
  
  // Halaman yang tersedia
  PAGES: {
    LOGIN: 'login',
    OVERVIEW: 'overview',
    DASHBOARD: 'dashboard',
    INVENTORY: 'inventory'
  },
  
  // Konfigurasi authentication
  AUTH: {
    // Setelah login berhasil, redirect ke halaman ini
    DEFAULT_REDIRECT: 'overview',
    // Setelah logout, redirect ke halaman ini
    LOGOUT_REDIRECT: 'login'
  },
  
  // Konfigurasi API
  API: {
    // Base URL untuk API calls dengan fallback
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    // Endpoint untuk login
    LOGIN_ENDPOINT: '/api/v1/auth/login',
    // Timeout untuk request (dalam milliseconds) - diperpanjang untuk development
    TIMEOUT: 15000,
    // Retry attempts untuk API calls
    RETRY_ATTEMPTS: 3
  }
}

// Helper function untuk reset aplikasi ke state awal
export const resetAppToLogin = () => {
  return {
    isAuthenticated: false,
    currentPage: 'login'
  }
}

// Helper function untuk mendapatkan state default
export const getDefaultState = () => {
  return { ...APP_CONFIG.DEFAULT_STATE }
}

// Helper function untuk mendapatkan URL lengkap endpoint
export const getApiUrl = (endpoint) => {
  return `${APP_CONFIG.API.BASE_URL}${endpoint}`
} 