<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-grow flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative">
        <div class="text-center mb-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300 mb-3">
            <span>NEW OPERATIVE REGISTRATION</span>
          </div>
          <h1 class="font-display font-bold text-2xl text-white">Join The Overthinking Guild</h1>
          <p class="text-xs font-mono text-slate-400 mt-1">Start converting 2-letter messages into 10-page existential briefs</p>
        </div>

        <form @submit.prevent class="space-y-4 font-mono text-xs">
          <div>
            <label class="block text-slate-300 mb-1">CODENAME / ALIAS</label>
            <input 
              type="text" 
              placeholder="Overthinker_99" 
              class="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50"
            />
          </div>

          <div>
            <label class="block text-slate-300 mb-1">OPERATIVE EMAIL</label>
            <input 
              type="email" 
              placeholder="agent@overthink.engine" 
              class="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50"
            />
          </div>

          <div>
            <label class="block text-slate-300 mb-1">CREATE CIPHER (PASSWORD)</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              class="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50"
            />
          </div>

          <button 
            type="button" 
            @click="navigateTo('/dashboard')"
            class="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-700 hover:to-rose-600 text-white font-bold tracking-wider uppercase shadow-lg shadow-violet-950/40 transition-all"
          >
            CONFIRM INDUCTION →
          </button>
        </form>

        <div class="mt-6 pt-4 border-t border-white/5 text-center text-xs font-mono text-slate-400">
          Already compromised? 
          <NuxtLink to="/login" class="text-violet-400 hover:underline">Access Terminal Login</NuxtLink>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
// Signup route placeholder
</script>
