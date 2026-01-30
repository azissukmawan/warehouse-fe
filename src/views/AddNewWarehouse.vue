<template>
  <Layout page-title="Add New Warehouse" breadcrumb-text="Manage Warehouses" breadcrumb-link="/warehouses">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          
          <!-- Image Upload Section -->
          <div class="flex items-center justify-between w-full">
            <div class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
              <img
                :src="imagePreview || '/src/assets/images/icons/gallery-default.svg'"
                class="size-full object-cover"
                alt="warehouse"
              />
              <input 
                type="file" 
                ref="fileInput"
                accept="image/*" 
                @change="handleImageUpload"
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
          
          <!-- Warehouse Name Input -->
          <label class="group relative">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
              <img src="/src/assets/images/icons/buildings-2-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
              Warehouse Name
            </p>
            <input 
              v-model="form.name"
              type="text" 
              class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
              placeholder=""
              required
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
              v-model="form.phone"
              type="text" 
              class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
              placeholder=""
              required
            >
          </label>
          
          <!-- Warehouse Address Textarea -->
          <label class="flex py-4 px-6 rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300">
            <div class="flex h-full pr-4 pt-2 border-r-[1.5px] border-monday-border">
              <img src="/src/assets/images/icons/location-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <div class="flex flex-col gap-[6px] pl-4 w-full">
              <p class="placeholder font-medium text-monday-gray text-sm">
                Warehouse Address
              </p>
              <textarea 
                v-model="form.address"
                class="appearance-none outline-none w-full font-semibold text-lg leading-[160%]" 
                rows="5" 
                placeholder=""
                required
              ></textarea>
            </div>
          </label>
          
          <!-- Form Actions -->
          <div class="flex items-center justify-end gap-4">
            <router-link to="/warehouses" class="btn btn-red font-semibold">
              Cancel
            </router-link>
            <button type="submit" class="btn btn-primary font-semibold" :disabled="isSubmitting">
              {{ isSubmitting ? 'Creating...' : 'Create Now' }}
            </button>
          </div>
        </form>
        
        <!-- Quick Guide -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Add New Warehouse</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Enter a Clear and Descriptive Warehouse Name Lorem Ipsum Color Mix Amet</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Provide a Valid Phone Number for Contact Lorem Ipsum is text simply</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Accurately Input the Complete Lorem Warehouse Address Lorem Ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Upload an Appropriate Warehouse Image Dummy Lorem Ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Save and Verify the Warehouse Ipsum Information text simply</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { createWarehouse, uploadWarehouseImage } from '@/js/api'

export default {
  name: 'AddNewWarehouse',
  components: {
    Layout
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        photo: ''
      },
      imagePreview: null,
      selectedFile: null,
      isSubmitting: false
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
        
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async handleSubmit() {
      if (!this.form.name || !this.form.phone || !this.form.address) {
        alert('Please fill in all required fields')
        return
      }
      
      this.isSubmitting = true
      
      try {
        let photoUrl = ''
        
        // Upload photo if selected
        if (this.selectedFile) {
          try {
            const uploadResponse = await uploadWarehouseImage(this.selectedFile)
            photoUrl = uploadResponse.data.url || uploadResponse.data.photo || ''
          } catch (uploadError) {
            console.error('Photo upload failed:', uploadError)
            // Continue without photo if upload fails
          }
        }
        
        // Prepare warehouse data
        const warehouseData = {
          name: this.form.name,
          address: this.form.address,
          phone: this.form.phone,
          photo: photoUrl
        }
        
        // Create warehouse
        const response = await createWarehouse(warehouseData)
        
        // Show success message and redirect
        alert('Warehouse created successfully!')
        this.$router.push('/warehouses')
        
      } catch (error) {
        console.error('Error creating warehouse:', error)
        alert('Failed to create warehouse. Please try again.')
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

.transition-300 {
  @apply transition-all duration-300;
}

/* Custom input styling */
input:focus, textarea:focus {
  outline: none;
}

.group:focus-within .placeholder {
  @apply top-[25px] text-xs;
}

.group:has(:placeholder-shown) .placeholder {
  @apply top-[36px] text-sm;
}
</style> 