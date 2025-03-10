<template>
  <div class="edit-invoice">
    <div class="d-flex align-center px-3 px-sm-6 py-4">
      <v-btn
        icon
        variant="text"
        @click="$router.push('/invoices')"
        class="mr-2"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2 class="text-h5 text-sm-h4">Edit Invoice</h2>
    </div>
    
    <!-- Stepper -->
    <div class="px-3 px-sm-6">
      <v-stepper v-model="step" class="stepper-mobile">
        <v-stepper-header class="bg-white">
          <v-stepper-item value="1" complete>
            <span class="d-none d-sm-block">Invoice Details</span>
            <span class="d-sm-none">Details</span>
          </v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item value="2" :complete="step === '3'">
            <span class="d-none d-sm-block">Transaction Details</span>
            <span class="d-sm-none">Items</span>
          </v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item value="3">
            <span>Preview</span>
          </v-stepper-item>
        </v-stepper-header>
      </v-stepper>
    </div>
    
    <!-- Step 1: Invoice Details -->
    <div v-if="step === '1'" class="px-3 px-sm-6 py-4">
      <h3 class="mb-4 text-subtitle-1 text-sm-h5">Invoice Details</h3>
      
      <v-form ref="invoiceForm">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="invoiceDetails.companyName"
              label="Company Name"
              variant="outlined"
              required
              density="comfortable"
              class="mobile-field"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="invoiceDetails.invoiceNumber"
              label="Invoice Number"
              variant="outlined"
              required
              disabled
              density="comfortable"
              class="mobile-field"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="invoiceDetails.date"
              label="Date"
              variant="outlined"
              required
              density="comfortable"
              class="mobile-field"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="invoiceDetails.customerName"
              label="Customer Name"
              variant="outlined"
              required
              density="comfortable"
              class="mobile-field"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="invoiceDetails.customerMobile"
              label="Customer Mobile"
              variant="outlined"
              required
              density="comfortable"
              class="mobile-field"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="invoiceDetails.customerEmail"
              label="Customer Email"
              variant="outlined"
              required
              density="comfortable"
              class="mobile-field"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="invoiceDetails.customerAddress"
              label="Customer Address"
              variant="outlined"
              required
              density="comfortable"
              class="mobile-field"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      
      <div class="d-flex justify-end mt-4">
        <v-btn color="primary" @click="goToStep('2')" class="mobile-button">
          Next
        </v-btn>
      </div>
    </div>
    
    <!-- Step 2: Transaction Details -->
    <div v-if="step === '2'" class="px-3 px-sm-6 py-4">
      <h3 class="mb-4 text-subtitle-1 text-sm-h5">Transaction Details</h3>
      
      <div class="transaction-table-wrapper">
        <v-table class="transaction-table">
          <thead>
            <tr>
              <th class="text-left">Product</th>
              <th class="text-left">Rate</th>
              <th class="text-left">Qty</th>
              <th class="text-left">Disc.</th>
              <th class="text-left">Total</th>
              <th class="action-column"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in transactionDetails" :key="index">
              <td>{{ item.product }}</td>
              <td>{{ item.rate }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.discount }}</td>
              <td>{{ (item.rate * item.quantity) - item.discount }}</td>
              <td class="action-column">
                <v-btn icon color="error" size="x-small" @click="removeItem(index)" class="mobile-icon-button">
                  <v-icon size="small">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>
                <v-text-field
                  v-model="newItem.product"
                  label="Product"
                  hide-details
                  variant="outlined"
                  density="compact"
                  class="mobile-small-field"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model.number="newItem.rate"
                  label="Rate"
                  hide-details
                  variant="outlined"
                  density="compact"
                  type="number"
                  class="mobile-small-field"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model.number="newItem.quantity"
                  label="Qty"
                  hide-details
                  variant="outlined"
                  density="compact"
                  type="number"
                  class="mobile-small-field"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model.number="newItem.discount"
                  label="Disc"
                  hide-details
                  variant="outlined"
                  density="compact"
                  type="number"
                  class="mobile-small-field"
                ></v-text-field>
              </td>
              <td>
                {{ calculateItemTotal }}
              </td>
              <td class="action-column">
                <v-btn icon color="success" size="x-small" @click="addItem" class="mobile-icon-button">
                  <v-icon size="small">mdi-plus</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      
      <!-- Mobile view for new item entry -->
      <div class="d-block d-sm-none mt-4">
        <h4 class="text-subtitle-2 mb-2">Add New Item</h4>
        <v-card class="pa-3 mb-4">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.product"
                label="Product"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="newItem.rate"
                label="Rate"
                variant="outlined"
                density="compact"
                type="number"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="newItem.quantity"
                label="Qty"
                variant="outlined"
                density="compact"
                type="number"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="newItem.discount"
                label="Disc"
                variant="outlined"
                density="compact"
                type="number"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between align-center mt-3">
            <div>Total: {{ calculateItemTotal }}</div>
            <v-btn color="success" @click="addItem" size="small">
              Add Item
            </v-btn>
          </div>
        </v-card>
      </div>
      
      <div class="d-flex flex-column flex-sm-row justify-end mt-4">
        <div class="d-flex align-center mb-4 mb-sm-0 mr-0 mr-sm-8">
          <div class="text-subtitle-1 text-sm-h6 mr-4">Total</div>
          <div class="text-subtitle-1 text-sm-h6">Rs. {{ totalAmount }}</div>
        </div>
      </div>
      
      <div class="d-flex flex-column flex-sm-row justify-space-between mt-4">
        <v-btn variant="outlined" @click="goToStep('1')" class="mb-2 mb-sm-0 mobile-button">
          Back
        </v-btn>
        <v-btn color="primary" @click="goToStep('3')" class="mobile-button">
          Next
        </v-btn>
      </div>
    </div>
    
    <!-- Step 3: Preview -->
    <div v-if="step === '3'" class="px-3 px-sm-6 py-4">
      <h3 class="mb-4 text-subtitle-1 text-sm-h5 d-sm-none">Invoice Preview</h3>
      
      <invoice-preview
        :invoice-details="invoiceDetails"
        :transaction-details="transactionDetails"
        :total-amount="totalAmount"
        class="invoice-preview-mobile"
      ></invoice-preview>
      
      <div class="d-flex flex-column flex-sm-row justify-space-between mt-4">
        <v-btn variant="outlined" @click="goToStep('2')" class="mb-2 mb-sm-0 mobile-button">
          Back
        </v-btn>
        <div class="d-flex flex-column flex-sm-row">
          <v-btn variant="outlined" color="error" class="mb-2 mb-sm-0 mr-0 mr-sm-2 mobile-button" @click="confirmDeleteDialog = true">
            Delete
          </v-btn>
          <v-btn color="primary" @click="updateInvoice" class="mobile-button">
            Update
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="confirmDeleteDialog" max-width="400" class="mobile-dialog">
      <v-card>
        <v-card-title class="text-h5 d-none d-sm-block">
          Confirm Delete
        </v-card-title>
        <v-card-title class="text-h6 d-sm-none">
          Confirm Delete
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this invoice? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="confirmDeleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" variant="text" @click="deleteInvoice">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InvoicePreview from '@/components/InvoicePreview.vue'

export default {
  name: 'EditInvoice',
  components: {
    InvoicePreview
  },
  data() {
    return {
      step: '1',
      newItem: {
        product: '',
        rate: 0,
        quantity: 0,
        discount: 0
      },
      confirmDeleteDialog: false,
      originalInvoice: null,
      windowWidth: window.innerWidth
    }
  },
  computed: {
    invoiceDetails: {
      get() {
        return this.$store.state.currentInvoice?.invoiceDetails || {
          companyName: '',
          invoiceNumber: '',
          date: '',
          customerName: '',
          customerMobile: '',
          customerEmail: '',
          customerAddress: ''
        }
      },
      set(value) {
        this.$store.commit('UPDATE_INVOICE_DETAILS', value)
      }
    },
    transactionDetails() {
      return this.$store.state.currentInvoice?.transactionDetails || []
    },
    totalAmount() {
      return this.transactionDetails.reduce((total, item) => {
        return total + ((item.rate * item.quantity) - item.discount)
      }, 0)
    },
    calculateItemTotal() {
      return (this.newItem.rate * this.newItem.quantity) - this.newItem.discount
    },
    invoiceId() {
      return this.$store.state.currentInvoice?.id
    },
    isMobile() {
      return this.windowWidth < 600
    }
  },
  created() {
    // Store a copy of the original invoice for comparison
    this.originalInvoice = JSON.stringify(this.$store.state.currentInvoice)
    
    // If no invoice is loaded, redirect back to the invoice list
    if (!this.invoiceId) {
      this.$router.push('/invoices')
    }
  },
  mounted() {
    // Add class to body to control sidebar on mobile
    document.body.classList.add('mobile-edit-invoice')
    
    // Add event listener for window resize
    window.addEventListener('resize', this.handleResize)
    // Initialize window width
    this.handleResize()
  },
  beforeUnmount() {
    // Remove class when component is destroyed
    document.body.classList.remove('mobile-edit-invoice')
    
    // Remove event listener
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
    },
    goToStep(step) {
      if (step === '2' && this.step === '1') {
        // Save invoice details
        this.$store.commit('UPDATE_INVOICE_DETAILS', this.invoiceDetails)
      }
      this.step = step
      
      // Scroll to top when changing steps on mobile
      if (this.isMobile) {
        window.scrollTo(0, 0)
      }
    },
    addItem() {
      if (!this.newItem.product || !this.newItem.rate || !this.newItem.quantity) {
        // Validation
        this.$store.commit('SET_SNACKBAR', {
          show: true,
          text: 'Please fill in required fields',
          color: 'warning'
        })
        return
      }
      
      this.$store.commit('ADD_TRANSACTION_ITEM', { ...this.newItem })
      
      // Reset new item
      this.newItem = {
        product: '',
        rate: 0,
        quantity: 0,
        discount: 0
      }
    },
    removeItem(index) {
      this.$store.commit('REMOVE_TRANSACTION_ITEM', index)
    },
    async updateInvoice() {
      try {
        // Check if any changes were made
        const currentInvoice = JSON.stringify(this.$store.state.currentInvoice)
        if (currentInvoice === this.originalInvoice) {
          // No changes were made
          this.$router.push('/invoices')
          return
        }
        
        // Dispatch update action to store
        await this.$store.dispatch('updateInvoice', this.invoiceId)
        
        // Show success message
        this.$store.commit('SET_SNACKBAR', {
          show: true,
          text: 'Invoice updated successfully',
          color: 'success'
        })
        
        // Navigate back to invoice list
        this.$router.push('/invoices')
      } catch (error) {
        // Show error message
        this.$store.commit('SET_SNACKBAR', {
          show: true,
          text: 'Failed to update invoice',
          color: 'error'
        })
      }
    },
    async deleteInvoice() {
      try {
        // Close the confirmation dialog
        this.confirmDeleteDialog = false
        
        // Dispatch delete action to store
        await this.$store.dispatch('deleteInvoice', this.invoiceId)
        
        // Show success message
        this.$store.commit('SET_SNACKBAR', {
          show: true,
          text: 'Invoice deleted successfully',
          color: 'success'
        })
        
        // Navigate back to invoice list
        this.$router.push('/invoices')
      } catch (error) {
        // Show error message
        this.$store.commit('SET_SNACKBAR', {
          show: true,
          text: 'Failed to delete invoice',
          color: 'error'
        })
      }
    }
  }
}
</script>

<style>
/* Global styles to affect the sidebar */
.mobile-edit-invoice .v-navigation-drawer {
  width: 200px !important;
}

@media (max-width: 600px) {
  .mobile-edit-invoice .v-navigation-drawer {
    width: 60px !important;
  }
  
  .mobile-edit-invoice .v-navigation-drawer .v-list-item__title,
  .mobile-edit-invoice .v-navigation-drawer .v-list-item__subtitle {
    display: none !important;
  }
  
  .mobile-edit-invoice .v-navigation-drawer .v-list-item {
    min-height: 44px !important;
    padding: 0 !important;
    justify-content: center !important;
  }
  
  /* Improve mobile form field appearance */
  .mobile-field .v-field__input {
    min-height: 40px !important;
    font-size: 14px !important;
  }
  
  .mobile-field .v-field__label {
    font-size: 14px !important;
  }
  
  /* Mobile button styling */
  .mobile-button {
    height: 36px !important;
    font-size: 14px !important;
    padding: 0 16px !important;
  }
  
  /* Mobile dialog adjustments */
  .mobile-dialog .v-card {
    padding: 16px !important;
  }
  
  .mobile-dialog .v-card__title {
    padding: 8px 0 !important;
    font-size: 18px !important;
  }
  
  .mobile-dialog .v-card__text {
    padding: 12px 0 !important;
    font-size: 14px !important;
  }
}
</style>

<style scoped>
.transaction-table-wrapper {
  overflow-x: auto;
  width: 100%;
}

@media (max-width: 600px) {
  .transaction-table th,
  .transaction-table td {
    padding: 8px 4px;
    font-size: 0.75rem;
    white-space: nowrap;
  }
  
  .transaction-table th:nth-child(4),
  .transaction-table td:nth-child(4) {
    max-width: 50px;
  }
  
  .action-column {
    width: 32px;
    padding: 0 4px !important;
  }
  
  .mobile-small-field {
    max-width: 90px;
  }
  
  .mobile-small-field :deep(.v-field__input) {
    padding: 4px !important;
    min-height: 36px !important;
    font-size: 12px !important;
  }
  
  .mobile-small-field :deep(.v-field__label) {
    font-size: 12px !important;
  }
  
  .mobile-icon-button {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  /* Stepper adjustments */
  .stepper-mobile :deep(.v-stepper-item__title) {
    font-size: 0.75rem;
  }
  
  /* Invoice preview adjustments */
  .invoice-preview-mobile {
    font-size: 0.75rem;
  }
  
  .invoice-preview-mobile :deep(table) {
    font-size: 0.7rem;
  }
  
  .invoice-preview-mobile :deep(th),
  .invoice-preview-mobile :deep(td) {
    padding: 4px;
  }
}
</style>