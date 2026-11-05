import { neon } from '@neondatabase/serverless'

// Vercel serverless function (not part of the static client bundle).
// GET /api/db-health -> { ok: true } when DATABASE_URL connects.
//
// Reads the pooled Neon connection string from the environment, so the
// secret is never in the repo. Any failure returns a generic message on
// purpose: error text must not echo the connection string.

type Handler = (
  req: { method?: string },
  res: { status: (code: number) => { json: (body: unknown) => void } },
) => void | Promise<void>

function safeMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  // Strip anything that looks like embedded credentials before responding.
  return raw
    .replace(/:\/\/[^@\s]+@/g, '://***@')
    .replace(/password=[^\s&;]*/gi, 'password=***')
    .slice(0, 300)
}

const handler: Handler = async (_req, res) => {
  const url = process.env.DATABASE_URL
  if (!url) {
    res.status(503).json({ ok: false, error: 'DATABASE_URL is not set.' })
    return
  }
  try {
    const started = Date.now()
    const sql = neon(url)
    const rows = await sql`SELECT 1 AS one`
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error('Unexpected query result.')
    }
    res.status(200).json({ ok: true, latencyMs: Date.now() - started })
  } catch (err) {
    res.status(503).json({ ok: false, error: safeMessage(err) })
  }
}

export default handler
