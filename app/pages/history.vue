<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-mono text-violet-400 font-bold tracking-wider uppercase">// SPIRAL VAULT</span>
          </div>
          <h1 class="font-display font-bold text-3xl sm:text-4xl text-white">Past Overthinking Sessions</h1>
          <p class="text-xs sm:text-sm font-mono text-slate-400 mt-1">Every dry text, unanswered message, and ruined mood saved in one place.</p>
        </div>

        <NuxtLink 
          to="/dashboard"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-950/40"
        >
          + OVERTHINK A NEW TEXT
        </NuxtLink>
      </div>

      <!-- Case List Table/Cards -->
      <div class="space-y-3">
        <div 
          v-for="item in caseList" 
          :key="item.id"
          class="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-rose-500/30 transition-all"
        >
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-mono text-rose-400 text-xs font-bold shrink-0">
              #{{ item.id.slice(-3) }}
            </div>
            <div>
              <div class="flex items-center gap-2 text-xs font-mono">
                <span class="font-bold text-white font-mono text-base">"{{ item.text }}"</span>
                <span class="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-400">{{ item.date }}</span>
              </div>
              <p class="text-xs text-slate-400 mt-1 font-sans">{{ item.verdict }}</p>
            </div>
          </div>

          <div class="flex items-center gap-4 self-end md:self-auto shrink-0">
            <div class="text-right">
              <span class="text-[10px] font-mono text-slate-500 uppercase block">PANIC SCORE</span>
              <span class="text-sm font-mono font-bold text-rose-400">{{ item.score }}</span>
            </div>
            <NuxtLink 
              :to="`/report/${item.id}`"
              class="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 border border-white/10"
            >
              VIEW BREAKDOWN →
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const caseList = [
  {
    id: 'case-99214',
    text: 'ok',
    date: '10 mins ago',
    score: '97.4%',
    verdict: '2-character response classified as deliberate emotional embargo.'
  },
  {
    id: 'case-99215',
    text: 'Seen 3:14 AM',
    date: 'Yesterday',
    score: '99.8%',
    verdict: 'Calculated silence designed to trigger full sympathetic nervous breakdown.'
  },
  {
    id: 'case-99216',
    text: '👍',
    date: '2 days ago',
    score: '96.1%',
    verdict: 'Single yellow hand emoji with zero linguistic warmth.'
  },
  {
    id: 'case-99217',
    text: 'Haha.',
    date: '3 days ago',
    score: '98.5%',
    verdict: 'Period after laughter signals legal liability disclaimer.'
  }
]
</script>
