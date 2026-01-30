<template>
  <div id="main-container" class="flex flex-1">
    <!-- Sidebar -->
    <MerchantSidebar />

    <!-- Main Content -->
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
      <!-- Top Bar -->
      <MerchantTopBar 
        title="Manage Transactions" 
        breadcrumbText="Back to Dashboard"
        breadcrumbLink="/overview"
      />

      <!-- Main Content -->
      <main class="flex flex-col gap-6 flex-1">

        <!-- Warehouse Info -->
        <section id="Warehouse-Info" class="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white">
          <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
            <img :src="merchantInfo.photo" class="size-full object-contain" alt="merchant">
          </div>
          <div class="flex flex-col gap-2 flex-1">
            <p class="font-semibold text-xl">{{ merchantInfo.name }}</p>
            <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
              <img src="@/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
              <span>{{ merchantInfo.phone }}</span>
            </p>
          </div>
          <div class="flex flex-col gap-2 flex-1">
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/user-grey.svg" class="size-4 flex shrink-0" alt="icon">
              <span>Keeper Name:</span>
            </p>
            <p class="font-semibold text-lg">{{ merchantInfo.keeper_name }} (You)</p>
          </div>
        </section>

        <!-- Products Section -->
        <section id="Products" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
          <div id="Header" class="flex items-center justify-between px-[18px]">
            <div class="flex flex-col gap-[6px]">
              <p class="flex items-center gap-[6px]">
                <img src="@/assets/images/icons/receipt-text-black.svg" class="size-6 flex shrink-0" alt="icon">
                <span class="font-semibold text-2xl">{{ pagination.total_records }} Total Transactions</span>
              </p>
              <p class="font-semibold text-lg text-monday-gray">View and update your transactions list here.</p>
            </div>
            <router-link to="/transactions/add-1" class="btn btn-primary font-semibold">
              Add New
              <img src="@/assets/images/icons/add-square-white.svg" class="flex size-6 shrink-0" alt="icon">
            </router-link>
          </div>
          <hr class="border-monday-border">
          <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-xl">All Transactions</p>
              <div class="flex items-center gap-2">
                <button @click="fetchTransactions" class="btn btn-primary-opacity font-semibold">
                  Refresh
                </button>
              </div>
            </div>
            
            <!-- Transaction Cards -->
            <div v-for="(transaction, index) in transactions" :key="transaction.id" 
                 class="card-merchant flex flex-col rounded-2xl border border-monday-border">
              <div class="flex flex-col gap-5 p-4 pb-5">
                <p class="font-semibold text-lg">Customer Details</p>
                <div class="flex items-center justify-between gap-3">
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
                </div>
              </div>
              <hr class="border-monday-border">
                              <div class="flex flex-col px-4 gap-5 py-5">
                  <button @click="toggleProductAssigned(index + 1)" class="flex items-center justify-between">
                    <p class="font-semibold text-lg">Product Assigned ({{ transaction.transaction_products?.length }})</p>
                    <img :src="expandedSections.includes(index + 1) ? '/src/assets/images/icons/arrow-circle-down.svg' : '/src/assets/images/icons/arrow-circle-up.svg'" class="size-6 flex shrink-0 transition-300" alt="icon">
                  </button>
                  <div v-show="expandedSections.includes(index + 1)" class="flex flex-col gap-5">
                    <div v-for="(product, productIndex) in transaction.transaction_products" :key="product.id" class="card flex items-center justify-between gap-3">
                      <div class="flex items-center gap-3 w-[420px] shrink-0">
                        <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                          <img :src="product.product_photo" class="size-full object-contain" alt="product">
                        </div>
                        <div class="flex flex-col gap-2 flex-1">
                          <p class="font-semibold text-xl">{{ product.product_name }}</p>
                          <p class="font-semibold text-xl text-monday-blue">
                            Rp {{ formatNumber(product.price) }} 
                            <span class="text-monday-gray">({{ product.quantity }}x)</span>
                          </p>

                        </div>
                      </div>
                      <div class="flex items-center gap-[6px] w-full justify-center">
                        <img :src="getCategoryIcon(product.category?.name)" class="size-6 flex shrink-0" alt="icon">
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

            <!-- Empty State -->
            <div v-if="transactions.length === 0" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
              <img src="@/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
              <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
            </div>
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
        <div class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5">
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <p class="flex items-center gap-[6px] font-semibold text-lg">
                <img :src="getCategoryIcon(selectedProduct.category?.name)" class="size-6 flex shrink-0" alt="icon">
                {{ selectedProduct.category?.name || 'Uncategorized' }}
              </p>
              <p class="font-bold text-lg">{{ selectedProduct.product_name }}</p>
              <p class="font-semibold text-[17px] text-monday-blue">Rp {{ formatNumber(selectedProduct.price) }}</p>
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
          <div class="flex items-center justify-between">
            <p class="font-medium text-sm text-monday-gray">Quantity:</p>
            <p class="font-semibold text-lg">{{ selectedProduct.quantity }}</p>
          </div>
          <div class="flex items-center justify-between">
            <p class="font-medium text-sm text-monday-gray">Sub Total:</p>
            <p class="font-semibold text-lg text-monday-blue">Rp {{ formatNumber(selectedProduct.sub_total) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getTransactions } from '@/js/api'
import MerchantSidebar from '@/components/MerchantSidebar.vue'
import MerchantTopBar from '@/components/MerchantTopBar.vue'

const authStore = useAuthStore()

// Reactive data
const transactions = ref([])
const pagination = ref({
  current_page: 1,
  total_pages: 1,
  total_records: 0,
  limit: 10,
  has_next: false,
  has_prev: false
})

const expandedSections = ref([])
const showModal = ref(false)
const selectedProduct = ref({})

// Get merchant data from localStorage
const merchantData = computed(() => {
  return authStore.getMerchantData()
})

// Get first merchant info (assuming keeper has one merchant)
const merchantInfo = computed(() => {
  if (merchantData.value && merchantData.value.length > 0) {
    return merchantData.value[0]
  }
  
  // Fallback data if no merchant data available
  return {
    name: 'Mazdo Merchant',
    phone: '0812923920329',
    keeper_name: 'Raratih Aqilla',
    photo: '/src/assets/images/thumbnails/merchant-1.png'
  }
})

// Fetch transactions from API
const fetchTransactions = async () => {
  try {
    // Get merchant ID for filtering
    const merchantId = merchantInfo.value?.id
    
    // Try different query approaches
    let query = ''
    if (merchantId) {
      query = `?merchant_id=${merchantId}`
    } else {
      // If no merchant ID, try without filter first
      query = ''
    }
    
    const response = await getTransactions(query)
    
    // Check different response structures
    if (response && response.data) {
      transactions.value = response.data.transactions || []
      pagination.value = response.data.pagination || {
        current_page: 1,
        total_pages: 1,
        total_records: 0,
        limit: 10,
        has_next: false,
        has_prev: false
      }
    } else if (response && response.transactions) {
      transactions.value = response.transactions || []
      pagination.value = response.pagination || {
        current_page: 1,
        total_pages: 1,
        total_records: 0,
        limit: 10,
        has_next: false,
        has_prev: false
      }
    } else {
      transactions.value = []
      pagination.value = {
        current_page: 1,
        total_pages: 1,
        total_records: 0,
        limit: 10,
        has_next: false,
        has_prev: false
      }
    }
    
  } catch (err) {
    console.error('❌ Error fetching transactions:', err)
    transactions.value = []
  }
}

// Test function with mock data
const testWithMockData = () => {
  transactions.value = [
    {
      id: 1,
      name: "aldi",
      phone: "086818212",
      email: "keeper@example.com",
      address: "Jalan Panjang banget as",
      sub_total: 200000,
      tax_total: 22000,
      grand_total: 222000,
      merchant_id: 1,
      payment_status: "pending",
      payment_method: "qris",
      transaction_code: "",
      notes: "",
      transaction_products: [
        {
          id: 1,
          product_id: 3,
          product_name: "Lipstik",
          product_photo: "https://sdnnwvwdefoxcpdwbmra.supabase.co/storage/v1/object/public/bwa-sayur/products/lipstick_1754536411.png",
          product_about: "Ini adalah lipstik terbaru yang sangat cocok untuk bibir tipis",
          quantity: 1,
          price: 200000,
          sub_total: 200000,
          transaction_id: 1,
          category: {
            id: 0,
            name: "Cosmetics",
            photo: ""
          }
        }
      ]
    }
  ]
  pagination.value = {
    current_page: 1,
    total_pages: 1,
    total_records: 1,
    limit: 10,
    has_next: false,
    has_prev: false
  }
}

// Format number to Indonesian currency format
const formatNumber = (number) => {
  if (!number) return '0'
  return new Intl.NumberFormat('id-ID').format(number)
}



// Get category icon based on category name
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
}

// Refresh merchant data on mount if needed
onMounted(async () => {
  // If no merchant data in localStorage and user is keeper, fetch it
  if (!merchantData.value && authStore.userRole?.toLowerCase() === 'keeper') {
    await authStore.refreshMerchantData()
  }
  
  // Wait a bit for merchant data to be available
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Fetch transactions
  await fetchTransactions()
  
  // If still no data, add some fallback for testing
  if (transactions.value.length === 0) {
    transactions.value = [
      {
        id: 1,
        name: "aldi",
        phone: "086818212",
        email: "keeper@example.com",
        address: "Jalan Panjang banget as",
        sub_total: 200000,
        tax_total: 22000,
        grand_total: 222000,
        merchant_id: 1,
        payment_status: "pending",
        payment_method: "qris",
        transaction_code: "",
        notes: "",
        transaction_products: [
          {
            id: 1,
            product_id: 3,
            product_name: "Lipstik",
            product_photo: "https://sdnnwvwdefoxcpdwbmra.supabase.co/storage/v1/object/public/bwa-sayur/products/lipstick_1754536411.png",
            product_about: "Ini adalah lipstik terbaru yang sangat cocok untuk bibir tipis",
            quantity: 1,
            price: 200000,
            sub_total: 200000,
            transaction_id: 1,
            category: {
              id: 0,
              name: "Cosmetics",
              photo: ""
            }
          }
        ]
      }
    ]
    pagination.value = {
      current_page: 1,
      total_pages: 1,
      total_records: 1,
      limit: 10,
      has_next: false,
      has_prev: false
    }
  }
})
</script>

<style scoped>
.transition-300 {
  transition: all 0.3s ease;
}


</style> 