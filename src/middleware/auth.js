import { useAuthStore } from "@/stores/auth";

/**
 * Middleware untuk authentication dan role-based access control.
 *
 * Alur:
 * 1. Cek apakah user sudah login (checkAuth dari localStorage).
 * 2. Jika route memerlukan auth:
 *    a. Belum login → redirect ke /
 *    b. Sudah login tapi role tidak cocok → redirect ke URL yang sesuai role
 *    c. Sudah login dan role cocok → lanjutkan
 * 3. Jika route tidak memerlukan auth (misal: login page):
 *    a. Sudah login → redirect ke dashboard sesuai role
 *    b. Belum login → lanjutkan
 */
export async function authMiddleware(to, from, next) {
  const authStore = useAuthStore();

  // Cek apakah user sudah login via localStorage
  const isAuthenticated = await authStore.checkAuth();

  if (to.meta.requiresAuth) {
    // Belum login → ke halaman login
    if (!isAuthenticated) {
      next("/");
      return;
    }

    // Cek role-based access jika route mendefinisikan roles yang diperbolehkan
    if (to.meta.roles && to.meta.roles.length > 0) {
      // userRole sudah dinormalisasi menjadi lowercase string oleh store
      const userRole = authStore.userRole ?? "";

      const hasAccess = to.meta.roles.some(
        (role) => role.toLowerCase() === userRole || authStore.hasAccess(role),
      );

      if (!hasAccess) {
        // Tidak punya akses → redirect ke halaman default sesuai role
        const redirectUrl = authStore.getRedirectUrl();

        // Hindari redirect loop: kalau redirectUrl sama dengan tujuan saat ini,
        // logout dan paksa ke login page.
        if (redirectUrl === to.path || redirectUrl === to.fullPath) {
          await authStore.logout();
          next("/");
          return;
        }

        next(redirectUrl);
        return;
      }
    }

    // Sudah login dan punya akses → lanjutkan
    next();
  } else {
    // Route tidak memerlukan auth (misal: halaman login)
    if (isAuthenticated && to.path === "/") {
      // User sudah login → jangan tampilkan login page, redirect ke dashboard
      const redirectUrl = authStore.getRedirectUrl();
      next(redirectUrl);
    } else {
      next();
    }
  }
}

/**
 * Helper: cek apakah user sudah login.
 * @returns {boolean}
 */
export function isAuthenticated() {
  const authStore = useAuthStore();
  return authStore.isLoggedIn;
}

/**
 * Helper: cek apakah user memiliki role tertentu.
 * @param {string} requiredRole
 * @returns {boolean}
 */
export function hasRole(requiredRole) {
  const authStore = useAuthStore();
  return authStore.hasAccess(requiredRole);
}

/**
 * Helper: dapatkan redirect URL berdasarkan role user saat ini.
 * @returns {string}
 */
export function getRedirectUrl() {
  const authStore = useAuthStore();
  return authStore.getRedirectUrl();
}
