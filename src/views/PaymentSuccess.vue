<template>
  <div id="main-container" class="flex flex-1">
    <!-- Sidebar -->
    <MerchantSidebar />

    <!-- Main Content -->
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
      <!-- Top Bar -->
      <MerchantTopBar 
        title="Payment Success" 
        breadcrumbText="Transactions"
        breadcrumbLink="/transactions"
      />

      <!-- Main Content -->
      <main class="flex flex-col gap-6 flex-1">
        <!-- Success Card -->
        <div class="flex flex-col items-center justify-center min-h-[400px] gap-6">
          <!-- Success Icon -->
          <div class="flex size-24 rounded-full bg-green-100 items-center justify-center">
            <img src="@/assets/images/icons/transaction-success.svg" class="size-12" alt="success">
          </div>

          <!-- Success Message -->
          <div class="flex flex-col items-center gap-4 text-center">
            <h1 class="font-bold text-3xl text-green-600">Payment Successful!</h1>
            <p class="text-lg text-monday-gray max-w-md">
              Your transaction has been completed successfully. You will receive a confirmation email shortly.
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
            <button @click="goToTransactions" class="btn btn-primary font-semibold">
              View All Transactions
            </button>
            <button @click="createNewTransaction" class="btn btn-outline font-semibold">
              Create New Transaction
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

// Navigate to transactions page
const goToTransactions = () => {
  router.push('/transactions')
}

// Create new transaction
const createNewTransaction = () => {
  router.push('/transactions/add-1')
}
</script>

<style scoped>
.btn-outline {
  @apply bg-white border border-monday-blue text-monday-blue hover:bg-monday-blue hover:text-white;
}
</style>
