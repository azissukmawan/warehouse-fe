<template>
  <Layout page-title="Assign New Product" :breadcrumb-text="warehouse.id ? 'Warehouse Details' : ''" :breadcrumb-link="warehouse.id ? `/warehouses/${warehouse.id}` : ''">
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <div class="flex flex-col gap-6 w-full">
          <!-- Warehouse Details Section -->
          <div class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
            <p class="font-semibold text-xl">Warehouse Details</p>
            <div class="flex items-center gap-3">
              <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                <img :src="getWarehouseImage(warehouse.photo)" class="size-full object-cover" alt="warehouse">
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <p class="font-semibold text-lg">{{ warehouse.name }}</p>
                <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                  <img src="/src/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
                  <span>{{ warehouse.phone }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Form Section -->
          <form @submit.prevent="handleSubmit" class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
            <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
            
            <!-- Product Selection -->
            <label class="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden">
              <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
                <img src="/src/assets/images/icons/barcode-black.svg" class="flex size-6 shrink-0" alt="icon">
              </div>
              <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-focus-within:top-[25px] transition-300">
                Product ID
              </p>
              <select 
                v-model="formData.productId" 
                required 
                class="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
                @change="onProductChange"
              >
                <option value="" hidden></option>
                <option 
                  v-for="product in availableProducts" 
                  :key="product.id" 
                  :value="product.id"
                >
                  {{ product.name }}
                </option>
              </select>
              <img src="/src/assets/images/icons/arrow-down-grey.svg" class="absolute transform -translate-y-1/2 top-1/2 right-6 size-6" alt="icon">
            </label>

            <!-- Stock Input -->
            <label class="group relative">
              <div class="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border">
                <img src="/src/assets/images/icons/box-grey.svg" class="flex size-6 shrink-0" alt="icon">
              </div>
              <p class="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                Type a Stock
              </p>
              <input 
                v-model.number="formData.stock" 
                type="number" 
                min="1"
                required
                class="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300" 
                placeholder=""
              >
            </label>

            <!-- Form Actions -->
            <div class="flex items-center justify-end gap-4">
              <router-link :to="`/warehouses/${warehouse.id}`" class="btn btn-red font-semibold">
                Cancel
              </router-link>
              <button type="submit" class="btn btn-primary font-semibold" :disabled="isSubmitting">
                <span v-if="isSubmitting">Assigning...</span>
                <span v-else>Assign Now</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Quick Guide Sidebar -->
        <div class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <p class="font-semibold">Quick Guide to Assign New Product</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Make Sure the Warehouse Details Are Correct Lorem Ipsum is Simply Text</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Enter the Product Details Correctly and Accurately Lorem Ipsum Color amet</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Specify the Stock Quantity to Be Added Accurately is dummy text</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Review the Entered Information for Accuracy Lorem Ipsum Dummy</p>
            </li>
            <li class="flex gap-[6px]">
              <img src="/src/assets/images/icons/Checklist-green-circle.svg" class="flex size-6 shrink-0" alt="icon">
              <p class="font-medium leading-[140%]">Click "Assign Now" to complete the process Lorem Ipsum </p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getWarehouseById, getProducts, assignProductToWarehouse } from '@/js/api'

export default {
  name: 'AssignProduct',
  components: {
    Layout
  },
  data() {
    return {
      warehouse: {
        id: null,
        name: '',
        phone: '',
        photo: ''
      },
      availableProducts: [],
      formData: {
        productId: '',
        stock: ''
      },
      isSubmitting: false
    }
  },
  async created() {
    await this.loadWarehouseDetails()
    await this.loadAvailableProducts()
  },
  methods: {
    async loadWarehouseDetails() {
      const warehouseId = this.$route.params.warehouseId

      if (!warehouseId) {
        console.error('No warehouse ID provided')
        this.$router.push('/warehouses')
        return
      }
      
      try {
        const response = await getWarehouseById(warehouseId)
        
        // Update warehouse data
        this.warehouse = response.data
        
      } catch (error) {
        console.error('Error loading warehouse details:', error)
        // Warehouse not found, redirect to warehouses list
        this.$router.push('/warehouses')
      }
    },
    async loadAvailableProducts() {
      try {
        const response = await getProducts()
        
        // Get all products
        this.availableProducts = response.data.products || []
        
      } catch (error) {
        console.error('Error loading available products:', error)
        this.availableProducts = []
      }
    },
    getWarehouseImage(photo) {
      // Use photo from API if available, otherwise use fallback
      if (photo) {
        return photo
      }
      return '/src/assets/images/icons/buildings-2-black.svg'
    },
    onProductChange() {
      // You can add additional logic here when product selection changes
      console.log('Selected product:', this.formData.productId)
    },
    async handleSubmit() {
      if (!this.formData.productId || !this.formData.stock) {
        alert('Please fill in all required fields')
        return
      }

      if (this.formData.stock <= 0) {
        alert('Stock must be greater than 0')
        return
      }

      this.isSubmitting = true

      try {
        // Prepare request data
        const requestData = {
          product_id: this.formData.productId,
          stock: this.formData.stock
        }
        
        // Call API to assign product to warehouse
        const response = await assignProductToWarehouse(this.warehouse.id, requestData)
        
        // Show success message
        alert(`Product successfully assigned to ${this.warehouse.name} with ${this.formData.stock} stock`)
        
        // Redirect to warehouse details page
        this.$router.push(`/warehouses/${this.warehouse.id}`)
        
      } catch (error) {
        console.error('Error assigning product:', error)
        alert('Failed to assign product. Please try again.')
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

.transition-300 {
  @apply transition-all duration-300;
}

/* Custom select styling */
select {
  background-image: none;
}

select:focus {
  outline: none;
}

/* Custom input styling */
input:focus {
  outline: none;
}

/* Placeholder animation */
.placeholder {
  transition: all 0.3s ease;
}

.group:focus-within .placeholder {
  top: 25px !important;
}

.group:has(:invalid) .placeholder {
  top: 36px !important;
}

/* Form validation styling */
input:invalid,
select:invalid {
  border-color: #ef4444;
}

input:valid,
select:valid {
  border-color: #10b981;
}
</style> 