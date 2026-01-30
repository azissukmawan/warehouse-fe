<template>
  <Layout 
    pageTitle="Edit User Role"
    breadcrumbText="User Roles"
    breadcrumbLink="/manage-users-role">

    <div class="flex gap-6">
      <!-- Main Form -->
      <form @submit.prevent="handleSubmit" class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
        <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
        
        <!-- User Selection -->
        <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
          <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
            <img src="/src/assets/images/icons/profile-circle-grey.svg" class="flex size-6 shrink-0" alt="icon">
          </div>
          <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300">
            Select User Id
          </p>
          <select 
            v-model="formData.userId"
            required 
            class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
            :class="{ 'border-red-500': errors.userId }"
          >
            <option hidden></option>
            <option 
              v-for="user in users" 
              :key="user.id" 
              :value="user.id"
            >
              {{ user.name }}
            </option>
          </select>
          <img src="/src/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
        </label>
        <p v-if="errors.userId" class="mt-1 text-sm text-red-600">{{ errors.userId }}</p>

        <!-- Role Selection -->
        <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
          <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
            <img src="/src/assets/images/icons/profile-tick-grey.svg" class="flex size-6 shrink-0" alt="icon">
          </div>
          <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300">
            Select Role ID
          </p>
          <select 
            v-model="formData.roleId"
            required 
            class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
            :class="{ 'border-red-500': errors.roleId }"
          >
            <option hidden></option>
            <option 
              v-for="role in roles" 
              :key="role.id" 
              :value="role.id"
            >
              {{ role.name }}
            </option>
          </select>
          <img src="/src/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
        </label>
        <p v-if="errors.roleId" class="mt-1 text-sm text-red-600">{{ errors.roleId }}</p>

        <!-- Current Assignment Info -->
        <div v-if="currentAssignment" class="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <h3 class="text-sm font-medium text-gray-700 mb-2">Current Assignment</h3>
          <div class="text-sm text-gray-600 space-y-1">
            <p><strong>User:</strong> {{ currentAssignment.userName }}</p>
            <p><strong>Current Role:</strong> {{ currentAssignment.roleName }}</p>
            <p><strong>Assigned Date:</strong> {{ currentAssignment.assignedDate }}</p>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end gap-4">
          <router-link 
            to="/users-roles"
            class="btn btn-red font-semibold"
          >
            Cancel
          </router-link>
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="btn btn-primary font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Updating...</span>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </form>

      <!-- Sidebar -->
      <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
        <p class="font-semibold">Quick Guide to Assign Role To User</p>
        <ul class="flex flex-col gap-4">
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Choose an available username from the list to ensure uniqueness</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Choose the most suitable role as needed to ensure proper access Lorem Ipsum</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Review All Details Carefully Before ipsum Creating lorem dummy text</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Make Sure Not to Assign the Wrong Role or Permissions lorem text ipsum</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Ensure the Role is Assigned to the Right Person lorem ipsum simply</p>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'

const route = useRoute()
const router = useRouter()

const isSubmitting = ref(false)
const currentAssignment = ref(null)

const formData = reactive({
  userId: '',
  roleId: ''
})

const errors = reactive({
  userId: '',
  roleId: ''
})

// Mock data untuk users
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com' },
  { id: 5, name: 'David Brown', email: 'david@example.com' }
])

// Mock data untuk roles
const roles = ref([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Manager' },
  { id: 3, name: 'Supervisor' },
  { id: 4, name: 'Staff' },
  { id: 5, name: 'Viewer' }
])

// Mock data untuk current assignment (biasanya dari API)
const loadCurrentAssignment = () => {
  // Simulasi loading data dari API berdasarkan ID dari route
  const assignmentId = route.params.id
  currentAssignment.value = {
    id: assignmentId,
    userId: 2,
    roleId: 3,
    userName: 'Jane Smith',
    roleName: 'Supervisor',
    assignedDate: '2024-01-15'
  }
  
  // Set form data dengan current values
  formData.userId = currentAssignment.value.userId
  formData.roleId = currentAssignment.value.roleId
}

const validateForm = () => {
  errors.userId = ''
  errors.roleId = ''
  
  if (!formData.userId) {
    errors.userId = 'Please select a user'
  }
  
  if (!formData.roleId) {
    errors.roleId = 'Please select a role'
  }
  
  return !errors.userId && !errors.roleId
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simulasi success
    console.log('Role updated successfully:', formData)
    
    // Redirect ke halaman manage users role
    router.push('/manage-users-role')
  } catch (error) {
    console.error('Error updating role:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadCurrentAssignment()
})
</script>

<style scoped>
/* Custom styles untuk floating label */
.placeholder {
  pointer-events: none;
}

select:not([value=""]) + .placeholder,
select:focus + .placeholder {
  top: 25px !important;
}
</style> 