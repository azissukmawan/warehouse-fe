<template>
  <Layout 
    pageTitle="Add New Role"
    breadcrumbText="Manage Roles"
    breadcrumbLink="/roles">
    
    <!-- Main Content -->
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <!-- Left Column - Form -->
        <form @submit.prevent="handleSubmit" class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          
          <!-- Role Name Input -->
          <label class="group relative">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
              <img src="@/assets/images/icons/user-octagon-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
              Role Name
            </p>
            <input 
              type="text" 
              v-model="formData.roleName"
              required
              class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
              placeholder="">
          </label>
          
          <!-- Action Buttons -->
          <div class="flex items-center justify-end gap-4">
            <router-link to="/roles" class="btn btn-red font-semibold">
              Cancel
            </router-link>
            <button type="submit" :disabled="loading" class="btn btn-primary font-semibold">
              <img v-if="loading" src="@/assets/images/icons/loading.svg" class="size-6 animate-spin" alt="loading">
              {{ loading ? 'Creating...' : 'Create Now' }}
            </button>
          </div>
        </form>

        <!-- Right Column - Quick Guide -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Add New Role</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Clearly and accurately define role responsibilities to ensure accountability</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Grant the appropriate permissions to ensure users have the right level of access for their roles</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Verify that no duplicate roles are Lorem assigned to maintain clarity, efficiency</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Ensure naming is clear, concise, and specific to enhance understanding</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Thoroughly review all details before creating to ensure accuracy</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { useRolesStore } from '@/stores/roles'

const router = useRouter()
const rolesStore = useRolesStore()

// Form data
const formData = reactive({
  roleName: ''
})

// Computed properties
const loading = computed(() => rolesStore.loading)
const error = computed(() => rolesStore.error)

// Handle form submission
async function handleSubmit() {
  // Validasi form
  if (!formData.roleName.trim()) {
    alert('Please enter a role name')
    return
  }
  
  try {
    await rolesStore.addRole({
      name: formData.roleName.trim()
    })
    
    alert('Role created successfully!')
    router.push('/roles')
  } catch (error) {
    console.error('Error creating role:', error)
    alert(error.message || 'Failed to create role')
  }
}
</script>

<style scoped>
.transition-300 {
  @apply transition-all duration-300;
}
</style> 