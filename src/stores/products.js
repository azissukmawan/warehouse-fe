import { defineStore } from 'pinia'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories } from '@/js/api'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: [],
    loading: false,
    error: null
  }),

  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === parseInt(id))
    },
    
    getProductsByCategory: (state) => (category) => {
      return state.products.filter(product => product.category === category)
    },
    
    getLowStockProducts: (state) => {
      return state.products.filter(product => product.stock < 10)
    },
    
    totalProducts: (state) => state.products.length,
    
    totalValue: (state) => {
      return state.products.reduce((total, product) => {
        return total + (product.price * product.stock)
      }, 0)
    }
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        const response = await getProducts()
        this.products = response.data?.products || response || []
      } catch (error) {
        console.error('Error fetching products:', error)
        this.error = error.message || 'Gagal mengambil data produk'
        
        // Fallback ke data dummy jika API error
        this.products = [
          {
            id: 1,
            name: 'Magic Brush',
            category: 'Cosmetics',
            sku: 'MB-001',
            price: 120500,
            stock: 50,
            warehouse: 'Warehouse A',
            image: '/src/assets/images/thumbnails/magic-brush.png',
            description: 'Professional makeup brush for flawless application',
            status: 'active',
            is_popular: true
          },
          {
            id: 2,
            name: 'Wonderful Lipstick',
            category: 'Cosmetics',
            sku: 'WL-002',
            price: 120500,
            stock: 75,
            warehouse: 'Warehouse A',
            image: '/src/assets/images/thumbnails/lipstick.png',
            description: 'Long-lasting lipstick with vibrant colors',
            status: 'active',
            is_popular: true
          },
          {
            id: 3,
            name: 'Smartwatch Black Color',
            category: 'Wristwatch',
            sku: 'SW-003',
            price: 120500,
            stock: 30,
            warehouse: 'Warehouse B',
            image: '/src/assets/images/thumbnails/smartwatch.png',
            description: 'Smart watch with fitness tracking features',
            status: 'active',
            is_popular: true
          },
          {
            id: 4,
            name: 'Mazdo Printer 2.0',
            category: 'Printer',
            sku: 'MP-004',
            price: 120500,
            stock: 20,
            warehouse: 'Warehouse C',
            image: '/src/assets/images/thumbnails/printer.png',
            description: 'High-quality printer for professional use',
            status: 'active',
            is_popular: false
          },
          {
            id: 5,
            name: 'Smartwatch White Color',
            category: 'Wristwatch',
            sku: 'SW-005',
            price: 120500,
            stock: 25,
            warehouse: 'Warehouse B',
            image: '/src/assets/images/thumbnails/smartwatch-white.png',
            description: 'Elegant white smartwatch with modern design',
            status: 'active',
            is_popular: true
          }
        ]
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        const response = await getCategories()
        this.categories = response.data?.categories || response || []
      } catch (error) {
        console.error('Error fetching categories:', error)
        
        // Fallback ke data dummy jika API error
        this.categories = [
          { id: 1, name: 'Cosmetics', description: 'Beauty and cosmetic products' },
          { id: 2, name: 'Wristwatch', description: 'Watches and timepieces' },
          { id: 3, name: 'Printer', description: 'Printing devices and accessories' },
          { id: 4, name: 'Electronics', description: 'Electronic devices and gadgets' },
          { id: 5, name: 'Fashion', description: 'Fashion and apparel items' }
        ]
      }
    },

    async addProduct(productData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await createProduct(productData)
        const newProduct = response.data || response
        
        // Add to local state
        this.products.push(newProduct)
        return newProduct
      } catch (error) {
        console.error('Error creating product:', error)
        this.error = error.message || 'Gagal membuat produk'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id, productData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await updateProduct(id, productData)
        const updatedProduct = response.data || response
        
        // Update local state
        const index = this.products.findIndex(product => product.id === parseInt(id))
        if (index !== -1) {
          this.products[index] = updatedProduct
        }
        
        return updatedProduct
      } catch (error) {
        console.error('Error updating product:', error)
        this.error = error.message || 'Gagal mengupdate produk'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id) {
      this.loading = true
      this.error = null
      
      try {
        await deleteProduct(id)
        
        // Remove from local state
        const index = this.products.findIndex(product => product.id === parseInt(id))
        if (index !== -1) {
          this.products.splice(index, 1)
        }
        
        return true
      } catch (error) {
        console.error('Error deleting product:', error)
        this.error = error.message || 'Gagal menghapus produk'
        throw error
      } finally {
        this.loading = false
      }
    },

    async addCategory(categoryData) {
      try {
        const newCategory = {
          id: this.categories.length + 1,
          ...categoryData
        }
        
        this.categories.push(newCategory)
        return newCategory
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    async updateCategory(id, categoryData) {
      try {
        const index = this.categories.findIndex(category => category.id === parseInt(id))
        if (index !== -1) {
          this.categories[index] = { ...this.categories[index], ...categoryData }
          return this.categories[index]
        }
        throw new Error('Category not found')
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    async deleteCategory(id) {
      try {
        const index = this.categories.findIndex(category => category.id === parseInt(id))
        if (index !== -1) {
          this.categories.splice(index, 1)
          return true
        }
        throw new Error('Category not found')
      } catch (error) {
        this.error = error.message
        throw error
      }
    }
  }
}) 