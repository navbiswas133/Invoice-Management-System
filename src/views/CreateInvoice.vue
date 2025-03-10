<template>
  <div class="create-invoice">
    <div class="d-flex align-center px-6 py-4 flex-wrap header-container">
      <v-btn
        icon
        variant="text"
        @click="$router.push('/invoices')"
        class="mr-2 back-button"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2 class="page-title">Add New Invoice</h2>
    </div>
    
    <!-- Stepper -->
    <div class="px-6 stepper-container">
      <v-stepper v-model="step" class="stepper-responsive elevated-stepper">
        <v-stepper-header class="bg-white">
          <v-stepper-item value="1" :complete="step !== '1'" class="stepper-item">
            <v-icon class="stepper-icon">mdi-file-document-outline</v-icon>
            <span class="d-none d-sm-inline">Invoice Details</span>
            <span class="d-sm-none">Details</span>
          </v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item value="2" :complete="step === '3'" class="stepper-item">
            <v-icon class="stepper-icon">mdi-cart-outline</v-icon>
            <span class="d-none d-sm-inline">Transaction Details</span>
            <span class="d-sm-none">Items</span>
          </v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item value="3" class="stepper-item">
            <v-icon class="stepper-icon">mdi-eye-outline</v-icon>
            <span>Preview</span>
          </v-stepper-item>
        </v-stepper-header>
      </v-stepper>
    </div>
    
    <!-- Content wrapper with 3D perspective -->
    <div class="content-perspective-wrapper">
    
      <!-- Step 1: Invoice Details -->
      <transition name="slide-fade">
        <div v-if="step === '1'" class="px-6 py-4 content-card">
          <h3 class="mb-4 section-title">Invoice Details</h3>
          
          <v-form ref="invoiceForm" v-model="isInvoiceFormValid" @submit.prevent="validateAndProceed">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="invoiceDetails.companyName"
                  label="Company Name"
                  variant="outlined"
                  :rules="[rules.required]"
                  required
                  density="comfortable"
                  class="animated-field"
                  prepend-inner-icon="mdi-domain"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="invoiceDetails.invoiceNumber"
                  label="Invoice Number"
                  variant="outlined"
                  :rules="[rules.required, rules.invoiceNumberFormat]"
                  required
                  hint="Format: INV-YYYY-XXXX"
                  density="comfortable"
                  class="animated-field"
                  prepend-inner-icon="mdi-pound"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="invoiceDetails.date"
                  label="Date"
                  variant="outlined"
                  :rules="[rules.required, rules.dateFormat]"
                  required
                  type="date"
                  density="comfortable"
                  class="animated-field"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="invoiceDetails.customerName"
                  label="Customer Name"
                  variant="outlined"
                  :rules="[rules.required]"
                  required
                  density="comfortable"
                  class="animated-field"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="invoiceDetails.customerMobile"
                  label="Customer Mobile"
                  variant="outlined"
                  :rules="[rules.required, rules.phoneNumber]"
                  required
                  density="comfortable"
                  class="animated-field"
                  prepend-inner-icon="mdi-phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="invoiceDetails.customerEmail"
                  label="Customer Email"
                  variant="outlined"
                  :rules="[rules.required, rules.email]"
                  required
                  density="comfortable"
                  class="animated-field"
                  prepend-inner-icon="mdi-email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="invoiceDetails.customerAddress"
                  label="Customer Address"
                  variant="outlined"
                  :rules="[rules.required]"
                  required
                  density="comfortable"
                  class="animated-field"
                  prepend-inner-icon="mdi-map-marker"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          
          <div class="d-flex justify-end mt-4">
            <v-btn color="primary" @click="validateAndProceed" class="pulse-button">
              <span>Next</span>
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>
      </transition>
      
      <!-- Step 2: Transaction Details -->
      <transition name="slide-fade">
        <div v-if="step === '2'" class="px-6 py-4 content-card">
          <h3 class="mb-4 section-title">Transaction Details</h3>
          
          <v-alert
            v-if="!hasTransactionItems && showTransactionAlert"
            type="warning"
            class="mb-4 bounce-alert"
            closable
            @click:close="showTransactionAlert = false"
          >
            Please add at least one item to proceed
          </v-alert>
          
          <div class="table-responsive">
            <v-table class="animated-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Discount</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <transition-group name="list">
                  <tr v-for="(item, index) in transactionDetails" :key="index" class="item-row">
                    <td class="text-truncate max-width-product">{{ item.product }}</td>
                    <td>{{ item.rate }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.discount }}</td>
                    <td>{{ (item.rate * item.quantity) - item.discount }}</td>
                    <td>
                      <v-btn icon color="error" size="small" @click="removeItem(index)" class="delete-button">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </transition-group>
                <tr class="new-item-row">
                  <td>
                    <v-text-field
                      v-model="newItem.product"
                      label="Enter Product"
                      hide-details
                      variant="outlined"
                      density="compact"
                      :error-messages="itemErrors.product"
                      class="animated-field"
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
                      :error-messages="itemErrors.rate"
                      min="0"
                      class="animated-field"
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
                      :error-messages="itemErrors.quantity"
                      min="1"
                      class="animated-field"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      v-model.number="newItem.discount"
                      label="Disc."
                      hide-details
                      variant="outlined"
                      density="compact"
                      type="number"
                      :error-messages="itemErrors.discount"
                      min="0"
                      class="animated-field"
                    ></v-text-field>
                  </td>
                  <td>
                    <span class="calculated-total">{{ calculateItemTotal }}</span>
                  </td>
                  <td>
                    <v-btn icon color="success" size="small" @click="validateAndAddItem" class="add-button">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
          
          <!-- Mobile view for transaction items -->
          <div class="d-md-none mt-4">
            <transition-group name="list">
              <div v-for="(item, index) in transactionDetails" :key="index" class="card-item mb-4 pa-3 rounded border animated-card">
                <div class="d-flex justify-space-between align-center mb-2">
                  <h4>{{ item.product }}</h4>
                  <v-btn icon color="error" size="small" @click="removeItem(index)" class="delete-button">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
                <div class="d-flex flex-wrap justify-space-between">
                  <div class="mb-1 mr-2">
                    <strong>Rate:</strong> {{ item.rate }}
                  </div>
                  <div class="mb-1 mr-2">
                    <strong>Qty:</strong> {{ item.quantity }}
                  </div>
                  <div class="mb-1 mr-2">
                    <strong>Discount:</strong> {{ item.discount }}
                  </div>
                  <div class="mb-1">
                    <strong>Total:</strong> {{ (item.rate * item.quantity) - item.discount }}
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
          
          <!-- Mobile view for adding new item -->
          <div class="d-md-none mt-4 mb-4 pa-3 rounded border mobile-add-form">
            <h4 class="mb-3">Add New Item</h4>
            <v-text-field
              v-model="newItem.product"
              label="Product Name"
              hide-details="auto"
              variant="outlined"
              density="compact"
              class="mb-3 animated-field"
              :error-messages="itemErrors.product"
              prepend-inner-icon="mdi-package-variant"
            ></v-text-field>
            <div class="d-flex flex-wrap">
              <v-text-field
                v-model.number="newItem.rate"
                label="Rate"
                hide-details="auto"
                variant="outlined"
                density="compact"
                type="number"
                class="mr-2 mb-3 flex-grow-1 animated-field"
                style="min-width: 100px;"
                :error-messages="itemErrors.rate"
                min="0"
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
              <v-text-field
                v-model.number="newItem.quantity"
                label="Quantity"
                hide-details="auto"
                variant="outlined"
                density="compact"
                type="number"
                class="mr-2 mb-3 flex-grow-1 animated-field"
                style="min-width: 100px;"
                :error-messages="itemErrors.quantity"
                min="1"
                prepend-inner-icon="mdi-numeric"
              ></v-text-field>
              <v-text-field
                v-model.number="newItem.discount"
                label="Discount"
                hide-details="auto"
                variant="outlined"
                density="compact"
                type="number"
                class="mb-3 flex-grow-1 animated-field"
                style="min-width: 100px;"
                :error-messages="itemErrors.discount"
                min="0"
                prepend-inner-icon="mdi-tag-outline"
              ></v-text-field>
            </div>
            <div class="d-flex justify-space-between align-center">
              <div class="text-subtitle-1 calculated-total-mobile">
                <strong>Total:</strong> {{ calculateItemTotal }}
              </div>
              <v-btn color="success" @click="validateAndAddItem" class="add-button-mobile">
                <v-icon left>mdi-plus</v-icon>
                Add Item
              </v-btn>
            </div>
          </div>
          
          <div class="d-flex justify-end mt-4 flex-wrap">
            <div class="d-flex align-center mr-8 total-amount">
              <div class="text-h6 mr-4">Total</div>
              <div class="text-h6">Rs. {{ totalAmount }}</div>
            </div>
          </div>
          
          <div class="d-flex justify-space-between mt-4 flex-wrap-reverse gap-2">
            <v-btn variant="outlined" @click="goToStep('1')" class="back-button-nav">
              <v-icon left>mdi-arrow-left</v-icon>
              Back
            </v-btn>
            <v-btn color="primary" @click="validateTransactionAndProceed" class="next-button-nav">
              Next
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>
      </transition>
      
      <!-- Step 3: Preview -->
      <transition name="slide-fade">
        <div v-if="step === '3'" class="px-6 py-4 content-card">
          <h3 class="mb-4 section-title">Invoice Preview</h3>
          
          <div class="preview-container">
            <invoice-preview
              :invoice-details="invoiceDetails"
              :transaction-details="transactionDetails"
              :total-amount="totalAmount"
            ></invoice-preview>
          </div>
          
          <div class="d-flex justify-space-between mt-4 flex-wrap-reverse gap-2">
            <v-btn variant="outlined" @click="goToStep('2')" class="back-button-nav">
              <v-icon left>mdi-arrow-left</v-icon>
              Back
            </v-btn>
            <v-btn color="primary" @click="confirmSaveInvoice" class="done-button">
              <v-icon left>mdi-check</v-icon>
              Done
            </v-btn>
          </div>
        </div>
      </transition>
    </div>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="confirmDialog" max-width="400" class="confirmation-dialog">
      <v-card class="dialog-card">
        <v-card-title class="text-h5 dialog-title">
          <v-icon large color="primary" class="mr-2">mdi-content-save</v-icon>
          Save Invoice
        </v-card-title>
        <v-card-text class="dialog-text">
          Are you sure you want to save this invoice?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="confirmDialog = false" class="dialog-button">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="text" @click="saveInvoice" class="dialog-button save-button">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" class="animated-snackbar">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import InvoicePreview from '@/components/InvoicePreview.vue'

export default {
  name: 'CreateInvoice',
  components: {
    InvoicePreview
  },
  data() {
    return {
      step: '1',
      isInvoiceFormValid: false,
      itemErrors: {
        product: '',
        rate: '',
        quantity: '',
        discount: ''
      },
      newItem: {
        product: '',
        rate: 0,
        quantity: 0,
        discount: 0
      },
      rules: {
        required: value => !!value || 'This field is required',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid email address'
        },
        phoneNumber: value => {
          const pattern = /^[0-9]{10}$/
          return pattern.test(value) || 'Invalid phone number (10 digits)'
        },
        dateFormat: value => {
          if (!value) return true
          const today = new Date()
          const inputDate = new Date(value)
          return inputDate <= today || 'Date cannot be in the future'
        },
        invoiceNumberFormat: value => {
          const pattern = /^INV-\d{4}-\d{4}$/
          return pattern.test(value) || 'Format should be INV-YYYY-XXXX'
        }
      },
      showTransactionAlert: false,
      confirmDialog: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success'
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
      const rate = this.newItem.rate || 0
      const quantity = this.newItem.quantity || 0
      const discount = this.newItem.discount || 0
      return (rate * quantity) - discount
    },
    hasTransactionItems() {
      return this.transactionDetails && this.transactionDetails.length > 0
    }
  },
  methods: {
    validateAndProceed() {
      this.$refs.invoiceForm.validate().then(({ valid }) => {
        if (valid) {
          this.$store.commit('UPDATE_INVOICE_DETAILS', this.invoiceDetails)
          this.goToStep('2')
        } else {
          this.showSnackbar('Please fill in all required fields correctly', 'error')
        }
      })
    },
    
    validateAndAddItem() {
      // Reset previous errors
      this.itemErrors = {
        product: '',
        rate: '',
        quantity: '',
        discount: ''
      }
      
      // Validate each field
      let isValid = true
      
      if (!this.newItem.product) {
        this.itemErrors.product = 'Product name is required'
        isValid = false
      }
      
      if (!this.newItem.rate || this.newItem.rate <= 0) {
        this.itemErrors.rate = 'Rate must be greater than 0'
        isValid = false
      }
      
      if (!this.newItem.quantity || this.newItem.quantity <= 0) {
        this.itemErrors.quantity = 'Quantity must be greater than 0'
        isValid = false
      }
      
      // Discount validation - can be 0 but not negative
      if (this.newItem.discount < 0) {
        this.itemErrors.discount = 'Discount cannot be negative'
        isValid = false
      }
      
      // Check if discount is not greater than total price
      if ((this.newItem.rate * this.newItem.quantity) <= this.newItem.discount) {
        this.itemErrors.discount = 'Discount cannot exceed total price'
        isValid = false
      }
      
      if (isValid) {
        this.addItem()
      }
    },
    
    validateTransactionAndProceed() {
      if (!this.hasTransactionItems) {
        this.showTransactionAlert = true
        this.showSnackbar('Please add at least one item to proceed', 'warning')
        return
      }
      
      this.goToStep('3')
    },
    
    goToStep(step) {
      this.step = step
      window.scrollTo(0, 0)
    },
    
    addItem() {
      this.$store.commit('ADD_TRANSACTION_ITEM', { ...this.newItem })
      
      // Reset new item
      this.newItem = {
        product: '',
        rate: 0,
        quantity: 0,
        discount: 0
      }
      
      this.showSnackbar('Item added to invoice', 'success')
    },
    
    removeItem(index) {
      this.$store.commit('REMOVE_TRANSACTION_ITEM', index)
      this.showSnackbar('Item removed from invoice', 'info')
    },
    
    confirmSaveInvoice() {
      this.confirmDialog = true
    },
    
    async saveInvoice() {
      this.confirmDialog = false
      try {
        await this.$store.dispatch('createInvoice')
        this.showSnackbar('Invoice saved successfully', 'success')
        this.$router.push('/invoices')
      } catch (error) {
        this.showSnackbar(`Failed to save invoice: ${error.message || 'Unknown error'}`, 'error')
      }
    },
    
    showSnackbar(text, color = 'success') {
      this.snackbarText = text
      this.snackbarColor = color
      this.snackbar = true
    }
  }
}
</script>

<style scoped>
/* Base styling with enhanced colors */
/* Base styling with enhanced colors */
/* Add this to your existing <style> section */

/* Animated background */
/* Base styling with enhanced colors */
.create-invoice {
  background: linear-gradient(-45deg, #d7f1d6, #e6f4f0, #dbf4dd, #ceffde);
  background-size: 400% 400%;
  animation: gradient-animation 15s ease infinite;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Add floating elements for extra visual interest */
.create-invoice::before,
.create-invoice::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.create-invoice::before {
  top: -150px;
  right: -100px;
  animation: float-circle-1 20s infinite linear;
}

.create-invoice::after {
  bottom: -150px;
  left: -100px;
  animation: float-circle-2 15s infinite linear;
}

@keyframes float-circle-1 {
  0% { transform: rotate(0deg) translateY(0) scale(1); }
  33% { transform: rotate(120deg) translateY(-50px) scale(1.2); }
  66% { transform: rotate(240deg) translateY(30px) scale(0.8); }
  100% { transform: rotate(360deg) translateY(0) scale(1); }
}

@keyframes float-circle-2 {
  0% { transform: rotate(0deg) translateY(0) scale(0.8); }
  33% { transform: rotate(-120deg) translateY(50px) scale(1.1); }
  66% { transform: rotate(-240deg) translateY(-30px) scale(0.9); }
  100% { transform: rotate(-360deg) translateY(0) scale(0.8); }
}

/* Update content cards for better contrast with animated background */
.content-card {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Update header container for better integration with the animated background */
.header-container {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Enhance stepper container transparency */
.stepper-container .elevated-stepper {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
}

/* Add glowing effect to buttons */
.pulse-button, .next-button-nav, .done-button {
  background: linear-gradient(135deg, #067346, #066a45);
  box-shadow: 0 4px 12px rgba(63, 181, 136, 0.5), 0 0 20px rgba(25, 158, 111, 0.3);
  animation: button-glow 3s infinite alternate;
}

/* Input Fields Animation and Styling - FIXED */
.animated-field {
  transition: all 0.3s ease;
  border-radius: 8px !important;
  overflow: visible; /* Changed from hidden to visible */
  position: relative; /* Add this to create a new stacking context */
}

.animated-field:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Fixed field styling to ensure placeholder visibility */
:deep(.v-field) {
  border-radius: 8px !important;
  background-color: rgba(255, 255, 255, 0.95) !important; /* Increased opacity */
  transition: all 0.3s ease;
  /* Removed backdrop-filter that was causing issues */
}

:deep(.v-field:hover) {
  background-color: rgba(255, 255, 255, 1) !important;
}

:deep(.v-field__outline) {
  border-color: rgba(60, 180, 140, 0.4) !important;
}

:deep(.v-field--focused .v-field__outline) {
  border-color: #3cb48c !important;
  border-width: 2px !important;
}

/* Fixed label positioning and visibility */
:deep(.v-label) {
  font-weight: 500;
  color: #555;
  z-index: 3; /* Ensure label appears above background */
  background-color: transparent;
  position: relative;
}

/* Ensure proper visibility when floating/active */
:deep(.v-field--active .v-label), 
:deep(.v-field--focused .v-label) {
  transform: translateY(-22px) scale(0.75);
  color: #3cb48c !important;
  background-color: transparent;
}

/* Ensure input text is always visible */
:deep(.v-field__input) {
  position: relative;
  z-index: 2;
}

:deep(.v-field__field) {
  position: relative;
  z-index: 1;
}

:deep(.v-field__prepend-inner) {
  padding-right: 8px;
  color: #3cb48c;
  z-index: 2;
}

/* Form Section Styling */
.section-title {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #3cb48c;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  width: 50%;
  height: 3px;
  bottom: -3px;
  left: 25%;
  background: linear-gradient(90deg, transparent, #3cb48c, transparent);
}

.content-card {
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.content-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #3cb48c, #6ee696);
}

/* Form Container with Improved Visual Depth */
.content-perspective-wrapper {
  perspective: 1000px;
  padding: 1rem 0 2rem;
}

.content-card {
  transform-style: preserve-3d;
  transform: rotateX(2deg);
  backface-visibility: hidden;
}

/* Stepper Enhancements */
.stepper-container {
  margin-bottom: 2rem;
}

.elevated-stepper {
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

:deep(.v-stepper-header) {
  box-shadow: none !important;
}

:deep(.v-stepper-item) {
  transition: all 0.3s ease;
}

:deep(.v-stepper-item--selected) {
  background-color: rgba(60, 180, 140, 0.1);
}

:deep(.v-stepper-item--selected .v-stepper-item__content) {
  color: #3cb48c;
  font-weight: 600;
}

.stepper-icon {
  color: #3cb48c !important;
}

/* Button animations and styling */
.back-button-nav, .next-button-nav, .done-button {
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.back-button-nav:hover, .next-button-nav:hover, .done-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.pulse-button {
  position: relative;
  overflow: hidden;
}

.pulse-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: transform 0.6s, opacity 0.6s;
}

.pulse-button:hover::after {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

/* Add light hover effect for mobile fields */
.mobile-add-form {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.mobile-add-form:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* Table styling enhancements */
.animated-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
}

:deep(.v-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.v-table .v-table__wrapper) {
  border-radius: 8px;
}

:deep(.v-table th) {
  background-color: rgba(60, 180, 140, 0.1);
  color: #2c3e50;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  padding: 10px 16px;
}

:deep(.v-table tr) {
  transition: all 0.2s ease;
}

:deep(.v-table tr:hover) {
  background-color: rgba(60, 180, 140, 0.05);
}

/* Card item styling (mobile view) */
.card-item {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  transition: all 0.3s ease;
  border-left: 4px solid #3cb48c;
}

.card-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* Form transitions */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Item animations */
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Notification styling */
.animated-snackbar {
  border-radius: 8px;
  font-weight: 500;
}

/* Preview container */
.preview-container {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
}

.preview-container:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
}

/* Dialog enhancements */
.dialog-card {
  border-radius: 16px;
  overflow: hidden;
}

.dialog-title {
  background-color: rgba(60, 180, 140, 0.1);
  color: #2c3e50;
  padding: 1.5rem 1.5rem 1rem;
}

.dialog-text {
  padding: 1.5rem;
  font-size: 1.1rem;
}

.dialog-button {
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.5px;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem 1rem;
}

.save-button {
  position: relative;
  overflow: hidden;
  color: #3cb48c;
}

.save-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(60, 180, 140, 0.1), 
    rgba(60, 180, 140, 0.2), 
    rgba(60, 180, 140, 0.1));
  transition: all 0.6s ease;
}

.save-button:hover::before {
  left: 100%;
}

/* Modern page header */
.page-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.back-button {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateX(-2px);
}

@keyframes button-glow {
  0% { box-shadow: 0 4px 12px rgba(53, 219, 199, 0.5), 0 0 20px rgba(51, 207, 171, 0.3); }
  100% { box-shadow: 0 4px 12px rgba(52, 137, 121, 0.5), 0 0 30px rgba(120, 244, 244, 0.6); }
}
</style>