import { useAuthStore } from '@/stores/auth'

/**
 * Middleware untuk authentication
 * @param {Object} to - Route yang akan dituju
 * @param {Object} from - Route sebelumnya
 * @param {Function} next - Function untuk melanjutkan navigation
 */
export async function authMiddleware(to, from, next) {
  const authStore = useAuthStore()
  
  // Cek apakah user sudah login dengan memanggil checkAuth
  const isAuthenticated = await authStore.checkAuth()
  
  // Jika route memerlukan authentication
  if (to.meta.requiresAuth) {
    // Cek apakah user sudah login
    if (!isAuthenticated) {
      // Jika belum login, redirect ke halaman login
      next('/')
      return
    }
    
    // Cek role-based access jika ada roles yang didefinisikan
    if (to.meta.roles && to.meta.roles.length > 0) {
      const userRole = authStore.userRole?.toLowerCase()
      const hasAccess = to.meta.roles.some(role => 
        role.toLowerCase() === userRole || authStore.hasAccess(role)
      )
      
      if (!hasAccess) {
        // Jika tidak punya akses, redirect ke halaman yang sesuai dengan role
        const redirectUrl = authStore.getRedirectUrl()
        next(redirectUrl)
        return
      }
    }
    
    // Jika sudah login dan punya akses, lanjutkan
    next()
  } else {
    // Jika route tidak memerlukan auth (seperti login)
    if (isAuthenticated && to.path === '/') {
      // Jika user sudah login dan mencoba akses halaman login, redirect ke dashboard
      const redirectUrl = authStore.getRedirectUrl()
      next(redirectUrl)
    } else {
      // Jika belum login dan mengakses halaman login, lanjutkan
      next()
    }
  }
}

/**
 * Middleware untuk cek apakah user sudah login
 * @returns {boolean}
 */
export function isAuthenticated() {
  const authStore = useAuthStore()
  return authStore.isLoggedIn
}

/**
 * Middleware untuk cek apakah user punya role tertentu
 * @param {string} requiredRole - Role yang dibutuhkan
 * @returns {boolean}
 */
export function hasRole(requiredRole) {
  const authStore = useAuthStore()
  return authStore.hasAccess(requiredRole)
}

/**
 * Middleware untuk mendapatkan redirect URL berdasarkan role
 * @returns {string}
 */
export function getRedirectUrl() {
  const authStore = useAuthStore()
  return authStore.getRedirectUrl()
} 