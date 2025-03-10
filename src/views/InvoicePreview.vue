<template>
  <div class="invoice-preview">
    <div class="d-flex flex-column pb-4 animate-fade-in">
      <!-- Header Section with animation -->
      <div class="header-section d-flex flex-column flex-sm-row justify-space-between mb-4">
        <h3 class="company-name mb-2 mb-sm-0">{{ invoiceDetails.companyName }}</h3>
        <div class="contact-info text-left text-sm-right animate-slide-in">
          <div>Mobile: +91-{{ invoiceDetails.customerMobile }}</div>
          <div>Email: {{ invoiceDetails.customerEmail || 'company.email@gmail.com' }}</div>
          <div>GSTIN: {{ invoiceDetails.gstin || '09AAACH7409R1ZZ' }}</div>
        </div>
      </div>
      
      <h2 class="invoice-title animate-pulse">Invoice</h2>
      
      <!-- Customer and Invoice Details with animation -->
      <div class="d-flex flex-column flex-sm-row justify-space-between my-4 animate-fade-in">
        <div class="customer-details mb-4 mb-sm-0 animate-slide-in">
          <h4 class="section-title">INVOICE TO:</h4>
          <div>Name: {{ invoiceDetails.customerName }}</div>
          <div>Mobile: +91-{{ invoiceDetails.customerMobile }}</div>
          <div>Email: {{ invoiceDetails.customerEmail }}</div>
          <div>Address: {{ invoiceDetails.customerAddress }}</div>
        </div>
        <div class="invoice-details text-left text-sm-right animate-slide-in-right">
          <div class="invoice-number text-h6">{{ invoiceDetails.invoiceNumber }}</div>
          <div>Date: {{ invoiceDetails.date }}</div>
        </div>
      </div>
      
      <!-- Items table - visible on larger screens with hover effects -->
      <div class="d-none d-sm-block animate-fade-in-up">
        <v-table dense class="my-4 items-table">
          <thead>
            <tr class="table-header">
              <th>Item</th>
              <th>Description</th>
              <th class="text-right">Quantity</th>
              <th class="text-right">Price</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoiceDetails.items" 
                :key="index" 
                class="table-row"
                :style="{ animationDelay: index * 0.1 + 's' }">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td class="text-right">{{ item.quantity }}</td>
              <td class="text-right">₹{{ item.price.toFixed(2) }}</td>
              <td class="text-right">₹{{ (item.quantity * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
      
      <!-- Mobile Card View - visible only on mobile with animation -->
      <div class="d-block d-sm-none">
        <v-card v-for="(item, index) in invoiceDetails.items" 
               :key="index" 
               class="mb-3 pa-3 item-card animate-zoom-in"
               :style="{ animationDelay: index * 0.15 + 's' }">
          <div class="text-subtitle-1 font-weight-bold">{{ item.name }}</div>
          <div class="text-body-2 mb-2">{{ item.description }}</div>
          <div class="d-flex justify-space-between">
            <span>Quantity:</span>
            <span>{{ item.quantity }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span>Price:</span>
            <span>₹{{ item.price.toFixed(2) }}</span>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex justify-space-between font-weight-bold">
            <span>Total:</span>
            <span class="item-total">₹{{ (item.quantity * item.price).toFixed(2) }}</span>
          </div>
        </v-card>
      </div>
      
      <!-- Totals with animation -->
      <div class="d-flex justify-end animate-fade-in">
        <div class="totals-container animate-slide-in-up">
          <div class="d-flex justify-space-between">
            <div>Subtotal:</div>
            <div>₹{{ calculateSubtotal().toFixed(2) }}</div>
          </div>
          <div class="d-flex justify-space-between">
            <div>Tax ({{ invoiceDetails.taxRate || 18 }}%):</div>
            <div>₹{{ calculateTax().toFixed(2) }}</div>
          </div>
          <div class="d-flex justify-space-between total-row">
            <div>Total:</div>
            <div class="grand-total">₹{{ calculateTotal().toFixed(2) }}</div>
          </div>
        </div>
      </div>
      
      <!-- Notes with animation -->
      <div class="mt-6 notes-section animate-fade-in">
        <h4 class="section-title">Notes:</h4>
        <p class="notes-text">{{ invoiceDetails.notes || 'Thank you for your business!' }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'InvoicePreview',
  data() {
    return {
      invoiceDetails: {
        companyName: 'Your Company Name',
        gstin: '09AAACH7409R1ZZ',
        invoiceNumber: 'INV-001',
        date: new Date().toLocaleDateString(),
        customerName: 'Customer Name',
        customerMobile: '9876543210',
        customerEmail: 'customer@example.com',
        customerAddress: 'Customer Address, City, State, PIN',
        taxRate: 18,
        items: [
          {
            name: 'Item 1',
            description: 'Description for Item 1',
            quantity: 2,
            price: 1000.00
          },
          {
            name: 'Item 2',
            description: 'Description for Item 2',
            quantity: 1,
            price: 500.00
          }
        ],
        notes: 'Payment is due within 15 days. Thank you for your business!'
      }
    }
  },
  methods: {
    calculateSubtotal() {
      return this.invoiceDetails.items.reduce((total, item) => {
        return total + (item.quantity * item.price);
      }, 0);
    },
    calculateTax() {
      const subtotal = this.calculateSubtotal();
      const taxRate = this.invoiceDetails.taxRate || 18;
      return subtotal * (taxRate / 100);
    },
    calculateTotal() {
      return this.calculateSubtotal() + this.calculateTax();
    }
  }
}
</script>
  
<style scoped>
.invoice-preview {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(145deg, #f5f7fa 0%, #e6eef8 100%);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

@media (min-width: 600px) {
  .invoice-preview {
    padding: 24px;
  }
}

.header-section {
  background-color: rgba(25, 118, 210, 0.05);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.company-name {
  color: #1976d2;
  font-weight: bold;
  font-size: 24px;
  position: relative;
  display: inline-block;
}

.company-name::after {
  content: '';
  position: absolute;
  width: 50%;
  height: 3px;
  bottom: -6px;
  left: 0;
  background: linear-gradient(90deg, #1976d2, #64b5f6);
  border-radius: 2px;
}

.invoice-title {
  text-align: center;
  margin: 24px 0;
  color: #1976d2;
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
}

.invoice-title::before,
.invoice-title::after {
  content: '★';
  color: #64b5f6;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.invoice-title::before {
  left: 20%;
}

.invoice-title::after {
  right: 20%;
}

.section-title {
  color: #1976d2;
  border-bottom: 2px solid #64b5f6;
  padding-bottom: 4px;
  margin-bottom: 12px;
  display: inline-block;
}

.customer-details, .invoice-details {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.invoice-number {
  color: #1976d2;
  font-weight: bold;
}

.items-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.table-header {
  background-color: #1976d2;
  color: white;
}

.table-header th {
  padding: 12px;
  font-weight: bold;
}

.table-row {
  transition: all 0.3s ease;
}

.table-row:hover {
  background-color: rgba(25, 118, 210, 0.1);
  transform: translateY(-2px);
}

.item-card {
  background: linear-gradient(145deg, #ffffff 0%, #f0f4f8 100%);
  border-left: 4px solid #1976d2;
  transition: all 0.3s ease;
}

.item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.item-total {
  color: #1976d2;
  font-weight: bold;
}

.totals-container {
  width: 100%;
  max-width: 300px;
  padding: 20px;
  border-top: 2px solid #1976d2;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.total-row {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #1976d2;
  font-weight: bold;
  font-size: 18px;
}

.grand-total {
  color: #1976d2;
  font-size: 20px;
}

.notes-section {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #64b5f6;
}

.notes-text {
  font-style: italic;
  color: #666;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-in-out;
}

.animate-slide-in {
  animation: slideInLeft 0.6s ease-in-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-in-out;
}

.animate-slide-in-up {
  animation: slideInUp 0.6s ease-in-out;
}

.animate-zoom-in {
  animation: zoomIn 0.5s ease-in-out;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.text-right {
  text-align: right;
}

@media (max-width: 599px) {
  .text-left {
    text-align: left;
  }
  
  .totals-container {
    max-width: 100%;
  }
  
  .invoice-title::before,
  .invoice-title::after {
    display: none;
  }
}

/* Responsive color adjustments */
@media (prefers-color-scheme: dark) {
  .invoice-preview {
    background: linear-gradient(145deg, #1e2732 0%, #101520 100%);
    color: #e0e0e0;
  }
  
  .header-section, .customer-details, .invoice-details, .notes-section {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .company-name, .invoice-title, .section-title {
    color: #64b5f6;
  }
  
  .totals-container {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .table-row:hover {
    background-color: rgba(100, 181, 246, 0.1);
  }
  
  .item-card {
    background: linear-gradient(145deg, #1e2732 0%, #2c3e50 100%);
  }
}
</style>