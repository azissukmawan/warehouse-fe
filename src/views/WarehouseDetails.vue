<template>
  <Layout page-title="Warehouse Details" breadcrumb-text="Manage Warehouses" breadcrumb-link="/warehouses">
    <main class="flex flex-col gap-6 flex-1">
      <!-- Warehouse Info Section -->
      <section id="Warehouse-Info" class="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white">
        <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
          <img :src="getWarehouseImage(warehouse.photo)" class="size-full object-contain" alt="warehouse">
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <p class="font-semibold text-lg">{{ warehouse.name }}</p>
          <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
            <img src="/src/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
            <span>{{ warehouse.phone }}</span>
          </p>
        </div>
        <router-link :to="`/warehouses/edit/${warehouse.id}`" class="btn btn-black w-[174px] font-semibold text-nowrap">
          Edit Warehouse
        </router-link>
      </section>

      <!-- Products Section -->
      <section id="Products" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <span class="font-semibold text-2xl">{{ warehouseProducts.length }} Total Products</span>
            </p>
            <p class="font-semibold text-lg text-monday-gray">View and update your Product Warehouses list here.</p>
          </div>
          <router-link :to="`/assign-product/${warehouse.id}`" class="btn btn-primary font-semibold">
            Assign a Products
            <img src="/src/assets/images/icons/add-square-white.svg" class="flex size-6 shrink-0" alt="icon">
          </router-link>
        </div>
        <hr class="border-monday-border">
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">All Products</p>
          </div>
          
          <!-- Empty State -->
          <div v-if="warehouseProducts.length === 0" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
            <img src="/src/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
          </div>
          
          <!-- Products List -->
          <div v-else class="flex flex-col gap-5">
            <template v-for="(product, index) in warehouseProducts" :key="product.id">
              <div class="card flex items-center justify-between gap-6">
                <div class="flex items-center gap-3 w-[260px] shrink-0">
                  <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                    <img :src="getProductImage(product.product_photo)" class="size-full object-contain" alt="product">
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[162px] truncate">{{ product.product_name }}</p>
                    <p class="font-semibold text-xl text-monday-blue">
                      Rp {{ formatNumber(product.product_price) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img src="/src/assets/images/icons/box-black.svg" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.stock }} Stock</p>
                </div>
                <div class="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img :src="product.product_category_photo" class="size-6 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap w-[124px] truncate">{{ product.product_category }}</p>
                </div>
                <div class="flex items-center gap-4">
                  <button @click="showProductDetails(product)" class="btn btn-primary-opacity min-w-[130px] font-semibold">
                    Details
                  </button>
                  <router-link :to="`/update-stock/${warehouse.id}/${product.id}`" class="btn btn-black min-w-[130px] font-semibold">
                    Add Stock
                  </router-link>
                </div>
              </div>
              <hr v-if="index < warehouseProducts.length - 1" class="border-monday-border last:hidden">
            </template>
          </div>
        </div>
      </section>
    </main>

    <!-- Product Details Modal -->
    <div v-if="showModal" class="modal flex flex-1 items-center justify-center h-full fixed top-0 w-full z-50">
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
              <p class="font-semibold text-[17px] text-monday-blue">Rp {{ formatNumber(selectedProduct.product_price) }}</p>
            </div>
            <div class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
              <img :src="getProductImage(selectedProduct.product_photo)" class="size-full object-contain" alt="product">
            </div>
          </div>
          <hr class="border-monday-border">
          <div>
            <p class="font-medium text-sm text-monday-gray">Product About</p>
            <p class="font-semibold leading-[160%]">{{ selectedProduct.product_about }}</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getWarehouseById } from '@/js/api'

export default {
  name: 'WarehouseDetails',
  components: {
    Layout
  },
  data() {
    return {
      warehouse: {
        id: null,
        name: '',
        phone: '',
        address: '',
        photo: '',
        count_product: 0
      },
      warehouseProducts: [],
      showModal: false,
      selectedProduct: null,
      handleKeydown: null
    }
  },
  async created() {
    await this.loadWarehouseDetails()
  },
  methods: {
    async loadWarehouseDetails() {
      const warehouseId = this.$route.params.id
      
      try {
        const response = await getWarehouseById(warehouseId)
        
        // Update warehouse data
        this.warehouse = response.data
        
        // Load warehouse products from the response
        this.warehouseProducts = response.data.warehouse_product || []
        
      } catch (error) {
        console.error('Error loading warehouse details:', error)
        // Warehouse not found, redirect to warehouses list
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
    getCategoryIcon(categoryName) {
      // Map category names to icon paths
      const iconMap = {
        'Cosmetics': '/src/assets/images/icons/Makeup-black.svg',
        'Wristwatch': '/src/assets/images/icons/watch-black.svg',
        'Printer': '/src/assets/images/icons/printer-black.svg',
        'Milk': '/src/assets/images/icons/milk-black.svg',
        'Glass': '/src/assets/images/icons/glass-black.svg'
      }
      return iconMap[categoryName] || '/src/assets/images/icons/note-2-black.svg'
    },
    formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(num)
    },
    showProductDetails(product) {
      this.selectedProduct = product
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedProduct = null
    }
  },
  mounted() {
    // Add keyboard event listener for modal
    this.handleKeydown = (e) => {
      if (e.key === 'Escape' && this.showModal) {
        this.closeModal()
      }
    }
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    // Clean up event listener
    if (this.handleKeydown) {
      document.removeEventListener('keydown', this.handleKeydown)
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
  @apply flex items-center gap-2 px-4 py-3 rounded-2xl transition-300;
}

.btn-primary {
  @apply bg-monday-blue text-white hover:bg-monday-blue/90;
}

.btn-primary-opacity {
  @apply bg-monday-blue/10 text-monday-blue hover:bg-monday-blue/20;
}

.btn-black {
  @apply bg-monday-black text-white hover:bg-monday-black/90;
}

.transition-300 {
  @apply transition-all duration-300;
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