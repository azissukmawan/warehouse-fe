<template>
  <Layout page-title="Edit Merchant">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center w-full rounded-3xl p-[18px] gap-6 bg-white">
          <img src="/src/assets/images/icons/loading.svg" class="size-[52px] animate-spin" alt="loading">
          <p class="font-semibold text-monday-gray">Loading merchant details...</p>
        </div>
        
        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
          <h2 class="font-semibold text-xl capitalize">Edit the form</h2>
          <div class="flex items-center justify-between w-full">
            <div class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
              <img
                :src="imagePreview || form.image"
                class="size-full object-cover"
                alt="icon"
              />
              <input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" @change="onFileChange" />
            </div>
            <div class="flex gap-4">
              <button type="button" class="btn btn-black w-[152px] font-semibold text-nowrap" @click.prevent="triggerFileInput">
                Change Photo
              </button>
            </div>
          </div>
          <label class="group relative">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
              <img src="/src/assets/images/icons/shop-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] transition-300">
              Merchant Name
            </p>
            <input v-model="form.name" type="text" required class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] focus:border-monday-black transition-300" placeholder="">
          </label>
          <label class="group relative">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
              <img src="/src/assets/images/icons/call-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] transition-300">
              Phone Number
            </p>
            <input v-model="form.phone" type="tel" required class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] focus:border-monday-black transition-300" placeholder="">
          </label>
          <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
              <img src="/src/assets/images/icons/user-thin-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] transition-300">
              Select Keeper
            </p>
            <select v-model="form.keeper_id" required class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]" :disabled="isLoadingKeepers">
              <option value="" hidden>{{ isLoadingKeepers ? 'Loading keepers...' : 'Pilih Keeper' }}</option>
              <option v-for="keeper in keepers" :key="keeper.id" :value="keeper.id">
                {{ keeper.name }} ({{ keeper.email }})
              </option>
            </select>
            <img src="/src/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
          </label>
          
          <!-- Selected Keeper Info -->
          <div v-if="selectedKeeper" class="flex items-center gap-3 p-4 rounded-2xl bg-monday-background">
            <div class="flex size-12 rounded-full bg-white items-center justify-center overflow-hidden">
              <img :src="selectedKeeper.photo || '/src/assets/images/icons/profile-circle-grey.svg'" class="size-full object-cover" :alt="selectedKeeper.name">
            </div>
            <div class="flex flex-col gap-1">
              <p class="font-semibold text-lg">{{ selectedKeeper.name }}</p>
              <p class="font-medium text-monday-gray">{{ selectedKeeper.email }}</p>
              <p class="font-medium text-monday-gray">{{ selectedKeeper.phone }}</p>
            </div>
          </div>
          <label class="flex py-4 px-6 rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300">
            <div class="flex h-full pr-4 pt-2 border-r-[1.5px] border-monday-border ">
              <img src="/src/assets/images/icons/location-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <div class="flex flex-col gap-[6px] pl-4 w-full">
              <p class="placeholder font-medium text-monday-gray text-sm">
                Merchants Address
              </p>
              <textarea v-model="form.address" required class="appearance-none outline-none w-full font-semibold text-lg leading-[160%]" rows="5" placeholder=""></textarea>
            </div>
          </label>
          <div class="flex items-center justify-end gap-4">
            <router-link to="/merchants" class="btn btn-red font-semibold">
              Cancel
            </router-link>
            <button type="submit" class="btn btn-primary font-semibold" :disabled="isSubmitting">
              <span v-if="isSubmitting">Saving...</span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
        <!-- Quick Guide -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Edit Merchant</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Ensure merchant information is updated accurately to maintain data consistency</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Make sure the phone number is active to ensure seamless communication</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Verify the assigned keeper if there has been a change</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Verify the merchant address to ensure accurate inventory management</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Ensure you use a recent photo to maintain up-to-date records</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getMerchantById, updateMerchant, uploadMerchantImage, getKeepers } from '@/js/api'

export default {
  name: 'EditMerchant',
  components: {
    Layout
  },
  data() {
    return {
      imagePreview: '',
      isSubmitting: false,
      isLoading: false,
      isLoadingKeepers: false,
      keepers: [],
      form: {
        name: '',
        phone: '',
        keeper_id: '',
        address: '',
        photo: null
      }
    }
  },
  async created() {
    await this.loadMerchantDetails()
    await this.loadKeepers()
  },
  computed: {
    selectedKeeper() {
      if (!this.form.keeper_id) return null
      return this.keepers.find(keeper => keeper.id == this.form.keeper_id)
    }
  },
  methods: {
    async loadMerchantDetails() {
      const merchantId = this.$route.params.id
      
      if (!merchantId) {
        console.error('No merchant ID provided')
        this.$router.push('/merchants')
        return
      }
      
      this.isLoading = true
      
      try {
        // Get merchant details
        const response = await getMerchantById(merchantId)
        const merchantData = response.data
        
        // Populate form with existing data
        this.form = {
          name: merchantData.name || '',
          phone: merchantData.phone || '',
          keeper_id: merchantData.keeper_id || '',
          address: merchantData.address || '',
          photo: null
        }
        
        // Set image preview to existing photo
        if (merchantData.photo) {
          this.imagePreview = merchantData.photo
        }
        
    
        
      } catch (error) {
        console.error('Error loading merchant details:', error)
        // Redirect to merchants list if merchant not found
        this.$router.push('/merchants')
      } finally {
        this.isLoading = false
      }
    },
    
    async loadKeepers() {
      this.isLoadingKeepers = true
      try {
        const response = await getKeepers()
        
        // Map API response to component data
        this.keepers = response.data || []
        
    
      } catch (error) {
        console.error('Error loading keepers:', error)
        // Fallback to static data if API fails
        this.keepers = [
          { id: 1, name: 'Raratih Aqilla', email: 'raratih@mail.com' },
          { id: 2, name: 'Bimore W', email: 'bimore@mail.com' },
          { id: 3, name: 'Nabila Reyna', email: 'nabila@mail.com' },
          { id: 4, name: 'Andi Rosman', email: 'andi@mail.com' },
        ]
      } finally {
        this.isLoadingKeepers = false
      }
    },
    
    onFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.form.photo = file
        const reader = new FileReader()
        reader.onload = (e2) => {
          this.imagePreview = e2.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    
    triggerFileInput() {
      // Trigger file input click
      const input = document.querySelector('input[type=file]')
      if (input) input.click()
    },
    
    async handleSubmit() {
      // Validasi form
      if (!this.form.name || !this.form.phone || !this.form.keeper_id || !this.form.address) {
        alert('Mohon lengkapi semua data!')
        return
      }

      // Validasi keeper_id harus berupa angka
      if (isNaN(this.form.keeper_id) || this.form.keeper_id <= 0) {
        alert('Pilih keeper yang valid!')
        return
      }

      this.isSubmitting = true

      try {
        let photoUrl = null

        // Upload photo if provided
        if (this.form.photo) {
          try {
            const uploadResponse = await uploadMerchantImage(this.form.photo)
            photoUrl = uploadResponse.data.url || uploadResponse.data.photo
          } catch (uploadError) {
            console.error('Error uploading image:', uploadError)
            // Continue without photo if upload fails
          }
        }

        // Prepare request data
        const requestData = {
          name: this.form.name,
          address: this.form.address,
          phone: this.form.phone,
          keeper_id: parseInt(this.form.keeper_id),
          photo: photoUrl || this.imagePreview || null
        }

        const merchantId = this.$route.params.id
        
        // Call API to update merchant
        const response = await updateMerchant(merchantId, requestData)
        
        // Show success message
        alert('Merchant berhasil diupdate!')
        
        // Redirect to merchants list
        this.$router.push('/merchants')
        
      } catch (error) {
        console.error('Error updating merchant:', error)
        alert('Gagal mengupdate merchant. Silakan coba lagi.')
      } finally {
        this.isSubmitting = false
      }
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

.btn {
  @apply flex items-center gap-2 px-4 py-3 rounded-2xl transition-300;
}

.btn-primary {
  @apply bg-monday-blue text-white hover:bg-monday-blue/90 disabled:bg-monday-gray disabled:cursor-not-allowed;
}

.btn-red {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.btn-black {
  @apply bg-monday-black text-white hover:bg-monday-black/90;
}

.transition-300 {
  @apply transition-all duration-300;
}

/* Custom input styling */
input:focus,
textarea:focus,
select:focus {
  outline: none;
}

/* Placeholder animation */
.placeholder {
  transition: all 0.3s ease;
}

.group:focus-within .placeholder {
  top: 25px !important;
}

.group:has(:placeholder-shown) .placeholder {
  top: 36px !important;
}

/* Form validation styling */
input:invalid,
textarea:invalid,
select:invalid {
  border-color: #ef4444;
}

input:valid,
textarea:valid,
select:valid {
  border-color: #10b981;
}
</style> 