<template>
  <header class="sticky top-0 z-50 w-full border-b border-white/5 bg-obsidian-950/85 backdrop-blur-xl transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <NuxtLink to="/" class="group flex items-center gap-3">
        <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500/20 via-violet-500/10 to-transparent border border-rose-500/30 group-hover:border-rose-500/70 transition-all duration-300 shadow-lg shadow-rose-950/40 group-hover:scale-105">
          <span class="font-mono text-lg font-black text-rose-400 group-hover:rotate-12 transition-transform duration-300">?¿</span>
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping opacity-75"></span>
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="font-display font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-rose-200 transition-colors">
              EnnalumNthayirikkum<span class="text-rose-500">..?</span>
            </span>
          </div>
          <span class="hidden sm:block text-[11px] font-sans text-slate-400 font-medium">
            The Chronic Overthinker's Laboratory
          </span>
        </div>
      </NuxtLink>

      <!-- Center Interactive Mood State Widget (Clickable) -->
      <button 
        @click="cycleMood" 
        title="Click to toggle overthinking state"
        class="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-900/90 border border-white/10 hover:border-rose-500/40 text-xs font-mono text-slate-300 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-inner shadow-black/40"
      >
        <span class="inline-block w-2 h-2 rounded-full" :class="currentMood.dotColor"></span>
        <span class="text-slate-400">STATUS:</span>
        <span :class="currentMood.textColor" class="font-semibold">{{ currentMood.label }}</span>
        <span class="text-[10px] text-slate-500 pl-1 border-l border-white/10">click to spiral</span>
      </button>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 sm:gap-4">
        <NuxtLink 
          to="/login" 
          class="text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-all font-sans"
        >
          Sign In
        </NuxtLink>

        <NuxtLink 
          to="/dashboard" 
          class="group relative inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-violet-600 text-white shadow-lg shadow-rose-950/50 hover:shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all border border-rose-400/30"
        >
          <span>Start Overthinking</span>
          <span class="ml-1.5 group-hover:translate-x-0.5 transition-transform">→</span>
        </NuxtLink>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const moods = [
  { label: '99% PARANOIA', dotColor: 'bg-emerald-400 animate-pulse', textColor: 'text-emerald-400' },
  { label: 'OVERANALYZING "OK"', dotColor: 'bg-amber-400 animate-pulse', textColor: 'text-amber-400' },
  { label: 'LOOKING FOR HIDDEN MEANINGS', dotColor: 'bg-rose-400 animate-ping', textColor: 'text-rose-400' },
  { label: 'PANICKING OVER A TEXT', dotColor: 'bg-violet-400 animate-pulse', textColor: 'text-violet-400' }
]

const moodIndex = ref(0)
const currentMood = computed(() => moods[moodIndex.value])

const cycleMood = () => {
  moodIndex.value = (moodIndex.value + 1) % moods.length
}
</script>
