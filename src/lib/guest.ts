import { useEffect, useState } from 'react'

// Guest free-try budget shared by Chat and the Soundtrack finder.
// No login: tracked per browser profile in localStorage. This is a demo
// cooperation counter, NOT a security control — real enforcement must live
// server-side next to POST /api/chat.
export const GUEST_LIMIT = 3
const KEY = 'blockbard:v1:guest-tries'

type State = { used: number }

function readState(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { used: 0 }
    const parsed = JSON.parse(raw) as Partial<State>
    const used = Math.min(GUEST_LIMIT, Math.max(0, Math.floor(Number(parsed.used) || 0)))
    return { used }
  } catch {
    return { used: 0 }
  }
}

function writeState(s: State) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    // Private mode / quota: ignore, the in-memory mirror below covers it.
  }
}

// In-memory mirror so rapid successive sends stay consistent.
let memUsed: number | null = null

function usedCount(): number {
  if (memUsed === null) memUsed = readState().used
  return memUsed
}

export function triesLeft(): number {
  return Math.max(0, GUEST_LIMIT - usedCount())
}

export function canSpendTry(): boolean {
  return triesLeft() > 0
}

/** Commit AFTER a successful AI response. Never call on errors. */
export function commitTry(): number {
  memUsed = usedCount() + 1
  writeState({ used: memUsed })
  window.dispatchEvent(new CustomEvent('blockbard:tries'))
  return triesLeft()
}

export function useGuestTries(): number {
  const [left, setLeft] = useState(triesLeft)
  useEffect(() => {
    const sync = () => {
      memUsed = null
      setLeft(triesLeft())
    }
    window.addEventListener('blockbard:tries', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('blockbard:tries', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])
  return left
}
