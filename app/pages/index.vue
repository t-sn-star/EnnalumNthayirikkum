<template>
  <div class="flex flex-col min-h-screen selection:bg-[#6B1E32]/50 selection:text-[#E8C7B8] bg-[#0A0809]">
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
          class="pointer-events-none absolute -z-10 w-[480px] h-[320px] rounded-full blur-[130px] transition-all duration-300 opacity-60"
          :style="{
            background: 'radial-gradient(circle, rgba(107, 30, 50, 0.4) 0%, rgba(232, 199, 184, 0.15) 50%, transparent 80%)',
            transform: `translate(${mouseGlow.x}px, ${mouseGlow.y}px)`
          }"
        ></div>

        <!-- Floating Interactive Thought Chips (Playful & Clickable) -->
        <div class="relative z-10 flex flex-col items-center w-full">
          
          <!-- Dynamic Overthinking Popup when user clicks/hovers title elements -->
          <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
            <div 
              v-if="activeThought" 
              class="mb-6 px-4 py-2 rounded-2xl bg-[#1A1417]/95 border border-[#6B1E32]/60 text-xs font-mono text-[#E8C7B8] shadow-xl shadow-black/60 flex items-center gap-2.5 animate-bounce max-w-md mx-auto"
            >
              <span>💭</span>
              <span class="text-left font-sans text-xs text-[#F8F1EE]">{{ activeThought }}</span>
              <button @click="activeThought = ''" class="text-[#E8C7B8]/60 hover:text-white ml-2 text-xs">✕</button>
            </div>
          </transition>

          <!-- Main Brand Title: Sized properly so full 'EnnalumNthayirikkum..?' fits without clipping -->
          <h1 
            class="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#F8F1EE] leading-tight drop-shadow-2xl cursor-pointer group transition-all max-w-full"
            @click="triggerTitleThought"
            title="Click to overthink"
          >
            <span class="hover:text-[#E8C7B8] transition-colors">Ennalum</span><span class="bg-gradient-to-r from-[#E8C7B8] via-[#F8F1EE] to-[#A33350] bg-clip-text text-transparent group-hover:brightness-125 transition-all">Nthayirikkum</span><span class="text-[#6B1E32] group-hover:rotate-12 inline-block transition-transform duration-300">..?</span>
          </h1>

          <!-- Main Tagline with Interactive Word Triggers -->
          <div class="mt-6 sm:mt-8 max-w-3xl mx-auto px-2">
            <p class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#F8F1EE] tracking-tight leading-snug">
              “Because 
              <button 
                @mouseenter="hoverOk = true"
                @mouseleave="hoverOk = false"
                @click="triggerOkThought"
                class="relative inline-block text-[#E8C7B8] font-mono font-bold px-2 py-0.5 rounded-lg hover:bg-[#6B1E32]/30 transition-all cursor-pointer hover:scale-105 active:scale-95 border border-transparent hover:border-[#6B1E32]/50"
              >
                “ok”
                <!-- Simple Tooltip on Hover -->
                <span 
                  v-if="hoverOk"
                  class="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#6B1E32] text-[#F8F1EE] text-[11px] font-sans font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-30 border border-[#E8C7B8]/30"
                >
                  2 letters. 0 effort. Big problem.
                </span>
              </button> 
              was never just 
              <button 
                @mouseenter="hoverOkay = true"
                @mouseleave="hoverOkay = false"
                @click="triggerOkayThought"
                class="relative inline-block text-[#E8C7B8]/60 line-through decoration-[#6B1E32] decoration-2 px-2 py-0.5 rounded-lg hover:bg-[#1A1417] transition-all cursor-pointer hover:scale-105"
              >
                “okay”
                <span 
                  v-if="hoverOkay"
                  class="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1A1417] text-[#E8C7B8] text-[11px] font-sans font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-30 border border-[#E8C7B8]/20"
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
              class="px-3.5 py-1.5 rounded-full bg-[#1A1417]/90 hover:bg-[#6B1E32]/30 border border-[#E8C7B8]/15 hover:border-[#E8C7B8]/40 text-xs font-sans text-[#E8C7B8] hover:text-[#F8F1EE] transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
            >
              <span>{{ pill.emoji }}</span>
              <span class="ml-1.5 font-medium">{{ pill.text }}</span>
            </button>
          </div>

          <!-- Simple scroll indicator -->
          <a 
            href="#preview-section" 
            class="mt-10 inline-flex items-center gap-1.5 text-xs font-mono text-[#E8C7B8]/70 hover:text-[#E8C7B8] transition-colors group"
          >
            <span>SEE EXAMPLE BREAKDOWN</span>
            <span class="group-hover:translate-y-1 transition-transform">↓</span>
          </a>

        </div>

      </section>

      <!-- LIVE INTERACTIVE OVERTHINKING LAB -->
      <section id="preview-section" class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-16">
        
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6B1E32]/20 border border-[#6B1E32]/40 text-xs font-mono text-[#E8C7B8] mb-3">
            <span>✨ INTERACTIVE LAB</span>
          </div>
          <h2 class="font-display font-bold text-2xl sm:text-4xl text-[#F8F1EE] tracking-tight">
            The Anatomy of a Dry Text
          </h2>
          <p class="text-sm sm:text-base text-[#E8C7B8]/80 font-sans mt-2 max-w-lg mx-auto">
            Click into real texts and watch the unhinged theories branch in real-time.
          </p>
        </div>

        <!-- The Rich Interactive Workbench Component -->
        <AnalysisPreviewCard />

      </section>

      <!-- SIMPLE 3-STEP SPIRAL PROCESS (CLEAN, SIMPLE & FUNNY) -->
      <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8C7B8]/10">
        
        <div class="text-center mb-16">
          <span class="text-xs font-mono font-bold tracking-widest text-[#E8C7B8] uppercase">
            // HOW IT WORKS
          </span>
          <h2 class="font-display font-bold text-3xl sm:text-4xl text-[#F8F1EE] tracking-tight mt-2">
            From Dry Text to Full Spiral in 3 Steps
          </h2>
          <p class="text-sm sm:text-base text-[#E8C7B8]/80 font-sans mt-3 max-w-xl mx-auto">
            Because nobody sends "k" by accident. Here's how we diagnose the emotional damage.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Step 1 -->
          <div class="glass-card-interactive p-8 rounded-3xl border border-[#E8C7B8]/15 flex flex-col justify-between group hover:border-[#6B1E32] transition-all">
            <div>
              <div class="w-14 h-14 rounded-2xl bg-[#6B1E32]/30 border border-[#6B1E32]/60 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                💬
              </div>
              <div class="text-xs font-mono font-bold text-[#E8C7B8] uppercase tracking-wider mb-2">
                STEP 01
              </div>
              <h3 class="font-display font-bold text-xl text-[#F8F1EE] mb-3">
                Drop The Dry Text
              </h3>
              <p class="text-sm text-[#E8C7B8]/80 leading-relaxed font-sans">
                Upload a screenshot from WhatsApp/iMessage or type out that traumatic 2-letter "k", "fine.", or "Seen 2:14 AM".
              </p>
            </div>
            <div class="mt-8 pt-4 border-t border-[#E8C7B8]/10 text-xs font-mono text-[#E8C7B8]">
              SCREENSHOT OR TEXT READY →
            </div>
          </div>

          <!-- Step 2 -->
          <div class="glass-card-interactive p-8 rounded-3xl border border-[#6B1E32]/40 bg-[#1A1417]/80 flex flex-col justify-between group hover:border-[#E8C7B8]/40 transition-all shadow-xl shadow-[#6B1E32]/10">
            <div>
              <div class="w-14 h-14 rounded-2xl bg-[#6B1E32] text-white flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-[#6B1E32]/50">
                🤯
              </div>
              <div class="text-xs font-mono font-bold text-[#E8C7B8] uppercase tracking-wider mb-2">
                STEP 02
              </div>
              <h3 class="font-display font-bold text-xl text-[#F8F1EE] mb-3">
                We Spiral For You
              </h3>
              <p class="text-sm text-[#E8C7B8]/80 leading-relaxed font-sans">
                We calculate your dry text energy, scan for missing emoji hostility, and figure out exactly how cooked you are.
              </p>
            </div>
            <div class="mt-8 pt-4 border-t border-[#E8C7B8]/10 text-xs font-mono text-[#E8C7B8]">
              CALCULATING HOW COOKED YOU ARE →
            </div>
          </div>

          <!-- Step 3 -->
          <div class="glass-card-interactive p-8 rounded-3xl border border-[#E8C7B8]/15 flex flex-col justify-between group hover:border-[#6B1E32] transition-all">
            <div>
              <div class="w-14 h-14 rounded-2xl bg-[#6B1E32]/30 border border-[#6B1E32]/60 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                🔥
              </div>
              <div class="text-xs font-mono font-bold text-[#E8C7B8] uppercase tracking-wider mb-2">
                STEP 03
              </div>
              <h3 class="font-display font-bold text-xl text-[#F8F1EE] mb-3">
                Steal A Petty Comeback
              </h3>
              <p class="text-sm text-[#E8C7B8]/80 leading-relaxed font-sans">
                1-tap copy icy, unbothered, or completely chaotic clapbacks so you save face and stand on business.
              </p>
            </div>
            <div class="mt-8 pt-4 border-t border-[#E8C7B8]/10 text-xs font-mono text-[#E8C7B8]">
              1-CLICK CLIPBOARD COPY →
            </div>
          </div>

        </div>

      </section>

      <!-- MEMORABLE USER QUOTE -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-[#E8C7B8]/15 text-center relative overflow-hidden">
          <div class="text-[#6B1E32]/30 font-serif text-7xl leading-none select-none absolute top-4 left-6">“</div>
          <p class="text-lg sm:text-2xl font-display font-semibold text-[#F8F1EE] relative z-10 max-w-3xl mx-auto leading-relaxed">
            "My partner texted 'fine' at 8:00 PM. EnnalumNthayirikkum confirmed a 98.2% chance they were quietly moving to Scandinavia under an alias. 10/10 app."
          </p>
          <div class="mt-4 text-xs font-mono text-[#E8C7B8]">
            — Certified Chronically Anxious Texter, <span class="text-[#E8C7B8] font-bold">Tier III Overthinker</span>
          </div>
        </div>
      </section>

      <!-- BOTTOM BANNER -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div class="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#6B1E32]/30 via-[#1A1417] to-[#0A0809] border border-[#6B1E32]/40 relative overflow-hidden shadow-2xl shadow-[#6B1E32]/20">
          
          <div class="w-3 h-3 rounded-full bg-[#E8C7B8] animate-ping mx-auto mb-4"></div>
          
          <h2 class="font-display font-black text-3xl sm:text-5xl text-[#F8F1EE] tracking-tight">
            Ready To Ruin A Perfectly Peaceful Afternoon?
          </h2>
          
          <p class="text-[#E8C7B8]/80 text-sm sm:text-base font-sans mt-4 max-w-xl mx-auto">
            Input any harmless message. We'll uncover every single catastrophic theory your mind was secretly hoping for.
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
            <NuxtLink 
              to="/dashboard" 
              class="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6B1E32] to-[#85253E] hover:from-[#85253E] hover:to-[#A33350] text-[#F8F1EE] font-mono font-bold text-sm sm:text-base tracking-wider shadow-lg shadow-[#6B1E32]/50 hover:scale-105 active:scale-95 transition-all border border-[#E8C7B8]/30"
            >
              START OVERTHINKING NOW →
            </NuxtLink>
            
            <NuxtLink 
              to="/evidence" 
              class="px-6 py-4 rounded-2xl bg-[#1A1417] hover:bg-[#231B1F] text-[#E8C7B8] font-sans text-sm border border-[#E8C7B8]/20 transition-colors"
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

