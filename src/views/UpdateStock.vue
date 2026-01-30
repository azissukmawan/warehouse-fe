<template>
  <Layout page-title="Update Stock Product" :breadcrumb-text="warehouse.id ? 'Warehouse Details' : ''" :breadcrumb-link="warehouse.id ? `/warehouses/${warehouse.id}` : ''">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <div class="flex flex-col gap-6 w-full">
          <!-- Form Section -->
          <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
            <h2 class="font-semibold text-xl">Warehouse Details</h2>
            
            <!-- Warehouse and Product Details -->
            <div class="flex flex-col gap-5 p-[18px] rounded-3xl border-[1.5px] border-monday-border">
              <!-- Warehouse Info -->
              <div class="flex items-center gap-3">
                <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                  <img :src="getWarehouseImage(warehouse.photo)" class="size-full object-cover" alt="warehouse">
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-lg">{{ warehouse.name }}</p>
                  <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                    <img src="/src/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
                    <span>{{ warehouse.phone }}</span>
                  </p>
                </div>
              </div>
              
              <hr class="border-monday-border">
              
              <!-- Product Info -->
              <div class="flex items-center gap-3">
                <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                  <img :src="getProductImage(product.photo)" class="size-full object-contain" alt="product">
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-xl">{{ product.name }}</p>
                  <p class="font-semibold text-xl text-monday-blue">
                    Rp {{ formatNumber(product.price) }}
                  </p>
                </div>
                <div class="flex items-center gap-[6px] shrink-0">
                  <img src="/src/assets/images/icons/box-black.svg" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap">{{ product.currentStock }} Stock</p>
                </div>
              </div>
            </div>

            <!-- Update Stock Section -->
            <h2 class="font-semibold text-xl">Update Stock</h2>
            
            <!-- Stock Input -->
            <label class="group relative">
              <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
                <img src="/src/assets/images/icons/box-grey.svg" class="flex size-6 shrink-0" alt="icon">
              </div>
              <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                Type a Stock
              </p>
              <input 
                v-model.number="formData.newStock" 
                type="number" 
                min="0"
                required
                class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
                placeholder=""
              >
            </label>

            <!-- Stock Summary -->
            <div v-if="formData.newStock !== ''" class="flex flex-col gap-2 p-4 rounded-2xl bg-monday-background">
              <p class="font-semibold text-lg">Stock Summary</p>
              <div class="flex items-center justify-between">
                <span class="font-medium text-monday-gray">Current Stock:</span>
                <span class="font-semibold">{{ product.currentStock }}</span>
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

            <!-- Danger Zone -->
            <div class="border-t border-red-200 pt-6 mt-6">
              <div class="flex items-center gap-2 mb-4">
                <img src="/src/assets/images/icons/trash-red.svg" class="size-6" alt="danger">
                <h3 class="text-red-600 font-semibold text-lg">Danger Zone</h3>
              </div>
              <div class="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div class="flex items-start gap-3">
                  <div class="flex size-8 rounded-full bg-red-100 items-center justify-center shrink-0">
                    <img src="/src/assets/images/icons/notification-black.svg" class="size-5" alt="warning">
                  </div>
                  <div class="flex flex-col gap-2">
                    <p class="font-semibold text-red-700">Remove Product from Warehouse</p>
                    <p class="text-red-600 text-sm leading-relaxed">
                      This action will remove the product from this warehouse and set its stock to 0. 
                      The product will no longer be available in this warehouse inventory.
                    </p>
                    <div class="flex items-center gap-3 mt-3">
                      <button 
                        @click="removeProductFromWarehouse"
                        class="btn btn-red-opacity font-semibold"
                      >
                        <img src="/src/assets/images/icons/trash-red.svg" class="size-5" alt="delete">
                        Remove Product
                      </button>
                      <span class="text-red-500 text-sm font-medium">Permanent Action</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-end gap-4">
              <router-link :to="`/warehouses/${warehouse.id}`" class="btn btn-red font-semibold">
                Cancel
              </router-link>
              <button type="submit" class="btn btn-primary font-semibold" :disabled="isSubmitting">
                <span v-if="isSubmitting">Updating...</span>
                <span v-else>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Quick Guide Sidebar -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Update Stock</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Ensure the warehouse has enough capacity lorem ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Double-check product details to avoid mismatches dummy text ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Keep stock levels updated to prevent overselling lorem si ipsum text simply</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Regularly review assigned products for accuracy text dummy lorem ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Communicate with the warehouse team for smooth operations</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getWarehouseProductDetail, updateWarehouseProductStock, removeProductFromWarehouse } from '@/js/api'

export default {
  name: 'UpdateStock',
  components: {
    Layout
  },
  data() {
    return {
      warehouse: {
        id: null,
        name: '',
        phone: '',
        photo: ''
      },
      product: {
        id: null,
        name: '',
        price: 0,
        currentStock: 0,
        photo: ''
      },
      formData: {
        newStock: ''
      },
      isSubmitting: false
    }
  },
  async created() {
    await this.loadWarehouseAndProductDetails()
  },
  methods: {
    async loadWarehouseAndProductDetails() {
      const warehouseId = this.$route.query.warehouse || this.$route.params.warehouseId
      const productId = this.$route.query.product || this.$route.params.warehouseProductId
      
      if (!warehouseId || !productId) {
        console.error('Warehouse ID or Product ID not provided')
        this.$router.push('/warehouses')
        return
      }
      
      try {
        // Call API to get warehouse product details
        const response = await getWarehouseProductDetail(warehouseId, productId)
        
        // Map API response to component data
        const apiData = response.data
        
        this.warehouse = {
          id: apiData.id,
          name: apiData.warehouse_name,
          phone: apiData.warehouse_phone,
          photo: apiData.warehouse_photo
        }
        
        this.product = {
          id: apiData.product_id,
          name: apiData.product_name,
          price: apiData.product_price,
          currentStock: apiData.stock,
          photo: apiData.product_photo
        }
        
        // Set initial new stock value to current stock
        this.formData.newStock = this.product.currentStock
        
      } catch (error) {
        console.error('Error loading warehouse product details:', error)
        // Warehouse product not found, redirect to warehouses list
        this.$router.push('/warehouses')
      }
    },
    getWarehouseImage(photo) {
      // Use photo from API if available, otherwise use fallback
      if (photo) {
        return photo
      }
      return '/src/assets/images/icons/buildings-2-black.svg'
    },
    getProductImage(photo) {
      // Use photo from API if available, otherwise use fallback
      if (photo) {
        return photo
      }
      return '/src/assets/images/icons/bag-black.svg'
    },
    formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(num)
    },
    getStockDifference() {
      if (this.formData.newStock === '') return 0
      const difference = this.formData.newStock - this.product.currentStock
      return difference >= 0 ? `+${difference}` : `${difference}`
    },
    getStockDifferenceClass() {
      if (this.formData.newStock === '') return ''
      const difference = this.formData.newStock - this.product.currentStock
      if (difference > 0) return 'text-green-600'
      if (difference < 0) return 'text-red-600'
      return 'text-monday-gray'
    },
    async handleSubmit() {
      if (this.formData.newStock === '') {
        alert('Please enter the new stock value')
        return
      }

      if (this.formData.newStock < 0) {
        alert('Stock cannot be negative')
        return
      }

      this.isSubmitting = true

      try {
        const warehouseId = this.$route.query.warehouse || this.$route.params.warehouseId
        // Prepare request data
        const requestData = {
          stock: this.formData.newStock,
          product_id: this.product.id,
          warehouse_id: warehouseId
        }
        
        const productId = this.$route.query.product || this.$route.params.warehouseProductId
        // Call API to update warehouse product stock
        const response = await updateWarehouseProductStock(warehouseId, productId, requestData)
        
        const difference = this.formData.newStock - this.product.currentStock
        const action = difference > 0 ? 'increased' : difference < 0 ? 'decreased' : 'updated'
        
        // Show success message
        alert(`Stock successfully ${action} for ${this.product.name} in ${this.warehouse.name}`)
        
        // Redirect to warehouse details page
        this.$router.push(`/warehouses/${warehouseId}`)
      } catch (error) {
        console.error('Error updating stock:', error)
        alert('Failed to update stock. Please try again.')
      } finally {
        this.isSubmitting = false
      }
    },
    
    async removeProductFromWarehouse() {
      const productName = this.product.name || 'this product'
      const warehouseName = this.warehouse.name || 'this warehouse'
      const warehouseId = this.$route.query.warehouse || this.$route.params.warehouseId
      
      if (confirm(`Apakah Anda yakin ingin menghapus produk "${productName}" dari warehouse "${warehouseName}"?\n\nTindakan ini akan mengatur stock menjadi 0 dan produk tidak akan tersedia lagi di warehouse ini.`)) {
        try {
          // Call API to remove product from warehouse
          const response = await removeProductFromWarehouse(warehouseId, this.product.id)
          
          // Show success message
          alert(`Produk "${productName}" berhasil dihapus dari warehouse "${warehouseName}"!`)
          
          // Redirect to warehouse details page
          this.$router.push(`/warehouses/${warehouseId}`)
        } catch (error) {
          console.error('Failed to remove product from warehouse:', error)
          alert('Gagal menghapus produk dari warehouse. Silakan coba lagi.')
        }
      }
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

.card {
  @apply bg-white rounded-2xl p-4 border border-monday-border;
}

.btn-red {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.btn-red-opacity {
  @apply bg-red-50 text-red-600 hover:bg-red-100 border border-red-200;
}

.btn-black {
  @apply bg-monday-black text-white hover:bg-monday-black/90;
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

/* Stock summary styling */
.stock-summary {
  @apply bg-monday-background rounded-2xl p-4;
}
</style> 