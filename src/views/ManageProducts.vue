<template>
    <Layout 
      pageTitle="Manage Products"
      breadcrumbText=""
      breadcrumbLink="">
      <section id="Products" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img src="@/assets/images/icons/bag-black.svg" class="size-6 flex shrink-0" alt="icon">
              <span class="font-semibold text-2xl">{{ filteredProducts.length }} Total Products</span>
            </p>
            <p class="font-semibold text-lg text-monday-gray">View and update your product list here.</p>
          </div>
          <router-link to="/products/add" class="btn btn-primary font-semibold">
            Add New
            <img src="@/assets/images/icons/add-square-white.svg" class="flex size-6 shrink-0" alt="icon">
          </router-link>
        </div>
        <hr class="border-monday-border">
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">All Products</p>
          </div>
          
          <!-- Loading State -->
          <div v-if="loading" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p class="font-semibold text-monday-gray">Memuat data produk...</p>
          </div>
          
          <!-- Error State -->
          <div v-else-if="error" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-red-300 gap-6">
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-[52px]" alt="icon">
            <p class="font-semibold text-red-600">{{ error }}</p>
            <button @click="retryFetch" class="btn btn-primary font-semibold">
              Coba Lagi
            </button>
          </div>
          
          <!-- Products List -->
          <div v-else-if="filteredProducts.length > 0" class="flex flex-col gap-5">
            <template v-for="(product, index) in filteredProducts" :key="product.id">
              <div class="card flex items-center justify-between gap-3 border-none">
                <div class="flex items-center gap-3 w-[380px] shrink-0">
                  <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                    <img :src="product.thumbnail" class="size-full object-contain" alt="icon">
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl w-[282px] truncate">{{ product.name }}</p>
                    <p class="font-semibold text-xl text-monday-blue">
                      Rp {{ formatPrice(product.price) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] min-w-[212px]">
                  <img :src="product.category?.photo" class="size-12 flex shrink-0" alt="icon">
                  <p class="font-semibold text-lg text-nowrap">{{ product.category?.name }}</p>
                </div>
                <div class="flex items-center gap-4">
                  <button 
                    @click="viewProduct(product.id)" 
                    class="btn btn-primary-opacity min-w-[130px] font-semibold"
                  >
                    Details
                  </button>
                  <router-link 
                    :to="`/products/edit/${product.id}`" 
                    class="btn btn-black min-w-[130px] font-semibold"
                  >
                    <img src="@/assets/images/icons/edit-white.svg" class="flex size-6 shrink-0" alt="icon">
                    Edit
                  </router-link>
                </div>
              </div>
              <hr v-if="index < filteredProducts.length - 1" class="border-monday-border last:hidden">
            </template>
          </div>
          <div v-else id="Empty-State" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
            <img src="@/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
          </div>
                </div>
          
          <!-- Pagination -->
          <div v-if="filteredProducts.length > 0" class="flex items-center justify-between px-[18px] py-4">
            <p class="font-medium text-monday-gray">
              Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ filteredProducts.length }} products
            </p>
            <div class="flex items-center gap-2">
              <button 
                @click="previousPage" 
                :disabled="currentPage === 1"
                class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-4 py-2 rounded-2xl font-semibold transition-300',
                  page === currentPage 
                    ? 'bg-monday-blue text-white' 
                    : 'bg-monday-gray-background text-monday-gray hover:bg-monday-border'
                ]"
              >
                {{ page }}
              </button>
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </Layout>
  
      <!-- Product Details Modal -->
      <div 
        v-if="showModal" 
        class="modal flex flex-1 items-center justify-center h-full fixed top-0 left-0 w-full z-50"
      >
        <div 
          @click="closeModal" 
          class="backdrop absolute w-full h-full bg-[#292D32B2]"
        ></div>
        <div class="relative flex flex-col w-[406px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
          <div class="modal-header flex items-center justify-between">
            <p class="font-semibold text-xl">Product Details</p>
            <button 
              @click="closeModal" 
              class="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
            >
              <img src="@/assets/images/icons/close-circle-black.svg" class="size-6" alt="icon">
            </button>
          </div>
          <div v-if="selectedProduct" class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5">
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-2">
                <p class="flex items-center gap-[6px] font-semibold text-lg">
                  <img :src="selectedProduct.category.photo" class="size-6 flex shrink-0" alt="icon">
                  {{ selectedProduct.category.name }}
                </p>
                <p class="font-bold text-lg">{{ selectedProduct.name }}</p>
                <p class="font-semibold text-[17px] text-monday-blue">Rp {{ formatPrice(selectedProduct.price) }}</p>
              </div>
              <div class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                <img :src="selectedProduct.thumbnail" class="size-full object-contain" alt="icon">
              </div>
            </div>
            <hr class="border-monday-border">
            <div>
              <p class="font-medium text-sm text-monday-gray">Product About</p>
              <p class="font-semibold leading-[160%]">{{ selectedProduct.about || 'No description available.' }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="font-medium text-sm text-monday-gray">Popularity</p>
                <p class="font-semibold">{{ selectedProduct.is_popular ? 'Popular' : 'Not Popular' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  
  <script>
  import Layout from '@/components/Layout.vue'
  import { useProductsStore } from '@/stores/products'
  import { computed, ref, onMounted, onUnmounted } from 'vue'
  
  export default {
    name: 'ManageProducts',
    components: {
      Layout
    },
    setup() {
      const productsStore = useProductsStore()
      const currentPage = ref(1)
      const itemsPerPage = ref(5)
      const showModal = ref(false)
      const selectedProduct = ref(null)

      const products = computed(() => productsStore.products)
      const categories = computed(() => productsStore.categories)
      const loading = computed(() => productsStore.loading)
      const error = computed(() => productsStore.error)

      const filteredProducts = computed(() => {
        return products.value
      })

      // Pagination computed properties
      const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value))
      const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
      const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredProducts.value.length))
      
      const paginatedProducts = computed(() => {
        return filteredProducts.value.slice(startIndex.value, endIndex.value)
      })
  
      const visiblePages = computed(() => {
        const pages = []
        const maxVisible = 5
        let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
        let end = Math.min(totalPages.value, start + maxVisible - 1)
        
        if (end - start + 1 < maxVisible) {
          start = Math.max(1, end - maxVisible + 1)
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
        
        return pages
      })
  
      const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID').format(price)
      }
  
      const getStockClass = (stock) => {
        if (stock < 10) return 'bg-red-100 text-red-800'
        if (stock < 50) return 'bg-yellow-100 text-yellow-800'
        return 'bg-green-100 text-green-800'
      }
  
      const getCategoryIcon = (category) => {
        const iconMap = {
          'Cosmetics': '/src/assets/images/icons/Makeup-black.svg',
          'Wristwatch': '/src/assets/images/icons/watch-black.svg',
          'Printer': '/src/assets/images/icons/printer-black.svg',
          'Electronics': '/src/assets/images/icons/glass-black.svg',
          'Fashion': '/src/assets/images/icons/bag-black.svg'
        }
        return iconMap[category] || '/src/assets/images/icons/note-2-black.svg'
      }
  
      // Pagination functions
      const goToPage = (page) => {
        currentPage.value = page
      }
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++
        }
      }
  
      const previousPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--
        }
      }
  
      // Modal functions
      const openModal = (product) => {
    
        selectedProduct.value = product
        showModal.value = true
      }
  
      const closeModal = () => {
        showModal.value = false
        selectedProduct.value = null
      }
  
      const viewProduct = (id) => {
        const product = products.value.find(p => p.id === id)
        if (product) {
          openModal(product)
        }
      }
  
      const deleteProduct = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
          try {
            await productsStore.deleteProduct(id)
            // Reset to first page if current page becomes empty
            if (paginatedProducts.value.length === 0 && currentPage.value > 1) {
              currentPage.value--
            }
          } catch (error) {
            console.error('Failed to delete product:', error)
            alert(`Gagal menghapus produk: ${error.message}`)
          }
        }
      }

      const fetchProducts = async () => {
        try {
          await productsStore.fetchProducts()
        } catch (error) {
          console.error('Failed to fetch products:', error)
        }
      }

      const retryFetch = async () => {
        await fetchProducts()
      }
  
      // Add keyboard event listener for modal
      const handleEscape = (event) => {
        if (event.key === 'Escape' && showModal.value) {
          closeModal()
        }
      }
  
      onMounted(() => {
        fetchProducts()
        document.addEventListener('keydown', handleEscape)
      })
  
      onUnmounted(() => {
        document.removeEventListener('keydown', handleEscape)
      })
  
      return {
        products,
        categories,
        filteredProducts: paginatedProducts,
        totalPages,
        currentPage,
        startIndex,
        endIndex,
        visiblePages,
        showModal,
        selectedProduct,
        loading,
        error,
        formatPrice,
        getCategoryIcon,
        goToPage,
        nextPage,
        previousPage,
        openModal,
        closeModal,
        viewProduct,
        deleteProduct,
        fetchProducts,
        retryFetch
      }
    }
  }
  </script>
  
  <style scoped>
  
  .transition-300 {
    transition: all 0.3s ease;
  }
  
  /* Modal styles */
  .modal {
    backdrop-filter: blur(4px);
  }
  
  .backdrop {
    backdrop-filter: blur(4px);
  }
  
  .modal-content {
    max-height: 70vh;
    overflow-y: auto;
  }
  </style> 