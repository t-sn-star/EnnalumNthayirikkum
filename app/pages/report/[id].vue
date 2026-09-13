<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <!-- Top Dossier Navigation -->
      <div class="flex items-center justify-between gap-4 mb-6">
        <NuxtLink 
          to="/dashboard" 
          class="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span>←</span>
          <span>RETURN TO DASHBOARD</span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            DOSSIER ID: #{{ route.params.id }}
          </span>
          <span class="px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400 text-xs font-mono">
            EXPORT CLASSIFIED PDF
          </span>
        </div>
      </div>

      <!-- Main Dossier Title -->
      <div class="mb-8">
        <h1 class="font-display font-bold text-3xl sm:text-4xl text-white">
          Forensic Report for Specimen #{{ route.params.id }}
        </h1>
        <p class="text-xs sm:text-sm font-mono text-slate-400 mt-1">
          Linguistic Autopsy & Intent Deconstruction Generated with Zero Practical Utility
        </p>
      </div>

      <!-- Render the Analysis Preview Card -->
      <AnalysisPreviewCard />

    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
