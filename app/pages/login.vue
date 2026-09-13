<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-grow flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative">
        <div class="text-center mb-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-300 mb-3">
            <span>TERMINAL ACCESS // LVL 1</span>
          </div>
          <h1 class="font-display font-bold text-2xl text-white">Forensic Investigator Login</h1>
          <p class="text-xs font-mono text-slate-400 mt-1">Authenticate to decrypt your overanalyzed chat dossiers</p>
        </div>

        <form @submit.prevent class="space-y-4 font-mono text-xs">
          <div>
            <label class="block text-slate-300 mb-1">OPERATIVE EMAIL</label>
            <input 
              type="email" 
              placeholder="anxious_texter@paranoia.net" 
              class="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50"
            />
          </div>

          <div>
            <label class="block text-slate-300 mb-1">SECURITY CIPHER</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              class="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50"
            />
          </div>

          <button 
            type="button" 
            @click="navigateTo('/dashboard')"
            class="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold tracking-wider uppercase shadow-lg shadow-rose-950/40 transition-all"
          >
            DECRYPT & ENTER →
          </button>
        </form>

        <div class="mt-6 pt-4 border-t border-white/5 text-center text-xs font-mono text-slate-400">
          No operative clearance? 
          <NuxtLink to="/signup" class="text-rose-400 hover:underline">Enroll in Paranoia Protocol</NuxtLink>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
// Login route placeholder
</script>
