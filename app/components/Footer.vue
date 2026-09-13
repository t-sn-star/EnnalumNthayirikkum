<template>
  <footer class="mt-auto border-t border-[#E8C7B8]/10 bg-[#0A0809] text-[#E8C7B8]/80 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      
      <!-- Brand & Tagline -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left gap-2">
        <div class="flex items-center gap-2">
          <span class="font-display font-black text-[#F8F1EE] tracking-tight text-lg">EnnalumNthayirikkum<span class="text-[#6B1E32]">..?</span></span>
        </div>
        <p class="text-xs text-[#E8C7B8]/70 font-sans max-w-sm">
          Because “ok” was obviously never just “okay”. Made for chronically anxious texters who need answers.
        </p>
      </div>

      <!-- Navigation Links -->
      <div class="flex flex-wrap justify-center gap-6 text-xs font-sans">
        <NuxtLink to="/dashboard" class="text-[#E8C7B8]/70 hover:text-[#E8C7B8] transition-colors">Start Overthinking</NuxtLink>
        <NuxtLink to="/evidence" class="text-[#E8C7B8]/70 hover:text-[#E8C7B8] transition-colors">Upload Screenshot</NuxtLink>
        <NuxtLink to="/history" class="text-[#E8C7B8]/70 hover:text-[#E8C7B8] transition-colors">Saved Spirals</NuxtLink>
        <NuxtLink to="/login" class="text-[#E8C7B8]/70 hover:text-[#E8C7B8] transition-colors">Sign In</NuxtLink>
      </div>

    </div>

    <!-- Humor Notice -->
    <div class="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#E8C7B8]/10 text-center text-[11px] font-sans text-[#E8C7B8]/50">
      <p>
        A satirical psychological project. Not responsible for unprovoked 3 AM panic spirals or excessive double-texting.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer Component
</script>

