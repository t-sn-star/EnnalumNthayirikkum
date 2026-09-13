<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <!-- Dashboard Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/5">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span class="text-xs font-mono text-rose-400 font-bold tracking-wider uppercase">OVERTHINKING HEADQUARTERS</span>
          </div>
          <h1 class="font-display font-bold text-3xl sm:text-4xl text-white">The Overthinker's Lab</h1>
          <p class="text-xs sm:text-sm font-mono text-slate-400 mt-1">Turning innocent 2-letter texts into full-blown existential crises since forever.</p>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink 
            to="/evidence" 
            class="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            + UPLOAD SCREENSHOT 📸
          </NuxtLink>
          <NuxtLink 
            to="/history" 
            class="px-4 py-2.5 rounded-xl bg-obsidian-900 hover:bg-obsidian-850 text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            SAVED SPIRALS 📂
          </NuxtLink>
        </div>
      </div>

      <!-- Quick Analysis Launcher -->
      <div class="my-8 glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/20 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span>⚡</span> PASTE THE DRY TEXT 💬
          </h2>
          <span class="text-[11px] font-mono text-rose-400">VIBE: READY TO SPIRAL</span>
        </div>

        <div class="space-y-4">
          <textarea 
            v-model="inputMsg"
            rows="3"
            placeholder="Paste suspicious text (e.g. 'k', 'sure', 'fine.', 'Seen 2:14 AM')..."
            class="w-full p-4 rounded-2xl bg-obsidian-950/90 border border-white/10 text-white font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-rose-500/50"
          ></textarea>

          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2 text-xs font-sans text-slate-400">
              <span class="font-mono text-slate-500">WHO SENT IT:</span>
              <input 
                type="text" 
                v-model="suspectName"
                placeholder="Crush / Ex / Boss / Friend"
                class="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-white/5 text-white text-xs placeholder-slate-700 focus:outline-none"
              />
            </div>

            <button 
              type="button"
              @click="handleRunAnalysis"
              :disabled="!inputMsg.trim()"
              class="px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-lg"
              :class="inputMsg.trim() 
                ? 'bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white shadow-rose-950/50 hover:scale-105 active:scale-95 cursor-pointer' 
                : 'bg-white/5 text-slate-500 cursor-not-allowed opacity-60'"
            >
              OVERTHINK THIS TEXT →
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Case Files Grid -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            RECENT SPIRALS
          </h3>
          <NuxtLink to="/history" class="text-xs font-mono text-rose-400 hover:underline">VIEW ALL SPIRALS →</NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            v-for="item in recentCases" 
            :key="item.id"
            @click="openCase(item)"
            class="text-left glass-card-interactive p-5 rounded-2xl border border-white/5 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div class="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
                <span>SPIRAL #{{ item.id }}</span>
                <span class="text-rose-400 font-bold">{{ item.score }} PANIC</span>
              </div>
              <p class="font-mono text-white text-base font-semibold">"{{ item.text }}"</p>
              <p class="text-xs font-sans text-slate-400 mt-2 line-clamp-2">{{ item.verdict }}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>FROM: {{ item.suspect }}</span>
              <span class="text-rose-400 group-hover:underline">VIEW BREAKDOWN →</span>
            </div>
          </button>
        </div>
      </div>

    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const inputMsg = ref((route.query.msg as string) || '')
const suspectName = ref('The Crush')

const handleRunAnalysis = () => {
  const text = inputMsg.value.trim()
  if (!text) return

  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('currentEvidence', JSON.stringify({
        message: text,
        suspect: suspectName.value.trim() || 'The Crush'
      }))
    } catch (e) {
      console.warn('Storage error:', e)
    }
  }

  const caseId = 'case-' + Math.floor(10000 + Math.random() * 90000)
  router.push({
    path: `/report/${caseId}`,
    query: { msg: text }
  })
}

const openCase = (item: { id: string; text: string; suspect: string }) => {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('currentEvidence', JSON.stringify({
        message: item.text,
        suspect: item.suspect
      }))
    } catch (e) {
      console.warn('Storage error:', e)
    }
  }

  router.push({
    path: `/report/${item.id}`,
    query: { msg: item.text }
  })
}

const recentCases = [
  {
    id: 'case-99214',
    text: 'ok',
    score: '97.4%',
    suspect: 'The Crush',
    verdict: 'Lowercase rejection with 99.2% passive hostility index.'
  },
  {
    id: 'case-99215',
    text: 'Seen 3:14 AM',
    score: '99.8%',
    suspect: 'Situationship',
    verdict: 'Viewed in insomnia, ignored with calculated psychological malice.'
  },
  {
    id: 'case-99216',
    text: '👍',
    score: '96.1%',
    suspect: 'Manager',
    verdict: 'Corporate death sentence masquerading as affirmative gesture.'
  }
]
</script>
