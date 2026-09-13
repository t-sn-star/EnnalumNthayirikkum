<template>
  <div class="w-full glass-panel-elevated rounded-3xl p-5 sm:p-8 border border-champagne/15 relative overflow-hidden transition-all duration-300 shadow-2xl shadow-luxury-950">
    
    <!-- Top Interactive Specimen Picker -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-champagne/10">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-wine animate-pulse"></span>
          <span class="text-xs font-mono font-bold tracking-wider text-champagne uppercase">
            THE OVERTHINKING LAB 🔬
          </span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-wine/20 text-champagne border border-wine/40">
            {{ activeSpecimen.severity }}
          </span>
        </div>
        <p class="text-xs font-sans text-champagne/60 mt-1">Pick a dry text to watch us spiral over it:</p>
      </div>

      <!-- Specimen Selector Pills -->
      <div class="flex flex-wrap items-center gap-1.5 bg-luxury-950/80 p-1.5 rounded-2xl border border-champagne/10">
        <button 
          v-for="(specimen, idx) in specimens" 
          :key="specimen.id"
          @click="selectSpecimen(idx)"
          class="px-3 py-1.5 text-xs font-mono rounded-xl transition-all font-semibold"
          :class="currentSpecimenIndex === idx 
            ? 'bg-wine text-warm shadow-md shadow-wine/40 scale-105' 
            : 'text-champagne/60 hover:text-warm hover:bg-wine/20'"
        >
          "{{ specimen.text }}"
        </button>
      </div>
    </div>

    <!-- Target Chat Message Inspection Card -->
    <div class="mt-6 p-5 sm:p-6 rounded-2xl bg-luxury-950/90 border border-champagne/10 relative group/bubble">
      <div class="flex items-center justify-between text-xs font-mono text-champagne/60 mb-3">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded bg-wine/30 text-champagne border border-wine/30 text-[10px] font-semibold tracking-wider">THE TEXT 💬</span>
          <span class="text-champagne/60 font-mono">{{ activeSpecimen.timestamp }}</span>
        </div>
        <span class="text-champagne text-xs font-semibold font-mono">{{ activeSpecimen.subtextThreat }}</span>
      </div>

      <!-- Real Chat Message Visualizer -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
        <div class="flex items-end gap-3">
          <div 
            @click="inspectMessageWord"
            class="cursor-pointer group/msg relative bg-wine/40 hover:bg-wine/60 border border-champagne/30 hover:border-champagne/60 px-6 py-3.5 rounded-3xl rounded-bl-sm max-w-md shadow-xl shadow-wine/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <p class="text-2xl sm:text-3xl font-mono font-bold text-warm tracking-wide">
              "{{ activeSpecimen.text }}"
            </p>
            <div class="flex items-center justify-end gap-1.5 mt-1.5 text-[11px] font-mono text-champagne">
              <span>{{ activeSpecimen.time }}</span>
              <span class="text-champagne font-bold">✓✓</span>
            </div>
            
            <div class="absolute -top-2.5 -right-2.5 bg-wine text-warm border border-champagne/30 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold shadow-md animate-bounce">
              TAP TO DECODE
            </div>
          </div>

          <div class="text-xs font-sans text-champagne/70 max-w-xs leading-relaxed hidden md:block">
            <span class="text-champagne font-semibold font-mono">The real tea:</span> {{ activeSpecimen.quickSummary }}
          </div>
        </div>

        <!-- Paranoia Level Stepper -->
        <div class="flex flex-col gap-1.5 bg-luxury-900/90 p-3 rounded-2xl border border-champagne/10 shrink-0">
          <span class="text-[10px] font-mono text-champagne/60 uppercase tracking-wider">PANIC LEVEL</span>
          <div class="flex items-center gap-1">
            <button 
              v-for="lvl in [1, 2, 3]" 
              :key="lvl"
              @click="paranoiaLevel = lvl"
              class="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg transition-all"
              :class="paranoiaLevel === lvl 
                ? 'bg-wine text-warm shadow-sm shadow-wine/40' 
                : 'bg-luxury-950 text-champagne/40 hover:text-champagne border border-champagne/10'"
            >
              LVL {{ lvl }}
            </button>
          </div>
        </div>
      </div>

      <!-- Pop-open interactive note if clicked -->
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100">
        <div v-if="showEvidenceAnnotation" class="mt-4 p-3.5 rounded-xl bg-wine/20 border border-wine/40 text-xs font-sans text-champagne flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>☕</span>
            <span><strong class="text-warm">The Real Tea:</strong> {{ activeSpecimen.annotation }}</span>
          </div>
          <button @click="showEvidenceAnnotation = false" class="text-champagne/60 hover:text-warm text-sm px-2">✕</button>
        </div>
      </transition>
    </div>

    <!-- Core Dynamic Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      
      <div class="p-5 rounded-2xl bg-luxury-900/90 border border-wine/40 relative overflow-hidden group/metric hover:border-champagne/40 transition-colors">
        <span class="text-xs font-mono text-champagne/70 uppercase tracking-wider block">CHANCE YOU'RE COOKED</span>
        <div class="flex items-baseline gap-2 mt-1">
          <span class="text-3xl sm:text-4xl font-display font-black text-champagne">{{ activeMetrics.danger }}</span>
          <span class="text-[11px] font-mono text-champagne/60 font-bold">CALCULATED</span>
        </div>
        <div class="w-full bg-luxury-950 h-1.5 rounded-full mt-3 overflow-hidden border border-champagne/10">
          <div class="bg-gradient-to-r from-wine to-champagne h-full rounded-full transition-all duration-500" :style="{ width: activeMetrics.danger }"></div>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-luxury-900/90 border border-wine/40 relative overflow-hidden group/metric hover:border-champagne/40 transition-colors">
        <span class="text-xs font-mono text-champagne/70 uppercase tracking-wider block">DRY TEXT ENERGY</span>
        <div class="flex items-baseline gap-2 mt-1">
          <span class="text-3xl sm:text-4xl font-display font-black text-warm">{{ activeMetrics.hostility }}</span>
          <span class="text-[11px] font-mono text-champagne/60 font-bold">ICED</span>
        </div>
        <div class="w-full bg-luxury-950 h-1.5 rounded-full mt-3 overflow-hidden border border-champagne/10">
          <div class="bg-champagne h-full rounded-full transition-all duration-500" :style="{ width: activeMetrics.hostility }"></div>
        </div>
      </div>

    </div>

    <!-- Forensic Red Flags & Branching Hypotheses -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
      
      <!-- Red Flags Dissection -->
      <div class="p-5 sm:p-6 rounded-2xl bg-luxury-900/70 border border-champagne/15 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-xs font-mono font-bold tracking-wider text-warm uppercase flex items-center gap-2">
              <span class="text-wine">🚩</span> SPOTTED RED FLAGS ({{ activeSpecimen.flags.length }})
            </h4>
            <span class="text-[10px] font-mono text-champagne/60">100% FACTUAL</span>
          </div>

          <div class="space-y-2.5">
            <div 
              v-for="(flag, fIdx) in activeSpecimen.flags" 
              :key="fIdx"
              class="p-3 rounded-xl border text-xs flex items-start gap-3 transition-colors"
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

      <!-- Multi-Track Absurd Interpretations & Savage Replies -->
      <div class="p-5 sm:p-6 rounded-2xl bg-luxury-900/70 border border-champagne/15 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-xs font-mono font-bold tracking-wider text-warm uppercase flex items-center gap-2">
              <span class="text-champagne">⚡</span> UNHINGED THEORIES
            </h4>
            
            <!-- Theory Selector Tabs -->
            <div class="flex items-center gap-1 bg-luxury-950 p-1 rounded-xl border border-champagne/10">
              <button 
                v-for="(theory, tIdx) in activeSpecimen.theories" 
                :key="tIdx"
                @click="activeTheory = tIdx"
                class="px-2.5 py-1 text-[10px] font-mono rounded-lg transition-colors font-bold"
                :class="activeTheory === tIdx ? 'bg-wine text-warm shadow-sm' : 'text-champagne/60 hover:text-warm'"
              >
                THEORY {{ tIdx + 1 }}
              </button>
            </div>
          </div>

          <!-- Active Theory Card -->
          <div class="p-4 rounded-xl bg-wine/15 border border-wine/40 mb-5 transition-all">
            <div class="flex items-center justify-between text-xs font-mono text-champagne mb-1.5">
              <span class="font-bold">{{ activeSpecimen.theories[activeTheory]?.title }}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-wine/30 text-champagne font-bold border border-champagne/20">
                {{ activeSpecimen.theories[activeTheory]?.probability }}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-warm/90 leading-relaxed font-sans">
              "{{ activeSpecimen.theories[activeTheory]?.description }}"
            </p>
          </div>
        </div>

        <!-- Recommended Savage Counter-Responses -->
        <div class="mt-4 pt-4 border-t border-champagne/10">
          <div class="flex items-center justify-between mb-2.5">
            <span class="text-[11px] font-mono font-semibold text-champagne/70 uppercase">PETTY COMEBACKS 🔥</span>
            <span class="text-[10px] font-mono text-champagne">TAP TO COPY</span>
          </div>

          <div class="space-y-2">
            <button 
              v-for="(reply, rIdx) in activeSpecimen.savageReplies" 
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

    <!-- Bottom Action Bar -->
    <div class="mt-6 pt-5 border-t border-champagne/10 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-2 text-xs font-sans text-champagne/60">
        <span class="w-2 h-2 rounded-full bg-champagne"></span>
        <span>Have an even more traumatizing text?</span>
      </div>

      <NuxtLink 
        to="/dashboard" 
        class="inline-flex items-center gap-2 text-xs font-mono font-bold text-warm bg-wine hover:bg-wine-hover border border-champagne/30 px-4 py-2.5 rounded-xl shadow-lg shadow-wine/30 hover:scale-105 active:scale-95 transition-all"
      >
        <span>OVERTHINK YOUR OWN MESSAGE</span>
        <span>→</span>
      </NuxtLink>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentSpecimenIndex = ref(0)
const activeTheory = ref(0)
const paranoiaLevel = ref(3)
const showEvidenceAnnotation = ref(false)
const copiedIndex = ref<number | null>(null)

const specimens = [
  {
    id: 'ok',
    text: 'ok',
    time: '23:42',
    timestamp: '23:42:19 (Read: 23:42:20)',
    severity: '98% CRITICAL SPIRAL',
    subtextThreat: 'LENGTH: 2 CHARS (LETHAL)',
    quickSummary: 'Deliberate withholding of capitalization and enthusiasm.',
    annotation: 'Missing the capital "O" proves they did not want to press the Shift key for you. Missing period creates an infinite emotional void.',
    baseMetrics: { overthinking: 97.4, danger: 94.2, hostility: 98.0, spiralHours: 4.5 },
    flags: [
      {
        title: "Lowercase 'o' Detachment",
        desc: "Refusal to capitalize signals absolute emotional bankruptcy towards this interaction.",
        isGreen: false
      },
      {
        title: "Missing Period Malice",
        desc: "Omitting punctuation leaves the conversation in purgatory, signaling cold detachment.",
        isGreen: false
      },
      {
        title: "Solitary Green Flag",
        desc: "They at least didn't block you before hitting send.",
        isGreen: true
      }
    ],
    theories: [
      {
        title: 'THE SILENT GROUP CHAT SCREENSHOT',
        probability: '98.9% LIKELY',
        description: 'They took a deep sigh, screen-recorded your paragraph, and posted it to their private group chat captioned "What do I even say to this".'
      },
      {
        title: 'THE DELETED 500-WORD ESSAY',
        probability: '78.4% LIKELY',
        description: 'They originally poured out their deepest heartfelt sentiments, panicked, furiously hit backspace 400 times, and sent "ok".'
      },
      {
        title: 'THE COLD DISTANCE STRATEGY',
        probability: '91.2% LIKELY',
        description: 'A calculated maneuver recommended by an unhinged TikTok relationship guru to establish dominance.'
      }
    ],
    savageReplies: [
      'K.',
      'Did you run out of letters or is this your whole personality?',
      'Thanks for the enthusiastic novel, took me 3 hours to read.'
    ]
  },
  {
    id: 'seen',
    text: 'Seen 2:14 AM',
    time: '02:14',
    timestamp: '02:14:02 (0 Replies since)',
    severity: '99.9% EMERGENCY DOOM',
    subtextThreat: 'GHOSTED AT 2 AM',
    quickSummary: 'Opened during peak vulnerability hours, deliberately left on read.',
    annotation: 'Opening a message at 2:14 AM without replying requires deliberate thumb movement to dismiss the notification and continue scrolling.',
    baseMetrics: { overthinking: 99.8, danger: 98.6, hostility: 89.4, spiralHours: 8.0 },
    flags: [
      {
        title: "Vampiric Latency",
        desc: "Awake at 2 AM looking at glowing glass, but unable to type 3 words to save your sanity.",
        isGreen: false
      },
      {
        title: "Calculated Silence",
        desc: "They know the blue ticks turned on. They know you saw them turn on.",
        isGreen: false
      },
      {
        title: "Green Flag Anomaly",
        desc: "Their phone still has cellular reception and battery power.",
        isGreen: true
      }
    ],
    theories: [
      {
        title: 'THE SLEEP-OPEN ACCIDENT',
        probability: '21.0% CHANCE',
        description: 'They dropped their phone on their face while half-asleep, opening your chat without registering human thought.'
      },
      {
        title: 'THE PARALYZED OVERTHINKER',
        probability: '65.2% CHANCE',
        description: 'They saw your text, got immense butterflies, panicked, threw their phone across the room, and hid under a duvet.'
      },
      {
        title: 'THE COLD PSYCHOLOGICAL SIEGE',
        probability: '99.4% CHANCE',
        description: 'Deliberately letting the blue checkmarks marinate to cultivate maximum existential desperation in your soul.'
      }
    ],
    savageReplies: [
      'Hope the ceiling you\'re staring at is interesting.',
      'I see the blue ticks are enjoying their peaceful night.',
      'Unseen 2:15 AM.'
    ]
  },
  {
    id: 'thumbsup',
    text: '👍',
    time: '17:03',
    timestamp: '17:03:45 (Quick Reaction)',
    severity: '94.5% CORPORATE EXECUTION',
    subtextThreat: 'WEAPONIZED DEFAULT EMOJI',
    quickSummary: 'The ultimate weapon for polite hostility and conversation termination.',
    annotation: 'The yellow default thumbs up is the digital equivalent of a polite nod while slowly backing away toward the emergency exit.',
    baseMetrics: { overthinking: 94.5, danger: 91.0, hostility: 96.5, spiralHours: 3.2 },
    flags: [
      {
        title: "Zero Keystroke Investment",
        desc: "Did not even enter keyboard mode. Tapped the default quick emoji to close the ticket.",
        isGreen: false
      },
      {
        title: "Boomer / Passive Aggressive Ambiguity",
        desc: "Could mean 'Yes, acknowledged' or 'Never speak to me or my family again'.",
        isGreen: false
      },
      {
        title: "Green Flag",
        desc: "At least it was not a thumbs down.",
        isGreen: true
      }
    ],
    theories: [
      {
        title: 'THE MANAGER CONDESCENSION',
        probability: '94.1% CHANCE',
        description: 'They treated your deeply personal life update like a Jira ticket update that has been marked Won\'t Fix.'
      },
      {
        title: 'THE ACCIDENTAL PALM TAP',
        probability: '34.0% CHANCE',
        description: 'Their thumb slipped while pulling their phone out of a pocket in an elevator.'
      },
      {
        title: 'THE FINAL CURTAIN',
        probability: '88.5% CHANCE',
        description: 'The universal punctuation mark indicating this topic is officially dead and buried.'
      }
    ],
    savageReplies: [
      '👍👍 (raised to the power of vengeance)',
      'Thank you for this deeply emotional dissertation.',
      'Acknowledged, closing support ticket #4492.'
    ]
  },
  {
    id: 'fine',
    text: 'fine.',
    time: '14:30',
    timestamp: '14:30:10 (Fatal Punctuation)',
    severity: '99.9% NUCLEAR PAYLOAD',
    subtextThreat: 'FULL STOP DETECTED = DISASTER',
    quickSummary: 'The word "fine" with a period is code for a localized geopolitical crisis.',
    annotation: 'In modern texting linguistics, "fine." does not mean satisfactory. It means court proceedings have commenced.',
    baseMetrics: { overthinking: 99.5, danger: 99.0, hostility: 99.9, spiralHours: 12.0 },
    flags: [
      {
        title: "The Period of Doom",
        desc: "Adding a full stop to a single-word reply is the equivalent of cocking a firearm.",
        isGreen: false
      },
      {
        title: "Inverted Meaning Paradox",
        desc: "Whatever is happening is currently the furthest possible thing from fine.",
        isGreen: false
      },
      {
        title: "Green Flag",
        desc: "You have approximately 4 minutes to draft an unconditional apology.",
        isGreen: true
      }
    ],
    theories: [
      {
        title: 'THE MEMORY LEDGER ACTIVATION',
        probability: '99.2% CHANCE',
        description: 'They are currently compiling a bulleted list of everything you have done wrong since October 2022.'
      },
      {
        title: 'THE REVERSE PSYCHOLOGY TRAP',
        probability: '87.4% CHANCE',
        description: 'If you reply "cool", you are terminated. If you reply "are you sure?", you are also terminated.'
      }
    ],
    savageReplies: [
      'On a scale of 1 to bunker, how fine are we talking?',
      'Understood. Mobilizing national guard units.',
      'I accept full responsibility for whatever I did or did not do.'
    ]
  }
]

const activeSpecimen = computed(() => specimens[currentSpecimenIndex.value])

const selectSpecimen = (index: number) => {
  currentSpecimenIndex.value = index
  activeTheory.value = 0
  showEvidenceAnnotation.value = false
}

const inspectMessageWord = () => {
  showEvidenceAnnotation.value = !showEvidenceAnnotation.value
}

const activeMetrics = computed(() => {
  const base = activeSpecimen.value.baseMetrics
  const multiplier = paranoiaLevel.value === 1 ? 0.7 : paranoiaLevel.value === 2 ? 0.9 : 1.0
  
  return {
    overthinking: (base.overthinking * multiplier).toFixed(1) + '%',
    danger: (base.danger * multiplier).toFixed(1) + '%',
    hostility: (base.hostility * multiplier).toFixed(1) + '%',
    spiralTime: (base.spiralHours * multiplier).toFixed(1) + ' hrs',
    spiralPercent: Math.min(100, Math.round(base.spiralHours * multiplier * 15)) + '%'
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
