<template>
  <Layout 
    pageTitle="Edit User"
    breadcrumbText="Manage Users"
    breadcrumbLink="/users">
    
    <div class="flex gap-6">
      <!-- Form Section -->
      <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
        <h2 class="font-semibold text-xl capitalize">Edit the form</h2>
        

        <!-- Photo Upload Section -->
        <div class="flex items-center justify-between w-full">
          <div class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
            <img
              :src="photoPreview || userData.photo || '/src/assets/images/photos/photos-2.png'"
              class="size-full object-contain"
              alt="user photo"
            />
            <input 
              type="file" 
              ref="fileInput"
              accept="image/*" 
              @change="handlePhotoUpload"
              class="absolute inset-0 opacity-0 cursor-pointer" 
            />
          </div>
          <div class="flex gap-4">
            <button 
              type="button" 
              @click="$refs.fileInput.click()"
              class="btn btn-black w-[152px] font-semibold text-nowrap"
            >
              Change Photo
            </button>
          </div>
        </div>
        
        <!-- Full Name Input -->
        <label class="group relative">
          <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
            <img src="/src/assets/images/icons/profile-grey.svg" class="flex size-6 shrink-0" alt="icon">
          </div>
          <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
            Full Name
          </p>
          <input 
            v-model="formData.fullName"
            type="text" 
            class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
            placeholder=""
          >
        </label>
        
        <!-- Phone Number Input -->
        <label class="group relative">
          <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
            <img src="/src/assets/images/icons/call-grey.svg" class="flex size-6 shrink-0" alt="icon">
          </div>
          <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
            Phone Number
          </p>
          <input 
            v-model="formData.phoneNumber"
            type="tel" 
            class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
            placeholder=""
          >
        </label>
        
        <!-- Email Address Input -->
        <label class="group relative">
          <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
            <img src="/src/assets/images/icons/sms-grey.svg" class="flex size-6 shrink-0" alt="icon">
          </div>
          <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
            Email Address
          </p>
          <input 
            v-model="formData.email"
            type="email" 
            class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
            placeholder=""
          >
        </label>
        
        <!-- Password Input -->
        <label class="group relative">
          <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
            <img src="/src/assets/images/icons/key-grey.svg" class="flex size-6 shrink-0" alt="icon">
          </div>
          <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
            Password (Optional)
          </p>
          <input 
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 tracking-[0.3em]" 
            placeholder=""
          >
        </label>
        
        <!-- Password Confirmation Input -->
        <label class="group relative" v-if="formData.password">
          <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
            <img src="/src/assets/images/icons/key-grey.svg" class="flex size-6 shrink-0" alt="icon">
          </div>
          <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
            Password Confirmation
          </p>
          <input 
            v-model="formData.passwordConfirmation"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 tracking-[0.3em]" 
            placeholder=""
          >
        </label>
        
        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-4">
          <router-link to="/users" class="btn btn-red font-semibold">
            Cancel
          </router-link>
          <button type="submit" class="btn btn-primary font-semibold">
            Save Changes
          </button>
        </div>
      </form>
      
      <!-- Quick Guide Sidebar -->
      <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
        <p class="font-semibold">Quick Guide to Edit User</p>
        <ul class="flex flex-col gap-4">
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Assign a role if necessary to ensure proper access lorem ipsum</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Thoroughly review all details before creating to ensure accuracy and prevent potential errors.</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Ensure Email and Phone Number Are Correct text lorem ipsum</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Create an initial password to ensure secure user access while maintaining account protection</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Enter user details accurately and dummy completely to ensure proper lorem ipsum</p>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { getUserById, updateUser, uploadUserImage } from '@/js/api'

const router = useRouter()
const route = useRoute()

// User data from API
const userData = reactive({
  id: null,
  name: '',
  phone: '',
  email: '',
  photo: ''
})

// Form data
const formData = reactive({
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

// Photo upload
const photoPreview = ref(null)
const fileInput = ref(null)
const selectedFile = ref(null)

// Loading state
const loading = ref(false)
const error = ref(null)

// Password visibility
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

// Fetch user data
const fetchUserData = async () => {
  const userId = route.params.id
  if (!userId) {
    error.value = 'User ID not found'
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    const response = await getUserById(userId)
    
    // Update user data
    userData.id = response.data.id
    userData.name = response.data.name
    userData.phone = response.data.phone || ''
    userData.email = response.data.email
    userData.photo = response.data.photo || ''
    
    // Populate form with existing data
    formData.fullName = userData.name
    formData.phoneNumber = userData.phone
    formData.email = userData.email
    formData.password = '' // Empty password for optional field
    formData.passwordConfirmation = ''
    
  } catch (err) {
    error.value = err.message || 'Error occurred while fetching user data'
    console.error('Error fetching user:', err)
  } finally {
    loading.value = false
  }
}

// Load user data on mount
onMounted(() => {
  fetchUserData()
})

// Handle photo upload
const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Handle form submission
const handleSubmit = async () => {
  // Validate form
  if (!formData.fullName || !formData.phoneNumber || !formData.email) {
    alert('Please fill in all required fields')
    return
  }
  
  // Validate password if provided
  if (formData.password) {
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }
    
    if (formData.password !== formData.passwordConfirmation) {
      alert('Password confirmation does not match')
      return
    }
  }
  
  loading.value = true
  error.value = null
  
  try {
    let photoUrl = userData.photo
    
    // Upload new photo if selected
    if (selectedFile.value) {
      try {
        const uploadResponse = await uploadUserImage(selectedFile.value)
        photoUrl = uploadResponse.data.url || uploadResponse.data.photo || ''
      } catch (uploadError) {
        console.error('Photo upload failed:', uploadError)
        // Continue with existing photo if upload fails
      }
    }
    
    // Prepare user data
    const updateData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phoneNumber || '',
      photo: photoUrl
    }
    
    // Add password only if provided
    if (formData.password) {
      updateData.password = formData.password
    }
    
    // Update user
    const response = await updateUser(userData.id, updateData)
    
    // Show success message and redirect
    alert('User updated successfully!')
    router.push('/users')
    
  } catch (err) {
    error.value = err.message || 'Error occurred while updating user'
    console.error('Error updating user:', err)
    alert(error.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

.transition-300 {
  @apply transition-all duration-300;
}

/* Floating label animation */
.placeholder {
  transition: all 0.3s ease;
}

.group:has(:placeholder-shown) .placeholder {
  top: 36px;
}

.group:focus-within .placeholder {
  top: 25px;
}
</style> 