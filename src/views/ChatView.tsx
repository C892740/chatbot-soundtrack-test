import { ArrowUp, Check, ChevronDown, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { sendChat, type ChatMessage } from '../lib/chat'
import { canSpendTry, commitTry, triesLeft } from '../lib/guest'
import { DEFAULT_MODEL, MODELS, type ModelId } from '../lib/models'
import { cx } from '../lib/cx'
import { LogoMark } from '../components/Logo'

type Turn = { role: 'user' | 'assistant'; text: string; live?: boolean }

const CHIPS = [
  'Find montage music for my 100-day video',
  'Cozy mining B-roll ambience',
  'Hardcore death sting SFX',
  'Upbeat outro track',
]

export function ChatView() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [model, setModel] = useState<ModelId>(DEFAULT_MODEL)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [left, setLeft] = useState(triesLeft)
  const boxRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [turns, sending])

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const modelName = MODELS.find((m) => m.id === model)?.name ?? 'Model'

  async function send(text: string) {
    const clean = text.trim()
    if (!clean || sending) return
    if (!canSpendTry()) {
      setNotice('You have used your 3 free tries on this browser. Reset browser data to try the demo again.')
      return
    }
    setNotice(null)
    setSending(true)
    const history: ChatMessage[] = [
      ...turns.map((t) => ({ role: t.role, content: t.text }) as ChatMessage),
      { role: 'user', content: clean },
    ]
    setTurns((prev) => [...prev, { role: 'user', text: clean }])
    setInput('')
    if (boxRef.current) boxRef.current.style.height = 'auto'
    try {
      const { text: reply, live } = await sendChat(history, model)
      setTurns((prev) => [...prev, { role: 'assistant', text: reply, live }])
      // Only successful live answers consume a try; offline answers are free.
      if (live) setLeft(commitTry())
      else setNotice('Demo answer (offline) — your try was not used.')
    } catch {
      setNotice('That did not work — your try was not used. Try again.')
    } finally {
      setSending(false)
    }
  }

  const empty = turns.length === 0

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {empty ? (
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center px-4 py-10">
            <div className="mb-6 flex flex-col items-center text-center">
              <LogoMark className="mb-4 size-12 rounded-[16px] [&_svg]:size-6" />
              <h1 className="text-balance text-[26px] font-medium tracking-tight text-fg">
                What should your next video sound like?
              </h1>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted">
                Sound Scout digs through Pixabay and Epidemic Sound for the exact moment — montage, mining,
                clutch, death sting or outro.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => send(chip)}
                  className="rounded-full border border-line bg-white/[0.02] px-4 py-2.5 text-left text-[14px] text-fg transition-colors hover:bg-white/[0.06]"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-3xl px-4 py-8">
            <ol className="flex flex-col gap-6">
              {turns.map((t, i) =>
                t.role === 'user' ? (
                  <li key={i} className="flex justify-end">
                    <div className="max-w-[80%] rounded-[22px] bg-raised px-4 py-2.5 text-[15px] leading-relaxed text-fg">
                      {t.text}
                    </div>
                  </li>
                ) : (
                  <li key={i} className="flex gap-3">
                    <LogoMark className="mt-0.5 size-7 shrink-0 rounded-[9px] [&_svg]:size-3.5" />
                    <div className="min-w-0 flex-1">
                      <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-fg">{t.text}</div>
                      {t.live === false && (
                        <p className="mt-1.5 text-[12px] text-faint">Demo answer (offline) — try was not used.</p>
                      )}
                    </div>
                  </li>
                ),
              )}
              {sending && (
                <li className="flex gap-3">
                  <LogoMark className="mt-0.5 size-7 shrink-0 rounded-[9px] [&_svg]:size-3.5" />
                  <div className="flex items-center gap-1.5 pt-2" aria-label="Thinking">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="size-1.5 animate-pulse rounded-full bg-muted"
                        style={{ animationDelay: `${d * 200}ms` }}
                      />
                    ))}
                  </div>
                </li>
              )}
            </ol>
          </div>
        )}
      </div>

      <div className="shrink-0 pb-4 pt-2">
        <div className="mx-auto w-full max-w-3xl px-4">
          {notice && (
            <p className="mb-2 rounded-control border border-line bg-surface px-3 py-2 text-center text-[13px] text-muted">
              {notice}
            </p>
          )}
          <div className="depth relative rounded-[28px] bg-surface">
            <div className="px-4 pt-3">
              <textarea
                ref={boxRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={(e) => {
                  const el = e.target as HTMLTextAreaElement
                  el.style.height = 'auto'
                  el.style.height = `${Math.min(el.scrollHeight, 200)}px`
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                placeholder="Describe the moment — e.g. 100-day montage at dawn…"
                aria-label="Message BlockBard"
                className="max-h-[200px] w-full resize-none bg-transparent text-[16px] leading-6 text-fg outline-none placeholder:text-faint"
              />
            </div>
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="New chat"
                  onClick={() => {
                    setTurns([])
                    setNotice(null)
                  }}
                  className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.07] hover:text-fg"
                >
                  <Plus className="size-5" />
                </button>
                <div ref={pickerRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setPickerOpen((v) => !v)}
                    aria-expanded={pickerOpen}
                    aria-label="Choose a model"
                    className="flex h-9 items-center gap-1.5 rounded-full px-3 text-[14px] font-medium text-fg transition-colors hover:bg-white/[0.07]"
                  >
                    {modelName}
                    <ChevronDown className={cx('size-4 text-muted transition-transform', pickerOpen && 'rotate-180')} />
                  </button>
                  {pickerOpen && (
                    <div className="absolute bottom-11 left-0 z-20 w-64 overflow-hidden rounded-card-sm border border-line bg-raised shadow-glow">
                      {MODELS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setModel(m.id)
                            setPickerOpen(false)
                            boxRef.current?.focus()
                          }}
                          className="flex w-full items-start justify-between gap-2 px-3.5 py-2.5 text-left transition-colors hover:bg-white/[0.06]"
                        >
                          <span>
                            <span className="block text-[14px] font-medium text-fg">{m.name}</span>
                            <span className="block text-[12px] text-muted">{m.tagline}</span>
                          </span>
                          {m.id === model && <Check className="mt-0.5 size-4 shrink-0 text-accent-2" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => send(input)}
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="grid size-9 place-items-center rounded-full bg-fg text-bg transition-all hover:bg-white disabled:opacity-30"
              >
                <ArrowUp className="size-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <p className="mt-2 text-center text-[12px] text-faint">
            BlockBard can make mistakes. Pixabay = free · Epidemic Sound = paid licence. {left} of 3 free tries left.
          </p>
        </div>
      </div>
    </div>
  )
}
