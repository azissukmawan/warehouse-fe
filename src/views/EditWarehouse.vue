<template>
  <Layout page-title="Edit Warehouse" breadcrumb-text="Manage Warehouses" breadcrumb-link="/warehouses">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
          <h2 class="font-semibold text-xl capitalize">Edit the form</h2>
          
          <!-- Image Upload Section -->
          <div class="flex items-center justify-between w-full">
            <div class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
              <img
                :src="imagePreview || getWarehouseImage(warehouse.photo)"
                class="size-full object-contain"
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
            <div class="flex h-full pr-4 border-r-[1.5px] border-monday-border">
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
              {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
        
        <!-- Quick Guide -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Edit Warehouse</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Update the Warehouse Name if Lorem Necessary Ipsum Dummy</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Verify and Update the Contact Phone Number text Lorem Ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Ensure the Warehouse Address is Correct and Complete Color det amet</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Replace the Warehouse Image if Needed for Accuracy Lorem Ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Double-Check Everything Lorem Ipsum</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getWarehouseById, updateWarehouse, uploadWarehouseImage } from '@/js/api'

export default {
  name: 'EditWarehouse',
  components: {
    Layout
  },
  data() {
    return {
      warehouse: {
        id: null,
        name: '',
        phone: '',
        address: '',
        photo: '',
        count_product: 0
      },
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
  async created() {
    await this.loadWarehouse()
  },
  methods: {
    async loadWarehouse() {
      const warehouseId = this.$route.params.id
      
      try {
        const response = await getWarehouseById(warehouseId)
        
        // Update warehouse data
        this.warehouse = response.data
        this.form = {
          name: response.data.name,
          phone: response.data.phone,
          address: response.data.address,
          photo: response.data.photo
        }
      } catch (error) {
        console.error('Error loading warehouse:', error)
        // Warehouse not found, redirect to warehouses list
        this.$router.push('/warehouses')
      }
    },
    getWarehouseImage(photo) {
      // Use photo from API if available, otherwise use fallback
      if (photo) {
        return photo
      }
      return '/src/assets/images/icons/buildings-2-black.svg'
    },
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
        let photoUrl = this.warehouse.photo
        
        // Upload new photo if selected
        if (this.selectedFile) {
          try {
            const uploadResponse = await uploadWarehouseImage(this.selectedFile)
            photoUrl = uploadResponse.data.url || uploadResponse.data.photo || ''
          } catch (uploadError) {
            console.error('Photo upload failed:', uploadError)
            // Continue with existing photo if upload fails
          }
        }
        
        // Prepare warehouse data
        const updateData = {
          name: this.form.name,
          address: this.form.address,
          phone: this.form.phone,
          photo: photoUrl
        }
        
        // Update warehouse
        const response = await updateWarehouse(this.warehouse.id, updateData)
        
        // Show success message and redirect
        alert('Warehouse updated successfully!')
        this.$router.push('/warehouses')
        
      } catch (error) {
        console.error('Error updating warehouse:', error)
        alert('Failed to update warehouse. Please try again.')
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