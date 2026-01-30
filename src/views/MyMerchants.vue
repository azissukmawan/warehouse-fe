<template>
  <div id="main-container" class="flex flex-1">
    <!-- Sidebar -->
    <MerchantSidebar />

    <!-- Main Content -->
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
      <!-- Top Bar -->
      <MerchantTopBar 
        title="My Merchants" 
        breadcrumbText="Back to Dashboard"
        breadcrumbLink="/overview"
      />

      <!-- Main Content -->
      <main class="flex flex-col gap-6 flex-1">

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="flex items-center gap-3">
            <img src="@/assets/images/icons/loading.svg" class="size-6 animate-spin" alt="loading">
            <span class="font-semibold text-lg">Loading merchants...</span>
          </div>
        </div>

        <!-- Merchant Info -->
        <section v-else-if="selectedMerchant" id="Merchant-Info" class="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white">
          <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
            <img :src="selectedMerchant.photo" class="size-full object-contain" alt="merchant">
          </div>
          <div class="flex flex-col gap-2 flex-1">
            <p class="font-semibold text-xl">{{ selectedMerchant.name }}</p>
            <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
              <img src="@/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
              <span>{{ selectedMerchant.phone }}</span>
            </p>
          </div>
          <div class="flex flex-col gap-2 flex-1">
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/user-grey.svg" class="size-4 flex shrink-0" alt="icon">
              <span>Keeper Name:</span>
            </p>
            <p class="font-semibold text-lg">{{ selectedMerchant.keeper_name }} (You)</p>
          </div>
        </section>

        <!-- Merchant Selection -->
        <section v-else-if="merchants.length > 0" id="Merchant-Selection" class="flex flex-col gap-4 rounded-3xl p-[18px] bg-white">
          <div class="flex items-center gap-2">
            <img src="@/assets/images/icons/buildings-2-black.svg" class="size-6" alt="icon">
            <p class="font-semibold text-xl">Select Merchant</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button 
              v-for="merchant in merchants" 
              :key="merchant.id"
              @click="selectMerchant(merchant)"
              class="flex items-center gap-3 px-4 py-3 rounded-2xl border border-monday-border hover:border-monday-blue hover:bg-monday-blue/5 transition-all duration-300"
            >
              <div class="flex size-12 rounded-xl bg-monday-background items-center justify-center overflow-hidden">
                <img :src="merchant.photo" class="size-full object-contain" alt="merchant">
              </div>
              <div class="flex flex-col">
                <p class="font-semibold text-base">{{ merchant.name }}</p>
                <p class="text-sm text-monday-gray">{{ merchant.merchant_products?.length || 0 }} Products</p>
              </div>
            </button>
          </div>
        </section>

        <!-- Products Section -->
        <section v-if="selectedMerchant" id="Products" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
          <div id="Header" class="flex items-center justify-between px-[18px]">
            <div class="flex flex-col gap-[6px]">
              <p class="flex items-center gap-[6px]">
                <img src="@/assets/images/icons/buildings-2-black.svg" class="size-6 flex shrink-0" alt="icon">
                <span class="font-semibold text-2xl">{{ merchantProducts?.length || 0 }} Total Products</span>
              </p>
              <p class="font-semibold text-lg text-monday-gray">View and update your Product Warehouses list here.</p>
            </div>
            <button 
              @click="refreshProducts" 
              :disabled="loadingProducts"
              class="btn btn-primary-opacity font-semibold flex items-center gap-2"
            >
              <span>{{ loadingProducts ? 'Refreshing...' : 'Refresh' }}</span>
            </button>
          </div>
          <hr class="border-monday-border">
          <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-xl">All Products</p>
            </div>
            
            <!-- Loading Products State -->
            <div v-if="loadingProducts" class="flex items-center justify-center py-12">
              <div class="flex items-center gap-3">
                <img src="@/assets/images/icons/loading.svg" class="size-6 animate-spin" alt="loading">
                <span class="font-semibold text-lg">Loading products...</span>
              </div>
            </div>
            
            <!-- Product Cards -->
            <div v-else class="flex flex-col gap-5">
              <div v-for="(product, index) in merchantProducts" :key="product.id" 
                   class="card flex items-center justify-between gap-6">
                <div class="flex items-center gap-3 w-[340px] shrink-0">
                  <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                    <img :src="product.product_photo" class="size-full object-contain" alt="product">
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[242px] truncate">{{ product.product_name }}</p>
                    <p class="font-semibold text-xl text-monday-blue">
                      Rp {{ formatPrice(product.product_price) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] w-[187px] shrink-0">
                  <img src="@/assets/images/icons/box-black.svg" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.stock }} Stock</p>
                </div>
                <div class="flex items-center gap-[6px] w-[187px] shrink-0">
                  <img :src="product.product_category_photo" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.product_category }}</p>
                </div>
                <div class="flex items-center gap-4">
                  <button @click="showProductDetails(product)" class="btn btn-primary-opacity min-w-[130px] font-semibold">Details</button>
                </div>
              </div>
              <hr v-if="index < merchantProducts.length - 1" class="border-monday-border last:hidden">
            </div>

            <!-- Empty State -->
            <div v-if="!loadingProducts && (!merchantProducts || merchantProducts.length === 0)" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
              <img src="@/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
              <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
            </div>
          </div>
        </section>

        <!-- Empty State for No Merchants -->
        <div v-else-if="showEmptyState" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
          <img src="@/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
          <p class="font-semibold text-monday-gray">Oops, it looks like there's no merchant assigned to you yet.</p>
        </div>
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
        <div class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5">
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <p class="flex items-center gap-[6px] font-semibold text-lg">
                <img :src="selectedProduct.product_category_photo" class="size-6 flex shrink-0" alt="icon">
                {{ selectedProduct.product_category }}
              </p>
              <p class="font-bold text-lg">{{ selectedProduct.product_name }}</p>
              <p class="font-semibold text-[17px] text-monday-blue">Rp {{ formatPrice(selectedProduct.product_price) }}</p>
            </div>
            <div class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
              <img :src="selectedProduct.product_photo" class="size-full object-contain" alt="product">
            </div>
          </div>
          <hr class="border-monday-border">
          <div>
            <p class="font-medium text-sm text-monday-gray">Product About</p>
            <p class="font-semibold leading-[160%]">{{ selectedProduct.product_about }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <p class="font-medium text-sm text-monday-gray">Stock</p>
              <p class="font-semibold">{{ selectedProduct.stock }}</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="font-medium text-sm text-monday-gray">Warehouse</p>
              <p class="font-semibold">{{ selectedProduct.warehouse_name }}</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="font-medium text-sm text-monday-gray">Warehouse Phone</p>
              <p class="font-semibold">{{ selectedProduct.warehouse_phone }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getMerchants, getMerchantProducts } from '@/js/api'
import MerchantSidebar from '@/components/MerchantSidebar.vue'
import MerchantTopBar from '@/components/MerchantTopBar.vue'

const authStore = useAuthStore()

// Reactive data
const merchants = ref([])
const selectedMerchant = ref(null)
const merchantProducts = ref([])
const loading = ref(true)
const loadingProducts = ref(false)
const showModal = ref(false)
const showEmptyState = ref(false)
const selectedProduct = ref({})

// Fetch merchants data
const fetchMerchants = async () => {
  try {
    loading.value = true
    
    // Cek apakah data merchant sudah ada di localStorage
    const storedMerchantData = authStore.getMerchantData()
    
    if (storedMerchantData && storedMerchantData.length > 0) {
      // Gunakan data dari localStorage
      merchants.value = storedMerchantData
      showEmptyState.value = false
      
      // Auto-select first merchant if available
      if (merchants.value.length > 0) {
        selectedMerchant.value = merchants.value[0]
        // Fetch products for selected merchant
        await fetchMerchantProducts(selectedMerchant.value.id)
      }
      
      loading.value = false
      return
    }
    
    // Jika tidak ada data di localStorage, fetch dari API
    const currentUser = authStore.currentUser
    
    if (!currentUser || !currentUser.id) {
      console.error('User not authenticated or user ID not found')
      showEmptyState.value = true
      return
    }

    // Fetch merchants with keeper_id query parameter
    const response = await getMerchants(`?keeper_id=${currentUser.id}`)
    
    if (response.data) {
      merchants.value = Array.isArray(response.data.merchant_products) ? response.data.merchant_products : [response.data.merchant_products]
      showEmptyState.value = merchants.value.length === 0
      
      // Auto-select first merchant if available
      if (merchants.value.length > 0) {
        selectedMerchant.value = merchants.value[0]
        // Fetch products for selected merchant
        await fetchMerchantProducts(selectedMerchant.value.id)
      }
    } else {
      merchants.value = []
      showEmptyState.value = true
    }
  } catch (error) {
    console.error('Error fetching merchants:', error)
    merchants.value = []
    showEmptyState.value = true
  } finally {
    loading.value = false
  }
}

// Fetch merchant products
const fetchMerchantProducts = async (merchantId) => {
  try {
    loadingProducts.value = true
    
    const response = await getMerchantProducts(merchantId)
    
    if (response.data) {
      merchantProducts.value = Array.isArray(response.data.merchant_products) ? response.data.merchant_products : [response.data.merchant_products]
    } else {
      merchantProducts.value = []
    }
  } catch (error) {
    console.error('❌ Error fetching merchant products:', error)
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    })
    merchantProducts.value = []
  } finally {
    loadingProducts.value = false
  }
}

// Select merchant
const selectMerchant = async (merchant) => {
  selectedMerchant.value = merchant
  // Fetch products for the selected merchant
  await fetchMerchantProducts(merchant.id)
}

// Refresh products for the current selected merchant
const refreshProducts = async () => {
  if (selectedMerchant.value) {
    await fetchMerchantProducts(selectedMerchant.value.id)
  }
}

// Format price to Indonesian Rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

// Show product details modal
const showProductDetails = (product) => {
  selectedProduct.value = product
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
}

// Fetch data on component mount
onMounted(() => {
  fetchMerchants()
})
</script>

<style scoped>
.blue-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.btn-primary-opacity {
  @apply bg-monday-blue/10 text-monday-blue hover:bg-monday-blue/20 transition-all duration-300;
}

.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.transition-300 {
  transition: all 0.3s ease;
}
</style> 