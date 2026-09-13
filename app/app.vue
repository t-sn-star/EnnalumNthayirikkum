<template>
  <div class="min-h-screen bg-obsidian-950 text-slate-100 selection:bg-rose-500/30 selection:text-rose-200 font-sans relative overflow-x-hidden">
    <!-- Ambient glowing backdrop effect -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-crimson-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute top-1/3 -left-40 w-[600px] h-[400px] bg-violet-500/8 rounded-full blur-[140px]"></div>
      <div class="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[130px]"></div>
      <div class="absolute inset-0 bg-grid-pattern opacity-40"></div>
    </div>

    <div class="relative z-10 flex flex-col min-h-screen">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
// Global App Entry
</script>
