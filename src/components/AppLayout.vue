<template>
  <v-app>
    <!-- Mobile app bar that appears only on small screens -->
    <v-app-bar v-if="isMobile && isAuthenticated" color="white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <img src="@/assets/logo.png" alt="Code Nicely Logo" height="30" />
      </v-app-bar-title>
    </v-app-bar>

    <!-- Responsive navigation drawer -->
    <v-navigation-drawer
      v-if="isAuthenticated"
      v-model="drawer"
      :permanent="!isMobile"
      :temporary="isMobile"
      :rail="rail && !isMobile"
      :rail-width="56"
      @click="isMobile ? null : rail = !rail"
      color="white"
    >
      <div class="py-4 px-4 d-flex align-center">
        <img src="@/assets/logo.png" alt="Code Nicely Logo" height="40" />
      </div>
      
      <v-list nav>
        <v-list-item 
          title="Team" 
          prepend-icon="mdi-account-group"
          :prepend-icon-click:stop="isMobile ? null : () => rail = !rail"
        ></v-list-item>
        <v-list-item 
          title="Invoice" 
          prepend-icon="mdi-file-document-outline"
          :active="true"
          color="primary"
        ></v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" variant="outlined" @click="logout">
            {{ rail && !isMobile ? '' : 'Logout' }}
            <v-icon v-if="rail && !isMobile">mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  
    <v-main>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppLayout',
  data() {
    return {
      drawer: true,
      rail: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    isMobile() {
      return this.$vuetify.display.xs || this.$vuetify.display.sm
    }
  },
  mounted() {
    // Initialize drawer and rail mode based on screen size
    this.drawer = !this.isMobile
    this.rail = false
    
    // Add window resize listener
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    // Remove event listener to prevent memory leaks
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    onResize() {
      if (this.isMobile) {
        this.drawer = false
        this.rail = false
      } else {
        this.drawer = true
      }
    }
  }
}
</script>