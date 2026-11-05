import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { BadgeCheck, ExternalLink, FileText, MessageSquareText } from 'lucide-react'

import { Container } from '../components/Container'
import { Monogram } from '../components/AppMock'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { showcase } from '../content'
import { cx } from '../lib/cx'

export function Showcase() {
  const [active, setActive] = useState(showcase.tabs[0].key)
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={showcase.eyebrow} title={showcase.title} align="left" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
          <Reveal>
            <ul className="flex flex-col gap-1">
              {showcase.tabs.map((tab) => {
                const isActive = tab.key === active
                return (
                  <li key={tab.key}>
                    <button
                      type="button"
                      onClick={() => setActive(tab.key)}
                      aria-pressed={isActive}
                      className={cx(
                        'relative w-full rounded-card-sm px-5 py-4 text-left transition-colors',
                        isActive ? 'bg-surface' : 'hover:bg-white/[0.03]',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="showcase-active"
                          className="depth absolute inset-0 rounded-card-sm"
                          transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                        />
                      )}
                      <span className={cx('relative block text-[16px] font-semibold', isActive ? 'text-fg' : 'text-muted')}>
                        {tab.title}
                      </span>
                      <span className="relative mt-1 block text-[14px] leading-relaxed text-muted">{tab.description}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="depth relative aspect-[16/10] overflow-hidden rounded-card bg-surface shadow-glow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 overflow-y-auto p-5 sm:p-7"
                >
                  {active === 'chat' && <ChatPanel />}
                  {active === 'tracks' && <TracksPanel />}
                  {active === 'license' && <LicensePanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function ChatPanel() {
  const lines = [
    { who: 'you', text: 'Hardcore episode 12. I die to fall damage at the end. Make it hurt (funny).', persona: null as string | null },
    { who: 'bard', text: 'Hype persona · Hook: “Twelve episodes. Full netherite. One misplaced water bucket.” Then a 4-beat fall compilation with record-scratch SFX at 6:20.', persona: 'Hype' },
    { who: 'bard', text: 'Chill persona · Same footage, cozy retelling: “Sometimes the mountain wins.” Lo-fi folk under the death montage, no jumpscare cut.', persona: 'Chill' },
  ]
  return (
    <ul className="flex h-full flex-col justify-center gap-3">
      {lines.map((l, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: l.who === 'you' ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className={cx('flex gap-3', l.who === 'you' ? 'flex-row-reverse' : '')}
        >
          <Monogram initials={l.who === 'you' ? 'YOU' : 'BB'} hue={l.who === 'you' ? 210 : 120} className="size-7 shrink-0 text-[10px]" />
          <div
            className={cx(
              'max-w-[80%] rounded-[14px] px-4 py-3 text-[13px] leading-relaxed sm:text-[14px]',
              l.who === 'you' ? 'bg-accent/20' : 'depth relative bg-white/[0.04]',
            )}
          >
            {l.persona && (
              <span className="mb-1.5 inline-flex items-center gap-1 rounded-[7px] bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent">
                <MessageSquareText className="size-3" /> {l.persona}
              </span>
            )}
            <p className="text-fg/90">{l.text}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

const tracks = [
  { title: 'Morning Village Folk', mood: 'calm build montage', source: 'Pixabay', hue: 120, note: 'No attribution · dispute with license link' },
  { title: 'Deep Cave Pulse', mood: 'tense cave scene', source: 'Epidemic', hue: 250, note: 'Needs safelisted channel · auto-released' },
  { title: 'Drop: Wither Fight', mood: 'boss-fight drop', source: 'Epidemic', hue: 300, note: 'Active subscription required' },
  { title: 'Record Scratch SFX', mood: 'fail compilation', source: 'Pixabay', hue: 40, note: 'No attribution · keep download proof' },
]

function TracksPanel() {
  return (
    <ul className="grid h-full content-center gap-3 sm:grid-cols-2">
      {tracks.map((t, i) => (
        <motion.li
          key={t.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="depth relative rounded-[14px] bg-white/[0.03] p-4"
        >
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-[4px]" style={{ background: `hsl(${t.hue} 70% 60%)` }} />
            <p className="min-w-0 flex-1 truncate text-[13px] font-semibold sm:text-[14px]">{t.title}</p>
          </div>
          <p className="mt-1.5 text-[12px] text-muted">“{t.mood}”</p>
          <div className="mt-3 flex items-center justify-between">
            <span
              className={cx(
                'rounded-[7px] px-2 py-1 text-[11px] font-medium',
                t.source === 'Pixabay' ? 'bg-accent-2/15 text-accent-2' : 'bg-accent/15 text-accent',
              )}
            >
              {t.source}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-faint">
              Open license <ExternalLink className="size-3" />
            </span>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

const receipts = [
  { track: 'Morning Village Folk', line: 'Pixabay Content License · commercial use granted, irrevocable', flag: 'If claimed: dispute with track URL + license summary. Second appeal risks a strike — check for the shield icon first.' },
  { track: 'Deep Cave Pulse', line: 'Epidemic Creator license · monetization allowed, attribution expected', flag: 'Channel must be safelisted before publishing or Epidemic monetizes the video.' },
  { track: 'Drop: Wither Fight', line: 'Epidemic Creator license · published-during-subscription stays cleared', flag: 'New videos after cancellation get claimed. No client work, ads or compilations on this tier.' },
]

function LicensePanel() {
  return (
    <ul className="flex h-full flex-col justify-center gap-3">
      {receipts.map((r, i) => (
        <motion.li
          key={r.track}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
          className="depth relative rounded-[14px] bg-white/[0.03] p-4"
        >
          <p className="flex items-center gap-2 text-[13px] font-semibold sm:text-[14px]">
            <FileText className="size-4 shrink-0 text-accent-2" /> {r.track}
          </p>
          <p className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-relaxed text-muted sm:text-[13px]">
            <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-accent-2" /> {r.line}
          </p>
          <p className="mt-1 pl-5 text-[12px] leading-relaxed text-faint">{r.flag}</p>
        </motion.li>
      ))}
    </ul>
  )
}
