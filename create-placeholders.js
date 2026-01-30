import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const placeholderTemplate = (name, title) => `<template>
  <Layout page-title="${title}">
    <div class="bg-white rounded-3xl p-6">
      <h2 class="text-xl font-bold text-monday-black mb-4">${title}</h2>
      <p class="text-monday-gray">This page is under development.</p>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'

export default {
  name: '${name}',
  components: {
    Layout
  }
}
</script>`

const pages = [
  { name: 'AddNewCategory', title: 'Add New Category' },
  { name: 'EditCategory', title: 'Edit Category' },
  { name: 'AddNewWarehouse', title: 'Add New Warehouse' },
  { name: 'EditWarehouse', title: 'Edit Warehouse' },
  { name: 'WarehouseDetails', title: 'Warehouse Details' },
  { name: 'AddNewMerchant', title: 'Add New Merchant' },
  { name: 'EditMerchant', title: 'Edit Merchant' },
  { name: 'MerchantDetails', title: 'Merchant Details' },
  { name: 'MyMerchants', title: 'My Merchants' },
  { name: 'MerchantOverview', title: 'Merchant Overview' },
  { name: 'ManageRoles', title: 'Manage Roles' },
  { name: 'AddNewRole', title: 'Add New Role' },
  { name: 'EditRole', title: 'Edit Role' },
  { name: 'ManageUsersList', title: 'Manage Users List' },
  { name: 'AddNewUser', title: 'Add New User' },
  { name: 'EditUser', title: 'Edit User' },
  { name: 'ManageUsersRole', title: 'Manage Users Role' },
  { name: 'AssignUserRole', title: 'Assign User Role' },
  { name: 'EditUserRole', title: 'Edit User Role' },
  { name: 'Transactions', title: 'Transactions' },
  { name: 'AddNewTransaction1', title: 'Add New Transaction - Step 1' },
  { name: 'AddNewTransaction2', title: 'Add New Transaction - Step 2' },
  { name: 'AddNewTransaction3', title: 'Add New Transaction - Step 3' },
  { name: 'TransactionDetails', title: 'Transaction Details' },
  { name: 'TransactionSuccess', title: 'Transaction Success' },
  { name: 'AssignProduct', title: 'Assign Product' },
  { name: 'AssignMerchantProduct', title: 'Assign Merchant Product' },
  { name: 'AssignProductTransactions', title: 'Assign Product Transactions' },
  { name: 'UpdateStock', title: 'Update Stock' },
  { name: 'UpdateMerchantStock', title: 'Update Merchant Stock' },
  { name: 'EditProducts', title: 'Edit Products' }
]

pages.forEach(page => {
  const filePath = path.join(__dirname, 'src', 'views', `${page.name}.vue`)
  const content = placeholderTemplate(page.name, page.title)
  
  fs.writeFileSync(filePath, content)
  console.log(`Created: ${filePath}`)
})

console.log('All placeholder files created successfully!') 