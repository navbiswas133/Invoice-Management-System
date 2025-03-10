<template>
  <div class="login-container">
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>
    
    <v-card class="login-card" elevation="10" :rounded="isMobile ? 'none' : 'xl'">
      <div class="card-content">
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="Code Nicely Logo" class="logo" />
        </div>
        
        <h2 class="text-center my-4 headline">Welcome Back!</h2>
        
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            class="mb-4 input-field"
            density="comfortable"
            prepend-inner-icon="mdi-email"
            :color="colors.primary"
          ></v-text-field>
          
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            class="mb-4 input-field"
            density="comfortable"
            prepend-inner-icon="mdi-lock"
            :color="colors.primary"
          ></v-text-field>
          
          <div class="remember-forgot">
            <v-checkbox
              label="Remember me"
              color="secondary"
              density="compact"
              hide-details
            ></v-checkbox>
            <a href="#" class="forgot-link">Forgot Password?</a>
          </div>
          
          <v-btn
            block
            :color="colors.primary"
            :size="isMobile ? 'large' : 'x-large'"
            type="submit"
            class="mt-4 login-btn"
            :class="{ 'py-4': !isMobile }"
            elevation="2"
          >
            Login
          </v-btn>
        </v-form>
        
        <div class="signup-section">
          <span>Don't have an account?</span>
          <a href="#" class="signup-link">Sign Up</a>
        </div>
        
        <div class="social-login">
          <div class="divider">
            <span>Or continue with</span>
          </div>
          <div class="social-buttons">
            <v-btn icon class="social-btn google" variant="outlined" elevation="1">
              <v-icon>mdi-google</v-icon>
            </v-btn>
            <v-btn icon class="social-btn facebook" variant="outlined" elevation="1">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon class="social-btn twitter" variant="outlined" elevation="1">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: 'sarah@gmail.com',
      password: '********',
      windowWidth: window.innerWidth,
      colors: {
        primary: '#6C63FF',
        secondary: '#FF6584',
        accent: '#43C6AC',
        background: '#F5F8FF'
      }
    }
  },
  computed: {
    isMobile() {
      return this.windowWidth < 600
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    document.body.style.backgroundColor = this.colors.background
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
    document.body.style.backgroundColor = ''
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
    async handleLogin() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/invoices')
      } catch (error) {
        console.error('Login failed:', error)
        // Handle login errors
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #F5F8FF 0%, #E7F0FF 100%);
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.background-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(10px);
  opacity: 0.7;
  animation: float 8s infinite ease-in-out;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #6C63FF, #43C6AC);
  top: -50px;
  right: -50px;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #FF6584, #FF9B7D);
  bottom: 100px;
  left: -50px;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #43C6AC, #00DBDE);
  bottom: -30px;
  right: 30%;
  animation-delay: 4s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  background: linear-gradient(45deg, #6C63FF, #6A5ACD);
  top: 30%;
  left: 10%;
  animation-delay: 6s;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

.login-card {
  width: 100%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 1;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.7);
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #6C63FF, #43C6AC, #FF6584);
}

.card-content {
  padding: clamp(1.5rem, 5vw, 3rem);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: clamp(1rem, 3vw, 2rem);
}

.logo {
  height: clamp(50px, 10vw, 80px);
  max-width: 100%;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.headline {
  font-weight: 700;
  color: #2A2A72;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
}

.input-field :deep(.v-field__outline) {
  border-color: rgba(108, 99, 255, 0.2);
}

.input-field:hover :deep(.v-field__outline) {
  border-color: rgba(108, 99, 255, 0.5);
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.forgot-link {
  color: #6C63FF;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

.forgot-link:hover {
  color: #FF6584;
  text-decoration: underline;
}

.login-btn {
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 8px;
  margin-top: 1.5rem;
  background: linear-gradient(45deg, #6C63FF, #43C6AC);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.login-btn:hover::before {
  left: 100%;
}

.signup-section {
  margin-top: 2rem;
  text-align: center;
  color: #555;
}

.signup-link {
  color: #FF6584;
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.5rem;
  transition: color 0.3s;
}

.signup-link:hover {
  color: #6C63FF;
  text-decoration: underline;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0 1.5rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.divider span {
  padding: 0 1rem;
  color: #777;
  font-size: 0.9rem;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.social-btn {
  width: 45px !important;
  height: 45px !important;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-btn.google {
  color: #EA4335;
  border-color: #EA4335 !important;
}

.social-btn.facebook {
  color: #1877F2;
  border-color: #1877F2 !important;
}

.social-btn.twitter {
  color: #1DA1F2;
  border-color: #1DA1F2 !important;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Media queries for responsive design */
@media screen and (max-width: 600px) {
  .login-card {
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: 100%;
    background: white;
  }
  
  .login-container {
    padding: 0;
  }
  
  .shape {
    opacity: 0.4;
  }
}

@media screen and (min-width: 601px) and (max-width: 960px) {
  .login-card {
    max-width: 80%;
  }
}

@media screen and (min-height: 1000px) {
  .logo {
    height: 90px;
  }
  
  .headline {
    font-size: 2.2rem;
    margin-top: 2rem !important;
    margin-bottom: 2.5rem !important;
  }
  
  .login-btn {
    padding: 1.2rem 0;
    font-size: 1.1rem;
  }
}
</style>