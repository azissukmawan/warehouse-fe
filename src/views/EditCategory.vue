<template>
  <Layout page-title="Edit Category" breadcrumb-text="Manage Categories" breadcrumb-link="/categories">
    <main class="flex flex-col gap-6 flex-1">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="font-semibold text-monday-gray">Memuat data kategori...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-red-300 gap-6">
        <img src="/src/assets/images/icons/close-circle-black.svg" class="size-[52px]" alt="icon">
        <p class="font-semibold text-red-600">{{ error }}</p>
        <button @click="loadCategory" class="btn btn-primary font-semibold">
          Coba Lagi
        </button>
      </div>
      
      <!-- Main Content -->
      <div v-else class="flex gap-6">
        <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
          <h2 class="font-semibold text-xl capitalize">Edit the form</h2>
          
          <!-- Image Upload Section -->
          <div class="flex items-center justify-between w-full">
            <div class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
              <img
                :src="imagePreview || getCategoryIcon(category.photo)"
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
                {{ isUploading ? 'Uploading...' : 'Change Photo' }}
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
              :disabled="isSubmitting || isUploading"
            >
              <span v-if="isUploading">Uploading Image...</span>
              <span v-else-if="isSubmitting">Updating Category...</span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
        
        <!-- Quick Guide -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Edit Category</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Update the Category Name if Necessary </p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Ensure the Name is Still Relevant and Accurate Lorem Ipsum Simply text</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Verify the Image is Appropriate and Relevant Lorem Ipsum Color Text Mix</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Adjust the Parent Category if Needed for Accuracy Lorem Ipsum is Text Simply</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Double-Check Everything Before Saving</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getCategoryById, updateCategory, uploadImage } from '@/js/api'

export default {
  name: 'EditCategory',
  components: {
    Layout
  },
  data() {
    return {
      category: {
        id: null,
        name: '',
        description: '',
        photo: '', // Changed to photo to match API
        count_product: 0
      },
      form: {
        name: '',
        description: '',
        photo: '' // Changed to photo to match API
      },
      imagePreview: null,
      selectedFile: null,
      isSubmitting: false,
      isUploading: false,
      uploadProgress: 0,
      loading: false,
      error: null
    }
  },
  async created() {
    await this.loadCategory()
  },
  methods: {
    async loadCategory() {
      const categoryId = this.$route.params.id
      
      if (!categoryId) {
        this.$router.push('/categories')
        return
      }
      
      this.loading = true
      this.error = null
      
      try {
        const response = await getCategoryById(categoryId)
        const categoryData = response.data || response
        
        this.category = {
          id: categoryData.id,
          name: categoryData.name,
          description: categoryData.tagline || categoryData.description, // Handle both tagline and description
          photo: categoryData.photo || categoryData.icon_url || categoryData.icon,
          count_product: categoryData.count_product || categoryData.productCount || 0
        }
        
        this.form = {
          name: this.category.name,
          description: this.category.description,
          photo: this.category.photo
        }
        
        // Set image preview to current photo
        if (this.category.photo) {
          this.imagePreview = this.getCategoryIcon(this.category.photo)
        }
        
      } catch (error) {
        console.error('Error loading category:', error)
        this.error = error.message || 'Gagal memuat data kategori'
        
        // Fallback ke data dummy jika API error
        const mockCategories = [
          {
            id: 1,
            name: 'Beverages',
            description: 'Safe-to-drink liquid',
            photo: 'milk-black',
            count_product: 120500
          },
          {
            id: 2,
            name: 'Cosmetics',
            description: 'Beauty and Handsome',
            photo: 'Makeup-black',
            count_product: 120500
          },
          {
            id: 3,
            name: 'Wristwatch',
            description: 'You got time',
            photo: 'watch-black',
            count_product: 120500
          },
          {
            id: 4,
            name: 'Printer',
            description: 'Hardware',
            photo: 'printer-black',
            count_product: 120500
          },
          {
            id: 5,
            name: 'Medicine',
            description: 'Against Virus',
            photo: 'glass-black',
            count_product: 120500
          }
        ]
        
        const foundCategory = mockCategories.find(cat => cat.id == categoryId)
        
        if (foundCategory) {
          this.category = { ...foundCategory }
          this.form = {
            name: foundCategory.name,
            description: foundCategory.description,
            photo: foundCategory.photo
          }
          this.imagePreview = this.getCategoryIcon(foundCategory.photo)
        } else {
          this.$router.push('/categories')
        }
      } finally {
        this.loading = false
      }
    },
    
    getCategoryIcon(iconName) {
      // If iconName is a URL (starts with http), return it directly
      if (iconName && (iconName.startsWith('http://') || iconName.startsWith('https://'))) {
        return iconName
      }
      
      // Otherwise, use the icon mapping for local icons
      const iconMap = {
        'milk-black': '/src/assets/images/icons/milk-black.svg',
        'Makeup-black': '/src/assets/images/icons/Makeup-black.svg',
        'watch-black': '/src/assets/images/icons/watch-black.svg',
        'printer-black': '/src/assets/images/icons/printer-black.svg',
        'glass-black': '/src/assets/images/icons/glass-black.svg'
      }
      return iconMap[iconName] || '/src/assets/images/icons/note-2-black.svg'
    },
    
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
        this.form.photo = response.data?.url || response.url
        
        return this.form.photo
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
      
      this.isSubmitting = true
      
      try {
        let photoUrl = this.form.photo
        
        // Step 1: Upload new image if selected
        if (this.selectedFile) {
          photoUrl = await this.uploadIcon()
        }
        
        // Step 2: Update the category
        const categoryData = {
          name: this.form.name,
          tagline: this.form.description,
          photo: photoUrl
        }
        
        const response = await updateCategory(this.category.id, categoryData)
        
        // Show success message
        alert('Category updated successfully!')
        
        // Redirect to categories list
        this.$router.push('/categories')
      } catch (error) {
        console.error('Error in category update flow:', error)
        alert(`Failed to update category: ${error.message}`)
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