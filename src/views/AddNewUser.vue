<template>
  <Layout 
    pageTitle="Add New User"
    breadcrumbText="Manage Users"
    breadcrumbLink="/users">
    
    <div class="flex gap-6">
      <!-- Form Section -->
      <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
        <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
        
        <!-- Photo Upload Section -->
        <div class="flex items-center justify-between w-full">
          <div class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
            <img
              :src="photoPreview || '/src/assets/images/icons/gallery-default.svg'"
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
          <button 
            type="button" 
            @click="$refs.fileInput.click()"
            class="btn btn-black w-[152px] font-semibold text-nowrap"
          >
            Add Photo
          </button>
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
            Password
          </p>
          <input 
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 tracking-[0.3em]" 
            placeholder=""
          >
        </label>
        
        <!-- Password Confirmation Input -->
        <label class="group relative">
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
        
        <!-- Error Message -->
        <div v-if="error" class="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <img src="/src/assets/images/icons/close-circle-black.svg" class="size-5" alt="error">
          <p class="font-medium text-red-600">{{ error }}</p>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-4">
          <router-link to="/users" class="btn btn-red font-semibold" :disabled="loading">
            Cancel
          </router-link>
          <button 
            type="submit" 
            class="btn btn-primary font-semibold"
            :disabled="loading"
          >
            <img v-if="loading" src="/src/assets/images/icons/loading.svg" class="size-5 animate-spin mr-2" alt="loading">
            {{ loading ? 'Creating...' : 'Create Now' }}
          </button>
        </div>
      </form>
      
      <!-- Quick Guide Sidebar -->
      <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
        <p class="font-semibold">Quick Guide to Add User</p>
        <ul class="flex flex-col gap-4">
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Enter user details accurately and dummy completely to ensure proper lorem ipsum</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Assign a role if necessary to ensure proper access lorem ipsum</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Create an initial password to ensure secure user access while maintaining account protection</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Ensure Email and Phone Number Are Correct text lorem ipsum</p>
          </li>
          <li class="flex gap-[6px]">
            <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
            <p class="font-medium leading-[140%]">Thoroughly review all details before creating to ensure accuracy and prevent potential errors.</p>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { createUser, uploadUserImage } from '@/js/api'

const router = useRouter()

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
  if (!formData.fullName || !formData.email || !formData.password || !formData.passwordConfirmation) {
    alert('Please fill in all required fields')
    return
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address')
    return
  }
  
  // Validate password length
  if (formData.password.length < 6) {
    alert('Password must be at least 6 characters long')
    return
  }
  
  if (formData.password !== formData.passwordConfirmation) {
    alert('Password confirmation does not match')
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    let photoUrl = ''
    
    // Upload photo if selected
    if (selectedFile.value) {
      try {
        const uploadResponse = await uploadUserImage(selectedFile.value)
        photoUrl = uploadResponse.data.url || uploadResponse.data.photo || ''
      } catch (uploadError) {
        console.error('Photo upload failed:', uploadError)
        // Continue without photo if upload fails
      }
    }
    
    // Prepare user data
    const userData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phoneNumber || '',
      photo: photoUrl || '',
      password: formData.password
    }
    
    // Create user
    const response = await createUser(userData)
    
    // Show success message and redirect
    alert('User created successfully!')
    router.push('/users')
    
  } catch (err) {
    error.value = err.message || 'Error occurred while creating user'
    console.error('Error creating user:', err)
    alert(error.value)
  } finally {
    loading.value = false
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

.group:has(:placeholder-shown) .placeholder {
  top: 36px;
}

.group:focus-within .placeholder {
  top: 25px;
}
</style> 