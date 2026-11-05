import { Disc3, House, MessageSquare, Sparkles } from 'lucide-react'

import { GUEST_LIMIT } from '../lib/guest'
import { cx } from '../lib/cx'
import { LogoMark } from './Logo'
import type { View } from '../App'

const ITEMS: Array<{ id: View; label: string; hint: string; icon: typeof House }> = [
  { id: 'home', label: 'Home', hint: 'Landing page', icon: House },
  { id: 'chat', label: 'Chat', hint: 'Talk to the models', icon: MessageSquare },
  { id: 'sounds', label: 'Soundtracks & SFX', hint: 'Minecraft video music', icon: Disc3 },
]

export function Sidebar({
  view,
  onNavigate,
  triesLeft,
}: {
  view: View
  onNavigate: (v: View) => void
  triesLeft: number
}) {
  return (
    <div className="flex h-full flex-col gap-4 bg-surface p-3">
      <button
        type="button"
        onClick={() => onNavigate('chat')}
        className="flex items-center gap-2.5 rounded-control px-2 py-1.5 text-left"
      >
        <LogoMark />
        <span className="min-w-0 leading-tight">
          <span className="block text-[15px] font-semibold tracking-tight text-fg">BlockBard</span>
          <span className="block text-[11.5px] leading-snug text-muted">Soundtracks for Minecraft videos</span>
        </span>
      </button>

      <nav aria-label="Primary" className="flex flex-col gap-1">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const active = view === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'group flex h-11 items-center gap-3 rounded-control px-3 text-left text-[14px] transition-colors',
                active ? 'bg-white/[0.08] text-fg' : 'text-muted hover:bg-white/[0.05] hover:text-fg',
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              <span className="min-w-0">
                <span className="block truncate font-medium leading-tight">{item.label}</span>
                <span className="block truncate text-[12px] leading-tight opacity-70">{item.hint}</span>
              </span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 rounded-card-sm border border-line bg-white/[0.02] p-3">
        <div className="flex items-center gap-2 text-[13px] font-medium text-fg">
          <Sparkles className="size-4 text-accent-2" />
          Guest mode
        </div>
        <p className="text-[13px] leading-snug text-muted">
          {triesLeft > 0 ? (
            <>
              <span className="font-semibold text-fg">{triesLeft} of {GUEST_LIMIT} free tries</span> left — no
              account needed.
            </>
          ) : (
            <>You have used your {GUEST_LIMIT} free tries on this browser.</>
          )}
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-all"
            style={{ width: `${(triesLeft / GUEST_LIMIT) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
