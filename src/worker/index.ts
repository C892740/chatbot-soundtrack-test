import { Hono } from 'hono'

// The Worker in front of the static site. Add API routes here; everything
// else falls through to the built assets (single-page-application mode).
type Env = {
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))

type ChatBody = {
  messages?: Array<{ role?: string; content?: string }>
}

// Same-origin chat proxy for the guest demo. Keeps any future API key on
// the server; the client (src/lib/chat.ts) falls back to the keyless
// endpoint and then to an offline answer when this route is unavailable
// (e.g. static hosts like Vercel).
app.post('/api/chat', async (c) => {
  const body = await c.req.json<ChatBody>().catch(() => ({}) as ChatBody)
  const messages = Array.isArray(body.messages)
    ? body.messages
        .filter((m) => typeof m?.content === 'string' && m.content.length > 0)
        .slice(-20)
        .map((m) => ({
          role: m.role === 'assistant' || m.role === 'system' ? m.role : 'user',
          content: m.content as string,
        }))
    : []
  if (messages.length === 0) return c.json({ error: 'No messages.' }, 400)

  try {
    const upstream = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'openai', messages }),
      signal: AbortSignal.timeout(25000),
    })
    if (!upstream.ok) return c.json({ error: 'Upstream unavailable.' }, 502)
    const data = (await upstream.json()) as {
      choices?: Array<{ message?: { content?: unknown } }>
    }
    const text = data?.choices?.[0]?.message?.content
    if (typeof text !== 'string' || !text.trim()) return c.json({ error: 'Empty reply.' }, 502)
    return c.json({ text: text.trim() })
  } catch {
    return c.json({ error: 'Upstream unavailable.' }, 502)
  }
})

// Newsletter / waitlist capture. Wire this to your email provider or a D1
// table; it currently just acknowledges the address.
app.post('/api/subscribe', async (c) => {
  const body = await c.req.json<{ email?: string }>().catch(() => ({}) as { email?: string })
  const email = body.email?.trim() ?? ''
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return c.json({ error: 'Enter a valid email address.' }, 400)
  }
  return c.json({ ok: true })
})

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
