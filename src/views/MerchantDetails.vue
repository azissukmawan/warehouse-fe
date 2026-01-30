<template>
  <Layout 
    pageTitle="Merchant Details"
    breadcrumbText="Merchant Details"
    breadcrumbLink="/merchants">
    <main class="flex flex-col gap-6 flex-1">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center rounded-3xl p-[18px] gap-6 bg-white">
        <img src="/src/assets/images/icons/loading.svg" class="size-[52px] animate-spin" alt="loading">
        <p class="font-semibold text-monday-gray">Loading merchant details...</p>
      </div>
      
      <!-- Info Merchant -->
      <section v-else class="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white">
        <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
          <img :src="getMerchantImage(merchant.photo)" class="size-full object-contain" alt="merchant">
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <p class="font-semibold text-xl">{{ merchant.name }}</p>
          <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
            <img src="/src/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
            <span>{{ merchant.phone }}</span>
          </p>
          <p class="flex items-center gap-1 font-medium text-monday-gray">
            <img src="/src/assets/images/icons/location-grey.svg" class="size-6 flex shrink-0" alt="icon">
            <span>{{ merchant.address }}</span>
          </p>
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <p class="flex items-center gap-1 font-medium text-monday-gray">
            <img src="/src/assets/images/icons/user-grey.svg" class="size-4 flex shrink-0" alt="icon">
            <span>Keeper Name:</span>
          </p>
          <div v-if="isLoadingKeeper" class="flex items-center gap-2">
            <img src="/src/assets/images/icons/loading.svg" class="size-4 animate-spin" alt="loading">
            <span class="font-semibold text-lg">Loading keeper...</span>
          </div>
          <div v-else-if="merchant.keeper" class="flex items-center gap-2">
            <div class="flex size-8 rounded-full bg-monday-background items-center justify-center overflow-hidden">
              <img :src="merchant.keeper.photo || '/src/assets/images/icons/profile-circle-grey.svg'" class="size-full object-cover" :alt="merchant.keeper.name">
            </div>
            <div class="flex flex-col">
              <p class="font-semibold text-lg">{{ merchant.keeper.name }}</p>
              <p class="font-medium text-sm text-monday-gray">{{ merchant.keeper.email }}</p>
            </div>
          </div>
          <p v-else class="font-semibold text-lg text-red-500">Keeper tidak ditemukan</p>
        </div>
        <router-link :to="`/merchants/edit/${merchant.id}`" class="btn btn-black w-[160px] font-semibold text-nowrap">
          Edit Merchant
        </router-link>
      </section>
      <!-- Produk Merchant -->
      <section class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
        <div class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img src="/src/assets/images/icons/buildings-2-black.svg" class="size-6 flex shrink-0" alt="icon">
              <span class="font-semibold text-2xl">{{ products.length }} Total Products</span>
            </p>
            <p class="font-semibold text-lg text-monday-gray">View and update your Product Warehouses list here.</p>
          </div>
          <router-link :to="`/assign-merchant-product/${merchant.id}`" class="btn btn-primary font-semibold">
            Assign a Products
            <img src="/src/assets/images/icons/add-square-white.svg" class="flex size-6 shrink-0" alt="icon">
          </router-link>
        </div>
        <hr class="border-monday-border">
        <div class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">All Products</p>
          </div>
          
          <!-- Loading State for Products -->
          <div v-if="isLoadingProducts" class="flex flex-col items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
            <img src="/src/assets/images/icons/loading.svg" class="size-[52px] animate-spin" alt="loading">
            <p class="font-semibold text-monday-gray">Loading products...</p>
          </div>
          
          <div v-else-if="products.length > 0" class="flex flex-col gap-5">
            <div v-for="(product, idx) in products" :key="product.id">
              <div class="card flex items-center justify-between gap-6">
                <div class="flex items-center gap-3 w-[260px] shrink-0">
                  <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                    <img :src="getProductImage(product.product_photo)" class="size-full object-contain" alt="product">
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[162px] truncate">{{ product.product_name }}</p>
                    <p class="font-semibold text-xl text-monday-blue">Rp {{ formatPrice(product.product_price) }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img src="/src/assets/images/icons/box-black.svg" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.stock }} Stock</p>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img :src="getCategoryIcon(product.product_category)" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.product_category }}</p>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img :src="getWarehouseImage(product.warehouse_photo)" class="size-6 flex shrink-0" alt="warehouse">
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.warehouse_name }}</p>
                </div>
                <div class="flex items-center gap-4">
                  <button @click="openModal(product)" class="btn btn-primary-opacity min-w-[130px] font-semibold">Details</button>
                  <router-link 
                    :to="{
                      path: `/update-stock/merchant/${product.merchant_id}/product/${product.product_id}`,
                      query: {
                        merchant_product_id: product.id,
                        product_name: product.product_name,
                        product_price: product.product_price,
                        product_photo: product.product_photo,
                        product_category: product.product_category,
                        current_stock: product.stock,
                        warehouse_id: product.warehouse_id,
                        warehouse_name: product.warehouse_name,
                        warehouse_photo: product.warehouse_photo,
                        warehouse_phone: product.warehouse_phone,
                        merchant_name: merchant.name,
                        merchant_phone: merchant.phone,
                        merchant_address: merchant.address,
                        keeper_name: merchant.keeper ? merchant.keeper.name : 'Keeper tidak ditemukan'
                      }
                    }" 
                    class="btn btn-black min-w-[130px] font-semibold">
                    Add Stock
                  </router-link>
                </div>
              </div>
              <hr v-if="idx < products.length - 1" class="border-monday-border last:hidden">
            </div>
          </div>
          <div v-else id="Empty-State" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
            <img src="/src/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
          </div>
          
          <!-- Pagination -->
          <div v-if="products.length > 0 && pagination.total_pages > 1" class="flex items-center justify-between px-[18px] py-4">
            <p class="font-medium text-monday-gray">
              Showing {{ (pagination.current_page - 1) * pagination.limit + 1 }}-{{ Math.min(pagination.current_page * pagination.limit, pagination.total_records) }} of {{ pagination.total_records }} products
            </p>
            <div class="flex items-center gap-2">
              <button 
                @click="loadMerchantProducts(pagination.current_page - 1)" 
                :disabled="!pagination.has_prev"
                class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span class="px-4 py-2 rounded-2xl font-semibold bg-monday-blue text-white">
                {{ pagination.current_page }} / {{ pagination.total_pages }}
              </span>
              <button 
                @click="loadMerchantProducts(pagination.current_page + 1)" 
                :disabled="!pagination.has_next"
                class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- Modal Detail Produk -->
      <div v-if="showModal" class="modal flex flex-1 items-center justify-center h-full fixed top-0 left-0 w-full z-50">
        <div @click="closeModal" class="backdrop absolute w-full h-full bg-[#292D32B2]"></div>
        <div class="relative flex flex-col w-[406px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
          <div class="modal-header flex items-center justify-between">
            <p class="font-semibold text-xl">Product Details</p>
            <button @click="closeModal" class="flex size-14 rounded-full items-center justify-center bg-monday-gray-background">
              <img src="/src/assets/images/icons/close-circle-black.svg" class="size-6" alt="icon">
            </button>
          </div>
          <div v-if="selectedProduct" class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5">
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-2">
                <p class="flex items-center gap-[6px] font-semibold text-lg">
                  <img :src="getCategoryIcon(selectedProduct.product_category)" class="size-6 flex shrink-0" alt="icon">
                  {{ selectedProduct.product_category }}
                </p>
                <p class="font-bold text-lg">{{ selectedProduct.product_name }}</p>
                <p class="font-semibold text-[17px] text-monday-blue">Rp {{ formatPrice(selectedProduct.product_price) }}</p>
              </div>
              <div class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                <img :src="getProductImage(selectedProduct.product_photo)" class="size-full object-contain" alt="product">
              </div>
            </div>
            <hr class="border-monday-border">
            <div>
              <p class="font-medium text-sm text-monday-gray">Product About</p>
              <p class="font-semibold leading-[160%]">{{ selectedProduct.product_about || 'No description available.' }}</p>
            </div>
            <hr class="border-monday-border">
            <div>
              <p class="font-medium text-sm text-monday-gray">Warehouse Info</p>
              <div class="flex items-center gap-2 mt-2">
                <div class="flex size-8 rounded-full bg-monday-background items-center justify-center overflow-hidden">
                  <img :src="getWarehouseImage(selectedProduct.warehouse_photo)" class="size-full object-cover" :alt="selectedProduct.warehouse_name">
                </div>
                <div class="flex flex-col">
                  <p class="font-semibold text-sm">{{ selectedProduct.warehouse_name }}</p>
                  <p class="font-medium text-xs text-monday-gray">{{ selectedProduct.warehouse_phone }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getMerchantById, getKeeperById, getMerchantProducts } from '@/js/api'

export default {
  name: 'MerchantDetails',
  components: {
    Layout
  },
  data() {
    return {
      merchant: {
        id: null,
        name: '',
        phone: '',
        address: '',
        photo: '',
        keeper_id: null,
        keeper: null
      },
      products: [],
      showModal: false,
      selectedProduct: null,
      isLoading: false,
      isLoadingKeeper: false,
      isLoadingProducts: false,
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_records: 0,
        limit: 10,
        has_next: false,
        has_prev: false
      }
    }
  },
  async created() {
    await this.loadMerchantDetails()
  },
  methods: {
    async loadMerchantDetails() {
      const merchantId = this.$route.params.id
      
      if (!merchantId) {
        console.error('No merchant ID provided')
        this.$router.push('/merchants')
        return
      }
      
      this.isLoading = true
      
      try {
        // Get merchant details
        const response = await getMerchantById(merchantId)
        const merchantData = response.data
        
        this.merchant = {
          id: merchantData.id,
          name: merchantData.name,
          phone: merchantData.phone,
          address: merchantData.address,
          photo: merchantData.photo,
          keeper_id: merchantData.keeper_id
        }
        
        // Load keeper details if keeper_id exists
        if (this.merchant.keeper_id) {
          await this.loadKeeperDetails()
        }
        
        // Load merchant products (you might need to create this API)
        await this.loadMerchantProducts()
        
      } catch (error) {
        console.error('Error loading merchant details:', error)
        // Redirect to merchants list if merchant not found
        this.$router.push('/merchants')
      } finally {
        this.isLoading = false
      }
    },
    
    async loadKeeperDetails() {
      if (!this.merchant.keeper_id) return
      
      this.isLoadingKeeper = true
      
      try {
        const response = await getKeeperById(this.merchant.keeper_id)
        const keeperData = response.data
        
        this.merchant.keeper = {
          id: keeperData.id,
          name: keeperData.name,
          email: keeperData.email,
          phone: keeperData.phone,
          photo: keeperData.photo
        }
        
      } catch (error) {
        console.error('Error loading keeper details:', error)
        // Set fallback keeper data
        this.merchant.keeper = {
          name: 'Keeper tidak ditemukan',
          email: 'N/A',
          phone: 'N/A'
        }
      } finally {
        this.isLoadingKeeper = false
      }
    },
    
    async loadMerchantProducts(page = 1) {
      if (!this.merchant.id) return
      
      this.isLoadingProducts = true
      
      try {
        const query = page > 1 ? `&page=${page}` : ''
        const response = await getMerchantProducts(this.merchant.id, query)
        
        // Map API response to component data
        // Response structure: { data: { merchant_products: [...], pagination: {...} } }
        this.products = response.data.merchant_products || []
        this.pagination = response.data.pagination || {
          current_page: 1,
          total_pages: 1,
          total_records: this.products.length,
          limit: 10,
          has_next: false,
          has_prev: false
        }
        
    
        console.log('Pagination:', this.pagination)
      } catch (error) {
        console.error('Error loading merchant products:', error)
        // Fallback to mock data if API fails
        this.products = [
          {
            id: 1,
            product_name: 'Magic Brush',
            product_price: 120500,
            stock: 320,
            product_category: 'Cosmetics',
            product_photo: '/src/assets/images/thumbnails/magic-brush.png',
            product_about: 'Magic Brush adalah kuas make up multifungsi untuk hasil riasan lebih halus dan merata.',
            warehouse_name: 'Warehouse 1',
            warehouse_photo: '/src/assets/images/thumbnails/warehouse-1.png'
          },
          {
            id: 2,
            product_name: 'Wonderful Lipstick',
            product_price: 120500,
            stock: 320,
            product_category: 'Cosmetics',
            product_photo: '/src/assets/images/thumbnails/lipstick.png',
            product_about: 'Lipstick dengan warna tahan lama dan melembabkan bibir.',
            warehouse_name: 'Warehouse 2',
            warehouse_photo: '/src/assets/images/thumbnails/warehouse-2.png'
          }
        ]
      } finally {
        this.isLoadingProducts = false
      }
    },
    
    openModal(product) {
      this.selectedProduct = product
      this.showModal = true
    },
    
    closeModal() {
      this.showModal = false
      this.selectedProduct = null
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID').format(price)
    },
    
    getCategoryIcon(category) {
      const icons = {
        'Cosmetics': '/src/assets/images/icons/Makeup-black.svg',
        'Wristwatch': '/src/assets/images/icons/watch-black.svg',
        'Printer': '/src/assets/images/icons/printer-black.svg',
        'default': '/src/assets/images/icons/box-black.svg'
      }
      return icons[category] || icons.default
    },
    
    getMerchantImage(photo) {
      // Use photo from API if available, otherwise use fallback
      if (photo) {
        return photo
      }
      return '/src/assets/images/icons/shop-black.svg'
    },
    
    getProductImage(photo) {
      // Use photo from API if available, otherwise use fallback
      if (photo) {
        return photo
      }
      return '/src/assets/images/icons/bag-black.svg'
    },
    
    getWarehouseImage(photo) {
      // Use photo from API if available, otherwise use fallback
      if (photo) {
        return photo
      }
      return '/src/assets/images/icons/buildings-2-black.svg'
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

.monday-gray-background {
  @apply bg-[#F7F7F7];
}

.card {
  @apply bg-white rounded-2xl p-4 border border-monday-border;
}

.btn {
  @apply px-6 py-3 rounded-2xl font-semibold transition-all duration-300;
}

.btn-primary {
  @apply bg-monday-blue text-white hover:bg-blue-700;
}

.btn-black {
  @apply bg-monday-black text-white hover:bg-gray-800;
}

.btn-primary-opacity {
  @apply bg-monday-blue/10 text-monday-blue hover:bg-monday-blue/20;
}

/* Modal styles */
.modal {
  animation: fadeIn 0.3s ease-out;
}

.backdrop {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 