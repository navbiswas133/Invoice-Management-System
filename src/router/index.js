import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import InvoiceList from '../views/InvoiceList.vue'
import CreateInvoice from '../views/CreateInvoice.vue'
import InvoicePreview from '../views/InvoicePreview.vue'
import EditInvoice from '../views/EditInvoice.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'auth' }  // Use auth layout for login page
  },
  {
    path: '/invoices',
    name: 'InvoiceList',
    component: InvoiceList,
    meta: { requiresAuth: true }  // Default layout (MainLayout)
  },
  {
    path: '/invoice/create',
    name: 'CreateInvoice',
    component: CreateInvoice,
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice/preview',
    name: 'InvoicePreview',
    component: InvoicePreview,
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice/edit/:id',
    name: 'EditInvoice',
    component: EditInvoice,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router