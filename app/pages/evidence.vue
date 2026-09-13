<template>
  <div class="flex flex-col min-h-screen selection:bg-wine/40 selection:text-champagne">
    <!-- Navbar -->
    <Navbar />

    <main class="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
      
      <!-- Header Section -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine/20 border border-wine/40 text-xs font-mono text-champagne mb-3">
          <span>PAGE 2 — EVIDENCE</span>
        </div>
        <h1 class="font-display font-black text-3xl sm:text-5xl text-warm tracking-tight">
          What are we working with?
        </h1>
        <p class="text-sm sm:text-base text-champagne/70 font-sans mt-3 max-w-lg mx-auto">
          Choose your evidence. We promise not to jump to conclusions.
        </p>
      </div>

      <!-- Mode Selector (Upload Screenshot vs Paste Message) -->
      <div class="flex justify-center mb-8">
        <div class="inline-flex p-1.5 rounded-2xl bg-luxury-900 border border-champagne/15 shadow-lg">
          <button 
            type="button"
            @click="activeTab = 'upload'"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all"
            :class="activeTab === 'upload' 
              ? 'bg-wine text-warm shadow-md shadow-wine/40' 
              : 'text-champagne/60 hover:text-warm'"
          >
            <span>📸</span>
            <span>Upload a Screenshot</span>
          </button>

          <button 
            type="button"
            @click="activeTab = 'paste'"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all"
            :class="activeTab === 'paste' 
              ? 'bg-wine text-warm shadow-md shadow-wine/40' 
              : 'text-champagne/60 hover:text-warm'"
          >
            <span>💬</span>
            <span>Paste the Message</span>
          </button>
        </div>
      </div>

      <!-- Option 1: Upload a Screenshot -->
      <div v-show="activeTab === 'upload'" class="space-y-6">
        <div 
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleFileDrop"
          class="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 text-center flex flex-col items-center justify-center cursor-pointer group"
          :class="isDragging 
            ? 'border-champagne bg-wine/20 scale-[1.01]' 
            : 'border-champagne/20 hover:border-champagne/60 bg-luxury-900/60'"
          @click="triggerFileInput"
        >
          <input 
            ref="fileInputRef"
            type="file" 
            accept=".png, .jpg, .jpeg, image/png, image/jpeg"
            class="hidden"
            @change="handleFileSelect"
          />

          <!-- If image is already selected -->
          <div v-if="selectedImage" class="w-full flex flex-col items-center">
            <div class="relative max-w-sm rounded-2xl overflow-hidden border border-champagne/20 shadow-2xl group/preview">
              <img :src="selectedImage" alt="Evidence Preview" class="w-full max-h-72 object-contain bg-black/40" />
              <button 
                type="button"
                @click.stop="removeSelectedImage"
                class="absolute top-2 right-2 p-1.5 rounded-full bg-luxury-950/90 text-champagne hover:text-warm hover:bg-wine transition-colors"
                title="Remove evidence"
              >
                ✕
              </button>
            </div>
            <div class="mt-4 text-xs font-mono text-champagne flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-champagne"></span>
              <span>{{ fileName }} ({{ fileSize }})</span>
            </div>
          </div>

          <!-- Default Upload State -->
          <div v-else class="flex flex-col items-center">
            <div class="w-16 h-16 rounded-2xl bg-wine/20 border border-wine/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              📸
            </div>
            <h3 class="font-display font-bold text-lg text-warm">
              Upload a Screenshot
            </h3>
            <p class="text-xs sm:text-sm text-champagne/70 font-sans mt-1 max-w-sm">
              For when the evidence is too suspicious to type out.
            </p>

            <div class="mt-5">
              <button 
                type="button"
                class="px-5 py-2.5 rounded-xl bg-wine hover:bg-wine-hover border border-champagne/30 text-warm font-sans text-xs font-bold tracking-wide shadow-lg shadow-wine/30 hover:scale-105 active:scale-95 transition-all"
              >
                Upload Screenshot
              </button>
            </div>

            <p class="text-[11px] font-mono text-champagne/50 mt-4">
              Supports .png, .jpg, .jpeg
            </p>
          </div>
        </div>
      </div>

      <!-- Option 2: Paste the Message -->
      <div v-show="activeTab === 'paste'" class="space-y-6">
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-champagne/15 bg-luxury-900/60 shadow-xl">
          <div class="mb-4">
            <h3 class="font-display font-bold text-lg text-warm">
              Paste the Message
            </h3>
            <p class="text-xs sm:text-sm text-champagne/70 font-sans mt-1">
              For when you only have one message and way too many questions.
            </p>
          </div>

          <div class="relative">
            <textarea 
              v-model="pastedText"
              rows="4"
              placeholder="e.g. 'ok', 'Seen 2:14 AM', 'fine.', 'we need to talk', '👍'"
              class="w-full p-4 rounded-2xl bg-luxury-950/90 border border-champagne/15 text-warm font-mono text-sm placeholder-champagne/30 focus:outline-none focus:border-champagne/50 transition-colors"
            ></textarea>

            <button 
              v-if="pastedText"
              @click="pastedText = ''"
              class="absolute top-3 right-3 text-xs font-mono text-champagne/50 hover:text-champagne px-2 py-1"
            >
              CLEAR
            </button>
          </div>

          <!-- Quick Presets -->
          <div class="flex flex-wrap items-center gap-2 mt-4 text-xs font-sans text-champagne/70">
            <span class="font-medium text-champagne/50">Quick Test:</span>
            <button 
              v-for="preset in ['ok', 'Seen 2:14 AM', 'fine.', '👍', 'k', 'Nothing. Just tired.']"
              :key="preset"
              @click="pastedText = preset"
              class="px-2.5 py-1 rounded-lg bg-luxury-950/70 hover:bg-wine/30 text-champagne hover:text-warm border border-champagne/15 transition-all text-xs font-mono"
            >
              "{{ preset }}"
            </button>
          </div>
        </div>
      </div>

      <!-- Universal Drag & Drop / Fallback Area Notice -->
      <div class="mt-6 text-center text-xs font-sans text-champagne/50">
        <span>Drag & drop a screenshot or paste a message above</span>
      </div>

      <!-- Action Button: Once they've provided something -->
      <div class="mt-8 flex flex-col items-center">
        <button 
          @click="handleMakeItWorse"
          :disabled="!hasEvidence || isLoading"
          class="w-full sm:w-auto px-10 py-4 rounded-2xl font-mono font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
          :class="hasEvidence 
            ? 'bg-wine hover:bg-wine-hover text-warm shadow-wine/40 hover:scale-105 active:scale-95 cursor-pointer border border-champagne/40' 
            : 'bg-luxury-900 text-champagne/40 border border-champagne/10 cursor-not-allowed opacity-60'"
        >
          <span v-if="isLoading" class="flex items-center gap-2">
            <span class="w-4 h-4 rounded-full border-2 border-champagne/30 border-t-champagne animate-spin"></span>
            <span>CALCULATING CATASTROPHE...</span>
          </span>
          <span v-else class="flex items-center gap-2">
            <span>MAKE IT WORSE</span>
            <span>→</span>
          </span>
        </button>

        <p v-if="!hasEvidence" class="text-[11px] font-sans text-champagne/50 mt-2">
          Please upload a screenshot or paste a message to proceed.
        </p>
      </div>

    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref<'upload' | 'paste'>('upload')
const isDragging = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

const selectedImage = ref<string | null>(null)
const fileName = ref('')
const fileSize = ref('')
const pastedText = ref('')
const isLoading = ref(false)

const hasEvidence = computed(() => {
  if (activeTab.value === 'upload') {
    return !!selectedImage.value
  }
  return !!pastedText.value.trim()
})

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processFile(target.files[0])
  }
}

const handleFileDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    activeTab.value = 'upload'
    processFile(e.dataTransfer.files[0])
  }
}

const processFile = (file: File) => {
  fileName.value = file.name
  fileSize.value = (file.size / (1024 * 1024)).toFixed(2) + ' MB'
  
  const reader = new FileReader()
  reader.onload = (event) => {
    selectedImage.value = event.target?.result as string
  }
  reader.readAsDataURL(file)
}

const removeSelectedImage = () => {
  selectedImage.value = null
  fileName.value = ''
  fileSize.value = ''
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const handleMakeItWorse = async () => {
  if (!hasEvidence.value) return

  isLoading.value = true

  const evidencePayload = {
    message: pastedText.value.trim() || 'Evidence Screenshot',
    imageBase64: selectedImage.value || undefined,
    fileName: fileName.value || undefined,
    suspect: 'The Crush / Situationship'
  }

  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('currentEvidence', JSON.stringify(evidencePayload))
    } catch (e) {
      console.warn('Storage quota error:', e)
    }
  }

  const caseId = 'case-' + Math.floor(10000 + Math.random() * 90000)
  router.push({
    path: `/report/${caseId}`,
    query: {
      msg: pastedText.value.trim() ? pastedText.value.trim() : undefined
    }
  })
}
</script>
