<template>
  <Layout 
    pageTitle="Edit Product"
    breadcrumbText="Manage Products"
    breadcrumbLink="/products">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        
        <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
          <h2 class="font-semibold text-xl capitalize">Edit Product Information</h2>
          
          <!-- Loading Indicator -->
          <div v-if="isLoadingProduct" class="flex items-center justify-center py-8">
            <div class="text-center">
              <img src="@/assets/images/icons/loading.svg" class="h-8 w-8 mx-auto mb-4 text-blue-600" alt="loading">
              <p class="text-gray-600">Memuat data produk...</p>
            </div>
          </div>
          
          <!-- Error Alert -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <div class="text-sm text-red-800 whitespace-pre-line">{{ error }}</div>
              </div>
            </div>
          </div>

          <!-- Success Alert -->
          <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM3.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
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
                  <img src="@/assets/images/icons/loading.svg" class="h-6 w-6 mx-auto mb-2" alt="loading">
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
                {{ selectedFile ? 'Change Photo' : 'Add Photo' }}
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
              :disabled="isLoadingProduct"
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
              :disabled="isLoadingProduct"
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
              :disabled="isLoadingProduct"
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
              :disabled="isLoadingProduct"
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
                :disabled="isLoadingProduct"
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

          <!-- Danger Zone -->
          <div class="border-t border-red-200 pt-6 mt-6">
            <div class="flex items-center gap-2 mb-4">
              <img src="@/assets/images/icons/trash-red.svg" class="size-6" alt="danger">
              <h3 class="text-red-600 font-semibold text-lg">Danger Zone</h3>
            </div>
            <div class="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div class="flex items-start gap-3">
                <div class="flex size-8 rounded-full bg-red-100 items-center justify-center shrink-0">
                  <img src="@/assets/images/icons/notification-black.svg" class="size-5" alt="warning">
                </div>
                <div class="flex flex-col gap-2">
                  <p class="font-semibold text-red-700">Delete Product</p>
                  <p class="text-red-600 text-sm leading-relaxed">
                    Once you delete this product, there is no going back. This action cannot be undone. 
                    All product data, including images and descriptions, will be permanently removed from the system.
                  </p>
                  <div class="flex items-center gap-3 mt-3">
                    <button 
                      @click="showDeleteConfirmation = true"
                      :disabled="deleting || isLoadingProduct"
                      class="btn btn-red-opacity font-semibold"
                    >
                      <img src="@/assets/images/icons/trash-red.svg" class="size-5" alt="delete">
                      Delete Product
                    </button>
                    <span class="text-red-500 text-sm font-medium">Permanent Action</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-4">
            <router-link to="/products" class="btn btn-red font-semibold" :disabled="loading || imageUploading">
              Cancel
            </router-link>
            <button 
              type="submit" 
              :disabled="loading || imageUploading"
              class="btn btn-primary font-semibold"
            >
              <span v-if="imageUploading">Uploading Image...</span>
              <span v-else-if="loading">Updating Product...</span>
              <span v-else>Update Product</span>
            </button>
          </div>
        </form>
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Editing Products</p>
          <ul class="flex flex-col gap-4">
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">Update product information carefully to maintain accuracy</p>
              </li>
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">Ensure all required fields are filled before saving changes</p>
              </li>
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">Review changes carefully before updating the product</p>
              </li>
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">You can update the product image by clicking on it</p>
              </li>
              <li class="flex gap-[6px]">
                  <img src="@/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
                  <p class="font-medium leading-[140%]">Changes will be applied immediately after saving</p>
              </li>
          </ul>
        </div>
      </div>
      
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="flex size-10 rounded-full bg-red-100 items-center justify-center">
              <img src="@/assets/images/icons/trash-red.svg" class="size-6" alt="delete">
            </div>
            <div>
              <h3 class="font-semibold text-lg text-red-700">Delete Product</h3>
              <p class="text-sm text-gray-600">This action cannot be undone</p>
            </div>
          </div>
          
          <p class="text-gray-700 mb-6">
            Are you sure you want to delete <strong>"{{ form.name }}"</strong>? 
            This will permanently remove the product and all its data from the system.
          </p>
          
          <div class="flex gap-3">
            <button 
              @click="showDeleteConfirmation = false"
              :disabled="deleting"
              class="btn btn-gray font-semibold flex-1"
            >
              Cancel
            </button>
            <button 
              @click="confirmDelete"
              :disabled="deleting"
              class="btn btn-red font-semibold flex-1"
            >
              <img v-if="deleting" src="@/assets/images/icons/loading.svg" class="size-4" alt="loading">
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
          
          <!-- Error in Modal -->
          <div v-if="error && showDeleteConfirmation" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-start gap-2">
              <svg class="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="text-xs text-red-700 whitespace-pre-line">{{ error }}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { useProductsStore } from '@/stores/products'
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { uploadProductImage } from '@/js/api'

export default {
  name: 'EditProducts',
  components: {
    Layout
  },
  setup() {
    const productsStore = useProductsStore()
    const router = useRouter()
    const route = useRoute()
    
    const form = ref({
      name: '',
      category: 0,
      price: '',
      popularity: false,
      description: '',
      image: '/src/assets/images/icons/gallery-default.svg'
    })
    
    const loading = ref(false)
    const deleting = ref(false)
    const imageUploading = ref(false)
    const error = ref('')
    const successMessage = ref('')
    const imagePreview = ref(null)
    const selectedFile = ref(null)
    const uploadProgress = ref(0)
    const originalImage = ref('')
    const isLoadingProduct = ref(false)
    const showDeleteConfirmation = ref(false)
    
    const defaultImage = '/src/assets/images/icons/gallery-default.svg'
    
    const categories = computed(() => productsStore.categories)
    
    const currentImage = computed(() => {
      return imagePreview.value || form.value.image || defaultImage
    })
    
    // Load categories on component mount
    onMounted(async () => {
      try {
        // Load categories first, then products, then load product data
        await productsStore.fetchCategories()
        await productsStore.fetchProducts()
        await loadProduct()
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
      form.value.image = originalImage.value || defaultImage
      error.value = ''
    }
    
    const uploadProductImageToServer = async () => {
      if (!selectedFile.value) {
        return form.value.image // Return existing image if no new file
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
    
    const loadProduct = async () => {
      const productId = route.params.id
      if (!productId) {
        console.error('No product ID provided')
        router.push('/products')
        return
      }

      isLoadingProduct.value = true
      error.value = ''
      
      try {
        // Wait for products to be loaded if not already
        if (productsStore.products.length === 0) {
          console.log('Products not loaded yet, fetching...')
          await productsStore.fetchProducts()
        }
        
        const product = productsStore.getProductById(productId)
        console.log('Loaded product:', product) // Debug log
        console.log('Available products:', productsStore.products) // Debug log
        
        if (product) {
          // Reset form first
          Object.assign(form.value, {
            name: '',
            category: 0,
            price: '',
            popularity: false,
            description: '',
            image: defaultImage
          })
          
          // Get category ID with proper type conversion
          let categoryId = null
          if (product.category_id !== undefined && product.category_id !== null) {
            categoryId = parseInt(product.category_id)
          }
          
          // Then assign values
          Object.assign(form.value, {
            name: product.name || '',
            category: categoryId,
            price: product.price || '',
            popularity: product.is_popular !== undefined ? product.is_popular : false,
            description: product.about || product.description || '',
            image: product.thumbnail || product.image || defaultImage
          })
          
          originalImage.value = product.thumbnail || product.image || defaultImage
          imagePreview.value = null
          selectedFile.value = null
          
          console.log('Form loaded successfully:', form.value) // Debug log
        } else {
          console.error('Product not found for ID:', productId)
          error.value = 'Produk tidak ditemukan. Silakan coba lagi.'
          // Don't redirect immediately, let user see the error
        }
      } catch (error) {
        console.error('Failed to load product:', error)
        error.value = 'Gagal memuat data produk. Silakan coba lagi.'
        // Don't redirect immediately, let user see the error
      } finally {
        isLoadingProduct.value = false
      }
    }
    
    const handleSubmit = async () => {
      loading.value = true
      error.value = ''
      successMessage.value = ''
      
      try {
        // Validate form
        validateForm()
        
        // Step 1: Upload image if new file selected
        console.log('Uploading product image...')
        const imageUrl = await uploadProductImageToServer()
        console.log('Image uploaded successfully:', imageUrl)
        
        // Step 2: Update product with uploaded image URL
        console.log('Updating product...')
        const productId = route.params.id
        const productData = {
          name: form.value.name.trim(),
          category_id: form.value.category,
          price: parseFloat(form.value.price),
          is_popular: form.value.popularity,
          about: form.value.description.trim(),
          thumbnail: imageUrl,
        }
        
        await productsStore.updateProduct(productId, productData)
        console.log('Product updated successfully')
        
        successMessage.value = 'Produk berhasil diupdate!'
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/products')
        }, 2000)
        
      } catch (submitError) {
        console.error('Failed to update product:', submitError)
        error.value = submitError.message || 'Gagal mengupdate produk. Silakan coba lagi.'
      } finally {
        loading.value = false
      }
    }
    
    const confirmDelete = async () => {
      const productId = route.params.id
      const productName = form.value.name || 'this product'
      
      // Clear any existing messages
      error.value = ''
      successMessage.value = ''
      
      deleting.value = true
      
      try {
        console.log('Deleting product:', productId)
        
        // Call API to delete product
        await productsStore.deleteProduct(productId)
        
        console.log('Product deleted successfully')
        
        // Close modal
        showDeleteConfirmation.value = false
        
        // Show success message
        successMessage.value = `Produk "${productName}" berhasil dihapus!`
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/products')
        }, 2000)
        
              } catch (deleteError) {
          console.error('Failed to delete product:', deleteError)
          
          // Handle specific error messages from API
          let errorMessage = 'Gagal menghapus produk. Silakan coba lagi.'
          
          if (deleteError.message) {
            errorMessage = deleteError.message
          } else if (deleteError.response && deleteError.response.data) {
            // Handle API response error
            const responseData = deleteError.response.data
            
            if (responseData.message) {
              errorMessage = responseData.message
            }
            
            // If there are details, show them in a more user-friendly way
            if (responseData.details) {
              const details = responseData.details
              let detailsMessage = ''
              
              if (details.warehouse_stock > 0) {
                detailsMessage += `• Stok di warehouse: ${details.warehouse_stock} unit\n`
              }
              
              if (details.merchant_stock > 0) {
                detailsMessage += `• Stok di merchant: ${details.merchant_stock} unit\n`
              }
              
              if (details.total_stock > 0) {
                detailsMessage += `• Total stok: ${details.total_stock} unit`
              }
              
              if (detailsMessage) {
                errorMessage += '\n\nDetail stok:\n' + detailsMessage
              }
            }
          }
          
          // Show error message
          error.value = errorMessage
          
          // Don't redirect on error, let user see the error
        } finally {
          deleting.value = false
        }
    }
    
    // Watch for route changes to reload product
    watch(() => route.params.id, (newId) => {
      if (newId) {
        loadProduct()
      }
    })
    
    // Watch for categories changes to reload product (in case categories load after product)
    watch(() => categories.value, (newCategories) => {
      if (newCategories.length > 0 && route.params.id) {
        // Reload product to ensure category mapping works
        loadProduct()
      }
    }, { deep: true })
    
    return {
      form,
      loading,
      deleting,
      imageUploading,
      error,
      successMessage,
      imagePreview,
      currentImage,
      categories,
      selectedFile,
      uploadProgress,
      isLoadingProduct,
      showDeleteConfirmation,
      handleImageUpload,
      removeImage,
      uploadProductImageToServer,
      handleSubmit,
      confirmDelete
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