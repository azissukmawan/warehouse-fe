<template>
  <div id="main-container" class="flex flex-1">
    <div class="flex flex-1 items-center justify-center py-[60px]">
      <div class="flex flex-col w-[430px] shrink-0 rounded-2xl pt-9 p-[18px] gap-6 bg-white">
        <!-- Success Message -->
        <div class="flex flex-col items-center justify-center gap-5">
          <img src="@/assets/images/icons/transaction-success.svg" class="flex size-[106px] shrink-0" alt="icon">
          <p class="font-bold text-2xl text-center">Your transaction has been successfully created</p>
        </div>

        <!-- Transaction Summary -->
        <div class="flex flex-col w-full items-center justify-between gap-5 rounded-2xl border border-monday-border p-4">
          <div class="flex w-full items-center justify-between">
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/user-thin-grey.svg" class="size-6 flex shrink-0" alt="icon">
              <span>Customer Name</span>
            </p>
            <p class="font-semibold text-lg">{{ transactionSummary.customerName }}</p>
          </div>
          <div class="flex w-full items-center justify-between">
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/shopping-cart-grey.svg" class="size-6 flex shrink-0" alt="icon">
              <span>Total Items</span>
            </p>
            <p class="font-semibold text-lg">{{ transactionSummary.totalItems }} Item</p>
          </div>
          <div class="flex w-full items-center justify-between">
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/box-grey.svg" class="size-6 flex shrink-0" alt="icon">
              <span>Total Quantity</span>
            </p>
            <p class="font-semibold text-lg">{{ transactionSummary.totalQuantity }}x</p>
          </div>
          <div class="flex w-full items-center justify-between">
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/receipt-2-grey.svg" class="size-6 flex shrink-0" alt="icon">
              <span>Subtotal</span>
            </p>
            <p class="font-semibold text-lg">{{ transactionSummary.subtotal }}</p>
          </div>
          <div class="flex w-full items-center justify-between">
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/note-text-grey.svg" class="size-6 flex shrink-0" alt="icon">
              <span>PPN 10%</span>
            </p>
            <p class="font-semibold text-lg">{{ transactionSummary.ppn }}</p>
          </div>
          <hr class="border-monday-border w-full">
          <div class="flex w-full items-center justify-between">
            <p class="flex items-center gap-1 font-medium text-monday-gray">
              <img src="@/assets/images/icons/moneys-grey.svg" class="size-6 flex shrink-0" alt="icon">
              <span>Grand Total</span>
            </p>
            <p class="font-semibold text-xl text-monday-blue">{{ transactionSummary.grandTotal }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-4">
          <router-link to="/transactions/1" class="btn btn-black font-semibold w-full rounded-full">
            View Details
          </router-link>
          <router-link to="/transactions" class="btn btn-primary font-semibold w-full">
            Back to Transaction
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Transaction summary data
const transactionSummary = ref({
  customerName: 'Feri Ichsan',
  totalItems: 3,
  totalQuantity: 36,
  subtotal: 'Rp 920.200',
  ppn: 'Rp 40.000',
  grandTotal: 'Rp 3.200.506'
})

// Load transaction data from localStorage if available
onMounted(() => {
  // You can load the actual transaction data from localStorage or API
  // For now, we'll use mock data
  const savedTransaction = localStorage.getItem('lastTransaction')
  if (savedTransaction) {
    const transaction = JSON.parse(savedTransaction)
    transactionSummary.value = {
      customerName: transaction.customer?.name || 'Feri Ichsan',
      totalItems: transaction.payment?.totalItems || 3,
      totalQuantity: transaction.payment?.totalQuantity || 36,
      subtotal: transaction.payment?.subtotal || 'Rp 920.200',
      ppn: transaction.payment?.ppn || 'Rp 40.000',
      grandTotal: transaction.payment?.grandTotal || 'Rp 3.200.506'
    }
  }
})
</script>

<style scoped>
.btn {
  @apply px-6 py-3 rounded-2xl transition-all duration-300 font-semibold;
}

.btn-primary {
  @apply bg-monday-blue text-white hover:bg-monday-blue/90;
}

.btn-black {
  @apply bg-monday-black text-white hover:bg-monday-black/90;
}

.transition-300 {
  transition: all 0.3s ease;
}
</style> 