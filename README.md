# Warehouse Management System - Vue.js 3

Konversi project warehouse management dari HTML/CSS ke Vue.js 3 dengan desain yang sama persis dengan project asli.

## 🚀 Fitur yang Tersedia

### 1. **Halaman Login**
- ✅ Desain yang sama persis dengan project asli
- ✅ Form login dengan validasi
- ✅ Toggle password visibility
- ✅ Responsive design

### 2. **Halaman Overview (Dashboard Utama)**
- ✅ Sidebar navigation dengan menu lengkap
- ✅ Statistik cards (Total Revenue, Total Transactions, Products Sold)
- ✅ Pro upgrade card
- ✅ Download report card
- ✅ Latest transactions dengan expandable details
- ✅ User profile section
- ✅ Responsive design

### 3. **Halaman Dashboard (Alternatif)**
- ✅ Statistik cards dengan animasi
- ✅ Recent orders table
- ✅ Low stock alerts
- ✅ Modern card-based layout

### 4. **Halaman Inventory**
- ✅ Tabel produk dengan filter dan search
- ✅ Kategori badges
- ✅ Stock status indicators
- ✅ Add, edit, delete produk
- ✅ Responsive table design

## 🛠️ Teknologi yang Digunakan

- **Vue.js 3** - Framework utama
- **Composition API** - State management
- **CSS Custom Properties** - Monday theme colors
- **Responsive Design** - Mobile-friendly
- **Vite** - Build tool

## 📁 Struktur Project

```
src/
├── components/
│   ├── Login.vue          # Halaman login
│   ├── Overview.vue       # Dashboard utama dengan sidebar
│   ├── Dashboard.vue      # Dashboard alternatif
│   └── Inventory.vue      # Manajemen produk
├── assets/
│   ├── main.css          # CSS global dengan Monday theme
│   └── images/           # Assets (akan ditambahkan)
├── config/
│   └── app.js            # Konfigurasi aplikasi dan default state
├── App.vue               # Komponen utama dengan routing
└── main.js              # Entry point
```

## 🎨 Monday Theme Colors

Project menggunakan color scheme dari Monday.com:
- **Primary Blue**: #0073EA
- **Gray**: #676879
- **Lime Green**: #00C875
- **Black**: #323338
- **Border**: #E6E6E6
- **Background**: #F7F7F7

## 🚀 Cara Menjalankan

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. **Buka browser dan akses:**
   ```
   http://localhost:5173
   ```
   
   **Aplikasi akan langsung menampilkan halaman Login!**

4. **Build untuk production:**
   ```bash
   npm run build
   ```

## 📱 Responsive Design

Project sudah dioptimalkan untuk berbagai ukuran layar:
- **Desktop**: Layout penuh dengan sidebar
- **Tablet**: Layout adaptif
- **Mobile**: Layout vertikal dengan navigasi yang dioptimalkan

## 🔄 State Management & Flow Aplikasi

Menggunakan Vue 3 Composition API untuk state management:

### **Flow Aplikasi:**
1. **Buka aplikasi** → Login page (selalu muncul pertama)
2. **Login berhasil** → Overview page (dashboard utama)
3. **Navigasi** → Bisa pindah ke halaman lain
4. **Logout** → Kembali ke Login page

### **State Management:**
- Authentication state (`isAuthenticated`)
- Current page navigation (`currentPage`)
- Component data (reactive data per komponen)
- Konfigurasi aplikasi (`src/config/app.js`)

## 🎯 Fitur yang Akan Ditambahkan

- [ ] Integrasi dengan backend API
- [ ] Authentication dengan JWT
- [ ] Halaman Products management
- [ ] Halaman Categories management
- [ ] Halaman Warehouses management
- [ ] Halaman Merchants management
- [ ] Halaman Users management
- [ ] Halaman Roles management
- [ ] File upload untuk images
- [ ] Export data ke Excel/PDF
- [ ] Real-time notifications
- [ ] Dark mode

## 📝 Catatan

Project ini adalah konversi dari HTML/CSS asli ke Vue.js 3 dengan mempertahankan:
- ✅ Desain visual yang sama persis
- ✅ Color scheme Monday theme
- ✅ Layout dan spacing
- ✅ Responsive behavior
- ✅ User experience

## 🤝 Kontribusi

Silakan buat pull request atau issue untuk perbaikan dan fitur baru.

---

**Dibuat dengan ❤️ menggunakan Vue.js 3**
