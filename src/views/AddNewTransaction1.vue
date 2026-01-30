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
            <img src="@/assets/images/icons/tick-square-blue.svg" class="size-8 flex shrink-0" alt="icon">
            <div class="flex flex-col gap-1">
              <p class="font-medium text-monday-gray">Step 1</p>
              <p class="font-semibold text-lg">Customer Detail</p>
            </div>
          </div>
          <div class="absolute transform -translate-y-1/2 top-[34px] left-[21.6%] h-[3px] overflow-hidden w-1/4">
            <img src="@/assets/images/icons/line-half-blue.svg" class="size-full object-cover object-center" alt="icon">
          </div>
          <div class="relative flex flex-col w-full gap-3 items-center text-center">
            <img src="@/assets/images/icons/tick-square-grey.svg" class="size-8 flex shrink-0" alt="icon">
            <div class="flex flex-col gap-1">
              <p class="font-medium text-monday-gray">Step 2</p>
              <p class="font-semibold text-lg">Assign Products</p>
            </div>
          </div>
          <div class="absolute transform -translate-y-1/2 top-[34px] right-[21.6%] h-[3px] overflow-hidden w-1/4">
            <img src="@/assets/images/icons/Line-grey.svg" class="size-full object-cover object-center" alt="icon">
          </div>
          <div class="relative flex flex-col w-full gap-3 items-center text-center">
            <img src="@/assets/images/icons/tick-square-grey.svg" class="size-8 flex shrink-0" alt="icon">
            <div class="flex flex-col gap-1">
              <p class="font-medium text-monday-gray">Step 3</p>
              <p class="font-semibold text-lg">Review Transaction</p>
            </div>
          </div>
        </div>

        <!-- Form and Sidebar -->
        <div class="flex gap-6">
          <!-- Customer Information Form -->
          <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
            <h2 class="font-semibold text-xl">Customer Informations</h2>
            
            <!-- Customer Name Input -->
            <label class="group relative">
              <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
                <img src="@/assets/images/icons/user-thin-grey.svg" class="flex size-6 shrink-0" alt="icon">
              </div>
              <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                Customer Name
              </p>
              <input 
                v-model="formData.customerName"
                type="text" 
                class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
                placeholder=""
                required
              >
            </label>

            <!-- Phone Number Input -->
            <label class="group relative">
              <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
                <img src="@/assets/images/icons/call-grey.svg" class="flex size-6 shrink-0" alt="icon">
              </div>
              <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                Phone Number
              </p>
              <input 
                v-model="formData.phoneNumber"
                type="tel" 
                class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
                placeholder=""
                required
              >
            </label>

            <!-- Form Actions -->
            <div class="flex items-center justify-between">
              <router-link to="/transactions" class="btn btn-red font-semibold">
                Cancel
              </router-link>
              <button 
                type="submit" 
                :disabled="!canSubmit"
                :class="[
                  'btn font-semibold transition-all duration-300',
                  canSubmit 
                    ? 'btn-primary hover:bg-monday-blue/90' 
                    : 'btn-primary text-white cursor-not-allowed opacity-50'
                ]"
              >
                {{ loading ? 'Loading...' : 'Continue' }}
              </button>
            </div>
          </form>

          <!-- Merchant Info Sidebar -->
          <div class="flex w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center w-full py-8">
              <div class="flex items-center gap-3">
                <img src="@/assets/images/icons/loading.svg" class="size-6 animate-spin" alt="loading">
                <span class="font-semibold text-lg">Loading merchant...</span>
              </div>
            </div>
            
            <!-- Single Merchant Display -->
            <div v-else-if="selectedMerchant" class="flex items-center gap-3 w-full">
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
            </div>
            
            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center w-full py-8 gap-3">
              <img src="@/assets/images/icons/buildings-2-grey.svg" class="size-12" alt="icon">
              <p class="font-semibold text-monday-gray text-center">No merchant available</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTransactionStore } from '@/stores/transaction'
import { useRouter } from 'vue-router'
import MerchantSidebar from '@/components/MerchantSidebar.vue'
import MerchantTopBar from '@/components/MerchantTopBar.vue'

const authStore = useAuthStore()
const transactionStore = useTransactionStore()
const router = useRouter()

const selectedMerchant = ref(null)
const merchants = ref([])
const loading = ref(true)
const showEmptyState = ref(false)

// Form data - bind to transaction store
const formData = reactive({
  customerName: transactionStore.customerInfo.customerName,
  phoneNumber: transactionStore.customerInfo.phoneNumber
})

// Computed properties
const isFormValid = computed(() => {
  return formData.customerName.trim() && 
         formData.phoneNumber.trim() && 
         selectedMerchant.value
})

const canSubmit = computed(() => {
  return !loading.value && isFormValid.value
})

// Watch for form data changes and update store
const updateFormData = () => {
  transactionStore.setCustomerInfo({
    customerName: formData.customerName,
    phoneNumber: formData.phoneNumber,
    merchantId: selectedMerchant.value?.id || null,
    merchant: selectedMerchant.value
  })
}

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
        updateFormData()
      }

      console.log('✅ Merchants loaded from localStorage:', merchants.value.length, 'merchants')
      
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
    const { getMerchants } = await import('@/js/api')
    const response = await getMerchants(`?keeper_id=${currentUser.id}`)
    
    if (response.data) {
      merchants.value = Array.isArray(response.data) ? response.data : [response.data]
      showEmptyState.value = merchants.value.length === 0
      
      // Auto-select first merchant if available
      if (merchants.value.length > 0) {
        selectedMerchant.value = merchants.value[0]
        updateFormData()
      }
      
      console.log('✅ Merchants fetched from API:', merchants.value.length, 'merchants')
    } else {
      merchants.value = []
      showEmptyState.value = true
      console.log('⚠️ No merchants data in response')
    }
  } catch (error) {
    console.error('❌ Error fetching merchants:', error)
    merchants.value = []
    showEmptyState.value = true
  } finally {
    loading.value = false
  }
}

// Select merchant
const selectMerchant = async (merchant) => {
  selectedMerchant.value = merchant
  updateFormData()
  console.log('✅ Selected merchant:', merchant)
}

// Handle form submission
const handleSubmit = () => {
  // Validate form
  if (!formData.customerName.trim() || !formData.phoneNumber.trim()) {
    alert('Please fill in all required fields')
    return
  }

  // Validate merchant selection
  if (!selectedMerchant.value) {
    alert('Please select a merchant')
    return
  }

  // Update transaction store with final data
  updateFormData()
  
  // Navigate to next step
  transactionStore.nextStep()
  router.push('/transactions/add-2')
  
  console.log('✅ Step 1 completed, navigating to Step 2')
}

// Load data on mount
onMounted(() => {
  // Load transaction data from localStorage
  transactionStore.loadFromLocalStorage()
  
  // Pre-fill form if data exists
  if (transactionStore.customerInfo.customerName) {
    formData.customerName = transactionStore.customerInfo.customerName
    formData.phoneNumber = transactionStore.customerInfo.phoneNumber
  }
  
  // Set selected merchant if exists
  if (transactionStore.customerInfo.merchant) {
    selectedMerchant.value = transactionStore.customerInfo.merchant
  }
  
  // Fetch merchants
  fetchMerchants()
})
</script>

<style scoped>
.blue-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.btn-red {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.transition-300 {
  transition: all 0.3s ease;
}

/* Floating label styles */
.group:has(:placeholder-shown) .placeholder {
  top: 36px;
}

.group:focus-within .placeholder {
  top: 25px;
}
</style> 