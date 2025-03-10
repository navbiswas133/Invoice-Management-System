<template>
    <v-app>
      <v-main>
        <v-container fluid class="fill-height pa-0 pa-sm-4">
          <v-row no-gutters align="center" justify="center" class="fill-height">
            <v-col cols="12" sm="10" md="8" lg="6" xl="4">
              <v-sheet 
                rounded="lg" 
                class="pa-4 pa-sm-6 mx-2 mx-sm-auto" 
                elevation="2"
              >
                <slot></slot>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
    
  <script>
  export default {
    name: 'AuthLayout',
    created() {
      // Apply mobile-specific meta tags
      this.setMobileViewport()
    },
    methods: {
      setMobileViewport() {
        // Ensure proper scaling on mobile devices
        const viewport = document.querySelector('meta[name=viewport]')
        if (viewport) {
          viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        } else {
          const meta = document.createElement('meta')
          meta.name = 'viewport'
          meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          document.head.appendChild(meta)
        }
      }
    }
  }
  </script>