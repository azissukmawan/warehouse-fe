<template>
  <div id="main-container" class="flex flex-1">
    <!-- Sidebar -->
    <MerchantSidebar />

    <!-- Main Content -->
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
      <!-- Top Bar -->
      <MerchantTopBar 
        title="Profile" 
        breadcrumbText="Back to Dashboard"
        breadcrumbLink="/overview"
      />

      <!-- Main Content -->
      <main class="flex flex-col gap-6 flex-1">
        <!-- Quick Access -->
        <div class="flex justify-end mb-4">
          <router-link to="/overview" class="flex items-center gap-2 px-4 py-2 bg-monday-blue/10 text-monday-blue rounded-2xl hover:bg-monday-blue/20 transition-all duration-300">
            <img src="@/assets/images/icons/home-black.svg" class="size-5" alt="icon">
            <span class="font-semibold">Switch to Admin Overview</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Profile Card -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-3xl p-6">
              <div class="flex flex-col items-center gap-4">
                <div class="relative">
                  <div class="flex rounded-full overflow-hidden size-24">
                    <img :src="userProfile.avatar" class="size-full object-cover" alt="profile">
                  </div>
                  <button @click="triggerFileInput" class="absolute bottom-0 right-0 flex size-8 rounded-full bg-monday-blue text-white items-center justify-center hover:bg-monday-blue/90 transition-colors">
                    <img src="@/assets/images/icons/edit-white.svg" class="size-4" alt="edit">
                  </button>
                  <input 
                    ref="fileInput" 
                    type="file" 
                    accept="image/*" 
                    class="hidden" 
                    @change="handleImageUpload"
                  >
                </div>
                
                <div class="flex flex-col items-center gap-2">
                  <h2 class="font-bold text-xl">{{ userProfile.name }}</h2>
                  <p class="text-monday-gray">{{ userProfile.role }}</p>
                </div>

                <div class="flex flex-col gap-3 w-full">
                  <div class="flex items-center gap-3 p-3 rounded-2xl bg-monday-gray-background">
                    <img src="@/assets/images/icons/call-grey.svg" class="size-5" alt="phone">
                    <span>{{ userProfile.phone }}</span>
                  </div>
                  <div class="flex items-center gap-3 p-3 rounded-2xl bg-monday-gray-background">
                    <img src="@/assets/images/icons/sms-grey.svg" class="size-5" alt="email">
                    <span>{{ userProfile.email }}</span>
                  </div>
                </div>

                <button @click="editProfile" class="w-full px-4 py-3 bg-monday-blue text-white rounded-2xl hover:bg-monday-blue/90 transition-all duration-300 font-semibold">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <!-- Profile Details -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-3xl p-6">
              <h3 class="font-bold text-xl mb-6">Profile Information</h3>
              
              <form @submit.prevent="saveProfile" class="flex flex-col gap-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col gap-2">
                    <label class="font-semibold text-monday-gray">Full Name</label>
                    <input 
                      v-model="formData.name" 
                      type="text" 
                      class="px-4 py-3 border border-monday-border rounded-2xl focus:outline-none focus:border-monday-blue"
                      placeholder="Enter your full name"
                    >
                  </div>
                  
                  <div class="flex flex-col gap-2">
                    <label class="font-semibold text-monday-gray">Email</label>
                    <input 
                      v-model="formData.email" 
                      type="email" 
                      class="px-4 py-3 border border-monday-border rounded-2xl focus:outline-none focus:border-monday-blue"
                      placeholder="Enter your email"
                    >
                  </div>
                  
                  <div class="flex flex-col gap-2">
                    <label class="font-semibold text-monday-gray">Phone Number</label>
                    <input 
                      v-model="formData.phone" 
                      type="tel" 
                      class="px-4 py-3 border border-monday-border rounded-2xl focus:outline-none focus:border-monday-blue"
                      placeholder="Enter your phone number"
                    >
                  </div>
                </div>

                <div class="flex items-center justify-end gap-4">
                  <button type="button" @click="resetForm" class="px-6 py-3 border border-monday-border rounded-2xl hover:bg-monday-gray-background transition-all duration-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" class="px-6 py-3 bg-monday-blue text-white rounded-2xl hover:bg-monday-blue/90 transition-all duration-300 font-semibold">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            <!-- Security Settings -->
            <div class="bg-white rounded-3xl p-6 mt-6">
              <h3 class="font-bold text-xl mb-6">Security Settings</h3>
              
              <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between p-4 rounded-2xl border border-monday-border">
                  <div class="flex flex-col gap-1">
                    <p class="font-semibold">Change Password</p>
                    <p class="text-sm text-monday-gray">Update your password to keep your account secure</p>
                  </div>
                  <button @click="showChangePassword = true" class="px-4 py-2 bg-monday-blue/10 text-monday-blue rounded-2xl hover:bg-monday-blue/20 transition-all duration-300 font-semibold">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" 
         class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
         @click="closeChangePassword">
      <div class="bg-white rounded-3xl p-6 max-w-md w-full mx-4" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-xl">Change Password</h3>
          <button @click="closeChangePassword" class="text-monday-gray hover:text-monday-black">
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-6" alt="close">
          </button>
        </div>
        
        <form @submit.prevent="changePassword" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-monday-gray">Current Password</label>
            <input 
              v-model="passwordData.currentPassword" 
              type="password" 
              class="px-4 py-3 border border-monday-border rounded-2xl focus:outline-none focus:border-monday-blue"
              placeholder="Enter current password"
              required
            >
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-monday-gray">New Password</label>
            <input 
              v-model="passwordData.newPassword" 
              type="password" 
              class="px-4 py-3 border border-monday-border rounded-2xl focus:outline-none focus:border-monday-blue"
              placeholder="Enter new password"
              required
            >
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold text-monday-gray">Confirm New Password</label>
            <input 
              v-model="passwordData.confirmPassword" 
              type="password" 
              class="px-4 py-3 border border-monday-border rounded-2xl focus:outline-none focus:border-monday-blue"
              placeholder="Confirm new password"
              required
            >
          </div>
          
          <div class="flex items-center justify-end gap-4 mt-4">
            <button type="button" @click="closeChangePassword" class="px-4 py-2 border border-monday-border rounded-2xl hover:bg-monday-gray-background transition-all duration-300 font-semibold">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-monday-blue text-white rounded-2xl hover:bg-monday-blue/90 transition-all duration-300 font-semibold">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import MerchantSidebar from '@/components/MerchantSidebar.vue'
import MerchantTopBar from '@/components/MerchantTopBar.vue'

// User profile data
const userProfile = ref({
  name: 'Raratih Aqilla',
  role: 'Keeper',
  status: 'Active',
  avatar: '/src/assets/images/photos/photos-3.png',
  phone: '+62 812-3456-7890',
  email: 'raratih.aqilla@example.com',
  location: 'Jakarta, Indonesia',
  bio: 'Experienced warehouse manager with 5+ years in logistics and inventory management.'
})

// Form data
const formData = reactive({
  name: userProfile.value.name,
  email: userProfile.value.email,
  phone: userProfile.value.phone,
  location: userProfile.value.location,
  bio: userProfile.value.bio
})

// Password change data
const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// UI states
const showChangePassword = ref(false)
const twoFactorEnabled = ref(false)
const fileInput = ref(null)

// Methods
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userProfile.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const editProfile = () => {
  // Scroll to form section
  document.querySelector('form').scrollIntoView({ behavior: 'smooth' })
}

const saveProfile = () => {
  // Update user profile
  userProfile.value.name = formData.name
  userProfile.value.email = formData.email
  userProfile.value.phone = formData.phone
  userProfile.value.location = formData.location
  userProfile.value.bio = formData.bio
  
  // Show success message
  alert('Profile updated successfully!')
}

const resetForm = () => {
  formData.name = userProfile.value.name
  formData.email = userProfile.value.email
  formData.phone = userProfile.value.phone
  formData.location = userProfile.value.location
  formData.bio = userProfile.value.bio
}

const closeChangePassword = () => {
  showChangePassword.value = false
  passwordData.currentPassword = ''
  passwordData.newPassword = ''
  passwordData.confirmPassword = ''
}

const changePassword = () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    alert('New passwords do not match!')
    return
  }
  
  // Here you would typically make an API call to change the password
  alert('Password changed successfully!')
  closeChangePassword()
}

const toggleTwoFactor = () => {
  twoFactorEnabled.value = !twoFactorEnabled.value
  alert(twoFactorEnabled.value ? 'Two-factor authentication enabled!' : 'Two-factor authentication disabled!')
}

const viewLoginHistory = () => {
  alert('Login history feature coming soon!')
}
</script> 