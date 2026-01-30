<template>
  <div id="main-container" class="flex flex-1">
    <!-- Sidebar -->
    <MerchantSidebar />

    <!-- Main Content -->
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
      <!-- Top Bar -->
      <MerchantTopBar 
        title="Add New Transaction" 
        breadcrumbText="Manage Transactions"
        breadcrumbLink="/transactions"
      />

      <!-- Main Content -->
      <main class="flex flex-col gap-6 flex-1">
        <!-- Steps Indicator -->
        <div id="Steps" class="relative flex w-full h-[127px] rounded-3xl p-[18px] bg-white">
          <div class="relative flex flex-col w-full gap-3 items-center text-center">
            <img src="@/assets/images/icons/tick-square-checked-blue.svg" class="size-8 flex shrink-0" alt="icon">
            <div class="flex flex-col gap-1">
              <p class="font-medium text-monday-gray">Step 1</p>
              <p class="font-semibold text-lg">Customer Detail</p>
            </div>
          </div>
          <div class="absolute transform -translate-y-1/2 top-[34px] left-[21.6%] h-[3px] overflow-hidden w-1/4">
            <img src="@/assets/images/icons/Line-blue.svg" class="size-full object-cover object-center" alt="icon">
          </div>
          <div class="relative flex flex-col w-full gap-3 items-center text-center">
            <img src="@/assets/images/icons/tick-square-blue.svg" class="size-8 flex shrink-0" alt="icon">
            <div class="flex flex-col gap-1">
              <p class="font-medium text-monday-gray">Step 2</p>
              <p class="font-semibold text-lg">Assign Products</p>
            </div>
          </div>
          <div class="absolute transform -translate-y-1/2 top-[34px] right-[21.6%] h-[3px] overflow-hidden w-1/4">
            <img src="@/assets/images/icons/line-half-blue.svg" class="size-full object-cover object-center" alt="icon">
          </div>
          <div class="relative flex flex-col w-full gap-3 items-center text-center">
            <img src="@/assets/images/icons/tick-square-grey.svg" class="size-8 flex shrink-0" alt="icon">
            <div class="flex flex-col gap-1">
              <p class="font-medium text-monday-gray">Step 3</p>
              <p class="font-semibold text-lg">Review Transaction</p>
            </div>
          </div>
        </div>

        <!-- Products Section -->
        <section id="Products" class="flex flex-col flex-1 gap-6 rounded-3xl p-[18px] px-0 bg-white">
          <!-- Customer Info Summary -->
          <div class="flex items-center justify-between px-[18px] py-4 bg-monday-blue/5 rounded-2xl border border-monday-blue/20">
            <div class="flex items-center gap-4">
              <div class="flex size-12 rounded-xl bg-monday-background items-center justify-center overflow-hidden">
                <img src="@/assets/images/icons/user-thin-grey.svg" class="size-6" alt="customer">
              </div>
              <div class="flex flex-col">
                <p class="font-semibold text-base text-monday-blue">Customer Information</p>
                <p class="font-medium text-sm">{{ customerInfo.customerName }}</p>
                <p class="text-sm text-monday-gray">{{ customerInfo.phoneNumber }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex size-10 rounded-xl bg-monday-background items-center justify-center overflow-hidden">
                <img :src="customerInfo.merchant?.photo" class="size-full object-contain" alt="merchant">
              </div>
              <div class="flex flex-col">
                <p class="font-semibold text-sm text-monday-blue">Merchant</p>
                <p class="font-medium text-xs">{{ customerInfo.merchant?.name }}</p>
              </div>
            </div>
          </div>
          
          <div id="Header" class="flex items-center justify-between px-[18px]">
            <div class="flex flex-col gap-[6px]">
              <p class="flex items-center gap-[6px]">
                <img src="@/assets/images/icons/shopping-cart-black.svg" class="size-6 flex shrink-0" alt="icon">
                <span class="font-semibold text-2xl">{{ totalItems }} Total Items</span>
              </p>
              <p class="font-semibold text-lg text-monday-gray">Manage Your Product Assigned</p>
            </div>
            <button @click="openAssignModal" class="btn btn-primary font-semibold">
              Assign Product
              <img src="@/assets/images/icons/add-square-white.svg" class="flex size-6 shrink-0" alt="icon">
            </button>
          </div>
          <hr class="border-monday-border">
          <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-xl">Product Assigned</p>
            </div>
            
            <!-- Product Cards -->
            <div v-if="assignedProducts.length > 0" class="flex flex-col gap-5">
              <div v-for="(product, index) in assignedProducts" :key="product.id" class="card flex items-center justify-between gap-6">
                <div class="flex items-center gap-3 w-[340px] shrink-0">
                  <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                    <img :src="product.image" class="size-full object-contain" alt="icon">
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[242px] truncate">{{ product.name }}</p>
                    <p class="font-semibold text-xl text-monday-blue">
                      {{ product.price }} <span class="text-monday-gray">({{ product.quantity }}x)</span> 
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] w-[187px] shrink-0">
                  <img :src="product.categoryIcon" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.category }}</p>
                </div>
                <div class="flex flex-col gap-2 w-[187px] shrink-0">
                  <p class="flex items-center gap-1 font-medium text-monday-gray">
                    <img src="@/assets/images/icons/money-grey.svg" class="size-4 flex shrink-0" alt="icon">
                    Subtotal
                  </p>    
                  <p class="font-semibold text-xl text-monday-blue">{{ product.subtotal }}</p>
                </div>
                <div class="flex items-center gap-4">
                  <button @click="removeProduct(product.id)" class="btn bg-monday-red/10 rounded-2xl text-monday-red w-[146px] font-semibold">
                    <img src="@/assets/images/icons/trash-red.svg" class="size-6" alt="icon">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
              <img src="@/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
              <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-between px-[18px] py-4">
              <button @click="handleBack" class="btn btn-red font-semibold">
                Back
              </button>
              <div class="flex items-center gap-4">
                <div class="flex flex-col items-end">
                  <p class="font-semibold text-lg">Total Amount</p>
                  <p class="font-bold text-xl text-monday-blue">{{ formattedTotalAmount }}</p>
                </div>
                <button 
                  @click="handleContinue" 
                  :disabled="!transactionStore.isStep2Complete"
                  :class="[
                    'btn font-semibold transition-all duration-300',
                    transactionStore.isStep2Complete 
                      ? 'btn-primary hover:bg-monday-blue/90' 
                      : 'btn-primary text-white cursor-not-allowed opacity-50'
                  ]"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- Assign Products Modal -->
    <div v-if="showAssignModal" class="modal flex flex-1 items-center justify-center h-full fixed top-0 w-full z-50 py-10">
      <div @click="closeAssignModal" class="backdrop absolute w-full h-full bg-[#292D32B2]"></div>
      <div class="relative flex flex-col flex-1 w-full max-w-[1200px] h-full max-h-[752px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
        <div class="modal-header flex items-center justify-between">
          <p class="font-semibold text-xl">Assign Products</p>
          <button @click="closeAssignModal" class="flex size-14 rounded-full items-center justify-center bg-monday-gray-background">
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-6" alt="icon">
          </button>
        </div>
        <div class="modal-content flex flex-1 overflow-y-auto overscroll-contain hide-scrollbar">
          <div class="flex flex-col gap-5 w-full">
            <!-- Loading State -->
            <div v-if="loadingProducts" class="flex justify-center items-center py-12">
              <div class="flex items-center gap-3">
                <img src="@/assets/images/icons/loading.svg" class="size-6 animate-spin" alt="loading">
                <span class="font-semibold text-lg">Loading products...</span>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-else-if="availableProducts.length === 0" class="flex flex-col items-center justify-center py-12 gap-3">
              <img src="@/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
              <p class="font-semibold text-monday-gray">No products available for this merchant.</p>
            </div>
            
            <!-- Products List -->
            <div v-else v-for="product in availableProducts" :key="product.id" class="card-assign flex flex-col rounded-3xl border border-monday-border p-4 gap-5">
              <div class="flex items-center justify-between gap-6">
                <div class="flex items-center gap-3 w-[270px] shrink-0">
                  <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                    <img :src="product.image" class="size-full object-contain" alt="icon">
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[172px] truncate">{{ product.name }}</p>
                    <p class="price font-semibold text-xl text-monday-blue">
                      {{ product.price }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img :src="product.categoryIcon" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.category }}</p>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img src="@/assets/images/icons/box-black.svg" class="size-6 flex shrink-0" alt="icon">
                  <p class="stock font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.stock }} Stock</p>
                </div>
                <div class="flex items-center rounded-2xl p-4 gap-3 bg-monday-blue/10 text-monday-blue">
                  <button @click="decreaseQuantity(product.id)" type="button" class="minus flex size-6 shrink-0">
                    <img src="@/assets/images/icons/minus-square-blue.svg" class="size-6" alt="icon">
                  </button>
                  <p class="amount min-w-12 font-medium text-[22px] text-center">{{ product.selectedQuantity || 0 }}</p>
                  <button @click="increaseQuantity(product.id)" type="button" class="plus flex size-6 shrink-0">
                    <img src="@/assets/images/icons/add-square-blue-fill.svg" class="size-6" alt="icon">
                  </button>
                </div>
              </div>
              <hr class="border-monday-border">
              <div class="flex items-center justify-between">
                <p class="flex items-center gap-1 font-semibold text-monday-gray">
                  <img src="@/assets/images/icons/money-grey.svg" class="size-6 flex shrink-0" alt="icon">
                  Subtotal:
                </p>
                <p class="subtotal font-semibold text-xl text-monday-blue">{{ getSubtotal(product) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-4">
          <button @click="closeAssignModal" class="btn btn-red font-semibold">
            Cancel
          </button>
          <button @click="addToCart" class="btn btn-primary font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import { useRouter } from 'vue-router'
import { getMerchantProducts } from '@/js/api'
import MerchantSidebar from '@/components/MerchantSidebar.vue'
import MerchantTopBar from '@/components/MerchantTopBar.vue'

const transactionStore = useTransactionStore()
const router = useRouter()

// Get customer info from previous step
const customerInfo = computed(() => transactionStore.customerInfo)
const assignedProducts = computed(() => transactionStore.assignedProducts)

// Modal state
const showAssignModal = ref(false)
const loadingProducts = ref(false)

// Available products from API
const availableProducts = ref([])

// Computed properties
const totalItems = computed(() => transactionStore.totalItems)
const totalAmount = computed(() => transactionStore.totalAmount)
const formattedTotalAmount = computed(() => `Rp ${totalAmount.value.toLocaleString('id-ID')}`)

// Fetch merchant products
const fetchMerchantProducts = async () => {
  try {
    loadingProducts.value = true
    
    const response = await getMerchantProducts(customerInfo.value.merchantId)
    
    if (response.data) {
      const products = Array.isArray(response.data.merchant_products) ? response.data.merchant_products : [response.data.merchant_products]
      
      // Transform API data to match modal structure
      availableProducts.value = products.map(product => ({
        id: product.id,
        product_id: product.product_id,
        name: product.product_name,
        price: `Rp ${formatPrice(product.product_price)}`,
        stock: product.stock,
        category: product.product_category,
        categoryIcon: product.product_category_photo,
        image: product.product_photo,
        selectedQuantity: 0,
        // Additional data from API
        product_about: product.product_about,
        warehouse_name: product.warehouse_name,
        warehouse_phone: product.warehouse_phone
      }))
    } else {
      availableProducts.value = []
    }
  } catch (error) {
    console.error('❌ Error fetching merchant products:', error)
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    })
    availableProducts.value = []
  } finally {
    loadingProducts.value = false
  }
}

// Format price to Indonesian Rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

// Load data from previous step
onMounted(() => {
  // Load transaction data from localStorage
  transactionStore.loadFromLocalStorage()
  
  // Check if step 1 is complete
  if (!transactionStore.isStep1Complete) {
    router.push('/transactions/add-1')
    return
  }
})

// Methods
const closeAssignModal = () => {
  showAssignModal.value = false
}

const openAssignModal = async () => {
  showAssignModal.value = true
  
  // Fetch products when modal opens
  if (availableProducts.value.length === 0) {
    await fetchMerchantProducts()
  }
}

const increaseQuantity = (productId) => {
  const product = availableProducts.value.find(p => p.id === productId)
  if (product && product.selectedQuantity < product.stock) {
    product.selectedQuantity = (product.selectedQuantity || 0) + 1
  }
}

const decreaseQuantity = (productId) => {
  const product = availableProducts.value.find(p => p.id === productId)
  if (product && product.selectedQuantity > 0) {
    product.selectedQuantity -= 1
  }
}

const getSubtotal = (product) => {
  const quantity = product.selectedQuantity || 0
  const price = parseInt(product.price.replace(/[^\d]/g, ''))
  return `Rp ${(price * quantity).toLocaleString('id-ID')}`
}

const addToCart = () => {
  const selectedProducts = availableProducts.value.filter(p => p.selectedQuantity > 0)
  
  selectedProducts.forEach(product => {
    transactionStore.addProduct({
      id: product.id,
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      quantity: product.selectedQuantity,
      category: product.category,
      categoryIcon: product.categoryIcon,
      image: product.image
    })
  })

  // Reset selected quantities
  availableProducts.value.forEach(p => p.selectedQuantity = 0)
  
  closeAssignModal()
}

const removeProduct = (productId) => {
  transactionStore.removeProduct(productId)
}

const updateProductQuantity = (productId, newQuantity) => {
  transactionStore.updateProductQuantity(productId, newQuantity)
}

const handleContinue = () => {
  // Check if products are assigned
  if (!transactionStore.isStep2Complete) {
    alert('Please assign at least one product')
    return
  }
  
  // Navigate to next step
  transactionStore.nextStep()
  router.push('/transactions/add-3')
  
  console.log('✅ Step 2 completed, navigating to Step 3')
}

const handleBack = () => {
  transactionStore.previousStep()
  router.push('/transactions/add-1')
}
</script>

<style scoped>

.transition-300 {
  transition: all 0.3s ease;
}

.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style> 