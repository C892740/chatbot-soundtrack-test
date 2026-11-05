import { ArrowUpRight, Disc3, Music, Search, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'

import { FEEDBACK_ENDPOINT, FEEDBACK_EXAMPLES } from '../data/feedback'
import { MOMENTS, rankTracks, type Moment, type Track } from '../data/tracks'
import { canSpendTry, commitTry, useGuestTries } from '../lib/guest'
import { cx } from '../lib/cx'

function Cover({ track }: { track: Track }) {
  const Icon = track.kind === 'sfx' ? Zap : track.source === 'epidemic' ? Disc3 : Music
  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-card-sm"
      style={{ background: `linear-gradient(135deg, ${track.gradient[0]}, ${track.gradient[1]})` }}
    >
      <div className="noise absolute inset-0" />
      <Icon className="absolute bottom-3 left-3 size-7 text-white/90" />
      <span
        className={cx(
          'absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold',
          track.free ? 'bg-black/45 text-emerald-200' : 'bg-black/45 text-amber-200',
        )}
      >
        {track.free ? 'FREE' : 'PAID'}
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90">
        {track.kind === 'sfx' ? 'SFX' : track.source}
      </span>
      <span className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-white text-black opacity-0 shadow-glow transition-all duration-200 group-hover:opacity-100">
        <ArrowUpRight className="size-5" />
      </span>
    </div>
  )
}

function TrackCard({ track }: { track: Track }) {
  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group depth relative flex flex-col gap-3 rounded-card bg-surface p-4 transition-colors hover:bg-surface-2"
    >
      <Cover track={track} />
      <div className="min-w-0">
        <p className="truncate text-[15px] font-semibold text-fg">{track.title}</p>
        <p className="truncate text-[13px] text-muted">{track.artist}</p>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-muted">{track.blurb}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {track.moments.map((m) => (
            <span key={m} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-fg">
              {MOMENTS.find((x) => x.id === m)?.label ?? m}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[12px] leading-snug text-faint">{track.license}</p>
      </div>
    </a>
  )
}

export function SoundtracksView() {
  const left = useGuestTries()
  const [moment, setMoment] = useState<Moment | 'any'>('any')
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const results = useMemo(() => (searched ? rankTracks(moment, query) : []), [searched, moment, query])

  function find() {
    if (!canSpendTry()) {
      setNotice('You have used your 3 free tries on this browser. Reset browser data to try the demo again.')
      return
    }
    commitTry()
    setSearched(true)
    setNotice(null)
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <header className="mb-6">
          <p className="text-[13px] font-medium uppercase tracking-widest text-accent-2">For Minecraft videos</p>
          <h1 className="mt-1 text-[30px] font-semibold tracking-tight text-fg">Soundtracks &amp; SFX</h1>
          <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-muted">
            Every card is a curved link box, Spotify-style: free Pixabay searches and paid Epidemic Sound pages,
            organized by the moment in your video — not by asset type.
          </p>
        </header>

        <section aria-label="Soundtrack finder" className="depth relative rounded-card bg-surface p-4 sm:p-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMoment('any')}
              className={cx(
                'rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors',
                moment === 'any' ? 'bg-fg text-bg' : 'bg-white/[0.06] text-muted hover:text-fg',
              )}
            >
              Any moment
            </button>
            {MOMENTS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMoment(m.id)}
                title={m.hint}
                className={cx(
                  'rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors',
                  moment === m.id ? 'bg-fg text-bg' : 'bg-white/[0.06] text-muted hover:text-fg',
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex h-12 flex-1 items-center gap-2 rounded-control bg-white/[0.04] px-3.5">
              <Search className="size-4 shrink-0 text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') find()
                }}
                placeholder="Describe the vibe — e.g. dawn montage, cave grind…"
                aria-label="Describe the vibe"
                className="w-full bg-transparent text-[14px] text-fg outline-none placeholder:text-faint"
              />
            </div>
            <button
              type="button"
              onClick={find}
              className="h-12 shrink-0 rounded-control bg-fg px-5 text-[14px] font-medium text-bg transition-colors hover:bg-white"
            >
              Find
            </button>
          </div>
          {notice && <p className="mt-2 text-[13px] text-muted">{notice}</p>}
          {!searched && !notice && (
            <p className="mt-2 text-[13px] text-faint">
              Pick a moment, describe the vibe, hit Find — it uses 1 of your {left} free tries.
            </p>
          )}
        </section>

        {searched && (
          <section aria-label="Results" className="mt-6">
            <h2 className="mb-3 text-[17px] font-semibold text-fg">Top picks for you</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, 6).map((t) => (
                <TrackCard key={t.id} track={t} />
              ))}
            </div>
          </section>
        )}

        <section aria-label="Full catalog" className="mt-8">
          <h2 className="mb-3 text-[17px] font-semibold text-fg">The full shelf</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rankTracks('any', '').map((t) => (
              <TrackCard key={t.id} track={t} />
            ))}
          </div>
        </section>

        <section aria-label="License notes" className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-card border border-line bg-white/[0.02] p-4">
            <h3 className="text-[15px] font-semibold text-fg">Pixabay — free</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              Free for commercial use, no attribution required. Save the track URL as proof — some tracks trigger
              Content-ID claims and YouTube disputes ask for it.
            </p>
          </div>
          <div className="rounded-card border border-line bg-white/[0.02] p-4">
            <h3 className="text-[15px] font-semibold text-fg">Epidemic Sound — paid</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              Needs a subscription or Single Track license. Credit format: Artist / Title / courtesy of
              www.epidemicsound.com — a /track/ link in the description counts.
            </p>
          </div>
        </section>

        <section aria-label="Training hook" className="depth relative mt-4 rounded-card bg-surface p-4 sm:p-5">
          <h3 className="text-[15px] font-semibold text-fg">Training hook — your data makes it smarter</h3>
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-muted">
            Soon you will feed back which soundtrack you used and how the video performed (views + retention), and
            Sound Scout will suggest tracks that are <em>similar</em> to winners or <em>different</em> after flops.
            The shape is already defined in <code className="text-fg">src/data/feedback.ts</code>; the endpoint will
            be <code className="text-fg">{FEEDBACK_ENDPOINT}</code>.
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {FEEDBACK_EXAMPLES.map((f) => (
              <li
                key={`${f.trackId}-${f.videoTitle}`}
                className="rounded-control bg-white/[0.03] px-3 py-2 text-[13px] text-muted"
              >
                <span className="font-medium text-fg">{f.videoTitle}</span> · {f.views.toLocaleString()} views ·{' '}
                {f.retentionPct}% retention · wants something{' '}
                <span className="font-medium text-accent-2">{f.verdict}</span> to {f.trackId}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
