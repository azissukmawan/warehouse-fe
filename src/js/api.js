import { getApiUrl, APP_CONFIG } from '@/config/app'

/**
 * Utility class untuk API calls
 */
class ApiService {
  constructor() {
    this.baseURL = APP_CONFIG.API.BASE_URL
    this.timeout = APP_CONFIG.API.TIMEOUT
  }

  /**
   * Get auth token from localStorage
   */
  getAuthToken() {
    return localStorage.getItem('auth_token')
  }

  /**
   * Set auth token to localStorage
   */
  setAuthToken(token) {
    localStorage.setItem('auth_token', token)
  }

  /**
   * Remove auth token from localStorage
   */
  removeAuthToken() {
    localStorage.removeItem('auth_token')
  }

  /**
   * Create headers for API request
   */
  createHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (includeAuth) {
      const token = this.getAuthToken()
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  /**
   * Make API request with timeout and error handling
   */
  async request(endpoint, options = {}) {
    const url = getApiUrl(endpoint)
    const headers = this.createHeaders(options.includeAuth !== false)
    
    const config = {
      headers,
      ...options
    }

    // Add timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    config.signal = controller.signal

    try {
      const response = await fetch(url, config)
      clearTimeout(timeoutId)

      // Handle different response status
      if (response.status === 401) {
        // Unauthorized - clear token and redirect to login
        this.removeAuthToken()
        window.location.href = '/login'
        throw new Error('Unauthorized access')
      }

      if (response.status === 403) {
        throw new Error('Access forbidden')
      }

      if (response.status >= 500) {
        throw new Error('Server error occurred')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      
      throw error
    }
  }

  /**
   * POST request
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    })
  }

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options
    })
  }

  /**
   * PUT request
   */
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    })
  }

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options
    })
  }
}

// Create singleton instance
const apiService = new ApiService()

// Export the service instance
export default apiService

// Export individual methods as standalone functions
export const post = (endpoint, data, options) => apiService.post(endpoint, data, options)
export const get = (endpoint, options) => apiService.get(endpoint, options)
export const put = (endpoint, data, options) => apiService.put(endpoint, data, options)
export const del = (endpoint, options) => apiService.delete(endpoint, options)
export const getAuthToken = () => apiService.getAuthToken()
export const setAuthToken = (token) => apiService.setAuthToken(token)
export const removeAuthToken = () => apiService.removeAuthToken()

// Categories API methods
export const getCategories = (options = {}) => apiService.get('/api/v1/categories', options)
export const getCategoryById = (id, options = {}) => apiService.get(`/api/v1/categories/${id}`, options)
export const createCategory = (data, options = {}) => apiService.post('/api/v1/categories', data, options)
export const updateCategory = (id, data, options = {}) => apiService.put(`/api/v1/categories/${id}`, data, options)
export const deleteCategory = (id, options = {}) => apiService.delete(`/api/v1/categories/${id}`, options)

// Image Upload API method
export const uploadImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)
  
  return apiService.request('/api/v1/upload/category-image', {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type, let browser set it with boundary for FormData
      'Authorization': apiService.createHeaders().Authorization
    },
    ...options
  })
}

// Products API methods
export const getProducts = (options = {}) => apiService.get('/api/v1/products', options)
export const getProductById = (id, options = {}) => apiService.get(`/api/v1/products/${id}`, options)
export const createProduct = (data, options = {}) => apiService.post('/api/v1/products', data, options)
export const updateProduct = (id, data, options = {}) => apiService.put(`/api/v1/products/${id}`, data, options)
export const deleteProduct = (id, options = {}) => apiService.delete(`/api/v1/products/${id}`, options)

// Product Image Upload API method
export const uploadProductImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)
  
  return apiService.request('/api/v1/upload/product-image', {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type, let browser set it with boundary for FormData
      'Authorization': apiService.createHeaders().Authorization
    },
    ...options
  })
}

// Roles API methods
export const getRoles = (options = {}) => apiService.get('/api/v1/roles', options)
export const getRoleById = (id, options = {}) => apiService.get(`/api/v1/roles/${id}`, options)
export const createRole = (data, options = {}) => apiService.post('/api/v1/roles', data, options)
export const updateRole = (id, data, options = {}) => apiService.put(`/api/v1/roles/${id}`, data, options)
export const deleteRole = (id, options = {}) => apiService.delete(`/api/v1/roles/${id}`, options)

// Users API methods
export const getUsers = (query = '', options = {}) => apiService.get(`/api/v1/users${query}`, options)
export const getUserById = (id, options = {}) => apiService.get(`/api/v1/users/${id}`, options)
export const createUser = (data, options = {}) => apiService.post('/api/v1/users', data, options)
export const updateUser = (id, data, options = {}) => apiService.put(`/api/v1/users/${id}`, data, options)
export const deleteUser = (id, options = {}) => apiService.delete(`/api/v1/users/${id}`, options)

// User Image Upload API method
export const uploadUserImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)
  
  return apiService.request('/api/v1/upload/photo', {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type, let browser set it with boundary for FormData
      'Authorization': apiService.createHeaders().Authorization
    },
    ...options
  })
}

// User Roles API methods
export const getUserRoles = (query = '', options = {}) => apiService.get(`/api/v1/assign-role${query}`, options)
export const getUserRoleById = (id, options = {}) => apiService.get(`/api/v1/assign-role/${id}`, options)
export const createUserRole = (data, options = {}) => apiService.post('/api/v1/assign-role', data, options)
export const updateUserRole = (id, data, options = {}) => apiService.put(`/api/v1/assign-role/${id}`, data, options)
export const deleteUserRole = (id, options = {}) => apiService.delete(`/api/v1/assign-role/${id}`, options)

// Warehouses API methods
export const getWarehouses = (query = '', options = {}) => apiService.get(`/api/v1/warehouses${query}`, options)
export const getWarehouseById = (id, options = {}) => apiService.get(`/api/v1/warehouses/${id}/detail`, options)
export const createWarehouse = (data, options = {}) => apiService.post('/api/v1/warehouses', data, options)
export const updateWarehouse = (id, data, options = {}) => apiService.put(`/api/v1/warehouses/${id}`, data, options)
export const deleteWarehouse = (id, options = {}) => apiService.delete(`/api/v1/warehouses/${id}`, options)
export const getWarehousebyIDProducts = (warehouseId, options = {}) => apiService.get(`/api/v1/warehouses/${warehouseId}/detail`, options)

// Warehouse Image Upload API method
export const uploadWarehouseImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)
  
  return apiService.request('/api/v1/upload-warehouse', {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type, let browser set it with boundary for FormData
      'Authorization': apiService.createHeaders().Authorization
    },
    ...options
  })
}

// Assign Product to Warehouse API method
export const assignProductToWarehouse = (warehouseId, data, options = {}) => apiService.post(`/api/v1/warehouses/${warehouseId}/detail`, data, options)

// Get Warehouse Product Detail API method
export const getWarehouseProductDetail = (warehouseId, productId, options = {}) => apiService.get(`/api/v1/warehouses/${warehouseId}/detail/${productId}`, options)

// Update Warehouse Product Stock API method
export const updateWarehouseProductStock = (warehouseId, productId, data, options = {}) => apiService.put(`/api/v1/warehouses/${warehouseId}/detail/${productId}`, data, options)

// Remove Product from Warehouse API method
export const removeProductFromWarehouse = (warehouseId, productId, options = {}) => apiService.delete(`/api/v1/warehouses/${warehouseId}/detail/${productId}`, options)

// Merchants API methods
export const getMerchants = (query = '', options = {}) => apiService.get(`/api/v1/merchants${query}`, options)
export const getMerchantById = (id, options = {}) => apiService.get(`/api/v1/merchants/${id}`, options)
export const createMerchant = (data, options = {}) => apiService.post('/api/v1/merchants', data, options)
export const updateMerchant = (id, data, options = {}) => apiService.put(`/api/v1/merchants/${id}`, data, options)
export const deleteMerchant = (id, options = {}) => apiService.delete(`/api/v1/merchants/${id}`, options)

// Merchant Image Upload API method
export const uploadMerchantImage = (file, options = {}) => {
  const formData = new FormData()
  formData.append('image', file)
  
  return apiService.request('/api/v1/upload-merchant', {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type, let browser set it with boundary for FormData
      'Authorization': apiService.createHeaders().Authorization
    },
    ...options
  })
}

// Merchant Products API methods
export const getMerchantProducts = (merchantId, query = '', options = {}) => apiService.get(`/api/v1/merchant-products?merchant_id=${merchantId}${query}`, options)
export const assignProductToMerchant = (merchantId, data, options = {}) => apiService.post(`/api/v1/merchant-products`, data, options)

// Get Warehouses for Product API method
export const getWarehousesForProduct = (productId, options = {}) => apiService.get(`/api/v1/warehouses/products/${productId}/warehouse`, options)

// Update Merchant Product Stock API method
export const updateMerchantProductStock = ( data, options = {}) => apiService.put(`/api/v1/merchant-products/${data.merchant_product_id}`, data, options)
export const getMerchantProductByID = (productId, data, options = {}) => apiService.get(`/api/v1/merchant-products/${productId}`, data, options)

// Keepers API methods
export const getKeepers = (query = '', options = {}) => apiService.get(`/api/v1/users/role/Keeper${query}`, options)
export const getKeeperById = (id, options = {}) => apiService.get(`/api/v1/users/${id}`, options)

// Dashboard API methods
export const getDashboardData = (options = {}) => apiService.get('/api/v1/dashboard/manager', options)
export const getKeeperDashboardData = (merchantId, options = {}) => apiService.get(`/api/v1/dashboard/keeper/merchant/${merchantId}`, options)

// User Profile API methods
export const updateProfile = (data, options = {}) => apiService.put('/api/v1/profile', data, options)

// Transactions API methods
export const getTransactions = (query = '', options = {}) => apiService.get(`/api/v1/transactions/with-products${query}`, options)
export const getTransactionById = (id, options = {}) => apiService.get(`/api/v1/transactions/${id}`, options)
export const createTransaction = (data, options = {}) => apiService.post('/api/v1/transactions', data, options)
export const updateTransaction = (id, data, options = {}) => apiService.put(`/api/v1/transactions/${id}`, data, options)
export const deleteTransaction = (id, options = {}) => apiService.delete(`/api/v1/transactions/${id}`, options) 

// Utility function untuk mendapatkan merchant data dari localStorage
export const getMerchantDataFromStorage = () => {
  try {
    const merchantData = localStorage.getItem('merchant_data')
    return merchantData ? JSON.parse(merchantData) : null
  } catch (error) {
    console.error('Error parsing merchant data from localStorage:', error)
    return null
  }
}

// Utility function untuk mendapatkan merchant pertama dari localStorage
export const getFirstMerchantFromStorage = () => {
  const merchantData = getMerchantDataFromStorage()
  return merchantData && merchantData.length > 0 ? merchantData[0] : null
}

// Utility function untuk mendapatkan merchant by ID dari localStorage
export const getMerchantByIdFromStorage = (merchantId) => {
  const merchantData = getMerchantDataFromStorage()
  if (!merchantData) return null
  
  return merchantData.find(merchant => merchant.id === merchantId) || null
}

// Wizard Navigation Utilities
export const getTransactionWizardData = () => {
  try {
    const data = localStorage.getItem('transactionWizard')
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error parsing transaction wizard data:', error)
    return null
  }
}

export const clearTransactionWizardData = () => {
  localStorage.removeItem('transactionWizard')
  localStorage.removeItem('transactionStep1')
  localStorage.removeItem('transactionStep2')
}

// Utility function untuk menghapus semua data localStorage
export const clearAllLocalStorageData = () => {
  // Data authentication
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user')
  localStorage.removeItem('merchant_data')
  
  // Data transaction wizard
  localStorage.removeItem('transactionWizard')
  localStorage.removeItem('transactionStep1')
  localStorage.removeItem('transactionStep2')
  
  // Data payment dan transaction
  localStorage.removeItem('lastPaymentStatus')
  localStorage.removeItem('lastTransaction')
  
  // Hapus semua data lain yang mungkin ada
  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) {
      keysToRemove.push(key)
    }
  }
  
  // Hapus semua key yang ditemukan
  keysToRemove.forEach(key => {
    localStorage.removeItem(key)
  })
}

export const isTransactionWizardComplete = () => {
  const data = getTransactionWizardData()
  if (!data) return false
  
  return data.customerInfo?.customerName && 
         data.customerInfo?.phoneNumber && 
         data.customerInfo?.merchantId &&
         data.assignedProducts?.length > 0
} 