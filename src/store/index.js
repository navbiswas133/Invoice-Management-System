// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    invoices: [],
    currentInvoice: {
      invoiceDetails: {
        companyName: 'Company Name',
        invoiceNumber: '',
        date: '',
        customerName: '',
        customerMobile: '',
        customerEmail: '',
        customerAddress: ''
      },
      transactionDetails: [],
      total: 0
    },
    snackbar: {
      show: false,
      text: '',
      color: 'info'
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user
    },
    getCurrentInvoice(state) {
      return state.currentInvoice
    },
    getInvoices(state) {
      return state.invoices
    },
    getUserGeneratedCount(state) {
      return state.invoices.filter(invoice => invoice.generatedBy === 'User').length
    },
    getPanelGeneratedCount(state) {
      return state.invoices.filter(invoice => invoice.generatedBy === 'Panel').length
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    LOGOUT(state) {
      state.user = null
      localStorage.removeItem('user')
    },
    SET_INVOICES(state, invoices) {
      state.invoices = invoices
    },
    ADD_INVOICE(state, invoice) {
      state.invoices.unshift(invoice)
    },
    UPDATE_INVOICE_IN_LIST(state, updatedInvoice) {
      const index = state.invoices.findIndex(inv => inv.id === updatedInvoice.id)
      if (index !== -1) {
        state.invoices.splice(index, 1, updatedInvoice)
      }
    },
    SET_CURRENT_INVOICE(state, invoice) {
      state.currentInvoice = invoice
    },
    CLEAR_CURRENT_INVOICE(state) {
      state.currentInvoice = null
    },
    UPDATE_INVOICE_DETAILS(state, details) {
      state.currentInvoice.invoiceDetails = details
    },
    ADD_TRANSACTION_ITEM(state, item) {
      state.currentInvoice.transactionDetails.push(item)
      state.currentInvoice.total = state.currentInvoice.transactionDetails.reduce(
        (total, item) => total + ((item.rate * item.quantity) - item.discount), 0
      )
    },
    REMOVE_TRANSACTION_ITEM(state, index) {
      state.currentInvoice.transactionDetails.splice(index, 1)
      state.currentInvoice.total = state.currentInvoice.transactionDetails.reduce(
        (total, item) => total + ((item.rate * item.quantity) - item.discount), 0
      )
    },
    RESET_CURRENT_INVOICE(state) {
      state.currentInvoice = {
        invoiceDetails: {
          companyName: 'Company Name',
          invoiceNumber: `#${Math.floor(1000000 + Math.random() * 9000000)}`,
          date: new Date().toLocaleDateString('en-GB'),
          customerName: '',
          customerMobile: '',
          customerEmail: '',
          customerAddress: ''
        },
        transactionDetails: [],
        total: 0
      }
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar
    }
  },
  actions: {
    login({ commit }, credentials) {
      // In a real app, this would be an API call
      return new Promise((resolve) => {
        // Simulate API response
        const user = { email: credentials.email }
        commit('SET_USER', user)
        resolve(user)
      })
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    fetchInvoices({ commit }) {
      // In a real app, this would be an API call
      // For now, we'll simulate data from the images
      const dummyInvoices = [
        {
          id: 2,
          initiatedOn: '05 Mar 2022 07:30 AM',
          generatedBy: 'User',
          customerName: 'Akhilesh Dewangan',
          customerMobile: '9877745789'
        },
        {
          id: 1,
          initiatedOn: '04 Mar 2022 05:37 PM',
          generatedBy: 'Panel',
          customerName: 'Narayan Dewangan',
          customerMobile: '9879789765'
        }
      ]
      
      // Important: Check localStorage for any saved invoices
      const savedInvoices = JSON.parse(localStorage.getItem('invoices')) || []
      const allInvoices = [...savedInvoices, ...dummyInvoices.filter(di => 
        !savedInvoices.some(si => si.id === di.id)
      )]
      
      commit('SET_INVOICES', allInvoices)
      return allInvoices
    },
    createInvoice({ commit, state }) {
      const newInvoice = {
        id: state.invoices.length > 0 ? Math.max(...state.invoices.map(i => i.id)) + 1 : 1,
        initiatedOn: new Date().toLocaleString(),
        generatedBy: 'User',
        // Extract these properties from invoiceDetails
        customerName: state.currentInvoice.invoiceDetails.customerName,
        customerMobile: state.currentInvoice.invoiceDetails.customerMobile,
        // Include the rest of the current invoice
        ...state.currentInvoice
      }
      
      // Rest of the code remains the same
      commit('ADD_INVOICE', newInvoice)
      // ...
    
      
      // Save to localStorage for persistence
      const savedInvoices = JSON.parse(localStorage.getItem('invoices')) || []
      savedInvoices.unshift(newInvoice)
      localStorage.setItem('invoices', JSON.stringify(savedInvoices))
      
      commit('RESET_CURRENT_INVOICE')
      return newInvoice
    },
    updateInvoice({ commit, state }, id) {
      // Create updated invoice object with current data
      const updatedInvoice = {
        ...state.currentInvoice,
        id: id,
        // Keep original initiatedOn and generatedBy if they exist
        initiatedOn: state.currentInvoice.initiatedOn || new Date().toLocaleString(),
        generatedBy: state.currentInvoice.generatedBy || 'User'
      }
      
      // Update in store
      commit('UPDATE_INVOICE_IN_LIST', updatedInvoice)
      
      // Update in localStorage
      const savedInvoices = JSON.parse(localStorage.getItem('invoices')) || []
      const index = savedInvoices.findIndex(inv => inv.id === id)
      if (index !== -1) {
        savedInvoices.splice(index, 1, updatedInvoice)
      } else {
        savedInvoices.unshift(updatedInvoice)
      }
      localStorage.setItem('invoices', JSON.stringify(savedInvoices))
      
      return updatedInvoice
    },
    deleteInvoice({ commit, state }, id) {
      const updatedInvoices = state.invoices.filter(invoice => invoice.id !== id)
      commit('SET_INVOICES', updatedInvoices)
      
      // Update localStorage
      const savedInvoices = JSON.parse(localStorage.getItem('invoices')) || []
      const filteredSavedInvoices = savedInvoices.filter(invoice => invoice.id !== id)
      localStorage.setItem('invoices', JSON.stringify(filteredSavedInvoices))
    }
  }
})