<template>
    <Layout 
      pageTitle="User Roles"
      breadcrumbText=""
      breadcrumbLink="">
      
      <section id="Products" class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img src="/src/assets/images/icons/profile-2user-black.svg" class="size-6 flex shrink-0" alt="icon">
              <span class="font-semibold text-2xl">{{ totalRecords }} Total Users</span>
            </p>
            <p class="font-semibold text-lg text-monday-gray">View and update Total User list here.</p>
          </div>
          <router-link to="/users-roles/assign-role" class="btn btn-primary font-semibold">
            Add New
            <img src="/src/assets/images/icons/add-square-white.svg" class="flex size-6 shrink-0" alt="icon">
          </router-link>
        </div>
        
        <hr class="border-monday-border">
        
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">All Users</p>
          </div>
          
          <!-- Loading State -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-12">
            <img src="/src/assets/images/icons/loading.svg" class="size-12 animate-spin" alt="loading">
            <p class="font-medium text-monday-gray mt-4">Loading user roles data...</p>
          </div>
          
          <!-- Error State -->
          <div v-else-if="error" class="flex flex-col items-center justify-center py-12">
            <img src="/src/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="error">
            <p class="font-semibold text-red-500 mt-4">{{ error }}</p>
            <button @click="fetchUserRoles()" class="btn btn-primary mt-4">
              Try Again
            </button>
          </div>
          
          <!-- Users List -->
          <div v-else-if="userRoles.length > 0" class="flex flex-col gap-5">
            <template v-for="(userRole, index) in userRoles" :key="userRole.id">
              <div class="card flex items-center justify-between gap-6">
                <div class="flex items-center gap-3">
                  <div class="flex size-[76px] rounded-full bg-monday-background items-center justify-center overflow-hidden">
                    <img 
                      :src="userRole.user.photo || '/src/assets/images/photos/photos-2.png'" 
                      class="size-full object-cover" 
                      :alt="userRole.user.name"
                    >
                  </div>
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-xl">{{ userRole.user.name }}</p>
                    <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                      <img src="/src/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
                      <span>{{ userRole.user.phone || userRole.user.email }}</span>
                    </p>
                  </div>
                </div>
  
                <div class="flex items-center gap-3 w-[226px] shrink-0">
                  <div class="flex size-[54px] rounded-2xl bg-monday-gray-background items-center justify-center">
                    <img src="/src/assets/images/icons/user-octagon-grey.svg" class="flex size-6 shrink-0" alt="icon">
                  </div>
                  <div class="flex flex-col gap-1">
                    <p class="font-medium text-sm text-monday-gray">User Role:</p>
                    <p class="font-semibold text-lg text-nowrap">{{ userRole.role.name }}</p>
                  </div>
                </div>
  
                <router-link :to="`/users-roles/edit-role/${userRole.id}`" class="btn btn-black min-w-[130px] font-semibold">
                  Edit Role
                </router-link>
              </div>
              <hr v-if="index < userRoles.length - 1" class="border-monday-border last:hidden">
            </template>
  
            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-6">
              <button 
                @click="goToPage(currentPage - 1)" 
                :disabled="!hasPrev"
                class="btn btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div class="flex items-center gap-2">
                <button 
                  v-for="page in totalPages" 
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-1 rounded-lg font-medium transition-300',
                    currentPage === page 
                      ? 'bg-monday-blue text-white' 
                      : 'bg-monday-gray-background text-monday-gray hover:bg-monday-blue/10'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="goToPage(currentPage + 1)" 
                :disabled="!hasNext"
                class="btn btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-else class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
            <img src="/src/assets/images/icons/document-text-grey.svg" class="size-[52px]" alt="icon">
            <p class="font-semibold text-monday-gray">Oops, it looks like there's no data yet.</p>
          </div>
        </div>
      </section>
    </Layout>
  </template>
  
  <script setup>
import { ref, computed, onMounted } from 'vue'
import Layout from '@/components/Layout.vue'
import { getUserRoles } from '@/js/api'

// State untuk user roles dan pagination
const userRoles = ref([])
const loading = ref(false)
const error = ref(null)

// Pagination state dari API
const currentPage = ref(1)
const totalPages = ref(1)
const totalRecords = ref(0)
const limit = ref(10)
const hasNext = ref(false)
const hasPrev = ref(false)

// Fetch user roles dari API
const fetchUserRoles = async (page = 1) => {
  loading.value = true
  error.value = null
  
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.value.toString()
    })
    
    const response = await getUserRoles(`?${params.toString()}`)
    
    // Update state dengan data dari API
    userRoles.value = response.data.user_roles
    currentPage.value = response.data.pagination.current_page
    totalPages.value = response.data.pagination.total_pages
    totalRecords.value = response.data.pagination.total_records
    limit.value = response.data.pagination.limit
    hasNext.value = response.data.pagination.has_next
    hasPrev.value = response.data.pagination.has_prev
    
  } catch (err) {
    error.value = err.message || 'Error occurred while fetching user roles'
    console.error('Error fetching user roles:', err)
  } finally {
    loading.value = false
  }
}

// Handle pagination
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchUserRoles(page)
  }
}

// Load data saat komponen dimount
onMounted(() => {
  fetchUserRoles()
})
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

.monday-gray-background {
  @apply bg-[#F7F7F7];
}

.transition-300 {
  @apply transition-all duration-300;
}
</style> 