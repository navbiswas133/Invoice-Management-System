<template>
    <v-app>
      <!-- Mobile header with menu button -->
      <v-app-bar v-if="isMobile" color="primary" elevation="2" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="pulse-icon"></v-app-bar-nav-icon>
        <v-app-bar-title class="ml-2">
          <img src="@/assets/logo.png" alt="Code Nicely Logo" height="30" class="logo-bounce" />
        </v-app-bar-title>
      </v-app-bar>
  
      <!-- Responsive navigation drawer with gradient background -->
      <v-navigation-drawer
        v-model="drawer"
        :temporary="isMobile"
        :permanent="!isMobile"
        width="240"
        class="sidebar-gradient"
        :class="{'drawer-open': drawer}"
      >
        <div class="py-4 px-4 d-flex justify-center">
          <img src="@/assets/logo.png" alt="Code Nicely Logo" height="40" class="logo-bounce" />
        </div>
        
        <v-divider class="mx-4 mb-4" color="rgba(255,255,255,0.2)"></v-divider>
        
        <v-list class="sidebar-list pa-2">
          <v-list-item 
            title="Team" 
            prepend-icon="mdi-account-group"
            class="menu-item mb-2"
            rounded="lg"
            @mouseenter="hoveredItem = 'team'"
            @mouseleave="hoveredItem = null"
            :class="{'item-hovered': hoveredItem === 'team'}"
          ></v-list-item>
          
          <v-list-item 
            title="Invoice" 
            prepend-icon="mdi-file-document-outline"
            :active="true"
            color="accent"
            class="menu-item mb-2 active-item"
            rounded="lg"
            @mouseenter="hoveredItem = 'invoice'"
            @mouseleave="hoveredItem = null"
            :class="{'item-hovered': hoveredItem === 'invoice'}"
          ></v-list-item>
        </v-list>
        
        <v-spacer></v-spacer>
        
        <template v-slot:append>
          <div class="pa-4">
            <v-btn 
              block 
              color="error" 
              variant="elevated" 
              @click="logout"
              rounded="pill"
              elevation="4"
              class="logout-btn"
            >
              <v-icon left>mdi-logout</v-icon>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    
      <v-main>
        <v-container fluid class="pa-4">
          <slot></slot>
        </v-container>
      </v-main>
    </v-app>
  </template>
    
  <script>
  export default {
    name: 'MainLayout',
    data() {
      return {
        drawer: null,
        windowWidth: window.innerWidth,
        hoveredItem: null
      }
    },
    computed: {
      isMobile() {
        // Use direct window width measurement instead of relying on Vuetify
        return this.windowWidth < 960; // Standard md breakpoint
      }
    },
    created() {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.onResize);
    },
    methods: {
      onResize() {
        this.windowWidth = window.innerWidth;
        // Update drawer state when screen size changes
        this.drawer = !this.isMobile;
      },
      logout() {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
  </script>
  
  <style scoped>
  /* Gradient background for sidebar */
  .sidebar-gradient {
    background: linear-gradient(135deg, #099075, #6cd0d6) !important;
    color: white !important;
  }
  
  /* Menu item styling */
  .menu-item {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.85) !important;
  }
  
  .menu-item::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0;
    background-color: white;
    transition: width 0.3s ease;
  }
  
  .item-hovered::before {
    width: 100%;
  }
  
  .item-hovered {
    transform: translateX(5px);
    color: white !important;
    background: rgba(255, 255, 255, 0.15) !important;
  }
  
  .active-item {
    background: rgba(255, 255, 255, 0.25) !important;
    font-weight: bold !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
  
  /* Logo animation */
  .logo-bounce {
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-10px);}
    60% {transform: translateY(-5px);}
  }
  
  /* Drawer transition */
  .drawer-open {
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {transform: translateX(-100%);}
    to {transform: translateX(0);}
  }
  
  /* Pulse animation for mobile menu icon */
  .pulse-icon {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {opacity: 1;}
    50% {opacity: 0.6;}
    100% {opacity: 1;}
  }
  
  /* Logout button styles */
  .logout-btn {
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  
  .logout-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4) !important;
  }
  
  /* Smoother transitions */
  .v-list-item, .v-btn {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  }
  
  /* Make sure text is readable on gradient background */
  .v-list-item__title {
    font-weight: 500;
  }
  
  /* Sidebar list items container */
  .sidebar-list {
    background: transparent !important;
  }
  
  /* Mobile-specific styles */
  @media (max-width: 960px) {
    .sidebar-gradient {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3) !important;
    }
  }
  </style>