<template>
  <Layout page-title="Add New Category" breadcrumb-text="Manage Categories" breadcrumb-link="/categories">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          
          <!-- Image Upload Section -->
          <div class="flex items-center justify-between w-full">
            <div class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
              <img
                :src="imagePreview || '/src/assets/images/icons/gallery-grey.svg'"
                class="size-14 object-contain"
                alt="icon"
              />
              <input 
                type="file" 
                ref="fileInput"
                accept="image/*" 
                @change="handleImageUpload"
                class="absolute inset-0 opacity-0 cursor-pointer" 
              />
              
              <!-- Upload Progress Overlay -->
              <div v-if="isUploading" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div class="text-white text-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                  <p class="text-xs">{{ uploadProgress }}%</p>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <button 
                type="button" 
                @click="$refs.fileInput.click()"
                class="btn btn-black w-[152px] font-semibold text-nowrap"
                :disabled="isUploading"
              >
                {{ isUploading ? 'Uploading...' : 'Add Photo' }}
              </button>
              
              <!-- Upload Progress Bar -->
              <div v-if="isUploading" class="w-[152px] bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>
            </div>
          </div>
          
          <!-- Category Name Input -->
          <label class="group relative">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
              <img src="/src/assets/images/icons/note-2-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
              Category Name
            </p>
            <input 
              v-model="form.name"
              type="text" 
              class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
              placeholder=""
              required
            >
          </label>
          
          <!-- Category Tagline Input -->
          <label class="group relative">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
              <img src="/src/assets/images/icons/document-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
              Category Tagline
            </p>
            <input 
              v-model="form.description"
              type="text" 
              class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
              placeholder=""
              required
            >
          </label>
          
          <!-- Form Actions -->
          <div class="flex items-center justify-end gap-4">
            <router-link to="/categories" class="btn btn-red font-semibold" :disabled="isSubmitting || isUploading">
              Cancel
            </router-link>
            <button 
              type="submit" 
              class="btn btn-primary font-semibold" 
              :disabled="isSubmitting || isUploading || !selectedFile"
            >
              <span v-if="isUploading">Uploading Image...</span>
              <span v-else-if="isSubmitting">Creating Category...</span>
              <span v-else>Create Now</span>
            </button>
          </div>
        </form>
        
        <!-- Quick Guide -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Add New Category</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Ensure the Category Name is Relevant and Clear Lorem Ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Verify the Image is Appropriate and High-Quality Lorem Ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Choose a User-Friendly and Clear Tagline Lorem Ipsum simply</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Check for Duplicates to Avoid Lorem Redundancy Lorem Ipsum</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Preview the Category Carefully</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { createCategory, uploadImage } from '@/js/api'

export default {
  name: 'AddNewCategory',
  components: {
    Layout
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        icon_url: '' // Changed from icon to icon_url to store the uploaded image URL
      },
      imagePreview: null,
      selectedFile: null,
      isSubmitting: false,
      isUploading: false,
      uploadProgress: 0
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file')
          return
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size should be less than 5MB')
          return
        }
        
        this.selectedFile = file
        
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    
    async uploadIcon() {
      if (!this.selectedFile) {
        throw new Error('No image selected')
      }
      
      this.isUploading = true
      this.uploadProgress = 0
      
      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          if (this.uploadProgress < 90) {
            this.uploadProgress += 10
          }
        }, 100)
        
        const response = await uploadImage(this.selectedFile)
        
        clearInterval(progressInterval)
        this.uploadProgress = 100
        
        // Assuming the API returns { data: { url: "image_url" } }
        this.form.icon_url = response.data?.url || response.url
        
        return this.form.icon_url
      } catch (error) {
        console.error('Error uploading image:', error)
        throw new Error(`Failed to upload image: ${error.message}`)
      } finally {
        this.isUploading = false
        this.uploadProgress = 0
      }
    },
    
    async handleSubmit() {
      if (!this.form.name || !this.form.description) {
        alert('Please fill in all required fields')
        return
      }
      
      if (!this.selectedFile) {
        alert('Please select an image for the category')
        return
      }
      
      this.isSubmitting = true
      
      try {
        // Step 1: Upload the image first
        await this.uploadIcon()
        
        // Step 2: Create the category with the uploaded image URL
        const categoryData = {
          name: this.form.name,
          tagline: this.form.description,
          photo: this.form.icon_url
        }
        
        const response = await createCategory(categoryData)
        
        // Show success message
        alert('Category created successfully!')
        
        // Redirect to categories list
        this.$router.push('/categories')
      } catch (error) {
        console.error('Error in category creation flow:', error)
        alert(`Failed to create category: ${error.message}`)
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>

.transition-300 {
  @apply transition-all duration-300;
}

/* Custom input styling */
input:focus {
  outline: none;
}

.group:focus-within .placeholder {
  @apply top-[25px] text-xs;
}

.group:has(:placeholder-shown) .placeholder {
  @apply top-[36px] text-sm;
}
</style> 