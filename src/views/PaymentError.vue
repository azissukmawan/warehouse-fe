<template>
  <div id="main-container" class="flex flex-1">
    <!-- Sidebar -->
    <MerchantSidebar />

    <!-- Main Content -->
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
      <!-- Top Bar -->
      <MerchantTopBar 
        title="Payment Error" 
        breadcrumbText="Transactions"
        breadcrumbLink="/transactions"
      />

      <!-- Main Content -->
      <main class="flex flex-col gap-6 flex-1">
        <!-- Error Card -->
        <div class="flex flex-col items-center justify-center min-h-[400px] gap-6">
          <!-- Error Icon -->
          <div class="flex size-24 rounded-full bg-red-100 items-center justify-center">
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-12" alt="error">
          </div>

          <!-- Error Message -->
          <div class="flex flex-col items-center gap-4 text-center">
            <h1 class="font-bold text-3xl text-red-600">Payment Failed</h1>
            <p class="text-lg text-monday-gray max-w-md">
              Sorry, your payment could not be processed. Please try again or contact support if the problem persists.
            </p>
          </div>

          <!-- Transaction Details -->
          <div v-if="transactionData" class="flex flex-col w-full max-w-md gap-4 p-6 rounded-3xl bg-white border border-monday-border">
            <h2 class="font-semibold text-xl text-center">Transaction Details</h2>
            
            <div class="flex flex-col gap-3">
              <div class="flex justify-between">
                <span class="font-medium text-monday-gray">Order ID:</span>
                <span class="font-semibold">{{ transactionData.order_id }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="font-medium text-monday-gray">Customer:</span>
                <span class="font-semibold">{{ transactionData.name }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="font-medium text-monday-gray">Phone:</span>
                <span class="font-semibold">{{ transactionData.phone }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="font-medium text-monday-gray">Total Items:</span>
                <span class="font-semibold">{{ transactionData.products?.length || 0 }} items</span>
              </div>
              
              <div class="flex justify-between">
                <span class="font-medium text-monday-gray">Date:</span>
                <span class="font-semibold">{{ formatDate(transactionData.timestamp) }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4">
            <button @click="retryPayment" class="btn btn-primary font-semibold">
              Try Again
            </button>
            <button @click="goToTransactions" class="btn btn-outline font-semibold">
              View All Transactions
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPaymentStatus, clearPaymentData } from '@/js/midtrans'
import MerchantSidebar from '@/components/MerchantSidebar.vue'
import MerchantTopBar from '@/components/MerchantTopBar.vue'

const router = useRouter()
const transactionData = ref(null)

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Load transaction data
onMounted(() => {
  // Get payment status
  const paymentStatus = getPaymentStatus()
  
  // Get transaction data from localStorage
  const lastTransaction = localStorage.getItem('lastTransaction')
  if (lastTransaction) {
    transactionData.value = JSON.parse(lastTransaction)
  }
  
  // Clear payment data after displaying
  setTimeout(() => {
    clearPaymentData()
  }, 5000)
})

// Retry payment
const retryPayment = () => {
  // Go back to transaction creation
  router.push('/transactions/add-3')
}

// Navigate to transactions page
const goToTransactions = () => {
  router.push('/transactions')
}
</script>

<style scoped>
.btn-outline {
  @apply bg-white border border-monday-blue text-monday-blue hover:bg-monday-blue hover:text-white;
}
</style>
