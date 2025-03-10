<template>
    <div class="invoice-preview">
      <div class="d-flex flex-column pb-4">
        <div class="d-flex justify-space-between mb-4">
          <h3>{{ invoiceDetails.companyName }}</h3>
          <div class="text-right">
            <div>Mobile: +91-{{ invoiceDetails.customerMobile }}</div>
            <div>Email: {{ invoiceDetails.customerEmail || 'company.email@gmail.com' }}</div>
            <div>GSTIN: {{ invoiceDetails.gstin || '09AAACH7409R1ZZ' }}</div>
          </div>
        </div>
        
        <h2 class="invoice-title">Invoice</h2>
        <div class="d-flex justify-space-between my-4">
          <div>
            <h4>INVOICE TO:</h4>
            <div>Name: {{ invoiceDetails.customerName }}</div>
            <div>Mobile: +91-{{ invoiceDetails.customerMobile }}</div>
            <div>Email: {{ invoiceDetails.customerEmail }}</div>
            <div>Address: {{ invoiceDetails.customerAddress }}</div>
          </div>
          <div class="text-right">
            <div class="text-h6">{{ invoiceDetails.invoiceNumber }}</div>
            <div>Date: {{ invoiceDetails.date }}</div>
          </div>
        </div>
        
        <!-- Item Table -->
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoiceDetails.items" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.quantity }}</td>
              <td>₹{{ item.price.toFixed(2) }}</td>
              <td>₹{{ (item.quantity * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
        
        <!-- Totals Section -->
        <div class="d-flex justify-end mt-4">
          <div class="totals-section">
            <div class="d-flex justify-space-between">
              <div>Subtotal:</div>
              <div>₹{{ calculateSubtotal().toFixed(2) }}</div>
            </div>
            <div class="d-flex justify-space-between">
              <div>GST ({{ invoiceDetails.taxRate || 18 }}%):</div>
              <div>₹{{ calculateTax().toFixed(2) }}</div>
            </div>
            <div class="d-flex justify-space-between total-row">
              <div>Total:</div>
              <div>₹{{ calculateTotal().toFixed(2) }}</div>
            </div>
          </div>
        </div>
        
        <!-- Payment Terms -->
        <div class="mt-6">
          <h4>Payment Terms</h4>
          <p>{{ invoiceDetails.paymentTerms || 'Payment due within 15 days of invoice date.' }}</p>
        </div>
        
        <!-- Bank Details -->
        <div class="mt-4">
          <h4>Bank Details</h4>
          <div>Account Name: {{ invoiceDetails.bankName || 'Company Account' }}</div>
          <div>Account Number: {{ invoiceDetails.accountNumber || 'XXXXXXXXXXXX' }}</div>
          <div>IFSC Code: {{ invoiceDetails.ifscCode || 'XXXX0000000' }}</div>
        </div>
        
        <!-- Notes -->
        <div class="mt-4">
          <h4>Notes</h4>
          <p>{{ invoiceDetails.notes || 'Thank you for your business!' }}</p>
        </div>
        
        <!-- Footer -->
        <div class="text-center mt-8 pt-4 border-top">
          <p>{{ invoiceDetails.companyName }} | {{ invoiceDetails.companyAddress || 'Company Address' }}</p>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="d-flex justify-end mt-4">
        <v-btn color="primary" @click="printInvoice">Print</v-btn>
        <v-btn color="secondary" class="ml-2" @click="downloadPDF">Download PDF</v-btn>
        <v-btn v-if="canEdit" color="info" class="ml-2" @click="$router.push(`/invoices/edit/${invoiceDetails._id}`)">Edit</v-btn>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InvoicePreview',
    props: {
      invoiceDetails: {
        type: Object,
        required: true
      },
      canEdit: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      calculateSubtotal() {
        if (!this.invoiceDetails.items || this.invoiceDetails.items.length === 0) {
          return 0;
        }
        return this.invoiceDetails.items.reduce((total, item) => {
          return total + (item.quantity * item.price);
        }, 0);
      },
      calculateTax() {
        const taxRate = this.invoiceDetails.taxRate || 18;
        return this.calculateSubtotal() * (taxRate / 100);
      },
      calculateTotal() {
        return this.calculateSubtotal() + this.calculateTax();
      },
      printInvoice() {
        window.print();
      },
      downloadPDF() {
        // Implement PDF download functionality
        // You might want to use a library like jsPDF or html2pdf
        this.$emit('download-pdf');
      }
    }
  }
  </script>
  
  <style scoped>
  .invoice-preview {
    padding: 20px;
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .invoice-title {
    text-align: center;
    color: #333;
    margin: 10px 0;
  }
  
  .invoice-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .invoice-table th, .invoice-table td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: left;
  }
  
  .invoice-table th {
    background-color: #f5f5f5;
  }
  
  .totals-section {
    width: 300px;
    margin-top: 10px;
  }
  
  .total-row {
    font-weight: bold;
    font-size: 1.1em;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #ddd;
  }
  
  .border-top {
    border-top: 1px solid #ddd;
  }
  
  @media print {
    .v-btn {
      display: none;
    }
  }
  </style>