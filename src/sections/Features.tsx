import { motion } from 'motion/react'
import { BadgeCheck, Music4, Search, Sparkles, Ticket } from 'lucide-react'
import type { ReactElement } from 'react'

import { Container } from '../components/Container'
import { Monogram } from '../components/AppMock'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { features } from '../content'
import { cx } from '../lib/cx'

const visuals: Record<string, () => ReactElement> = {
  chat: ChatVisual,
  finder: FinderVisual,
  license: LicenseVisual,
  guest: GuestVisual,
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={features.eyebrow} title={features.title} description={features.description} />
        <div className="mt-14 grid auto-rows-[320px] grid-cols-1 gap-4 md:grid-cols-3">
          {features.items.map((item, i) => {
            const Visual = visuals[item.key]
            return (
              <Reveal key={item.key} delay={(i % 3) * 0.08} className={cx(item.span === 2 && 'md:col-span-2')}>
                <article className="depth group relative flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-glow transition-colors duration-300 hover:[--depth-edge:rgb(255_236_224/0.22)]">
                  <div className="relative flex-1 overflow-hidden">
                    <Visual />
                  </div>
                  {/* Fixed height so dividers line up across a row regardless of copy length. */}
                  <div className="relative h-[96px] border-t border-line px-6 pt-4">
                    <h3 className="text-[16px] font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-muted">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function ChatVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2.5 p-6">
      {[
        { who: 'YOU', hue: 210, text: '“Swamp temple raid, spooky but kid-safe.”', me: true },
        { who: 'BB', hue: 120, text: 'Hype hook + 5-beat map with fog-horn SFX at 2:10.', me: false },
        { who: 'BB', hue: 120, text: 'Chill version: same raid, campfire retelling.', me: false },
      ].map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: m.me ? 12 : -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className={cx('flex items-center gap-2', m.me && 'flex-row-reverse')}
        >
          <Monogram initials={m.who} hue={m.hue} className="size-6 shrink-0 text-[9px]" />
          <p
            className={cx(
              'max-w-[75%] rounded-[12px] px-3 py-2 text-[12px] leading-snug',
              m.me ? 'bg-accent/20 text-fg' : 'bg-white/[0.04] text-fg/85',
            )}
          >
            {m.text}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

const moods = ['calm build montage', 'tense cave scene', 'boss-fight drop', 'cozy mining ambience']

function FinderVisual() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="depth relative flex w-full max-w-[280px] items-center gap-2 rounded-[14px] bg-bg/60 px-4 py-3"
      >
        <Search className="size-4 shrink-0 text-accent" />
        <span className="truncate text-[13px] text-muted">tense cave scene…</span>
      </motion.div>
      <div className="flex max-w-[300px] flex-wrap justify-center gap-2">
        {moods.map((m, i) => (
          <motion.span
            key={m}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-[12px] text-fg/85"
          >
            <Music4 className="size-3 text-accent-2" />
            {m}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function LicenseVisual() {
  const rows = [
    'Pixabay · commercial use granted',
    'Epidemic · safelist channel first',
    'Attribution note attached',
  ]
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="depth relative w-full max-w-[250px] rounded-[16px] bg-bg/60 p-4"
      >
        <p className="flex items-center gap-1.5 text-[12px] font-semibold">
          <Sparkles className="size-3.5 text-accent" /> License receipt
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {rows.map((r, i) => (
            <motion.li
              key={r}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
              className="flex items-center gap-2 text-[12px] text-muted"
            >
              <BadgeCheck className="size-3.5 shrink-0 text-accent-2" />
              {r}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

function GuestVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3 p-6">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14, rotate: -4 + i * 4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 + i * 4 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="depth relative flex w-[104px] flex-col items-center rounded-[14px] bg-bg/60 px-2 py-4 text-center"
        >
          <Ticket className="size-5 text-accent" />
          <p className="mt-2 text-[13px] font-semibold">Try {i + 1}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-faint">{i < 2 ? 'chat + finder' : 'on the house'}</p>
        </motion.div>
      ))}
    </div>
  )
}
