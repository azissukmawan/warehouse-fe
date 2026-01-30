<template>
  <div id="main-container" class="flex flex-1">
    <!-- Sidebar -->
    <MerchantSidebar />

    <!-- Main Content -->
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
      <!-- Top Bar -->
      <div id="Top-Bar" class="flex items-center w-full gap-6 mt-[30px] mb-6">
        <div class="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
          <div class="flex flex-col gap-[6px] w-full">
            <h1 class="font-bold text-2xl">Transaction Details</h1>
            <router-link to="/transactions" class="flex items-center gap-[6px] text-monday-gray font-semibold">
              <img src="@/assets/images/icons/arrow-left-grey.svg" class="size-4 flex shrink-0" alt="icon">
              Manage Transactions
            </router-link>
          </div>
          <div class="flex items-center flex-nowrap gap-3">
            <a href="#">
              <div class="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
                <img src="@/assets/images/icons/search-normal-black.svg" class="size-6" alt="icon">
              </div>
            </a>
            <a href="#">
              <div class="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
                <img src="@/assets/images/icons/notification-black.svg" class="size-6" alt="icon">
              </div>
            </a>
            <div class="relative w-fit">
              <div class="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden">
                <img src="@/assets/images/icons/crown-black-fill.svg" class="size-6" alt="icon">
              </div>
              <p class="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]">PRO</p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 h-[92px] bg-white w-fit rounded-3xl p-[18px]">
          <div class="flex rounded-full overflow-hidden size-14">
            <img src="@/assets/images/photos/photos-3.png" class="size-full object-cover" alt="photo">
          </div>
          <div class="flex flex-col gap-1 min-w-[120px] max-w-[160px] w-fit">
            <p class="font-semibold">Raratih Aqilla</p>
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/user-grey.svg" class="size-4" alt="icon"> 
              Keeper
            </p>
          </div>
          <router-link to="/" class="flex w-6">
            <img src="@/assets/images/icons/logout.svg" class="flex size-6 shrink-0" alt="icon">
          </router-link>
        </div>
      </div>

      <!-- Main Content -->
      <main class="flex flex-col gap-6 flex-1">
        <!-- Merchant Info -->
        <section id="Merchant-Info" class="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white">
          <div class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
            <img src="@/assets/images/thumbnails/merchant-1.png" class="size-full object-contain" alt="icon">
          </div>
          <div class="flex flex-col gap-2 flex-1">
            <p class="font-semibold text-xl">{{ merchantInfo.name }}</p>
            <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
              <img src="@/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
              <span>{{ merchantInfo.phone }}</span>
            </p>
          </div>
          <div class="flex flex-col gap-2 flex-1">
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/user-grey.svg" class="size-4 flex shrink-0" alt="icon">
              <span>Keeper Name:</span>
            </p>
            <p class="font-semibold text-lg">{{ keeperInfo.name }} (You)</p>
          </div>
        </section>

        <!-- Products Section -->
        <section id="Products" class="flex flex-col gap-6 rounded-3xl p-[18px] px-0">
          <div class="flex gap-6">
            <!-- Product Details -->
            <div class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
              <p class="font-semibold text-xl">Product Purchased</p>
              
              <!-- Product Cards -->
              <div v-for="product in transactionProducts" :key="product.id" class="card flex flex-col w-full rounded-3xl border border-monday-border p-4 gap-5">
                <div class="flex items-center justify-between gap-6">
                  <div class="flex items-center gap-3 w-[316px] shrink-0">
                    <div class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                      <img :src="product.image" class="size-full object-contain" alt="icon">
                    </div>
                    <div class="flex flex-col gap-2 flex-1">
                      <p class="font-semibold text-xl w-[218px] truncate">{{ product.name }}</p>
                      <p class="price font-semibold text-xl text-monday-blue">
                        {{ product.price }} <span class="text-monday-gray">({{ product.quantity }}x)</span>
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-[6px] w-fit shrink-0">
                    <img :src="product.categoryIcon" class="size-6 flex shrink-0" alt="icon">
                    <p class="font-semibold text-lg text-nowrap">{{ product.category }}</p>
                  </div>
                </div>
                <hr class="border-monday-border">
                <div class="flex w-full items-center justify-between">
                  <p class="flex items-center gap-1 font-medium text-monday-gray">
                    <img src="@/assets/images/icons/money-grey.svg" class="size-6 flex shrink-0" alt="icon">
                    Subtotal
                  </p>
                  <p class="subtotal font-semibold text-xl text-monday-blue">{{ product.subtotal }}</p>
                </div>
              </div>
            </div>

            <!-- Sidebar Information -->
            <div class="flex flex-col gap-6 w-[392px] shrink-0">
              <!-- Customer & Payment Info -->
              <div class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
                <!-- Customer Information -->
                <div class="flex flex-col gap-5">
                  <p class="font-semibold text-lg">Customer Information</p>
                  <div class="flex items-center justify-between gap-3 rounded-2xl border border-monday-border p-4">
                    <div class="flex flex-col gap-2 flex-1">
                      <p class="font-semibold text-lg">{{ customerInfo.name }}</p>
                      <p class="flex items-center gap-1 font-medium text-lg text-monday-gray">
                        <img src="@/assets/images/icons/call-grey.svg" class="size-6 flex shrink-0" alt="icon">
                        <span>{{ customerInfo.phone }}</span>
                      </p>
                    </div>
                    <div class="flex size-[56px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                      <img src="@/assets/images/icons/user-thin-grey.svg" class="flex size-6 shrink-0" alt="icon">
                    </div>
                  </div>
                </div>

                <!-- Payment Information -->
                <div class="flex flex-col gap-5">
                  <p class="font-semibold text-lg">Payment Information</p>
                  <div class="flex flex-col w-full items-center justify-between gap-5 rounded-2xl border border-monday-border p-4">
                    <div class="flex w-full items-center justify-between">
                      <p class="flex items-center gap-1 font-medium text-monday-gray">
                        <img src="@/assets/images/icons/shopping-cart-grey.svg" class="size-6 flex shrink-0" alt="icon">
                        <span>Total Items</span>
                      </p>
                      <p class="font-semibold text-lg">{{ paymentInfo.totalItems }} Item</p>
                    </div>
                    <div class="flex w-full items-center justify-between">
                      <p class="flex items-center gap-1 font-medium text-monday-gray">
                        <img src="@/assets/images/icons/box-grey.svg" class="size-6 flex shrink-0" alt="icon">
                        <span>Total Quantity</span>
                      </p>
                      <p class="font-semibold text-lg">{{ paymentInfo.totalQuantity }}x</p>
                    </div>
                    <div class="flex w-full items-center justify-between">
                      <p class="flex items-center gap-1 font-medium text-monday-gray">
                        <img src="@/assets/images/icons/receipt-2-grey.svg" class="size-6 flex shrink-0" alt="icon">
                        <span>Subtotal</span>
                      </p>
                      <p class="font-semibold text-lg">{{ paymentInfo.subtotal }}</p>
                    </div>
                    <div class="flex w-full items-center justify-between">
                      <p class="flex items-center gap-1 font-medium text-monday-gray">
                        <img src="@/assets/images/icons/note-text-grey.svg" class="size-6 flex shrink-0" alt="icon">
                        <span>PPN 10%</span>
                      </p>
                      <p class="font-semibold text-lg">{{ paymentInfo.ppn }}</p>
                    </div>
                    <hr class="border-monday-border w-full">
                    <div class="flex w-full items-center justify-between">
                      <p class="flex items-center gap-1 font-medium text-monday-gray">
                        <img src="@/assets/images/icons/moneys-grey.svg" class="size-6 flex shrink-0" alt="icon">
                        <span>Grand Total</span>
                      </p>
                      <p class="font-semibold text-xl text-monday-blue">{{ paymentInfo.grandTotal }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MerchantSidebar from '@/components/MerchantSidebar.vue'

const route = useRoute()

// Merchant info
const merchantInfo = ref({
  name: 'Mazdo Merchant',
  phone: '0812923920329'
})

// Keeper info
const keeperInfo = ref({
  name: 'Raratih Aqilla'
})

// Customer info
const customerInfo = ref({
  name: 'Feri Ichsans',
  phone: '0812923920329'
})

// Transaction products
const transactionProducts = ref([
  {
    id: 1,
    name: 'Magic Brush',
    price: 'Rp 120.500',
    quantity: 2,
    category: 'Cosmetics',
    categoryIcon: '/src/assets/images/icons/Makeup-black.svg',
    image: '/src/assets/images/thumbnails/magic-brush.png',
    subtotal: 'Rp 384.000'
  },
  {
    id: 2,
    name: 'Magic Brush',
    price: 'Rp 120.500',
    quantity: 2,
    category: 'Cosmetics',
    categoryIcon: '/src/assets/images/icons/Makeup-black.svg',
    image: '/src/assets/images/thumbnails/magic-brush.png',
    subtotal: 'Rp 384.000'
  },
  {
    id: 3,
    name: 'Magic Brush',
    price: 'Rp 120.500',
    quantity: 2,
    category: 'Cosmetics',
    categoryIcon: '/src/assets/images/icons/Makeup-black.svg',
    image: '/src/assets/images/thumbnails/magic-brush.png',
    subtotal: 'Rp 384.000'
  }
])

// Payment information
const paymentInfo = ref({
  totalItems: 3,
  totalQuantity: 36,
  subtotal: 'Rp 920.200',
  ppn: 'Rp 40.000',
  grandTotal: 'Rp 3.200.506'
})

// Load transaction data based on route parameter
onMounted(() => {
  const transactionId = route.params.id
  
  // Load transaction data from localStorage or API
  const savedTransaction = localStorage.getItem('lastTransaction')
  if (savedTransaction) {
    const transaction = JSON.parse(savedTransaction)
    
    // Update customer info
    customerInfo.value = transaction.customer || customerInfo.value
    
    // Update products
    if (transaction.products) {
      transactionProducts.value = transaction.products
    }
    
    // Update payment info
    if (transaction.payment) {
      paymentInfo.value = transaction.payment
    }
  }
  
  
})
</script>

<style scoped>
.transition-300 {
  transition: all 0.3s ease;
}
</style> 