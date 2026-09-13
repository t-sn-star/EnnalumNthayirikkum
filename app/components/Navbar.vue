<template>
  <header class="sticky top-0 z-50 w-full border-b border-[#E8C7B8]/10 bg-[#0A0809]/90 backdrop-blur-xl transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <NuxtLink to="/" class="group flex items-center gap-3">
        <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-[#6B1E32]/30 border border-[#6B1E32]/60 group-hover:border-[#E8C7B8]/60 transition-all duration-300 shadow-lg shadow-[#6B1E32]/30 group-hover:scale-105">
          <span class="font-mono text-lg font-black text-[#E8C7B8] group-hover:rotate-12 transition-transform duration-300">?¿</span>
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E8C7B8] rounded-full animate-ping opacity-75"></span>
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E8C7B8] rounded-full"></span>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="font-display font-black text-lg sm:text-xl tracking-tight text-[#F8F1EE] group-hover:text-[#E8C7B8] transition-colors">
              EnnalumNthayirikkum<span class="text-[#6B1E32]">..?</span>
            </span>
          </div>
          <span class="hidden sm:block text-[11px] font-sans text-[#E8C7B8]/70 font-medium">
            The Chronic Overthinker's Laboratory
          </span>
        </div>
      </NuxtLink>

      <!-- Center Interactive Mood State Widget (Clickable) -->
      <button 
        @click="cycleMood" 
        title="Click to toggle overthinking state"
        class="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#130E10] border border-[#E8C7B8]/15 hover:border-[#E8C7B8]/40 text-xs font-mono text-[#E8C7B8] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-inner shadow-black/40"
      >
        <span class="inline-block w-2 h-2 rounded-full" :class="currentMood.dotColor"></span>
        <span class="text-[#E8C7B8]/60">STATUS:</span>
        <span :class="currentMood.textColor" class="font-semibold">{{ currentMood.label }}</span>
        <span class="text-[10px] text-[#E8C7B8]/40 pl-1 border-l border-[#E8C7B8]/15">click to spiral</span>
      </button>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 sm:gap-4">
        <NuxtLink 
          to="/login" 
          class="text-xs sm:text-sm font-medium text-[#E8C7B8] hover:text-[#F8F1EE] px-3 py-2 rounded-xl hover:bg-white/5 transition-all font-sans"
        >
          Sign In
        </NuxtLink>

        <NuxtLink 
          to="/dashboard" 
          class="group relative inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#6B1E32] to-[#85253E] hover:from-[#85253E] hover:to-[#A33350] text-[#F8F1EE] shadow-lg shadow-[#6B1E32]/40 hover:shadow-[#6B1E32]/60 hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#E8C7B8]/30"
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
  { label: '99% PARANOIA', dotColor: 'bg-[#E8C7B8] animate-pulse', textColor: 'text-[#E8C7B8]' },
  { label: 'OVERANALYZING "OK"', dotColor: 'bg-[#C44D6D] animate-pulse', textColor: 'text-[#C44D6D]' },
  { label: 'LOOKING FOR HIDDEN MEANINGS', dotColor: 'bg-[#E8C7B8] animate-ping', textColor: 'text-[#E8C7B8]' },
  { label: 'PANICKING OVER A TEXT', dotColor: 'bg-[#A33350] animate-pulse', textColor: 'text-[#A33350]' }
]

const moodIndex = ref(0)
const currentMood = computed(() => moods[moodIndex.value])

const cycleMood = () => {
  moodIndex.value = (moodIndex.value + 1) % moods.length
}
</script>
