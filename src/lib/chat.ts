import { MODELS, type ModelId } from './models'

export type ChatRole = 'system' | 'user' | 'assistant'
export type ChatMessage = { role: ChatRole; content: string }

// Keyless guest endpoint (per-IP rate limited, may 402 under load).
const CLASSIC_URL = 'https://text.pollinations.ai/openai'

function systemFor(model: ModelId): string {
  return MODELS.find((m) => m.id === model)?.system ?? MODELS[0].system
}

async function postJson(url: string, body: unknown, timeoutMs: number): Promise<Response> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    })
  } finally {
    clearTimeout(t)
  }
}

function extractClassicText(data: unknown): string | null {
  const c = (data as { choices?: Array<{ message?: { content?: unknown } }> })?.choices?.[0]?.message?.content
  return typeof c === 'string' && c.trim() ? c.trim() : null
}

/** Offline fallback so the demo never dead-ends without a network. */
export function localFallback(userText: string, model: ModelId): string {
  const t = userText.toLowerCase()
  const isMusic =
    model === 'sound-scout' ||
    /music|sound|sfx|track|song|audio|montage|outro|intro|sting|ambien|beat|effect/.test(t)
  if (isMusic) {
    return (
      'Here are royalty-aware starting points for that moment (I am offline, so these are curated links):\n\n' +
      '- Montage energy: Pixabay Music search "epic cinematic" — https://pixabay.com/music/search/epic%20cinematic/\n' +
      '- Mining B-roll: Pixabay Music search "lofi chill" — https://pixabay.com/music/search/lofi%20chill/\n' +
      '- Transitions: Pixabay SFX search "whoosh transition" — https://pixabay.com/sound-effects/search/whoosh%20transition/\n' +
      '- Death sting: Pixabay SFX search "dark cinematic sting" — https://pixabay.com/sound-effects/search/dark%20cinematic%20sting/\n' +
      '- Paid upgrade path: Epidemic Sound featured — https://www.epidemicsound.com/music/featured/\n\n' +
      'Pixabay tracks are free for commercial use with no attribution (save the track URL as Content-ID proof). ' +
      'Epidemic needs a subscription or Single Track license; credit "Artist / Title / courtesy of www.epidemicsound.com". ' +
      'Tell me the exact moment (montage, mining, clutch, death, chapter, outro) and I will narrow it down.'
    )
  }
  return (
    'I am offline right now, so here is the short version: hook in the first 5 seconds, ' +
    'one idea per chapter, music changes on every beat switch. ' +
    'Ask me about soundtracks or SFX for a specific moment (montage, mining B-roll, clutch, death sting, outro) ' +
    'and I will point you at concrete Pixabay searches and Epidemic pages.'
  )
}

export async function sendChat(
  history: ChatMessage[],
  model: ModelId,
): Promise<{ text: string; live: boolean }> {
  const messages: ChatMessage[] = [
    { role: 'system', content: systemFor(model) },
    ...history.filter((m) => m.role !== 'system'),
  ]
  // 1) Same-origin worker proxy on Cloudflare. Static hosts 404 -> fall through.
  try {
    const res = await postJson('/api/chat', { messages }, 20000)
    if (res.ok) {
      const data = (await res.json()) as { text?: unknown }
      if (typeof data?.text === 'string' && data.text.trim()) return { text: data.text.trim(), live: true }
    }
  } catch {
    /* fall through to keyless endpoint */
  }
  // 2) Direct keyless endpoint.
  try {
    const res = await postJson(CLASSIC_URL, { model: 'openai', messages }, 30000)
    if (res.ok) {
      const text = extractClassicText(await res.json())
      if (text) return { text, live: true }
    }
  } catch {
    /* fall through to offline answer */
  }
  // 3) Offline curated answer. Callers should NOT charge a try for this.
  const lastUser = [...history].reverse().find((m) => m.role === 'user')?.content ?? ''
  return { text: localFallback(lastUser, model), live: false }
}
