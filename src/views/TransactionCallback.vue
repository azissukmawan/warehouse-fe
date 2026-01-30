<template>
  <div id="main-container" class="flex flex-1">
    <!-- Sidebar -->
    <MerchantSidebar />

    <!-- Main Content -->
    <div id="Content" class="flex flex-col flex-1 p-6 pt-0">
      <!-- Top Bar -->
      <MerchantTopBar 
        title="Payment Status" 
        breadcrumbText="Back to Transactions"
        breadcrumbLink="/transactions"
      />

      <!-- Main Content -->
      <main class="flex flex-col gap-6 flex-1">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="flex items-center gap-3">
            <img src="@/assets/images/icons/loading.svg" class="size-6 animate-spin" alt="loading">
            <span class="font-semibold text-lg">Processing payment status...</span>
          </div>
        </div>

        <!-- Success State -->
        <div v-else-if="paymentStatus === 'success'" class="flex flex-col items-center justify-center py-12 gap-6">
          <div class="flex size-20 rounded-full bg-green-100 items-center justify-center">
            <img src="@/assets/images/icons/transaction-success.svg" class="size-12" alt="success">
          </div>
          <div class="flex flex-col items-center gap-2 text-center">
            <h2 class="font-bold text-2xl text-green-600">Payment Successful!</h2>
            <p class="font-medium text-lg text-monday-gray">Your transaction has been completed successfully.</p>
            <p class="font-semibold text-base text-monday-blue">Order ID: {{ orderId }}</p>
          </div>
          <div class="flex items-center gap-4 mt-4">
            <router-link to="/transactions" class="btn btn-primary font-semibold">
              View All Transactions
            </router-link>
            <button @click="createNewTransaction" class="btn btn-primary-opacity font-semibold">
              Create New Transaction
            </button>
          </div>
        </div>

        <!-- Failed State -->
        <div v-else-if="paymentStatus === 'failed'" class="flex flex-col items-center justify-center py-12 gap-6">
          <div class="flex size-20 rounded-full bg-red-100 items-center justify-center">
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-12 text-red-600" alt="failed">
          </div>
          <div class="flex flex-col items-center gap-2 text-center">
            <h2 class="font-bold text-2xl text-red-600">Payment Failed</h2>
            <p class="font-medium text-lg text-monday-gray">Your transaction could not be completed.</p>
            <p class="font-semibold text-base text-monday-gray">Reason: {{ failureReason }}</p>
          </div>
          <div class="flex items-center gap-4 mt-4">
            <router-link to="/transactions" class="btn btn-red font-semibold">
              Back to Transactions
            </router-link>
            <button @click="retryPayment" class="btn btn-primary font-semibold">
              Try Again
            </button>
          </div>
        </div>

        <!-- Pending State -->
        <div v-else-if="paymentStatus === 'pending'" class="flex flex-col items-center justify-center py-12 gap-6">
          <div class="flex size-20 rounded-full bg-yellow-100 items-center justify-center">
            <img src="@/assets/images/icons/loading.svg" class="size-12 text-yellow-600 animate-spin" alt="pending">
          </div>
          <div class="flex flex-col items-center gap-2 text-center">
            <h2 class="font-bold text-2xl text-yellow-600">Payment Pending</h2>
            <p class="font-medium text-lg text-monday-gray">Your payment is being processed. Please wait.</p>
            <p class="font-semibold text-base text-monday-blue">Order ID: {{ orderId }}</p>
          </div>
          <div class="flex items-center gap-4 mt-4">
            <router-link to="/transactions" class="btn btn-primary font-semibold">
              Check Later
            </router-link>
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="flex flex-col items-center justify-center py-12 gap-6">
          <div class="flex size-20 rounded-full bg-gray-100 items-center justify-center">
            <img src="@/assets/images/icons/close-circle-black.svg" class="size-12 text-gray-600" alt="error">
          </div>
          <div class="flex flex-col items-center gap-2 text-center">
            <h2 class="font-bold text-2xl text-gray-600">Unknown Status</h2>
            <p class="font-medium text-lg text-monday-gray">Unable to determine payment status.</p>
          </div>
          <div class="flex items-center gap-4 mt-4">
            <router-link to="/transactions" class="btn btn-primary font-semibold">
              Back to Transactions
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MerchantSidebar from '@/components/MerchantSidebar.vue'
import MerchantTopBar from '@/components/MerchantTopBar.vue'

const router = useRouter()
const route = useRoute()

// Reactive data
const loading = ref(true)
const paymentStatus = ref('')
const orderId = ref('')
const failureReason = ref('')

// Process payment callback
const processPaymentCallback = () => {
  try {
    // Get URL parameters from Midtrans callback
    const urlParams = new URLSearchParams(window.location.search)
    
    // Extract payment status from URL parameters
    const status = urlParams.get('transaction_status') || urlParams.get('status')
    const order_id = urlParams.get('order_id') || urlParams.get('orderId')
    const reason = urlParams.get('failure_reason') || urlParams.get('reason') || 'Unknown error'
    

    
    // Map Midtrans status to our status
    if (status === 'capture' || status === 'settlement' || status === 'success') {
      paymentStatus.value = 'success'
    } else if (status === 'deny' || status === 'expire' || status === 'cancel' || status === 'failure') {
      paymentStatus.value = 'failed'
      failureReason.value = reason
    } else if (status === 'pending') {
      paymentStatus.value = 'pending'
    } else {
      paymentStatus.value = 'unknown'
    }
    
    orderId.value = order_id || 'Unknown'
    
    // Save payment status to localStorage for reference
    const paymentData = {
      status: paymentStatus.value,
      orderId: orderId.value,
      timestamp: new Date().toISOString(),
      failureReason: failureReason.value
    }
    
    localStorage.setItem('lastPaymentStatus', JSON.stringify(paymentData))
    

    
  } catch (error) {
    console.error('❌ Error processing payment callback:', error)
    paymentStatus.value = 'error'
  } finally {
    loading.value = false
  }
}

// Create new transaction
const createNewTransaction = () => {
  router.push('/transactions/add-1')
}

// Retry payment
const retryPayment = () => {
  // Get last transaction data
  const lastTransaction = localStorage.getItem('lastTransaction')
  if (lastTransaction) {
    const transactionData = JSON.parse(lastTransaction)
    if (transactionData.payment_url) {
      // Redirect back to payment URL
      window.location.href = transactionData.payment_url
      return
    }
  }
  
  // If no payment URL, go to create new transaction
  router.push('/transactions/add-1')
}

// Auto-redirect to transactions after success (optional)
const autoRedirect = () => {
  if (paymentStatus.value === 'success') {
    // Auto-redirect after 5 seconds
    setTimeout(() => {
      router.push('/transactions')
    }, 5000)
  }
}

onMounted(() => {
  processPaymentCallback()
  
  // Auto-redirect for success (optional - uncomment if needed)
  // autoRedirect()
})
</script>

<style scoped>
.btn-primary-opacity {
  @apply bg-monday-blue/10 text-monday-blue hover:bg-monday-blue/20 transition-all duration-300;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
