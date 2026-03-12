import { defineStore } from "pinia";
import { APP_CONFIG } from "@/config/app";
import { getMerchants, clearAllLocalStorageData } from "@/js/api";

/**
 * Normalizes roles value from backend to a single lowercase string.
 * Backend may return:
 *   - []string array  → e.g. ["manager"] or []
 *   - comma-separated string → e.g. "manager,keeper" or ""
 *   - null / undefined
 * We store a single lowercase role string internally (takes first element).
 */
function normalizeRole(roles) {
  if (Array.isArray(roles)) {
    return roles.length > 0 ? roles[0].toLowerCase() : "";
  }
  if (typeof roles === "string") {
    // Support comma-separated string (legacy)
    const parts = roles
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);
    return parts.length > 0 ? parts[0].toLowerCase() : "";
  }
  return "";
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    merchantData: null,
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    /**
     * Returns the user's role string (always lowercase), or null when not available.
     * Using ?? instead of || so an empty string is returned as-is (not coerced to null).
     */
    userRole: (state) => {
      const role = state.user?.roles;
      if (role === null || role === undefined) return null;
      return typeof role === "string" ? role : "";
    },
    currentMerchant: (state) => state.merchantData,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await fetch(
          `${APP_CONFIG.API.BASE_URL}${APP_CONFIG.API.LOGIN_ENDPOINT}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();

        // Defensive: ensure data.data exists
        if (!data?.data) {
          throw new Error("Response format tidak valid dari server.");
        }

        const { token, user } = data.data;

        if (!token) {
          throw new Error("Token tidak ditemukan dalam response server.");
        }

        if (!user) {
          throw new Error("Data user tidak ditemukan dalam response server.");
        }

        // Normalize roles — backend may return [] array or "" string
        const normalizedRole = normalizeRole(user.roles);

        this.user = {
          id: user.id,
          email: user.email,
          roles: normalizedRole, // always a clean lowercase string
          name: user.name || user.email?.split("@")[0] || "User",
          avatar: "/src/assets/images/photos/photos-1.png",
        };
        this.token = token;
        this.isAuthenticated = true;

        // Simpan ke localStorage
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.stringify(this.user));

        // Validasi: pastikan user punya role (tidak boleh kosong).
        // Role TIDAK di-hardcode — role apapun yang dibuat admin di backend bisa login.
        if (!normalizedRole) {
          // Reset auth state — jangan biarkan user masuk tanpa role
          this.user = null;
          this.token = null;
          this.isAuthenticated = false;
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");

          throw new Error(
            "Akun ini belum memiliki role. " +
              "Hubungi administrator untuk mendapatkan akses.",
          );
        }

        // Jika user adalah keeper (atau role apapun yang perlu merchant data),
        // fetch dan simpan data merchant. Gunakan nama role yang fleksibel.
        const keeperLikeRoles = ["keeper"];
        if (keeperLikeRoles.includes(normalizedRole)) {
          await this.fetchAndStoreMerchantData();
        }

        return data;
      } catch (error) {
        console.error("Login error:", error);
        throw new Error(error.message || "Login gagal. Silakan coba lagi.");
      }
    },

    async fetchAndStoreMerchantData() {
      try {
        if (!this.user?.id) {
          console.error("User ID not found");
          return;
        }

        const response = await getMerchants(`?keeper_id=${this.user.id}`);

        if (response.data) {
          const merchantData = Array.isArray(response.data)
            ? response.data
            : [response.data];

          const merchantDataForStorage = merchantData.map((merchant) => ({
            id: merchant.id,
            name: merchant.name,
            address: merchant.address,
            photo: merchant.photo,
            phone: merchant.phone,
            keeper_id: merchant.keeper_id,
            keeper_name: merchant.keeper_name,
          }));

          this.merchantData = merchantDataForStorage;
          localStorage.setItem(
            "merchant_data",
            JSON.stringify(merchantDataForStorage),
          );
        }
      } catch (error) {
        console.error("Error fetching merchant data:", error);
        // Non-fatal: login tetap berhasil meski merchant data gagal di-fetch
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.merchantData = null;
      this.clearLocalStorageData();
    },

    resetState() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.merchantData = null;
    },

    clearLocalStorageData() {
      clearAllLocalStorageData();
      this.resetState();
    },

    async checkAuth() {
      try {
        const token = localStorage.getItem("auth_token");
        const userRaw = localStorage.getItem("user");
        const merchantData = localStorage.getItem("merchant_data");

        if (token && userRaw) {
          const parsedUser = JSON.parse(userRaw);

          // Normalize roles juga saat load dari localStorage
          // (jaga-jaga kalau ada data lama yang tersimpan sebagai array)
          if (parsedUser?.roles !== undefined) {
            parsedUser.roles = normalizeRole(parsedUser.roles);
          }

          this.token = token;
          this.user = parsedUser;
          this.isAuthenticated = true;

          if (merchantData) {
            this.merchantData = JSON.parse(merchantData);
          }

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error in checkAuth:", error);
        this.clearLocalStorageData();
        return false;
      }
    },

    async fetchCurrentUser() {
      try {
        const { getUserById } = await import("@/js/api");
        const response = await getUserById(this.user.id);

        if (response.data) {
          this.user = {
            id: response.data.id,
            email: response.data.email,
            name: this.user.name || response.data.email?.split("@")[0],
            roles: this.user.roles, // Pertahankan role dari login (sudah normalized)
            avatar:
              response.data.photo || "/src/assets/images/photos/photos-1.png",
          };

          localStorage.setItem("user", JSON.stringify(this.user));
        }

        return response;
      } catch (error) {
        console.error("Error fetching current user:", error);
        return this.user;
      }
    },

    /**
     * Mengembalikan URL redirect yang sesuai dengan role user.
     * Role bersifat dinamis — mapping diatur di sini, bukan di-hardcode di seluruh app.
     *
     * Untuk role baru yang belum ada mapping-nya, fallback ke /overview.
     * Middleware akan menangani akses-kontrol lebih lanjut.
     */
    getRedirectUrl() {
      const role = this.user?.roles?.toLowerCase?.() ?? "";

      // Mapping role → halaman utama
      // Tambahkan entry baru di sini saat admin menambah role baru yang butuh
      // halaman utama berbeda.
      const roleRedirectMap = {
        keeper: "/merchant-overview",
        manager: "/overview",
      };

      return roleRedirectMap[role] ?? "/overview";
    },

    /**
     * Mengecek apakah user punya akses ke route yang memerlukan requiredRole.
     *
     * Pertama cek exact match (role dinamis bekerja langsung),
     * lalu fallback ke hierarchy untuk kasus manager mengakses route keeper.
     */
    hasAccess(requiredRole) {
      const userRole = this.user?.roles?.toLowerCase?.() ?? "";
      const required = requiredRole?.toLowerCase?.() ?? "";

      if (!userRole || !required) return false;

      // Exact match — semua role yang tidak ada di hierarchy tetap bisa match
      if (userRole === required) return true;

      // Hierarchy untuk backward-compat: manager bisa akses semua route keeper
      // Tambahkan pair baru di sini jika ada role baru yang punya hierarki serupa.
      const roleHierarchy = {
        manager: 2,
        keeper: 1,
      };

      const userLevel = roleHierarchy[userRole] ?? 0;
      const requiredLevel = roleHierarchy[required] ?? 0;

      // Hanya pakai hierarchy jika kedua role ada di map
      if (userLevel > 0 && requiredLevel > 0) {
        return userLevel >= requiredLevel;
      }

      return false;
    },

    getMerchantData() {
      if (this.merchantData) {
        return this.merchantData;
      }

      const storedData = localStorage.getItem("merchant_data");
      if (storedData) {
        try {
          this.merchantData = JSON.parse(storedData);
          return this.merchantData;
        } catch {
          return null;
        }
      }

      return null;
    },

    async refreshMerchantData() {
      // Refresh merchant data untuk semua role yang perlu data merchant.
      // Sama dengan daftar keeperLikeRoles di login().
      const keeperLikeRoles = ["keeper"];
      const role = this.user?.roles?.toLowerCase?.() ?? "";
      if (keeperLikeRoles.includes(role)) {
        await this.fetchAndStoreMerchantData();
      }
    },
  },
});
