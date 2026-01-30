<template>
  <Layout 
    pageTitle="Add New Product"
    breadcrumbText="Manage Products"
    breadcrumbLink="/products">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        
        <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          
          <!-- Error Alert -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Success Alert -->
          <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-green-800">{{ successMessage }}</p>
              </div>
            </div>
          </div>
          
          <!-- Photo Upload Section -->
          <div class="flex items-center justify-between w-full">
            <div class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
              <img
                :src="currentImage"
                class="size-full object-cover"
                alt="Product Image"
              />
              <div v-if="imageUploading" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div class="text-white text-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                  <p class="text-xs">Uploading...</p>
                </div>
              </div>
              <input 
                type="file" 
                @change="handleImageUpload"
                accept="image/*" 
                class="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </div>
                          <div class="flex flex-col gap-2">
                <button 
                  type="button" 
                  @click="$refs.fileInput.click()"
                  class="btn btn-black w-[152px] font-semibold text-nowrap"
                >
                  Add Photo
                </button>
                
                <!-- Upload Progress Bar -->
                <div v-if="imageUploading" class="w-[152px] bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: uploadProgress + '%' }"
                  ></div>
                </div>
                
                <button 
                  v-if="selectedFile"
                  type="button" 
                  @click="removeImage"
                  class="btn btn-red w-[152px] font-semibold text-nowrap text-sm"
                >
                  Remove Photo
                </button>
              </div>
            <input 
              ref="fileInput"
              type="file" 
              @change="handleImageUpload"
              accept="image/*" 
              class="hidden" 
            />
          </div>

          <!-- Popularity Select -->
          <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
              <img src="@/assets/images/icons/strongbox-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300">
              Select Popularity
            </p>
            <select 
              v-model="form.popularity"
              required 
              class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
            >
              <option value="" disabled>Select Popularity</option>
              <option :value="true">Popular</option>
              <option :value="false">Not Popular</option>
            </select>
            <img src="@/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
          </label>

          <!-- Product Name -->
          <label class="group relative">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
              <img src="@/assets/images/icons/bag-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
              Product Name
            </p>
            <input 
              v-model="form.name"
              type="text" 
              class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
              placeholder=""
              required
              maxlength="100"
            >
          </label>

          <!-- Product Price -->
          <label class="group relative">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
              <img src="@/assets/images/icons/moneys-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
              Product Price
            </p>
            <input 
              v-model="form.price"
              type="number" 
              class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
              placeholder=""
              required
              min="0"
              step="1000"
            >
          </label>

          <!-- Product Category -->
          <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
            <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
              <img src="@/assets/images/icons/note-2-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300">
              Product Category
            </p>
            <select 
              v-model="form.category"
              required 
              class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
            >
              <option value="" disabled>Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <img src="@/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
          </label>

          <!-- Product About -->
          <label class="flex py-4 px-6 rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300">
            <div class="flex h-full pr-4 pt-2 border-r-[1.5px] border-monday-border">
              <img src="@/assets/images/icons/menu-board-grey.svg" class="flex size-6 shrink-0" alt="icon">
            </div>
            <div class="flex flex-col gap-[6px] pl-4 w-full">
              <p class="placeholder font-medium text-monday-gray text-sm">
                Product About
              </p>
              <textarea 
                v-model="form.description"
                class="appearance-none outline-none w-full font-semibold text-lg leading-[160%]" 
                rows="5" 
                placeholder=""
                maxlength="500"
              ></textarea>
              <div class="text-xs text-gray-500 text-right">
                {{ form.description.length }}/500
              </div>
            </div>
          </label>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-4">
            <router-link to="/products" class="btn btn-red font-semibold">
              Cancel
            </router-link>
            <button 
              type="submit" 
              :disabled="loading || imageUploading || !selectedFile"
              class="btn btn-primary font-semibold"
            >
              <span v-if="imageUploading">Uploading Image...</span>
              <span v-else-if="loading">Creating Product...</span>
              <span v-else>Create Now</span>
            </button>
          </div>
        </form>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Adding Products</p>
          <ul class="flex flex-col gap-4">
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">Use Clear and High-Quality Photos for Better Results lorem ipsum mix</p>
              </li>
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">Ensure the Product Name is Relevant and Descriptive less lorem ipsum</p>
              </li>
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">Choose the Right Product Category for Accuracy lorem ipsum simply</p>
              </li>
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">Maximum Image Size of 2MB for Uploads lorem ipsum text simply</p>
              </li>
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">Review Everything Carefully Before Publishing lorem ipsum color amet</p>
              </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { useProductsStore } from '@/stores/products'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { uploadProductImage } from '@/js/api'

export default {
  name: 'AddNewProducts',
  components: {
    Layout
  },
  setup() {
    const productsStore = useProductsStore()
    const router = useRouter()
    
    const form = ref({
      name: '',
      category: '',
      price: '',
      popularity: false,
      description: '',
      image: '/src/assets/images/icons/gallery-default.svg'
    })
    
    const loading = ref(false)
    const imageUploading = ref(false)
    const error = ref('')
    const successMessage = ref('')
    const imagePreview = ref(null)
    const selectedFile = ref(null)
    const uploadProgress = ref(0)
    
    const defaultImage = '/src/assets/images/icons/gallery-default.svg'
    
    const categories = computed(() => productsStore.categories)
    
    const currentImage = computed(() => {
      return imagePreview.value || defaultImage
    })
    
    // Load categories on component mount
    onMounted(async () => {
      try {
        await Promise.all([
          productsStore.fetchProducts(),
          productsStore.fetchCategories()
        ])
      } catch (error) {
        console.error('Error loading data:', error)
      }
    })
    
    const validateForm = () => {
      if (!form.value.name.trim()) {
        throw new Error('Nama produk harus diisi')
      }
      
      if (!form.value.category) {
        throw new Error('Kategori produk harus dipilih')
      }
      
      if (!form.value.price || form.value.price <= 0) {
        throw new Error('Harga produk harus lebih dari 0')
      }
      
      if (!form.value.description.trim()) {
        throw new Error('Deskripsi produk harus diisi')
      }
      
      if (!selectedFile.value) {
        throw new Error('Gambar produk harus dipilih')
      }
      
      return true
    }
    
    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return
      
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        error.value = 'Ukuran file terlalu besar. Maksimal 2MB.'
        return
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        error.value = 'File harus berupa gambar.'
        return
      }
      
      selectedFile.value = file
      error.value = ''
      
      // Show preview immediately
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }
    
    const removeImage = () => {
      imagePreview.value = null
      selectedFile.value = null
      form.value.image = defaultImage
      error.value = ''
    }
    
    const uploadProductImageToServer = async () => {
      if (!selectedFile.value) {
        throw new Error('Tidak ada gambar yang dipilih')
      }
      
      imageUploading.value = true
      uploadProgress.value = 0
      
      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          if (uploadProgress.value < 90) {
            uploadProgress.value += 10
          }
        }, 100)
        
        const response = await uploadProductImage(selectedFile.value)
        const imageUrl = response.data?.url || response.url
        
        clearInterval(progressInterval)
        uploadProgress.value = 100
        
        if (!imageUrl) {
          throw new Error('URL gambar tidak valid dari server')
        }
        
        return imageUrl
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        throw new Error(`Gagal mengupload gambar: ${uploadError.message}`)
      } finally {
        imageUploading.value = false
        uploadProgress.value = 0
      }
    }
    
    const handleSubmit = async () => {
      loading.value = true
      error.value = ''
      successMessage.value = ''
      
      try {
        // Validate form
        validateForm()
        

        
        // Step 1: Upload image first
        const imageUrl = await uploadProductImageToServer()
        
        // Step 2: Create product with uploaded image URL
        const productData = {
          name: form.value.name.trim(),
          category_id: form.value.category,
          price: parseFloat(form.value.price),
          is_popular: form.value.popularity,
          about: form.value.description.trim(),
          thumbnail: imageUrl,
        }
      
      await productsStore.addProduct(productData)
        
        successMessage.value = 'Produk berhasil dibuat!'
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/products')
        }, 2000)
        
      } catch (submitError) {
        console.error('Failed to add product:', submitError)
        error.value = submitError.message || 'Gagal membuat produk. Silakan coba lagi.'
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      loading,
      imageUploading,
      error,
      successMessage,
      imagePreview,
      currentImage,
      categories,
      defaultImage,
      selectedFile,
      uploadProgress,
      handleImageUpload,
      removeImage,
      uploadProductImageToServer,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.transition-300 {
  transition: all 0.3s ease;
}

.placeholder {
  pointer-events: none;
}
</style> 