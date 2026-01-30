<template>
  <Layout 
    pageTitle="Update Stock Product"
    breadcrumbText="Merchant Details"
    :breadcrumbLink="`/merchants/${$route.params.merchantId}`">
    
    <!-- Main Content -->
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <!-- Left Column - Form -->
        <div class="flex flex-col gap-6 w-full">
          
          <!-- Warehouse Details Card -->
          <div class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
            <h2 class="font-semibold text-xl">Warehouse Details</h2>
            <div class="flex flex-col gap-5 p-[18px] rounded-3xl border-[1.5px] border-monday-border">
              <div class="flex items-center gap-3">
                <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                  <img src="@/assets/images/thumbnails/warehouse-1.png" class="size-full object-cover" alt="icon">
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-lg">{{ warehouseDetails.name }}</p>
                  <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                    <img src="@/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
                    <span>{{ warehouseDetails.phone }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
            <h2 class="font-semibold text-xl">Merchant Details</h2>
            <div class="flex flex-col gap-5 p-[18px] rounded-3xl border-[1.5px] border-monday-border">
              <div class="flex items-center gap-3">
                <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                  <img src="@/assets/images/thumbnails/merchant-1.png" class="size-full object-cover" alt="icon">
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-lg">{{ merchantDetails.name }}</p>
                  <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                    <img src="@/assets/images/icons/user-thin-grey.svg" class="size-6 flex shrink-0" alt="icon">
                    <span>{{ merchantDetails.keeper }}</span>
                  </p>
                </div>
              </div>
              <hr class="border-monday-border">
              <div class="flex items-center gap-3">
                <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                  <img src="@/assets/images/thumbnails/lipstick.png" class="size-full object-contain" alt="icon">
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-xl">{{ productDetails.name }}</p>
                  <p class="font-semibold text-xl text-monday-blue">
                    Rp {{ formatPrice(productDetails.price) }}
                  </p>
                </div>
                <div class="flex items-center gap-[6px] shrink-0">
                  <img src="@/assets/images/icons/box-black.svg" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap">{{ productDetails.currentStock }} Stock</p>
                </div>
              </div>
            </div>
            
            <h2 class="font-semibold text-xl">Update Stock</h2>
            <label class="group relative">
              <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                <img src="@/assets/images/icons/box-grey.svg" class="flex size-6 shrink-0" alt="icon">
              </div>
              <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                Type a Stock
              </p>
              <input 
                type="number" 
                v-model="formData.newStock"
                required
                min="0"
                class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
                placeholder="">
            </label>
            
            <!-- Stock Summary -->
            <div v-if="formData.newStock !== ''" class="flex flex-col gap-2 p-4 rounded-2xl bg-monday-background">
              <p class="font-semibold text-lg">Stock Summary</p>
              <div class="flex items-center justify-between">
                <span class="font-medium text-monday-gray">Current Stock:</span>
                <span class="font-semibold">{{ productDetails.currentStock }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-medium text-monday-gray">New Stock:</span>
                <span class="font-semibold">{{ formData.newStock }}</span>
              </div>
              <hr class="border-monday-border">
              <div class="flex items-center justify-between">
                <span class="font-semibold text-lg">Difference:</span>
                <span :class="getStockDifferenceClass()" class="font-semibold text-lg">
                  {{ getStockDifference() }}
                </span>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex items-center justify-end gap-4">
              <router-link :to="`/merchants/${$route.params.merchantId}`" class="btn btn-red font-semibold">
                Cancel
              </router-link>
              <button type="submit" class="btn btn-primary font-semibold" :disabled="isLoading">
                <span v-if="isLoading">Saving...</span>
                <span v-else>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Right Column - Quick Guide -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Add Stock Product</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Thoroughly review warehouse and product details to ensure accuracy</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Input the stock quantity accurately to maintain precise inventory records and avoid discrepancies</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Verify and confirm merchant details to ensure accuracy</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Double-check all details to ensure accuracy before saving</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Save the changes to update the Lorem information and ensure all dummy text</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { updateMerchantProductStock } from '@/js/api'

export default {
  name: 'UpdateMerchantStock',
  components: {
    Layout
  },
  data() {
    return {
      warehouseDetails: {
        name: '',
        phone: ''
      },
      merchantDetails: {
        name: '',
        keeper: ''
      },
      productDetails: {
        name: '',
        price: 0,
        currentStock: 0
      },
      formData: {
        newStock: 0
      },
      isLoading: false
    }
  },
  created() {
    this.loadDetailsFromQuery()
  },
  methods: {
    loadDetailsFromQuery() {
      const query = this.$route.query
      const merchantId = this.$route.params.merchantId
      const productId = this.$route.params.productId
      
      if (!productId || !merchantId) {
        console.error('Product ID or Merchant ID not provided')
        this.$router.push('/merchants')
        return
      }
      
      // Load data from query parameters
      this.warehouseDetails = {
        name: query.warehouse_name || 'Warehouse tidak ditemukan',
        phone: query.warehouse_phone || 'N/A'
      }
      
      this.merchantDetails = {
        name: query.merchant_name || 'Merchant tidak ditemukan',
        keeper: query.keeper_name || 'Keeper tidak ditemukan'
      }
      
      this.productDetails = {
        name: query.product_name || 'Product tidak ditemukan',
        price: parseInt(query.product_price) || 0,
        currentStock: parseInt(query.current_stock) || 0
      }
      
      // Set initial new stock value to current stock
      this.formData.newStock = this.productDetails.currentStock
      
  
        warehouse: this.warehouseDetails,
        merchant: this.merchantDetails,
        product: this.productDetails
      })
    },
    

    
    async handleSubmit() {
      // Validasi form
      if (!this.formData.newStock || this.formData.newStock < 0) {
        alert('Stock harus lebih dari atau sama dengan 0')
        return
      }

      this.isLoading = true
      const productId = this.$route.params.productId
      const merchantId = this.$route.params.merchantId
      try {
        // Prepare request data using data from query parameters
        const requestData = {
          stock: this.formData.newStock,
          warehouse_id: parseInt(this.$route.query.warehouse_id) || null,
          merchant_id: parseInt(merchantId),
          product_id: parseInt(productId),
          merchant_product_id: parseInt(this.$route.query.merchant_product_id)
        }
        
        // Call API to update merchant product stock
        const response = await updateMerchantProductStock(requestData)
        
        // Show success message
        alert('Stock updated successfully!')
        
        // Redirect to merchant details page
        this.$router.push(`/merchants/${merchantId}`)
        
      } catch (error) {
        console.error('Error updating stock:', error)
        alert('Gagal mengupdate stock. Silakan coba lagi.')
      } finally {
        this.isLoading = false
      }
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID').format(price)
    },
    
    getStockDifference() {
      if (this.formData.newStock === '') return 0
      const difference = this.formData.newStock - this.productDetails.currentStock
      return difference >= 0 ? `+${difference}` : `${difference}`
    },
    
    getStockDifferenceClass() {
      if (this.formData.newStock === '') return ''
      const difference = this.formData.newStock - this.productDetails.currentStock
      if (difference > 0) return 'text-green-600'
      if (difference < 0) return 'text-red-600'
      return 'text-monday-gray'
    }
  }
}
</script>

<style scoped>
.monday-blue {
  @apply text-[#0073EA];
}

.monday-gray {
  @apply text-[#676879];
}

.monday-border {
  @apply border-[#E6E6E6];
}

.monday-background {
  @apply bg-[#F7F7F7];
}

.monday-black {
  @apply text-[#292D32];
}

.btn-red {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.transition-300 {
  @apply transition-all duration-300;
}

/* Custom input styling */
input:focus {
  outline: none;
}

/* Placeholder animation */
.placeholder {
  transition: all 0.3s ease;
}

.group:focus-within .placeholder {
  top: 25px !important;
}

.group:has(:placeholder-shown) .placeholder {
  top: 36px !important;
}

/* Form validation styling */
input:invalid {
  border-color: #ef4444;
}

input:valid {
  border-color: #10b981;
}
</style> 