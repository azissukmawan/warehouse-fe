<template>
    <Layout 
        pageTitle="Merchant Assign Product"
        breadcrumbText="Merchant Details"
        :breadcrumbLink="`/merchants/${$route.params.merchantId}`">

        <!-- Main Content -->
        <main class="flex flex-col gap-6 flex-1">
        <div class="flex gap-6">
            <!-- Left Column - Form -->
            <div class="flex flex-col gap-6 w-full">
            
            <!-- Loading State -->
            <div v-if="isLoadingMerchant" class="flex flex-col items-center justify-center rounded-3xl p-[18px] gap-6 bg-white">
              <img src="/src/assets/images/icons/loading.svg" class="size-[52px] animate-spin" alt="loading">
              <p class="font-semibold text-monday-gray">Loading merchant details...</p>
            </div>
            
            <!-- Merchant Details Card -->
            <div v-else class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
                <p class="font-semibold text-xl">Merchant Details</p>
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
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
                <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
                <!-- Product ID Dropdown -->
                <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
                    <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                        <img src="@/assets/images/icons/bag-grey.svg" class="flex size-6 shrink-0" alt="icon">
                    </div>
                    <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300">
                        Product ID
                    </p>
                    <select v-model="formData.productId" required class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]" :disabled="isLoadingProducts">
                        <option value="" disabled selected>{{ isLoadingProducts ? 'Loading products...' : 'Select Product' }}</option>
                        <option v-for="product in products" :key="product.id" :value="product.id">
                        {{ product.name }}
                        </option>
                    </select>
                    <img src="@/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
                </label>
                <!-- Warehouse ID Dropdown -->
                <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
                    <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                        <img src="@/assets/images/icons/buildings-2-grey.svg" class="flex size-6 shrink-0" alt="icon">
                    </div>
                    <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300">
                        Warehouse ID
                    </p>
                    <select v-model="formData.warehouseId" required class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]" :disabled="isLoadingWarehouses || !formData.productId">
                        <option value="" disabled selected>
                          {{ !formData.productId ? 'Select Product First' : isLoadingWarehouses ? 'Loading warehouses...' : 'Select Warehouse' }}
                        </option>
                        <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                        {{ warehouse.name }}
                        </option>
                    </select>
                    <img src="@/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
                </label>
                <!-- Stock Input -->
                <label class="group relative">
                <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img src="@/assets/images/icons/box-grey.svg" class="flex size-6 shrink-0" alt="icon">
                </div>
                <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                    Type a Stock
                </p>
                <input type="number" v-model="formData.stock" required min="1" class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" placeholder="">
                </label>
                <!-- Action Buttons -->
                <div class="flex items-center justify-end gap-4">
                <router-link :to="`/merchants/${$route.params.merchantId}`" class="btn btn-red font-semibold">
                    Cancel
                </router-link>
                <button type="submit" class="btn btn-primary font-semibold" :disabled="isLoading">
                    <span v-if="isLoading">Creating...</span>
                    <span v-else>Create Now</span>
                </button>
                </div>
            </form>
            </div>
            <!-- Right Column - Quick Guide -->
            <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
            <p class="font-semibold">Quick Guide to Assign New Product</p>
            <ul class="flex flex-col gap-4">
                <li class="flex gap-[6px]">
                <img src="../assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                <p class="font-medium leading-[140%]">Verify and confirm merchant Lorem information to ensure accuracy</p>
                </li>
                <li class="flex gap-[6px]">
                <img src="../assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                <p class="font-medium leading-[140%]">Verify all details for accuracy before proceeding to prevent errors</p>
                </li>
                <li class="flex gap-[6px]">
                <img src="../assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                <p class="font-medium leading-[140%]">Accurately enter the stock quantity to maintain precise inventory records</p>
                </li>
                <li class="flex gap-[6px]">
                <img src="../assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                <p class="font-medium leading-[140%]">Carefully review warehouse and product details to ensure accuracy Ipsum</p>
                </li>
                <li class="flex gap-[6px]">
                <img src="../assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                <p class="font-medium leading-[140%]">Click 'Create Now' to assign and finalize the process efficiently</p>
                </li>
            </ul>
            </div>
        </div>
        </main>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getMerchantById, getProducts, assignProductToMerchant, getWarehousesForProduct } from '@/js/api'

export default {
  name: 'AssignMerchantProduct',
  components: {
    Layout
  },
  data() {
    return {
      merchantDetails: {
        name: '',
        keeper: ''
      },
      formData: {
        warehouseId: '',
        productId: '',
        stock: ''
      },
      warehouses: [],
      products: [],
      isLoading: false,
      isLoadingMerchant: false,
      isLoadingProducts: false,
      isLoadingWarehouses: false
    }
  },
  async created() {
    await this.loadMerchantDetails()
    await this.loadProducts()
  },
  methods: {
    async loadMerchantDetails() {
      const merchantId = this.$route.params.merchantId
      
      if (!merchantId) {
        console.error('No merchant ID provided')
        this.$router.push('/merchants')
        return
      }
      
      this.isLoadingMerchant = true
      
      try {
        // Get merchant details
        const response = await getMerchantById(merchantId)
        const merchantData = response.data
        
        this.merchantDetails = {
          name: merchantData.name || '',
          keeper: merchantData.keeper_name || 'Keeper tidak ditemukan'
        }
        
        console.log('Loaded merchant details:', merchantData)
        
      } catch (error) {
        console.error('Error loading merchant details:', error)
        // Redirect to merchants list if merchant not found
        this.$router.push('/merchants')
      } finally {
        this.isLoadingMerchant = false
      }
    },
    
    async loadProducts() {
      this.isLoadingProducts = true
      
      try {
        const response = await getProducts()
        
        // Map API response to component data
        this.products = response.data.products || []
        
        console.log('Loaded products:', this.products)
      } catch (error) {
        console.error('Error loading products:', error)
        // Fallback to mock data if API fails
        this.products = [
          { id: 1, name: 'Orange Juice' },
          { id: 2, name: 'Apple Juice' },
          { id: 3, name: 'Grape Juice' },
          { id: 4, name: 'Pineapple Juice' },
          { id: 5, name: 'Mango Juice' }
        ]
      } finally {
        this.isLoadingProducts = false
      }
    },
    
    async loadWarehousesForProduct(productId) {
      if (!productId) {
        this.warehouses = []
        return
      }
      
      this.isLoadingWarehouses = true
      
      try {
        const response = await getWarehousesForProduct(productId)
        
        // Map API response to component data
        this.warehouses = response.data || []
        
        console.log('Loaded warehouses for product:', this.warehouses)
      } catch (error) {
        console.error('Error loading warehouses for product:', error)
        this.warehouses = []
      } finally {
        this.isLoadingWarehouses = false
      }
    },
    
    async handleSubmit() {
      // Validasi form
      if (!this.formData.productId || !this.formData.warehouseId || !this.formData.stock) {
        alert('Mohon lengkapi semua data!')
        return
      }

      if (this.formData.stock <= 0) {
        alert('Stock harus lebih dari 0')
        return
      }

      this.isLoading = true

      const merchantId = this.$route.params.merchantId

      try {
        // Prepare request data
        const requestData = {
          product_id: this.formData.productId,
          warehouse_id: this.formData.warehouseId,
          stock: this.formData.stock,
          merchant_id: parseInt(merchantId)
        }
        
        // Call API to assign product to merchant
        const response = await assignProductToMerchant(merchantId, requestData)
        
        // Show success message
        alert('Product assigned successfully!')
        
        // Redirect to merchant details page
        this.$router.push(`/merchants/${merchantId}`)
        
      } catch (error) {
        console.error('Error assigning product to merchant:', error)
        alert('Gagal assign product ke merchant. Silakan coba lagi.')
      } finally {
        this.isLoading = false
      }
    }
  },
  watch: {
    'formData.productId': {
      handler(newProductId) {
        if (newProductId) {
          this.loadWarehousesForProduct(newProductId)
          // Reset warehouse selection when product changes
          this.formData.warehouseId = ''
        } else {
          this.warehouses = []
          this.formData.warehouseId = ''
        }
      },
      immediate: false
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

.btn {
  @apply flex items-center gap-2 px-4 py-3 rounded-2xl transition-300;
}

.btn-primary {
  @apply bg-monday-blue text-white hover:bg-monday-blue/90 disabled:bg-monday-gray disabled:cursor-not-allowed;
}

.btn-red {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.transition-300 {
  @apply transition-all duration-300;
}

/* Custom select styling */
select {
  background-image: none;
}

select:focus {
  outline: none;
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

.group:has(:invalid) .placeholder {
  top: 36px !important;
}

/* Form validation styling */
input:invalid,
select:invalid {
  border-color: #ef4444;
}

input:valid,
select:valid {
  border-color: #10b981;
}
</style> 