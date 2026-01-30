<template>
  <div id="main-container" class="flex flex-1">
    <!-- Sidebar -->
    <MerchantSidebar />

    <!-- Main Content -->
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
      <!-- Top Bar -->
      <MerchantTopBar 
        title="Merchant Overview" 
        breadcrumbText="Back to Dashboard"
        breadcrumbLink="/overview"
      />

      <!-- Main Content -->
      <main class="flex flex-col gap-6 flex-1">
        <!-- Quick Access -->
        <div class="flex justify-between mb-4">
          <router-link to="/transactions/add-1" class="btn btn-primary font-semibold">
            Add New Transaction
            <img src="@/assets/images/icons/add-square-white.svg" class="flex size-6 shrink-0" alt="icon">
          </router-link>
          
          <button 
            @click="refreshDashboard" 
            class="btn btn-primary-opacity font-semibold"
            :disabled="dashboardLoading"
          >
            <img src="@/assets/images/icons/loading.svg" class="size-6 shrink-0" :class="{ 'animate-spin': dashboardLoading }" alt="refresh">
            Refresh Dashboard
          </button>
        </div>
        
        <!-- Stats Cards -->
        <section class="grid grid-cols-3 gap-6">
          <!-- Loading State untuk Dashboard -->
          <div v-if="dashboardLoading" class="col-span-3 flex items-center justify-center py-12">
            <div class="text-center">
              <img src="@/assets/images/icons/loading.svg" class="size-12 animate-spin mx-auto mb-4" alt="loading">
              <p class="text-monday-gray">Loading dashboard data...</p>
            </div>
          </div>
          
          <!-- Error State untuk Dashboard -->
          <div v-else-if="!currentMerchant" class="col-span-3 flex items-center justify-center py-12">
            <div class="text-center">
              <img src="@/assets/images/icons/shop-grey.svg" class="size-12 mx-auto mb-4" alt="no merchant">
              <p class="text-monday-gray">No merchant data found. Please contact administrator.</p>
            </div>
          </div>
          
          <!-- Dashboard Cards -->
          <template v-else>
            <div id="Total-Revenue" class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
              <div class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                <img src="@/assets/images/icons/wallet-blue-fill.svg" class="size-6" alt="icon">
              </div>
              <div class="flex flex-col gap-[6px]">
                <p class="font-semibold text-[32px]">Rp {{ formatCurrency(dashboardData.total_revenue) }}</p>
                <p class="font-medium text-lg text-monday-gray">Total Revenue</p>
              </div>
            </div>
            
            <div id="Total-Transactions" class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
              <div class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                <img src="@/assets/images/icons/document-text-blue-fill.svg" class="size-6" alt="icon">
              </div>
              <div class="flex flex-col gap-[6px]">
                <p class="font-semibold text-[32px]">{{ formatNumber(dashboardData.total_transactions) }}</p>
                <p class="font-medium text-lg text-monday-gray">Total Transactions</p>
              </div>
            </div>
            
            <div id="Products-Sold" class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
              <div class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                <img src="@/assets/images/icons/bag-blue-fill.svg" class="size-6" alt="icon">
              </div>
              <div class="flex flex-col gap-[6px]">
                <p class="font-semibold text-[32px]">{{ formatNumber(dashboardData.products_sold) }}</p>
                <p class="font-medium text-lg text-monday-gray">Products Sold</p>
              </div>
            </div>
          </template>
        </section>

        <!-- Latest Transactions -->
        <section id="Latest-Transaction" class="flex flex-col gap-5 flex-1 rounded-3xl p-[18px] bg-white">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-xl">Latest Transaction</h2>
            <div v-if="loading" class="flex items-center gap-2">
              <img src="@/assets/images/icons/loading.svg" class="size-5 animate-spin" alt="loading">
              <span class="text-sm text-monday-gray">Loading...</span>
            </div>
          </div>
          
          <!-- Loading State -->
          <div v-if="loading && transactions.length === 0" class="flex flex-col items-center justify-center py-12">
            <img src="@/assets/images/icons/loading.svg" class="size-12 animate-spin mb-4" alt="loading">
            <p class="text-monday-gray">Loading transactions...</p>
          </div>

          <!-- Transaction Cards -->
          <div v-else-if="transactions.length > 0" class="flex flex-col gap-5">
            <div 
              v-for="(transaction, index) in transactions" 
              :key="transaction.id"
              class="card-merchant flex flex-col rounded-2xl border border-monday-border"
            >
              <div class="flex items-center justify-between p-4 gap-3 pb-5">
                <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                  <img src="@/assets/images/icons/user-thin-grey.svg" class="flex size-[42px] shrink-0" alt="icon">
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-xl">{{ transaction.name }}</p>
                  <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                    <img src="@/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
                    <span>{{ transaction.phone }}</span>
                  </p>
                </div>
                <div class="flex items-center gap-[6px]">
                  <img src="@/assets/images/icons/shop-black.svg" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap">{{ transaction.merchant_name }}</p>
                </div>
              </div>
              <hr class="border-monday-border">
              <div class="flex flex-col px-4 gap-5 py-5">
                <button @click="toggleProductAssigned(index + 1)" class="flex items-center justify-between">
                  <p class="font-semibold text-lg">Product Assigned ({{ transaction.transaction_products?.length || 0 }})</p>
                  <img :src="expandedSections.includes(index + 1) ? '/src/assets/images/icons/arrow-circle-down.svg' : '/src/assets/images/icons/arrow-circle-up.svg'" class="size-6 flex shrink-0 transition-300" alt="icon">
                </button>
                <div v-show="expandedSections.includes(index + 1)" class="flex flex-col gap-5">
                  <div v-for="(product, productIndex) in transaction.transaction_products" :key="product.id" class="card flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3 w-full">
                      <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                        <img :src="product.product_photo" class="size-full object-contain" alt="product">
                      </div>
                      <div class="flex flex-col gap-2 flex-1">
                        <p class="font-semibold text-xl line-clamp-1">{{ product.product_name }}</p>
                        <p class="font-semibold text-xl text-monday-blue">
                          Rp {{ formatNumber(product.price) }} 
                          <span class="text-monday-gray">({{ product.quantity }}x)</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-[6px] w-full">
                      <img :src="getCategoryIcon(product.category?.name)" class="size-6 flex shrink-0" alt="icon" onerror="this.src='/src/assets/images/icons/box-grey.svg'">
                      <p class="font-semibold text-lg text-nowrap">{{ product.category?.name || 'Uncategorized' }}</p>
                    </div>
                    <button @click="showProductDetails(product)" class="btn btn-primary-opacity min-w-[130px] font-semibold">Details</button>
                  </div>
                  <hr v-if="productIndex < transaction.transaction_products?.length - 1" class="border-monday-border last:hidden">
                </div>
              </div>
              <hr class="border-monday-border">
              <div class="flex items-center justify-between px-4 py-5">
                <p class="flex items-center gap-1 font-semibold text-lg text-monday-gray">
                  <img src="@/assets/images/icons/money-grey.svg" class="size-6 flex shrink-0" alt="icon">
                  Grandtotal:
                </p>
                <p class="font-semibold text-xl text-monday-blue">Rp {{ formatNumber(transaction.grand_total) }}</p>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="!loading" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6 py-12">
            <img src="@/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no transaction data yet.</p>
          </div>
        </section>
      </main>
    </div>

    <!-- Product Details Modal -->
    <div v-if="showModal" class="modal flex flex-1 items-center justify-center h-full fixed top-0 w-full z-50">
      <div @click="closeModal" class="backdrop absolute w-full h-full bg-[#292D32B2]"></div>
      <div class="relative flex flex-col w-[406px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
        <div class="modal-header flex items-center justify-between">
          <p class="font-semibold text-xl">Product Details</p>
          <button @click="closeModal" class="flex size-14 rounded-full items-center justify-center bg-monday-gray-background">
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-6" alt="icon">
          </button>
        </div>
        <div class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5" v-if="selectedProduct">
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <p class="flex items-center gap-[6px] font-semibold text-lg">
                <img :src="getCategoryIcon(selectedProduct.category?.name)" class="size-6 flex shrink-0" alt="icon" onerror="this.src='/src/assets/images/icons/box-grey.svg'">
                {{ selectedProduct.category?.name || 'Uncategorized' }}
              </p>
              <p class="font-bold text-lg">{{ selectedProduct.product_name }}</p>
              <p class="font-semibold text-[17px] text-monday-blue">
                Rp {{ formatNumber(selectedProduct.price) }}
                <span class="text-monday-gray text-sm">(Qty: {{ selectedProduct.quantity }})</span>
              </p>
            </div>
            <div class="flex size-[100px] rounded-2xl bg-monday-gray-background items-center justify-center overflow-hidden">
              <img :src="selectedProduct.product_photo" class="size-full object-contain" alt="product" onerror="this.src='/src/assets/images/icons/gallery-default.svg'">
            </div>
          </div>
          <hr class="border-monday-border">
          <div>
            <p class="font-medium text-sm text-monday-gray">Product About</p>
            <p class="font-semibold leading-[160%]">{{ selectedProduct.product_about || 'No description available for this product.' }}</p>
          </div>
          <hr class="border-monday-border">
          <div class="flex items-center justify-between">
            <p class="font-medium text-sm text-monday-gray">Subtotal</p>
            <p class="font-semibold text-lg text-monday-blue">Rp {{ formatNumber(selectedProduct.sub_total) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MerchantSidebar from '@/components/MerchantSidebar.vue'
import MerchantTopBar from '@/components/MerchantTopBar.vue'
import { getKeeperDashboardData, getTransactions, getFirstMerchantFromStorage } from '@/js/api'

// Reactive data
const transactions = ref([])
const dashboardData = ref({
  total_revenue: 0,
  total_transactions: 0,
  products_sold: 0,
  merchant: null
})
const expandedSections = ref([1, 2]) // Default expanded sections
const showModal = ref(false)
const loading = ref(false)
const dashboardLoading = ref(false)
const selectedProduct = ref(null)
const currentMerchant = ref(null)
const retryCount = ref(0)
const maxRetries = 3
const dashboardError = ref('')
const refreshInterval = ref(null)

// Methods
const loadDashboardData = async () => {
  try {
    dashboardLoading.value = true
    
    // Ambil merchant data dari localStorage
    const merchant = getFirstMerchantFromStorage()
    if (!merchant) {
      console.error('No merchant data found')
      // Redirect ke login jika tidak ada merchant data
      window.location.href = '/'
      return
    }
    
    currentMerchant.value = merchant
    
    // Panggil API dashboard keeper dengan merchant_id
    const response = await getKeeperDashboardData(merchant.id)
    
    if (response.data) {
      dashboardData.value = {
        total_revenue: response.data.total_revenue || 0,
        total_transactions: response.data.total_transactions || 0,
        products_sold: response.data.products_sold || 0,
        merchant: response.data.merchant || null
      }
    }
    
    console.log('Dashboard data loaded:', dashboardData.value)
    retryCount.value = 0 // Reset retry count on success
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
    
    // Retry mechanism
    if (retryCount.value < maxRetries) {
      retryCount.value++
      console.log(`Retrying... Attempt ${retryCount.value}/${maxRetries}`)
      setTimeout(() => {
        loadDashboardData()
      }, 1000 * retryCount.value) // Exponential backoff
      return
    }
    
    // Fallback data jika API tidak tersedia setelah retry
    const merchant = getFirstMerchantFromStorage()
    if (merchant) {
      dashboardData.value = {
        total_revenue: 0,
        total_transactions: 0,
        products_sold: 0,
        merchant: {
          id: merchant.id,
          name: merchant.name,
          address: merchant.address,
          photo: merchant.photo
        }
      }
    } else {
      dashboardData.value = {
        total_revenue: 0,
        total_transactions: 0,
        products_sold: 0,
        merchant: null
      }
    }
  } finally {
    dashboardLoading.value = false
  }
}

const loadLatestTransactions = async () => {
  try {
    loading.value = true
    
    // Jika ada merchant data, filter berdasarkan merchant_id
    let query = '?limit=2'
    if (currentMerchant.value) {
      query += `&merchant_id=${currentMerchant.value.id}`
    }
    
    const response = await getTransactions(query)
    transactions.value = response.transactions || []
    
    console.log('Latest transactions loaded:', transactions.value)
    
  } catch (error) {
    console.error('Error loading latest transactions:', error)
    transactions.value = []
  } finally {
    loading.value = false
  }
}

const toggleProductAssigned = (sectionId) => {
  const index = expandedSections.value.indexOf(sectionId)
  if (index > -1) {
    expandedSections.value.splice(index, 1)
  } else {
    expandedSections.value.push(sectionId)
  }
}

const showProductDetails = (product) => {
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID').format(amount)
}

const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number)
}

const getCategoryIcon = (categoryName) => {
  if (!categoryName) return '/src/assets/images/icons/box-grey.svg'
  
  const categoryIcons = {
    'cosmetics': '/src/assets/images/icons/Makeup-black.svg',
    'makeup': '/src/assets/images/icons/Makeup-black.svg',
    'electronics': '/src/assets/images/icons/smartwatch.png',
    'fashion': '/src/assets/images/icons/bag-black.svg',
    'food': '/src/assets/images/icons/milk-black.svg',
    'beverages': '/src/assets/images/icons/glass-black.svg'
  }
  
  const lowerCategory = categoryName.toLowerCase()
  return categoryIcons[lowerCategory] || '/src/assets/images/icons/box-grey.svg'
}

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  event.target.src = '/src/assets/images/icons/shop-grey.svg'
}

const refreshDashboard = async () => {
  try {
    await loadDashboardData()
    await loadLatestTransactions()
  } catch (error) {
    console.error('Error refreshing dashboard:', error)
  }
}

// Lifecycle
onMounted(async () => {
  await loadDashboardData()
  await loadLatestTransactions()
  
  // Auto-refresh dashboard data setiap 5 menit
  refreshInterval.value = setInterval(async () => {
    if (!dashboardLoading.value) {
      await loadDashboardData()
    }
  }, 5 * 60 * 1000) // 5 menit
})

onUnmounted(() => {
  // Cleanup interval
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
})
</script>

<style scoped>
.blue-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

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
</style> 