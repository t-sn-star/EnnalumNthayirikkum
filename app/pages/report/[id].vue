<template>
  <div class="flex flex-col min-h-screen selection:bg-wine/40 selection:text-champagne">
    <Navbar />

    <main class="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      
      <!-- Top Navigation -->
      <div class="flex items-center justify-between gap-4 mb-6">
        <NuxtLink 
          to="/evidence" 
          class="text-xs font-mono text-champagne/70 hover:text-warm flex items-center gap-1.5 transition-colors group"
        >
          <span class="group-hover:-translate-x-0.5 transition-transform">←</span>
          <span>TEST ANOTHER MESSAGE</span>
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="glass-panel-elevated p-12 sm:p-20 rounded-3xl border border-champagne/15 text-center flex flex-col items-center justify-center my-8 shadow-2xl shadow-luxury-950">
        <div class="relative w-20 h-20 mb-6 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-4 border-wine/30 border-t-wine animate-spin"></div>
          <span class="text-2xl animate-pulse">💀</span>
        </div>
        <h2 class="font-display font-bold text-2xl text-warm">Spiraling Over This Text...</h2>
        <p class="text-sm font-sans text-champagne/70 mt-2 max-w-md">
          Checking dry text energy, missing emojis, and calculating how cooked you are.
        </p>
      </div>

      <!-- Dynamic Report Content -->
      <div v-else-if="analysis" class="w-full glass-panel-elevated rounded-3xl p-5 sm:p-8 border border-champagne/15 relative overflow-hidden transition-all shadow-2xl shadow-luxury-950">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-champagne/10">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-wine animate-pulse"></span>
              <span class="text-xs font-mono font-bold tracking-wider text-champagne uppercase">
                THE OVERTHINKING BREAKDOWN 💀
              </span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-wine/20 text-champagne border border-wine/40">
                {{ analysis.severity }}
              </span>
            </div>
            <p class="text-xs font-sans text-champagne/60 mt-1">
              From: "{{ evidenceSuspect }}" • Timestamp: {{ analysis.time || '23:42' }}
            </p>
          </div>

          <div class="flex items-center gap-2 font-mono text-xs text-champagne bg-luxury-950/80 px-3 py-1.5 rounded-xl border border-champagne/10">
            <span class="w-2 h-2 rounded-full bg-wine"></span>
            <span>PANIC SCORE: <strong class="text-warm">{{ analysis.overthinkingScore }}</strong></span>
          </div>
        </div>

        <!-- Target Message / Evidence Bubble Inspection -->
        <div class="mt-6 p-5 sm:p-6 rounded-2xl bg-luxury-950/90 border border-champagne/10 relative">
          <div class="flex items-center justify-between text-xs font-mono text-champagne/60 mb-3">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-wine/30 text-champagne border border-wine/30 text-[10px] font-semibold tracking-wider">THE TEXT 💬</span>
            </div>
            <span class="text-champagne text-xs font-semibold font-mono">{{ analysis.subtextThreat }}</span>
          </div>

          <!-- If Screenshot Image is present -->
          <div v-if="evidenceImage" class="my-4 max-w-sm rounded-xl overflow-hidden border border-champagne/20">
            <img :src="evidenceImage" alt="Evidence Screenshot" class="w-full max-h-64 object-contain bg-black/50" />
          </div>

          <!-- Chat Message Visualizer -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
            <div class="flex items-end gap-3">
              <div class="relative bg-wine/40 border border-champagne/30 px-6 py-3.5 rounded-3xl rounded-bl-sm max-w-lg shadow-xl shadow-wine/20">
                <p class="text-2xl sm:text-3xl font-mono font-bold text-warm tracking-wide">
                  "{{ analysis.messageText }}"
                </p>
                <div class="flex items-center justify-end gap-1.5 mt-1.5 text-[11px] font-mono text-champagne">
                  <span>{{ analysis.time || '23:42' }}</span>
                  <span class="text-champagne font-bold">✓✓</span>
                </div>
              </div>

              <div class="text-xs font-sans text-champagne/70 max-w-sm leading-relaxed hidden md:block">
                <span class="text-champagne font-semibold font-mono">What It Actually Means:</span> {{ analysis.quickSummary }}
              </div>
            </div>
          </div>

          <div class="mt-4 p-3.5 rounded-xl bg-wine/20 border border-wine/40 text-xs font-sans text-champagne">
            <strong class="text-warm">The Real Tea ☕:</strong> {{ analysis.annotation }}
          </div>
        </div>

        <!-- Dynamic Metrics Cards Grid (Only Chance You're Cooked & Dry Text Energy) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div class="p-5 rounded-2xl bg-luxury-900/90 border border-wine/40 relative overflow-hidden group/metric hover:border-champagne/40 transition-colors">
            <span class="text-xs font-mono text-champagne/70 uppercase tracking-wider block">CHANCE YOU'RE COOKED</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl sm:text-4xl font-display font-black text-champagne">{{ analysis.chanceCooked || '96.8%' }}</span>
              <span class="text-[11px] font-mono text-champagne/60 font-bold">CALCULATED</span>
            </div>
            <div class="w-full bg-luxury-950 h-1.5 rounded-full mt-3 overflow-hidden border border-champagne/10">
              <div class="bg-gradient-to-r from-wine to-champagne h-full rounded-full transition-all duration-500" :style="{ width: analysis.chanceCooked || '96.8%' }"></div>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-luxury-900/90 border border-wine/40 relative overflow-hidden group/metric hover:border-champagne/40 transition-colors">
            <span class="text-xs font-mono text-champagne/70 uppercase tracking-wider block">DRY TEXT ENERGY</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl sm:text-4xl font-display font-black text-warm">{{ analysis.dryTextEnergy || '98.5%' }}</span>
              <span class="text-[11px] font-mono text-champagne/60 font-bold">ICED</span>
            </div>
            <div class="w-full bg-luxury-950 h-1.5 rounded-full mt-3 overflow-hidden border border-champagne/10">
              <div class="bg-champagne h-full rounded-full transition-all duration-500" :style="{ width: analysis.dryTextEnergy || '98.5%' }"></div>
            </div>
          </div>
        </div>

        <!-- Red Flags & Branching Theories Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          
          <!-- Detected Red Flags -->
          <div class="p-5 sm:p-6 rounded-2xl bg-luxury-900/70 border border-champagne/15 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-xs font-mono font-bold tracking-wider text-warm uppercase flex items-center gap-2">
                  <span class="text-wine">🚩</span> SPOTTED RED FLAGS ({{ analysis.flags?.length || 0 }})
                </h4>
                <span class="text-[10px] font-mono text-champagne/60">100% FACTUAL</span>
              </div>

              <div class="space-y-2.5">
                <div 
                  v-for="(flag, fIdx) in analysis.flags" 
                  :key="fIdx"
                  class="p-3 rounded-xl border text-xs flex items-start gap-3"
                  :class="flag.isGreen 
                    ? 'bg-champagne/10 border-champagne/30 text-champagne' 
                    : 'bg-wine/20 border-wine/40 text-warm'"
                >
                  <span class="shrink-0 font-mono font-bold mt-0.5">{{ flag.isGreen ? '🟩' : '🚩' }} 0{{ fIdx + 1 }}</span>
                  <div>
                    <strong :class="flag.isGreen ? 'text-champagne' : 'text-warm'" class="font-semibold block font-sans">{{ flag.title }}</strong>
                    <p class="text-champagne/70 text-[11px] mt-0.5 font-sans leading-relaxed">{{ flag.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Branching Hypotheses & Savage Clapbacks -->
          <div class="p-5 sm:p-6 rounded-2xl bg-luxury-900/70 border border-champagne/15 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-xs font-mono font-bold tracking-wider text-warm uppercase flex items-center gap-2">
                  <span class="text-champagne">⚡</span> UNHINGED THEORIES
                </h4>
                
                <div class="flex items-center gap-1 bg-luxury-950 p-1 rounded-xl border border-champagne/10">
                  <button 
                    v-for="(theory, tIdx) in analysis.theories" 
                    :key="tIdx"
                    @click="activeTheory = tIdx"
                    class="px-2.5 py-1 text-[10px] font-mono rounded-lg transition-colors font-bold"
                    :class="activeTheory === tIdx ? 'bg-wine text-warm shadow-sm' : 'text-champagne/60 hover:text-warm'"
                  >
                    THEORY {{ tIdx + 1 }}
                  </button>
                </div>
              </div>

              <!-- Active Theory -->
              <div class="p-4 rounded-xl bg-wine/15 border border-wine/40 mb-5">
                <div class="flex items-center justify-between text-xs font-mono text-champagne mb-1.5">
                  <span class="font-bold">{{ analysis.theories?.[activeTheory]?.title }}</span>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-wine/30 text-champagne font-bold border border-champagne/20">
                    {{ analysis.theories?.[activeTheory]?.probability }}
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-warm/90 leading-relaxed font-sans">
                  "{{ analysis.theories?.[activeTheory]?.description }}"
                </p>
              </div>
            </div>

            <!-- Savage Replies -->
            <div class="mt-4 pt-4 border-t border-champagne/10">
              <div class="flex items-center justify-between mb-2.5">
                <span class="text-[11px] font-mono font-semibold text-champagne/70 uppercase">PETTY COMEBACKS 🔥</span>
                <span class="text-[10px] font-mono text-champagne">TAP TO COPY</span>
              </div>

              <div class="space-y-2">
                <button 
                  v-for="(reply, rIdx) in analysis.savageReplies" 
                  :key="rIdx"
                  @click="copyReply(reply, rIdx)"
                  class="w-full text-left p-3 rounded-xl bg-luxury-950/60 hover:bg-wine/30 border border-champagne/10 hover:border-wine/50 text-xs font-mono text-warm flex items-center justify-between gap-3 transition-all group/btn active:scale-98"
                >
                  <span class="flex-grow text-warm font-medium break-words leading-relaxed">"{{ reply }}"</span>
                  <span class="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-wine/40 group-hover/btn:bg-wine group-hover/btn:text-warm text-champagne transition-all shrink-0 self-center font-bold border border-champagne/20">
                    {{ copiedIndex === rIdx ? '✓ COPIED' : 'COPY →' }}
                  </span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(true)
const analysis = ref<any>(null)
const activeTheory = ref(0)
const copiedIndex = ref<number | null>(null)
const evidenceImage = ref<string | null>(null)
const evidenceSuspect = ref('The Crush')
const isAiPowered = ref(false)

onMounted(async () => {
  let messageText = (route.query.msg as string) || ''
  let imageBase64: string | undefined

  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem('currentEvidence')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.message && !messageText) messageText = parsed.message
        if (parsed.imageBase64) {
          imageBase64 = parsed.imageBase64
          evidenceImage.value = parsed.imageBase64
        }
        if (parsed.suspect) evidenceSuspect.value = parsed.suspect
      }
    } catch (e) {
      console.warn('Could not read session storage:', e)
    }
  }

  try {
    const data: any = await $fetch('/api/analyze', {
      method: 'POST',
      body: {
        message: messageText,
        imageBase64,
        suspect: evidenceSuspect.value
      }
    })
    
    // Ensure the displayed text strictly matches what the user submitted
    if (messageText && data) {
      data.messageText = messageText
    }
    
    analysis.value = data
    isAiPowered.value = true
  } catch (err) {
    console.error('Failed to run AI analysis:', err)
  } finally {
    isLoading.value = false
  }
})

const copyReply = (text: string, index: number) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text)
    copiedIndex.value = index
    setTimeout(() => {
      if (copiedIndex.value === index) {
        copiedIndex.value = null
      }
    }, 2000)
  }
}
</script>

<style scoped>
/* Scoped styles */
</style>
