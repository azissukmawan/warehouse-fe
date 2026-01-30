import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    // Step 1: Customer Information
    customerInfo: {
      customerName: '',
      phoneNumber: '',
      email: '',
      address: '',
      merchantId: null,
      merchant: null
    },
    
    // Step 2: Product Assignment
    assignedProducts: [],
    
    // Step 3: Review & Confirmation
    transactionSummary: {
      totalItems: 0,
      totalAmount: 0,
      customerName: '',
      merchantName: ''
    },
    
    // Current step
    currentStep: 1,
    
    // Form validation
    isStep1Valid: false,
    isStep2Valid: false
  }),

  getters: {
    // Check if step 1 is complete
    isStep1Complete: (state) => {
      return state.customerInfo.customerName.trim() && 
             state.customerInfo.phoneNumber.trim() && 
             state.customerInfo.merchantId
    },
    
    // Check if step 2 is complete
    isStep2Complete: (state) => {
      return state.assignedProducts.length > 0
    },
    
    // Get total items
    totalItems: (state) => {
      return state.assignedProducts.reduce((total, product) => total + product.quantity, 0)
    },
    
    // Get total amount
    totalAmount: (state) => {
      return state.assignedProducts.reduce((total, product) => {
        const price = parseInt(product.price.replace(/[^\d]/g, ''))
        return total + (price * product.quantity)
      }, 0)
    },
    
    // Check if can proceed to next step
    canProceedToStep2: (state) => state.isStep1Complete,
    canProceedToStep3: (state) => state.isStep2Complete,
    canSubmitTransaction: (state) => state.isStep1Complete && state.isStep2Complete
  },

  actions: {
    // Step 1: Set customer information
    setCustomerInfo(customerInfo) {
      this.customerInfo = {
        ...this.customerInfo,
        ...customerInfo
      }
      this.isStep1Valid = this.isStep1Complete
      
      // Save to localStorage
      this.saveToLocalStorage()
      

    },
    
    // Step 2: Set assigned products
    setAssignedProducts(products) {
      this.assignedProducts = products
      this.isStep2Valid = this.isStep2Complete
      
      // Save to localStorage
      this.saveToLocalStorage()
      

    },
    
    // Add product to assigned list
    addProduct(product) {
      const existingProduct = this.assignedProducts.find(p => p.id === product.id)
      
      if (existingProduct) {
        existingProduct.quantity += product.quantity
        existingProduct.subtotal = this.calculateSubtotal(existingProduct)
      } else {
        this.assignedProducts.push({
          ...product,
          subtotal: this.calculateSubtotal(product)
        })
      }
      
      this.saveToLocalStorage()
    },
    
    // Remove product from assigned list
    removeProduct(productId) {
      const index = this.assignedProducts.findIndex(p => p.id === productId)
      if (index > -1) {
        this.assignedProducts.splice(index, 1)
        this.saveToLocalStorage()
      }
    },
    
    // Update product quantity
    updateProductQuantity(productId, quantity) {
      const product = this.assignedProducts.find(p => p.id === productId)
      if (product) {
        product.quantity = quantity
        product.subtotal = this.calculateSubtotal(product)
        this.saveToLocalStorage()
      }
    },
    
    // Calculate subtotal for a product
    calculateSubtotal(product) {
      const price = parseInt(product.price.replace(/[^\d]/g, ''))
      return `Rp ${(price * product.quantity).toLocaleString('id-ID')}`
    },
    
    // Set current step
    setCurrentStep(step) {
      this.currentStep = step
      this.saveToLocalStorage()
    },
    
    // Navigate to next step
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
        this.saveToLocalStorage()
      }
    },
    
    // Navigate to previous step
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
        this.saveToLocalStorage()
      }
    },
    
    // Load data from localStorage
    loadFromLocalStorage() {
      try {
        const storedData = localStorage.getItem('transactionWizard')
        if (storedData) {
          const data = JSON.parse(storedData)
          this.customerInfo = data.customerInfo || this.customerInfo
          this.assignedProducts = data.assignedProducts || this.assignedProducts
          this.currentStep = data.currentStep || 1
          this.isStep1Valid = this.isStep1Complete
          this.isStep2Valid = this.isStep2Complete
          

        }
      } catch (error) {
        console.error('❌ Error loading transaction data:', error)
      }
    },
    
    // Save data to localStorage
    saveToLocalStorage() {
      try {
        const data = {
          customerInfo: this.customerInfo,
          assignedProducts: this.assignedProducts,
          currentStep: this.currentStep
        }
        localStorage.setItem('transactionWizard', JSON.stringify(data))
      } catch (error) {
        console.error('❌ Error saving transaction data:', error)
      }
    },
    
    // Clear all transaction data
    clearTransaction() {
      this.customerInfo = {
        customerName: '',
        phoneNumber: '',
        email: '',
        address: '',
        merchantId: null,
        merchant: null
      }
      this.assignedProducts = []
      this.currentStep = 1
      this.isStep1Valid = false
      this.isStep2Valid = false
      
      // Clear from localStorage
      localStorage.removeItem('transactionWizard')
      localStorage.removeItem('transactionStep1')
      localStorage.removeItem('transactionStep2')
      

    },
    
    // Get transaction summary
    getTransactionSummary() {
      return {
        totalItems: this.totalItems,
        totalAmount: this.totalAmount,
        customerName: this.customerInfo.customerName,
        merchantName: this.customerInfo.merchant?.name || '',
        formattedTotalAmount: `Rp ${this.totalAmount.toLocaleString('id-ID')}`
      }
    }
  }
})
