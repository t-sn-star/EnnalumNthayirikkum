<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">// FORENSIC VAULT</span>
        </div>
        <h1 class="font-display font-bold text-3xl sm:text-4xl text-white">Evidence Screenshot Locker</h1>
        <p class="text-xs sm:text-sm font-mono text-slate-400 mt-1">Upload screenshots of WhatsApp chats, iMessages, or Instagram DMs for autopsy</p>
      </div>

      <!-- Upload Zone Mockup -->
      <div class="glass-panel p-10 sm:p-16 rounded-3xl border-2 border-dashed border-white/20 hover:border-rose-500/50 transition-all text-center flex flex-col items-center justify-center cursor-pointer group">
        <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:border-rose-500/40 transition-transform">
          📸
        </div>
        <h3 class="font-display font-bold text-lg text-white">Drop Screenshot Evidence Here</h3>
        <p class="text-xs font-mono text-slate-400 mt-2 max-w-md">
          PNG, JPG, or WEBP up to 25MB. We will dissect timestamps, battery status, and uncropped passive-aggressive subtext.
        </p>
        <div class="mt-6 flex gap-3">
          <button 
            type="button"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-950/40"
          >
            BROWSE FILES
          </button>
        </div>
      </div>

      <!-- Evidence Guidelines -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-slate-400">
        <div class="p-4 rounded-xl bg-obsidian-900 border border-white/5">
          <span class="text-rose-400 font-bold block mb-1">01. KEEP TIMESTAMPS</span>
          <p class="text-[11px] text-slate-500">Exact minutes and seconds are crucial for calculating micro-deliberation latency.</p>
        </div>
        <div class="p-4 rounded-xl bg-obsidian-900 border border-white/5">
          <span class="text-violet-400 font-bold block mb-1">02. CAPTURE SEEN TICKS</span>
          <p class="text-[11px] text-slate-500">Blue ticks vs grey ticks provide 94.2% of our existential threat calibration.</p>
        </div>
        <div class="p-4 rounded-xl bg-obsidian-900 border border-white/5">
          <span class="text-cyan-400 font-bold block mb-1">03. BATTERY % MATTERS</span>
          <p class="text-[11px] text-slate-500">Replying at 2% battery means true devotion; replying at 98% with "k" means total disdain.</p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
// Evidence page placeholder
</script>
