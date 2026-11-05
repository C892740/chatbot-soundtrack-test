import { motion } from 'motion/react'
import { BadgeCheck, MessageSquareText, Music4, Play, Sparkles } from 'lucide-react'

import { LogoMark } from './Logo'
import { cx } from '../lib/cx'

export function Monogram({ initials, hue, className }: { initials: string; hue: number; className?: string }) {
  return (
    <span
      className={cx('round grid size-6 shrink-0 place-items-center text-[10px] font-semibold text-white', className)}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 70% 62%), hsl(${hue + 40} 70% 48%))`,
      }}
    >
      {initials}
    </span>
  )
}

const rail = [
  { icon: MessageSquareText, label: 'Chat', active: true, meta: '2 of 3 tries' },
  { icon: Music4, label: 'Soundtracks', meta: '8 starter tracks' },
]

const messages = [
  {
    role: 'user' as const,
    text: 'Cave-diving episode. Tense, but family-friendly. 10 minutes.',
  },
  {
    role: 'bard' as const,
    text: 'Hook: “We went down for diamonds. We came back with something watching us.” Cold open 0:00–0:25, beat map below.',
  },
]

const beats = [
  { at: '0:00', what: 'Cold open, torch POV', track: 'Calm build · Pixabay' },
  { at: '3:40', what: 'First cave ambience drop', track: 'Tense pulse · Epidemic' },
  { at: '8:10', what: 'Escape montage', track: 'Uplifting folk · Pixabay' },
]

// The hero product visual: a BlockBard chat that ends in a scored beat map,
// not a generic analytics dashboard.
export function AppMock() {
  return (
    <div className="depth relative flex aspect-[16/10] w-full overflow-hidden rounded-window bg-surface text-left shadow-glow sm:aspect-[16/9]">
      {/* Rail */}
      <aside className="hidden w-[200px] shrink-0 flex-col border-r border-line bg-bg/60 p-3 sm:flex">
        <div className="flex items-center gap-2 px-1.5 py-1">
          <LogoMark className="size-6 rounded-[8px]" />
          <span className="text-[12px] font-semibold">BlockBard</span>
        </div>
        <ul className="mt-4 flex flex-col gap-0.5">
          {rail.map(({ icon: Icon, label, active, meta }) => (
            <li
              key={label}
              className={cx(
                'rounded-[10px] px-2 py-2 text-[12px]',
                active ? 'bg-white/[0.07] text-fg' : 'text-muted',
              )}
            >
              <span className="flex items-center gap-2">
                <Icon className="size-3.5" />
                <span className="flex-1">{label}</span>
              </span>
              <span className="mt-1 block pl-[22px] text-[11px] text-faint">{meta}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto rounded-[12px] bg-white/[0.03] p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-fg">
            <Sparkles className="size-3 text-accent" /> Guest pass
          </p>
          <p className="mt-1 text-[11px] leading-snug text-muted">3 free tries. No account, no card.</p>
        </div>
      </aside>

      {/* Chat */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center justify-between border-b border-line px-4">
          <span className="text-[13px] font-medium">New video score</span>
          <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] text-accent">Hype persona</span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.25, duration: 0.5 }}
              className={cx('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <p
                className={cx(
                  'max-w-[85%] rounded-[14px] px-3.5 py-2.5 text-[12px] leading-relaxed sm:text-[13px]',
                  m.role === 'user' ? 'bg-accent/20 text-fg' : 'depth relative bg-white/[0.04] text-fg/90',
                )}
              >
                {m.text}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="depth relative rounded-[14px] bg-white/[0.02] p-3"
          >
            <p className="flex items-center gap-1.5 text-[12px] font-medium">
              <Play className="size-3.5 text-accent-2" /> Beat map · 3 scenes scored
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {beats.map((b, i) => (
                <motion.li
                  key={b.at}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + i * 0.12, duration: 0.4 }}
                  className="flex items-center gap-2 text-[11px] sm:text-[12px]"
                >
                  <span className="shrink-0 rounded-[6px] bg-white/[0.06] px-1.5 py-0.5 tabular-nums text-muted">{b.at}</span>
                  <span className="min-w-0 flex-1 truncate text-fg/85">{b.what}</span>
                  <span className="hidden shrink-0 items-center gap-1 text-accent-2 sm:inline-flex">
                    <BadgeCheck className="size-3" />
                    {b.track}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
