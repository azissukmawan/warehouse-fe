<template>
  <Layout 
    pageTitle="Edit Role"
    breadcrumbText="Manage Roles"
    breadcrumbLink="/roles">
    
    <!-- Main Content -->
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <!-- Left Column - Form -->
        <form @submit.prevent="handleSubmit" class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
          <h2 class="font-semibold text-xl capitalize">Edit the form</h2>
          
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
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>

        <!-- Right Column - Quick Guide -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Edit Role</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Modify the role name if necessary to ensure clarity and accurate</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Modify permissions as needed to ensure accurate access control and proper role functionality lorem ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Verify that role responsibilities align with expectations to maintain clarity</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Carefully review all changes before saving to ensure accuracy and prevent any errors</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Avoid assigning duplicate roles to maintain clarity, prevent confusion</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { useRolesStore } from '@/stores/roles'

const router = useRouter()
const route = useRoute()
const rolesStore = useRolesStore()

// Form data
const formData = reactive({
  roleName: ''
})

// Computed properties
const loading = computed(() => rolesStore.loading)
const error = computed(() => rolesStore.error)

// Load role data on component mount
onMounted(async () => {
  const roleId = route.params.id
  
  if (roleId) {
    try {
      // Fetch roles if not already loaded
      if (rolesStore.roles.length === 0) {
        await rolesStore.fetchRoles()
      }
      
      const role = rolesStore.getRoleById(roleId)
      if (role) {
        formData.roleName = role.name
      } else {
        alert('Role not found')
        router.push('/roles')
      }
    } catch (error) {
      console.error('Error loading role:', error)
      alert('Failed to load role data')
      router.push('/roles')
    }
  } else {
    alert('Invalid role ID')
    router.push('/roles')
  }
})

// Handle form submission
async function handleSubmit() {
  // Validasi form
  if (!formData.roleName.trim()) {
    alert('Please enter a role name')
    return
  }
  
  const roleId = route.params.id
  
  try {
    await rolesStore.updateRole(roleId, {
      name: formData.roleName.trim()
    })
    
    alert('Role updated successfully!')
    router.push('/roles')
  } catch (error) {
    console.error('Error updating role:', error)
    alert(error.message || 'Failed to update role')
  }
}
</script>

<style scoped>
.transition-300 {
  @apply transition-all duration-300;
}
</style> 