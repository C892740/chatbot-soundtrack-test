import { Container } from '../components/Container'
import type { ReactElement } from 'react'
import { Reveal } from '../components/Reveal'
import { logos } from '../content'

// Minimal geometric marks so the row reads as real brands without
// borrowing anyone's identity. Swap for customer SVGs when you have them.
const marks: Record<string, ReactElement> = {
  PixelCraft: <path d="M4 4h7v7H4zM13 13h7v7h-7zM13 4h7v7h-7z" />,
  BlockyBits: <path d="M4 8h16v8H4zM8 4h8v4H8zM8 16h8v4H8z" />,
  CreeperCam: <path d="M6 4h12v16H6zM9 9h2v2H9zM13 9h2v2h-2zM10 14h4v3h-2v-1h-2z" />,
  RedstoneLab: <path d="M12 3v18M5 8l14 8M19 8L5 16M4 12h16" />,
  EnderPlays: <path d="M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5" />,
  DiamondDash: <path d="M7 4h10l4 6-9 10L3 10zM3 10h18M12 20 8 10l4-6 4 6z" />,
  VillagerVids: <path d="M6 21v-8l6-4 6 4v8M6 13h12M10 21v-5h4v5" />,
  NetherNate: <path d="M12 3c-4 4-6 7-6 10a6 6 0 0 0 12 0c0-3-2-6-6-10z" />,
}

export function LogoCloud() {
  const doubled = [...logos, ...logos]
  return (
    <section className="py-12">
      <Container>
        <Reveal>
          <p className="text-center text-[13px] text-faint">Made for Minecraft channels like</p>
        </Reveal>
        <div className="section-mask relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-14 pr-14 hover:[animation-play-state:paused]">
            {doubled.map((name, i) => (
              <li key={`${name}-${i}`} className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight text-fg/45">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {marks[name]}
                </svg>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
