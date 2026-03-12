import { useAuthStore } from "@/stores/auth";

/**
 * Middleware untuk authentication dan role-based access control.
 *
 * Alur:
 * 1. Cek apakah user sudah login (checkAuth dari localStorage).
 * 2. Jika route memerlukan auth:
 *    a. Belum login → redirect ke /
 *    b. Sudah login tapi role tidak cocok → redirect ke URL sesuai role
 *    c. Sudah login dan role cocok → lanjutkan
 * 3. Jika route tidak memerlukan auth (misal: login page):
 *    a. Sudah login → redirect ke dashboard sesuai role
 *    b. Belum login → lanjutkan
 *
 * Catatan penting — Hindari redirect loop:
 * Jika getRedirectUrl() mengembalikan URL yang sama dengan tujuan saat ini
 * (bisa terjadi untuk role baru yang belum ada mapping-nya), jangan logout
 * langsung — alihkan ke /no-access agar user tetap bisa melihat halaman
 * yang menjelaskan situasinya.
 */
export async function authMiddleware(to, from, next) {
  const authStore = useAuthStore();

  // Cek apakah user sudah login via localStorage
  const isAuthenticated = await authStore.checkAuth();

  // Route /no-access hanya bisa diakses oleh user yang sudah login.
  // Jika belum login, redirect ke halaman login.
  if (to.path === "/no-access") {
    if (!isAuthenticated) {
      next("/");
    } else {
      next();
    }
    return;
  }

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
        // Tidak punya akses → cari halaman yang sesuai dengan role user
        const redirectUrl = authStore.getRedirectUrl();

        // Hindari redirect loop:
        // Jika redirectUrl sama dengan tujuan saat ini, artinya role user
        // tidak punya halaman yang cocok (role baru / belum di-mapping).
        // Alihkan ke /no-access alih-alih logout langsung.
        if (redirectUrl === to.path || redirectUrl === to.fullPath) {
          next("/no-access");
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
