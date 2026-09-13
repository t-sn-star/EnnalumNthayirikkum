<template>
  <div class="flex flex-col min-h-screen selection:bg-wine/40 selection:text-champagne">
    <Navbar />

    <main class="flex-grow flex items-center justify-center px-4 py-12 sm:py-20">
      <div class="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-champagne/15 shadow-2xl bg-luxury-900/90 relative">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-12 h-12 rounded-2xl bg-wine/20 border border-wine/40 flex items-center justify-center text-xl mx-auto mb-4 text-champagne">
            ✨
          </div>
          <h1 class="font-display font-black text-2xl sm:text-3xl text-warm tracking-tight">
            Create an account
          </h1>
          <p class="text-xs sm:text-sm text-champagne/70 font-sans mt-1.5">
            Start saving your text analyses and conspiracy theories
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-champagne/80 mb-1.5 font-sans">Full name</label>
            <input 
              v-model="name"
              type="text" 
              required
              placeholder="Alex Smith" 
              class="w-full px-4 py-3 rounded-xl bg-luxury-950 border border-champagne/15 text-warm placeholder-champagne/30 focus:outline-none focus:border-champagne/50 text-sm font-sans transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-champagne/80 mb-1.5 font-sans">Email address</label>
            <input 
              v-model="email"
              type="email" 
              required
              placeholder="you@example.com" 
              class="w-full px-4 py-3 rounded-xl bg-luxury-950 border border-champagne/15 text-warm placeholder-champagne/30 focus:outline-none focus:border-champagne/50 text-sm font-sans transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-champagne/80 mb-1.5 font-sans">Password</label>
            <input 
              v-model="password"
              type="password" 
              required
              placeholder="Create a strong password" 
              class="w-full px-4 py-3 rounded-xl bg-luxury-950 border border-champagne/15 text-warm placeholder-champagne/30 focus:outline-none focus:border-champagne/50 text-sm font-sans transition-colors"
            />
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full py-3.5 rounded-xl bg-wine hover:bg-wine-hover border border-champagne/30 text-warm font-sans font-bold text-sm tracking-wide shadow-lg shadow-wine/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span v-if="isLoading" class="w-4 h-4 rounded-full border-2 border-champagne/30 border-t-champagne animate-spin"></span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <!-- Social signup divider -->
        <div class="relative my-6 text-center">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-champagne/10"></div>
          </div>
          <span class="relative px-3 bg-luxury-900 text-xs font-sans text-champagne/40">or sign up with</span>
        </div>

        <!-- Google button -->
        <button 
          type="button" 
          @click="handleSocialSignup"
          class="w-full py-2.5 px-4 rounded-xl bg-luxury-950 hover:bg-wine/20 border border-champagne/15 text-champagne/80 hover:text-warm font-sans text-xs font-semibold flex items-center justify-center gap-2.5 transition-all"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <!-- Switch to Login -->
        <div class="mt-6 pt-5 border-t border-champagne/10 text-center text-xs font-sans text-champagne/70">
          Already have an account? 
          <NuxtLink to="/login" class="text-champagne font-semibold hover:underline ml-1">Sign in</NuxtLink>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleSignup = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    router.push('/dashboard')
  }, 400)
}

const handleSocialSignup = () => {
  router.push('/dashboard')
}
</script>
