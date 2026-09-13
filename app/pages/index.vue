<template>
  <div class="flex flex-col min-h-screen selection:bg-rose-500/30 selection:text-rose-200">
    <!-- Navbar -->
    <Navbar />

    <main class="flex-grow">
      
      <!-- HERO SECTION: JUST THE TITLE & TAGLINE (CLEAN, SIMPLE WORDS & HIGHLY INTERACTIVE) -->
      <section 
        @mousemove="handleHeroMouseMove"
        class="relative min-h-[68vh] flex flex-col items-center justify-center pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center select-none"
      >
        
        <!-- Interactive Mouse Follower Glow Backdrop -->
        <div 
          class="pointer-events-none absolute -z-10 w-[450px] h-[300px] rounded-full blur-[130px] transition-all duration-300 opacity-50"
          :style="{
            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.25) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 80%)',
            transform: `translate(${mouseGlow.x}px, ${mouseGlow.y}px)`
          }"
        ></div>

        <!-- Floating Interactive Thought Chips (Playful & Clickable) -->
        <div class="relative z-10 flex flex-col items-center w-full">
          
          <!-- Dynamic Overthinking Popup when user clicks/hovers title elements -->
          <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
            <div 
              v-if="activeThought" 
              class="mb-6 px-4 py-2 rounded-2xl bg-obsidian-900/95 border border-rose-500/40 text-xs font-mono text-rose-300 shadow-xl shadow-black/50 flex items-center gap-2.5 animate-bounce max-w-md mx-auto"
            >
              <span>💭</span>
              <span class="text-left font-sans text-xs">{{ activeThought }}</span>
              <button @click="activeThought = ''" class="text-slate-500 hover:text-white ml-2 text-xs">✕</button>
            </div>
          </transition>

          <!-- Main Brand Title: Sized properly so full 'EnnalumNthayirikkum..?' fits without clipping -->
          <h1 
            class="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-tight drop-shadow-2xl cursor-pointer group transition-all max-w-full"
            @click="triggerTitleThought"
            title="Click to overthink"
          >
            <span class="hover:text-rose-200 transition-colors">Ennalum</span><span class="bg-gradient-to-r from-rose-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent group-hover:brightness-125 transition-all">Nthayirikkum</span><span class="text-rose-500 group-hover:rotate-12 inline-block transition-transform duration-300">..?</span>
          </h1>

          <!-- Main Tagline with Interactive Word Triggers -->
          <div class="mt-6 sm:mt-8 max-w-3xl mx-auto px-2">
            <p class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-slate-100 tracking-tight leading-snug">
              “Because 
              <button 
                @mouseenter="hoverOk = true"
                @mouseleave="hoverOk = false"
                @click="triggerOkThought"
                class="relative inline-block text-rose-400 font-mono font-bold px-1.5 py-0.5 rounded-lg hover:bg-rose-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                “ok”
                <!-- Simple Tooltip on Hover -->
                <span 
                  v-if="hoverOk"
                  class="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-rose-600 text-white text-[11px] font-sans font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-30"
                >
                  2 letters. 0 effort. Big problem.
                </span>
              </button> 
              was never just 
              <button 
                @mouseenter="hoverOkay = true"
                @mouseleave="hoverOkay = false"
                @click="triggerOkayThought"
                class="relative inline-block text-slate-400 line-through decoration-rose-500 decoration-2 px-1.5 py-0.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer hover:scale-105"
              >
                “okay”
                <span 
                  v-if="hoverOkay"
                  class="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-800 text-slate-200 text-[11px] font-sans font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-30 border border-white/10"
                >
                  Nobody writes full "okay" anymore.
                </span>
              </button>.”
            </p>
          </div>

          <!-- Simple Clickable Clues -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button 
              v-for="(pill, pIdx) in floatingPills" 
              :key="pIdx"
              @click="setQuickThought(pill.reaction)"
              class="px-3.5 py-1.5 rounded-full bg-obsidian-900/80 hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/40 text-xs font-sans text-slate-300 hover:text-rose-200 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
            >
              <span>{{ pill.emoji }}</span>
              <span class="ml-1.5 font-medium">{{ pill.text }}</span>
            </button>
          </div>

          <!-- Simple scroll indicator -->
          <a 
            href="#preview-section" 
            class="mt-10 inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors group"
          >
            <span>SEE EXAMPLE BREAKDOWN</span>
            <span class="group-hover:translate-y-1 transition-transform">↓</span>
          </a>

        </div>

      </section>

      <!-- LIVE INTERACTIVE AUTOPSY WORKBENCH -->
      <section id="preview-section" class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-16">
        
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300 mb-3">
            <span>INTERACTIVE LABORATORY</span>
          </div>
          <h2 class="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            The Anatomy of a Catastrophic Text
          </h2>
          <p class="text-sm sm:text-base text-slate-400 font-sans mt-2 max-w-lg mx-auto">
            Click into real text specimens and tweak the anxiety levels to watch theories branch in real-time.
          </p>
        </div>

        <!-- The Rich Interactive Workbench Component -->
        <AnalysisPreviewCard />

      </section>

      <!-- CORE FEATURES: TACTILE & WITTY -->
      <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        
        <div class="text-center mb-16">
          <span class="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
            // CORE TOOLKIT
          </span>
          <h2 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-2">
            Engineered For Pure Cognitive Spiral
          </h2>
          <p class="text-sm sm:text-base text-slate-400 font-sans mt-3 max-w-xl mx-auto">
            Everything you need to turn a 3-second read into 4 hours of intense philosophical deliberation.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Feature 1 -->
          <div class="glass-card-interactive p-7 rounded-3xl border border-white/5 flex flex-col justify-between group">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-xl font-mono text-rose-400 mb-5 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 class="font-display font-bold text-lg text-white mb-2">Micro-Punctuation Forensics</h3>
              <p class="text-sm text-slate-300 leading-relaxed font-sans">
                Missing a period? That's unresolved hostility. A stray comma? Passive-aggressive maneuvering. Every single byte is scanned for veiled malice.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-rose-400">
              CONFIDENCE: 99.4% FICTIONAL
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="glass-card-interactive p-7 rounded-3xl border border-white/5 flex flex-col justify-between group">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl font-mono text-violet-400 mb-5 group-hover:scale-110 transition-transform">
                🧠
              </div>
              <h3 class="font-display font-bold text-lg text-white mb-2">Multi-Track Doom Tree</h3>
              <p class="text-sm text-slate-300 leading-relaxed font-sans">
                Why settle for reality when you can generate 5 parallel catastrophic timelines? Branching theories ranging from "they hate you" to "they joined an offshore commune".
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-violet-400">
              PARALLEL REALITIES: 5 ACTIVE
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="glass-card-interactive p-7 rounded-3xl border border-white/5 flex flex-col justify-between group">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl font-mono text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 class="font-display font-bold text-lg text-white mb-2">Petty Clapback Generator</h3>
              <p class="text-sm text-slate-300 leading-relaxed font-sans">
                Armed counter-responses calibrated to match or surpass detected hostility. Generates clinical, icy, or completely unhinged replies with 1-click copy.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-emerald-400">
              PETTINESS SCORE: MAXIMUM
            </div>
          </div>

          <!-- Feature 4 -->
          <div class="glass-card-interactive p-7 rounded-3xl border border-white/5 flex flex-col justify-between group">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl font-mono text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 class="font-display font-bold text-lg text-white mb-2">Hyper-Precise Fake Metrics</h3>
              <p class="text-sm text-slate-300 leading-relaxed font-sans">
                Radar charts, latency histograms, and spectral sentiment waveforms that look so convincingly scientific your therapist would nod in agreement.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-cyan-400">
              0.00% ACTIONABLE ADVICE
            </div>
          </div>

          <!-- Feature 5 -->
          <div class="glass-card-interactive p-7 rounded-3xl border border-white/5 flex flex-col justify-between group">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl font-mono text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                🔍
              </div>
              <h3 class="font-display font-bold text-lg text-white mb-2">Evidence Screenshot Parser</h3>
              <p class="text-sm text-slate-300 leading-relaxed font-sans">
                Drop your WhatsApp, iMessage, or Instagram DM screenshots. We extract timestamps, battery levels, and typing bubble latency for full autopsy.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-amber-400">
              OCR EVIDENCE DROP
            </div>
          </div>

          <!-- Feature 6 -->
          <div class="glass-card-interactive p-7 rounded-3xl border border-white/5 flex flex-col justify-between group">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-xl font-mono text-rose-400 mb-5 group-hover:scale-110 transition-transform">
                📁
              </div>
              <h3 class="font-display font-bold text-lg text-white mb-2">Archived Incident Dossiers</h3>
              <p class="text-sm text-slate-300 leading-relaxed font-sans">
                Keep a personal ledger of every interaction you have overanalyzed. Compare red flag patterns across previous suspects over time.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-rose-400">
              SAVED TO CLOUD ARCHIVE
            </div>
          </div>

        </div>

      </section>

      <!-- MEMORABLE USER QUOTE -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center relative overflow-hidden">
          <div class="text-rose-500/15 font-serif text-7xl leading-none select-none absolute top-4 left-6">“</div>
          <p class="text-lg sm:text-2xl font-display font-semibold text-slate-100 relative z-10 max-w-3xl mx-auto leading-relaxed">
            "My partner texted 'fine' at 8:00 PM. EnnalumNthayirikkum confirmed an 89.2% chance they were quietly relocating to Scandinavia under an alias. 10/10 app."
          </p>
          <div class="mt-4 text-xs font-mono text-slate-400">
            — Certified Chronically Anxious Texter, <span class="text-rose-400 font-semibold">Tier III Overthinker</span>
          </div>
        </div>
      </section>

      <!-- BOTTOM BANNER -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div class="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-rose-950/30 via-obsidian-900 to-obsidian-950 border border-rose-500/30 relative overflow-hidden shadow-2xl shadow-rose-950/50">
          
          <div class="w-3 h-3 rounded-full bg-rose-500 animate-ping mx-auto mb-4"></div>
          
          <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Ready To Ruin A Perfectly Peaceful Afternoon?
          </h2>
          
          <p class="text-slate-400 text-sm sm:text-base font-sans mt-4 max-w-xl mx-auto">
            Input any harmless message. We'll uncover every single catastrophic theory your mind was secretly hoping for.
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
            <NuxtLink 
              to="/dashboard" 
              class="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-mono font-bold text-sm sm:text-base tracking-wider shadow-lg shadow-rose-900/40 hover:scale-105 active:scale-95 transition-all"
            >
              START OVERTHINKING NOW →
            </NuxtLink>
            
            <NuxtLink 
              to="/evidence" 
              class="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-sans text-sm border border-white/10 transition-colors"
            >
              Upload Chat Screenshot
            </NuxtLink>
          </div>

        </div>
      </section>

    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const activeThought = ref('')
const hoverOk = ref(false)
const hoverOkay = ref(false)

const mouseGlow = reactive({ x: 0, y: 0 })

const handleHeroMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseGlow.x = (e.clientX - rect.left - rect.width / 2) * 0.25
  mouseGlow.y = (e.clientY - rect.top - rect.height / 2) * 0.25
}

const titleThoughts = [
  'Malayalam: "Still, what could it really mean?"',
  'Notice the 2 dots instead of 3? That means suspense.',
  'Your brain right now: "They are definitely mad at me."',
  'Panic level: Making up 10 fake arguments in your head.'
]

const titleThoughtIndex = ref(0)

const triggerTitleThought = () => {
  activeThought.value = titleThoughts[titleThoughtIndex.value]
  titleThoughtIndex.value = (titleThoughtIndex.value + 1) % titleThoughts.length
}

const triggerOkThought = () => {
  activeThought.value = '"ok" = 2 letters. No smiley. 100% chance of anger.'
}

const triggerOkayThought = () => {
  activeThought.value = '"okay" = Normal people text. "ok" = Danger.'
}

const setQuickThought = (reaction: string) => {
  activeThought.value = reaction
}

const floatingPills = [
  { emoji: '🔍', text: 'No exclamation mark?', reaction: 'No exclamation mark = pure quiet anger.' },
  { emoji: '⏱️', text: 'Sent at 2:00 AM', reaction: 'Texted at 2 AM and immediately vanished.' },
  { emoji: '📱', text: 'Left on read', reaction: 'They saw it. They put the phone down and sighed.' },
  { emoji: '👀', text: 'Blue ticks on', reaction: 'Blue ticks turned on 10 minutes ago. Still no reply.' }
]
</script>

