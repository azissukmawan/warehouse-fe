<template>
    <Layout page-title="Manage Merchants">
      <main class="flex flex-col gap-6 flex-1">
        <section id="Merchants" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
          <div id="Header" class="flex items-center justify-between px-[18px]">
            <div class="flex flex-col gap-[6px]">
              <p class="flex items-center gap-[6px]">
                <img src="/src/assets/images/icons/shop-black.svg" class="size-6 flex shrink-0" alt="icon">
                <span class="font-semibold text-2xl">{{ merchants.length }} Total Merchants</span>
              </p>
              <p class="font-semibold text-lg text-monday-gray">View and update your Merchants list here.</p>
            </div>
            <router-link to="/merchants/add" class="btn btn-primary font-semibold">
              Add New
              <img src="/src/assets/images/icons/add-square-white.svg" class="flex size-6 shrink-0" alt="icon">
            </router-link>
          </div>
          <hr class="border-monday-border">
          <div id="Merchant-List" class="flex flex-col px-4 flex-1">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-xl">All Merchants</p>
              <button 
                @click="loadMerchants" 
                :disabled="isLoading"
                class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Refresh
              </button>
            </div>
            <!-- Loading State -->
            <div v-if="isLoading" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
              <img src="/src/assets/images/icons/loading.svg" class="size-[52px] animate-spin" alt="loading">
              <p class="font-semibold text-monday-gray">Loading merchants...</p>
            </div>
            
            <!-- Empty State -->
            <div v-else-if="merchants.length === 0" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
              <img src="/src/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
              <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
            </div>
            <!-- Merchants List -->
            <div v-else class="flex flex-col gap-5">
              <template v-for="(merchant, index) in paginatedMerchants" :key="merchant.id">
                <div class="card flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 w-[326px] shrink-0">
                    <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                      <img :src="getMerchantImage(merchant.photo)" class="size-full object-contain" :alt="merchant.name">
                    </div>
                    <div class="flex flex-col gap-2 flex-1">
                      <p class="font-semibold text-xl w-[228px] truncate">{{ merchant.name }}</p>
                      <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                        <img src="/src/assets/images/icons/location-grey.svg" class="size-6 flex shrink-0" alt="icon">
                        <span>{{ merchant.address }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="/src/assets/images/icons/bag-black.svg" class="size-6 flex shrink-0" alt="icon">
                    <p class="font-semibold text-lg text-nowrap">{{ formatNumber(merchant.product_count) }} Products</p>
                  </div>
                  <div class="flex items-center gap-4">
                    <router-link 
                      :to="`/merchants/${merchant.id}`" 
                      class="btn btn-primary-opacity min-w-[130px] font-semibold"
                    >
                      Details
                    </router-link>
                    <router-link 
                      :to="`/merchants/edit/${merchant.id}`" 
                      class="btn btn-black min-w-[130px] font-semibold"
                    >
                      <img src="/src/assets/images/icons/edit-white.svg" class="flex size-6 shrink-0" alt="icon">
                      Edit
                    </router-link>
                  </div>
                </div>
                <hr v-if="index < paginatedMerchants.length - 1" class="border-monday-border last:hidden">
              </template>
            </div>
          </div>
          <!-- Pagination -->
          <div v-if="merchants.length > 0" class="flex items-center justify-between px-[18px] py-4">
            <p class="font-medium text-monday-gray">
              Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ merchants.length }} merchants
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
      </main>
    </Layout>
  </template>
  
  <script>
  import Layout from '@/components/Layout.vue'
  import { getMerchants } from '@/js/api'
  
  export default {
    name: 'ManageMerchants',
    components: {
      Layout
    },
    data() {
      return {
        merchants: [],
        currentPage: 1,
        itemsPerPage: 3, // 3 merchant per halaman
        pagination: {
          current_page: 1,
          total_pages: 1,
          total_records: 0,
          limit: 10,
          has_next: false,
          has_prev: false
        },
        isLoading: false
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.merchants.length / this.itemsPerPage)
      },
      startIndex() {
        return (this.currentPage - 1) * this.itemsPerPage
      },
      endIndex() {
        return Math.min(this.startIndex + this.itemsPerPage, this.merchants.length)
      },
      paginatedMerchants() {
        return this.merchants.slice(this.startIndex, this.endIndex)
      },
      visiblePages() {
        const pages = []
        const maxVisible = 5
        let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
        let end = Math.min(this.totalPages, start + maxVisible - 1)
        if (end - start + 1 < maxVisible) {
          start = Math.max(1, end - maxVisible + 1)
        }
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
        return pages
      }
    },
    async created() {
      await this.loadMerchants()
    },
    methods: {
      async loadMerchants() {
        this.isLoading = true
        try {
          const response = await getMerchants()
          
          // Map API response to component data
          this.merchants = response.data || []
          this.pagination = response.pagination || {
            current_page: 1,
            total_pages: 1,
            total_records: this.merchants.length,
            limit: 10,
            has_next: false,
            has_prev: false
          }
          
        } catch (error) {
          console.error('Error loading merchants:', error)
          this.merchants = []
        } finally {
          this.isLoading = false
        }
      },
      goToPage(page) {
        this.currentPage = page
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++
      },
      previousPage() {
        if (this.currentPage > 1) this.currentPage--
      },
      getMerchantImage(photo) {
        // Use photo from API if available, otherwise use fallback
        if (photo) {
          return photo
        }
        return '/src/assets/images/icons/shop-black.svg'
      },
      formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(num)
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
  </style> 