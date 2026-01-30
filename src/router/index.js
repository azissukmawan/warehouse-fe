import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from '@/middleware/auth'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false } // Login tidak memerlukan auth
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import('@/views/Overview.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/products',
    name: 'ManageProducts',
    component: () => import('@/views/ManageProducts.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/products/add',
    name: 'AddNewProducts',
    component: () => import('@/views/AddNewProducts.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/products/edit/:id',
    name: 'EditProducts',
    component: () => import('@/views/EditProducts.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/categories',
    name: 'ManageCategories',
    component: () => import('@/views/ManageCategories.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/categories/add',
    name: 'AddNewCategory',
    component: () => import('@/views/AddNewCategory.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/categories/edit/:id',
    name: 'EditCategory',
    component: () => import('@/views/EditCategory.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/warehouses',
    name: 'ManageWarehouse',
    component: () => import('@/views/ManageWarehouse.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/warehouses/add',
    name: 'AddNewWarehouse',
    component: () => import('@/views/AddNewWarehouse.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/warehouses/edit/:id',
    name: 'EditWarehouse',
    component: () => import('@/views/EditWarehouse.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/warehouses/:id',
    name: 'WarehouseDetails',
    component: () => import('@/views/WarehouseDetails.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/merchants',
    name: 'ManageMerchants',
    component: () => import('@/views/ManageMerchants.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/merchants/add',
    name: 'AddNewMerchant',
    component: () => import('@/views/AddNewMerchant.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/merchants/edit/:id',
    name: 'EditMerchant',
    component: () => import('@/views/EditMerchant.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/merchants/:id',
    name: 'MerchantDetails',
    component: () => import('@/views/MerchantDetails.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/my-merchants',
    name: 'MyMerchants',
    component: () => import('@/views/MyMerchants.vue'),
    meta: { requiresAuth: true, roles: ['keeper'] }
  },
  {
    path: '/merchant-overview',
    name: 'MerchantOverview',
    component: () => import('@/views/MerchantOverview.vue'),
    meta: { requiresAuth: true, roles: ['keeper'] }
  },
  {
    path: '/roles',
    name: 'ManageRoles',
    component: () => import('@/views/ManageRoles.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/roles/add',
    name: 'AddNewRole',
    component: () => import('@/views/AddNewRole.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/roles/edit/:id',
    name: 'EditRole',
    component: () => import('@/views/EditRole.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/users',
    name: 'ManageUsersList',
    component: () => import('@/views/ManageUsersList.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/users/add',
    name: 'AddNewUser',
    component: () => import('@/views/AddNewUser.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/users/edit/:id',
    name: 'EditUser',
    component: () => import('@/views/EditUser.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/users-roles',
    name: 'ManageUsersRole',
    component: () => import('@/views/ManageUsersRole.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/users-roles/assign-role',
    name: 'AssignUserRole',
    component: () => import('@/views/AssignUserRole.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/users-roles/edit-role/:id',
    name: 'EditUserRole',
    component: () => import('@/views/EditUserRole.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('@/views/Transactions.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/transactions/add-1',
    name: 'AddNewTransaction1',
    component: () => import('@/views/AddNewTransaction1.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/transactions/add-2',
    name: 'AddNewTransaction2',
    component: () => import('@/views/AddNewTransaction2.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/transactions/add-3',
    name: 'AddNewTransaction3',
    component: () => import('@/views/AddNewTransaction3.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/transactions/:id',
    name: 'TransactionDetails',
    component: () => import('@/views/TransactionDetails.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/transactions/success',
    name: 'TransactionSuccess',
    component: () => import('@/views/TransactionSuccess.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/payment/callback',
    name: 'TransactionCallback',
    component: () => import('@/views/TransactionCallback.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component: () => import('@/views/PaymentSuccess.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/payment/pending',
    name: 'PaymentPending',
    component: () => import('@/views/PaymentPending.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/payment/error',
    name: 'PaymentError',
    component: () => import('@/views/PaymentError.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/payment/cancelled',
    name: 'PaymentCancelled',
    component: () => import('@/views/PaymentCancelled.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/assign-product/:warehouseId',
    name: 'AssignProduct',
    component: () => import('@/views/AssignProduct.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/assign-merchant-product/:merchantId',
    name: 'AssignMerchantProduct',
    component: () => import('@/views/AssignMerchantProduct.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/assign-product-transactions',
    name: 'AssignProductTransactions',
    component: () => import('@/views/AssignProductTransactions.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/update-stock/:warehouseId/:warehouseProductId',
    name: 'UpdateStock',
    component: () => import('@/views/UpdateStock.vue'),
    meta: { requiresAuth: true, roles: ['manager'] }
  },
  {
    path: '/update-stock/merchant/:merchantId/product/:productId',
    name: 'UpdateMerchantStock',
    component: () => import('@/views/UpdateMerchantStock.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: { requiresAuth: true, roles: ['manager', 'keeper'] }
  },
  // Catch all route untuk 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard menggunakan middleware dengan error handling
router.beforeEach(async (to, from, next) => {
  try {
    await authMiddleware(to, from, next)
  } catch (error) {
    console.error('Navigation error:', error)
    // Fallback ke login page jika ada error
    next('/')
  }
})

export default router 