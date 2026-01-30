<template>
  <Layout 
    pageTitle="Assign Role to User"
    breadcrumbText="User Roles"
    breadcrumbLink="/users-roles">
    
    <div class="flex gap-6">
      <!-- Form Section -->
      <form @submit.prevent="handleSubmit" class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
        <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
        
        <!-- Select User -->
        <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
          <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
            <img src="/src/assets/images/icons/profile-circle-grey.svg" class="flex size-6 shrink-0" alt="icon">
          </div>
          <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300">
            Select User Id
          </p>
          <select 
            v-model="formData.selectedUser"
            required 
            class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
          >
            <option value="" disabled>Select a user</option>
            <option 
              v-for="user in availableUsers" 
              :key="user.id" 
              :value="user.id"
            >
              {{ user.name }}
            </option>
          </select>
          <img src="/src/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
        </label>
        
        <!-- Select Role -->
        <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
          <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
            <img src="/src/assets/images/icons/profile-tick-grey.svg" class="flex size-6 shrink-0" alt="icon">
          </div>
          <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300">
            Select Role ID
          </p>
          <select 
            v-model="formData.selectedRole"
            required 
            class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
          >
            <option value="" disabled>Select a role</option>
            <option 
              v-for="role in availableRoles" 
              :key="role.id" 
              :value="role.id"
            >
              {{ role.name }}
            </option>
          </select>
          <img src="/src/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
        </label>
        
        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-4">
          <router-link to="/users-roles" class="btn btn-red font-semibold">
            Cancel
          </router-link>
          <button type="submit" class="btn btn-primary font-semibold">
            Save Changes
          </button>
        </div>
      </form>
      
      <!-- Quick Guide Sidebar -->
      <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
        <p class="font-semibold">Quick Guide to Assign Role To User</p>
        <ul class="flex flex-col gap-4">
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Select an Available Username from the List lorem ipsum simply text</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Select the Most Appropriate Role as Needed text lorem ipsum dummy</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Review All Details Carefully Before Creating dummy image</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Make Sure Not to Assign the Wrong Role or Permissions text lorem si ipsum</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Ensure the Role is Assigned to the Right Person color dot amet ipsum lorem</p>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { getUsers, getRoles, createUserRole } from '@/js/api'

const router = useRouter()

// Form data
const formData = reactive({
  selectedUser: '',
  selectedRole: ''
})

// Available users (users without roles assigned)
const availableUsers = ref([])

// Available roles
const availableRoles = ref([])



// Fetch users from API
const fetchUsers = async () => {
  try {
    const response = await getUsers()
    availableUsers.value = response.data.users || []
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

// Fetch roles from API
const fetchRoles = async () => {
  try {
    const response = await getRoles()
    availableRoles.value = response.data || []
  } catch (err) {
    console.error('Error fetching roles:', err)
  }
}

// Load data on mount
onMounted(async () => {
  try {
    await Promise.all([fetchUsers(), fetchRoles()])
  } catch (err) {
    console.error('Error loading data:', err)
  }
})

// Handle form submission
const handleSubmit = async () => {
  // Validate form
  if (!formData.selectedUser || !formData.selectedRole) {
    alert('Please select both user and role')
    return
  }
  
  // Get selected user and role details
  const selectedUser = availableUsers.value.find(user => user.id === formData.selectedUser)
  const selectedRole = availableRoles.value.find(role => role.id === formData.selectedRole)
  
  try {
    // Prepare data for API
    const userRoleData = {
      user_id: formData.selectedUser,
      role_id: formData.selectedRole
    }
    
    // Create user role
    const response = await createUserRole(userRoleData)
    
    // Show success message and redirect
    alert(`Role "${selectedRole?.name}" assigned to "${selectedUser?.name}" successfully!`)
    router.push('/users-roles')
    
  } catch (err) {
    console.error('Error assigning role:', err)
    alert('Error occurred while assigning role')
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

.transition-300 {
  @apply transition-all duration-300;
}

/* Floating label animation */
.placeholder {
  transition: all 0.3s ease;
}

.group:has(:invalid) .placeholder {
  top: 36px;
}

.group:focus-within .placeholder {
  top: 25px;
}

/* Custom select styling */
select {
  background-color: transparent;
}

select:focus {
  outline: none;
}

/* Custom select arrow */
select::-ms-expand {
  display: none;
}
</style> 