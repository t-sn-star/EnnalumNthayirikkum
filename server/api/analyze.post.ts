export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { message, imageBase64, suspect } = body || {}
  const targetText = (message || '').trim()

  const systemPrompt = `You are "EnnalumNthayirikkum", the internet's most hilariously unhinged, relatable Gen-Z text overthinker.
Analyze this text message or chat screenshot.
Who sent it: "${suspect || 'The Crush / Situationship / Boss / Ex'}".
The text: "${targetText || 'Screenshot attached'}".

Your goal: Take this dry/innocent message and overthink it into an absolute crisis. Use funny Gen-Z relatable internet slang (e.g. "dry as hell", "delulu", "ghosting", "you are cooked", "the vibe is in the negatives", "0 emojis = danger", "standing on business").
Do NOT use clinical or corporate forensic words like "autopsy", "dossier", "micro-linguistic", "cognitive vortex". Make it sound like your funniest best friend spiraling at 2 AM.

You MUST reply ONLY with a raw valid JSON object (no markdown, no backticks, no extra text):
{
  "messageText": "${targetText || 'Evidence Screenshot'}",
  "time": "23:42",
  "severity": "CRITICAL SPIRAL 💀",
  "overthinkingScore": "99.4%",
  "subtextThreat": "DRY AS THE DESERT",
  "chanceCooked": "97.4%",
  "dryTextEnergy": "99.1%",
  "quickSummary": "One short punchy funny sentence explaining what they actually meant.",
  "annotation": "The real tea on why this text is a red flag.",
  "flags": [
    {"title": "Red Flag 1", "desc": "Funny explanation of what is wrong with this text", "isGreen": false},
    {"title": "Red Flag 2", "desc": "Another funny red flag callout", "isGreen": false},
    {"title": "One Tiny Silver Lining", "desc": "A funny ridiculous green flag", "isGreen": true}
  ],
  "theories": [
    {"title": "THEORY 1 (THE GROUP CHAT)", "probability": "99.2% CHANCE", "description": "Absurd funny theory of what they are doing right now"},
    {"title": "THEORY 2 (THE 500-WORD DRAFT)", "probability": "84.1% CHANCE", "description": "Another unhinged funny theory"},
    {"title": "THEORY 3 (THE ACCIDENT)", "probability": "35.0% CHANCE", "description": "A ridiculous excuse"}
  ],
  "savageReplies": [
    "Short petty comeback",
    "Cold unbothered comeback",
    "Chaotic comeback"
  ]
}`

  // 1. If Gemini API Key is configured
  if (config.geminiApiKey) {
    try {
      // Determine image MIME type if present
      let mimeType = 'image/jpeg'
      if (imageBase64 && imageBase64.startsWith('data:image/png')) {
        mimeType = 'image/png'
      } else if (imageBase64 && imageBase64.startsWith('data:image/webp')) {
        mimeType = 'image/webp'
      }

      const parts: any[] = [{ text: systemPrompt }]

      if (imageBase64) {
        parts.push({
          inline_data: {
            mime_type: mimeType,
            data: imageBase64.replace(/^data:image\/\w+;base64,/, '')
          }
        })
      }

      const contents = [{ parts }]

      // Primary model: gemini-3.6-flash (active multimodal model)
      const modelsToTry = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-flash-latest']
      let response: Response | null = null

      for (const model of modelsToTry) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: {
                response_mime_type: 'application/json',
                temperature: 0.8
              }
            })
          })

          if (res.ok) {
            response = res
            break
          } else {
            console.warn(`Model ${model} returned ${res.status}, trying next model...`)
          }
        } catch (err) {
          console.warn(`Request to ${model} failed, trying next...`, err)
        }
      }

      if (response && response.ok) {
        const data = await response.json()
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (rawText) {
          const cleanJson = rawText.replace(/```(?:json)?\n?/gi, '').replace(/```\n?$/g, '').trim()
          const parsed = JSON.parse(cleanJson)
          if (!parsed.chanceCooked) parsed.chanceCooked = (92 + Math.random() * 7).toFixed(1) + '%'
          if (!parsed.dryTextEnergy) parsed.dryTextEnergy = (94 + Math.random() * 5).toFixed(1) + '%'
          return parsed
        }
      }
    } catch (e) {
      console.error('Gemini API Request Failed, using fallback engine:', e)
    }
  }

  // Dynamic fallback calculation based on message characteristics
  const text = targetText || 'ok'
  const lower = text.toLowerCase()
  
  // Calculate dynamic percentages
  let cooked = 92.5
  let dry = 95.0

  if (lower.includes('we need to talk')) {
    cooked = 99.8
    dry = 94.5
  } else if (lower === 'k' || lower === 'ok') {
    cooked = 97.4
    dry = 99.6
  } else if (lower.includes('fine') || lower.includes('fine.')) {
    cooked = 98.9
    dry = 98.2
  } else if (lower.includes('seen') || lower.includes('read')) {
    cooked = 99.4
    dry = 91.0
  } else if (text.length <= 5) {
    cooked = 96.1
    dry = 98.8
  } else {
    // Generate organic distinct numbers based on length hash
    const hash = text.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    cooked = Number((91 + (hash % 85) / 10).toFixed(1))
    dry = Number((93 + ((hash * 7) % 65) / 10).toFixed(1))
  }

  return {
    messageText: text,
    time: '23:42',
    severity: cooked > 98 ? 'TOTAL SPIRAL 💀' : 'CRITICAL SPIRAL 💀',
    overthinkingScore: `${Math.max(cooked, dry)}%`,
    subtextThreat: text.length <= 2 ? 'DRY AS ICE (DANGER)' : 'SUSPICIOUS VIBES',
    chanceCooked: `${cooked}%`,
    dryTextEnergy: `${dry}%`,
    quickSummary: `They sent "${text}" with zero emojis and negative enthusiasm. You are officially in the danger zone.`,
    annotation: `Notice how dry this is? Typing "${text}" took 0.001 seconds of effort. They didn't even bother adding a smiley.`,
    flags: [
      {
        title: "Zero Emoji Energy",
        desc: `Not even a single smiley or reaction. Just cold, direct "${text}".`,
        isGreen: false
      },
      {
        title: "Extreme Word Saving",
        desc: "They saved letters like they're paying 50 cents per character.",
        isGreen: false
      },
      {
        title: "The Only Green Flag",
        desc: "At least your message didn't bounce back as blocked.",
        isGreen: true
      }
    ],
    theories: [
      {
        title: "THE GROUP CHAT SCREENSHOT",
        probability: "99.4% CHANCE",
        description: `They took a screenshot of your chat, sent it to their group chat, and typed "look at this".`
      },
      {
        title: "THE DELETED PARAGRAPH",
        probability: "82.5% CHANCE",
        description: `They started typing a whole essay, panicked, deleted all of it, and sent "${text}".`
      },
      {
        title: "THE HALF-ASLEEP PHONE DROP",
        probability: "34.0% CHANCE",
        description: "They dropped their phone on their face and their nose tapped send."
      }
    ],
    savageReplies: [
      "K.",
      "Did you run out of letters?",
      "Thanks for the novel, took me 3 hours to read."
    ]
  }
})

