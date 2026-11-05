// Curated soundtrack & SFX catalog for Minecraft videos.
// Link policy: Pixabay search URLs are constructed deep links to browse
// pages (never hotlinked MP3s); Epidemic links are stable /track/<id> or
// public browse pages. Covers are CSS gradients, never hotlinked art.

export type Source = 'pixabay' | 'epidemic'
export type Kind = 'music' | 'sfx'
export type Moment = 'montage' | 'mining' | 'clutch' | 'death' | 'chapter' | 'outro'

export type Track = {
  id: string
  title: string
  artist: string
  source: Source
  kind: Kind
  url: string
  moments: Moment[]
  moods: string[]
  license: string
  free: boolean
  gradient: [string, string]
  blurb: string
}

export const MOMENTS: Array<{ id: Moment; label: string; hint: string }> = [
  { id: 'montage', label: 'Montage', hint: '100-day builds, timelapses' },
  { id: 'mining', label: 'Mining B-roll', hint: 'caving, grinding, lofi' },
  { id: 'clutch', label: 'Clutch', hint: 'fights, chases, tension' },
  { id: 'death', label: 'Death sting', hint: 'hardcore wipe, fail' },
  { id: 'chapter', label: 'Chapter card', hint: 'day counters, transitions' },
  { id: 'outro', label: 'Outro', hint: 'send-off, subscribe beat' },
]

export const TRACKS: Track[] = [
  {
    id: 'px-epic-cinematic',
    title: 'Epic Cinematic search',
    artist: 'Pixabay Music',
    source: 'pixabay',
    kind: 'music',
    url: 'https://pixabay.com/music/search/epic%20cinematic/',
    moments: ['montage', 'clutch'],
    moods: ['epic', 'energetic', 'orchestral', 'trailer'],
    license: 'Free for commercial use · no attribution needed · save the track URL as Content-ID proof',
    free: true,
    gradient: ['#ff7a45', '#7a2b1d'],
    blurb: 'High-energy orchestral beds for 100-day montages and boss-fight peaks.',
  },
  {
    id: 'px-lofi-chill',
    title: 'Lofi Chill search',
    artist: 'Pixabay Music',
    source: 'pixabay',
    kind: 'music',
    url: 'https://pixabay.com/music/search/lofi%20chill/',
    moments: ['mining', 'chapter'],
    moods: ['chill', 'lofi', 'calm', 'grind'],
    license: 'Free for commercial use · no attribution needed · save the track URL as Content-ID proof',
    free: true,
    gradient: ['#4d7cff', '#1d2b7a'],
    blurb: 'Dusty loops that sit under caving, mining and long-grind commentary.',
  },
  {
    id: 'px-whoosh',
    title: 'Whoosh Transitions search',
    artist: 'Pixabay SFX',
    source: 'pixabay',
    kind: 'sfx',
    url: 'https://pixabay.com/sound-effects/search/whoosh%20transition/',
    moments: ['chapter', 'clutch'],
    moods: ['sweep', 'transition', 'impact'],
    license: 'Free for commercial use · no attribution needed',
    free: true,
    gradient: ['#22c1a3', '#0d4f45'],
    blurb: 'Sweeps and hits for day-counter cards, scene cuts and clutch saves.',
  },
  {
    id: 'px-death-sting',
    title: 'Dark Cinematic Sting search',
    artist: 'Pixabay SFX',
    source: 'pixabay',
    kind: 'sfx',
    url: 'https://pixabay.com/sound-effects/search/dark%20cinematic%20sting/',
    moments: ['death'],
    moods: ['dark', 'sting', 'hardcore', 'fail'],
    license: 'Free for commercial use · no attribution needed',
    free: true,
    gradient: ['#8b1e3f', '#2b0f1c'],
    blurb: 'Gut-punch stingers for hardcore wipes and fail compilations.',
  },
  {
    id: 'px-upbeat-outro',
    title: 'Upbeat Pop search',
    artist: 'Pixabay Music',
    source: 'pixabay',
    kind: 'music',
    url: 'https://pixabay.com/music/search/upbeat%20pop/',
    moments: ['outro', 'chapter'],
    moods: ['upbeat', 'happy', 'pop', 'send-off'],
    license: 'Free for commercial use · no attribution needed · save the track URL as Content-ID proof',
    free: true,
    gradient: ['#ffb547', '#7a4d1d'],
    blurb: 'Feel-good closers that carry the subscribe call-to-action.',
  },
  {
    id: 'px-ambient-cinematic',
    title: 'Ambient Cinematic search',
    artist: 'Pixabay Music',
    source: 'pixabay',
    kind: 'music',
    url: 'https://pixabay.com/music/search/ambient%20cinematic/',
    moments: ['mining', 'chapter'],
    moods: ['ambient', 'atmospheric', 'cave', 'slow'],
    license: 'Free for commercial use · no attribution needed · save the track URL as Content-ID proof',
    free: true,
    gradient: ['#6d5cff', '#241d5e'],
    blurb: 'Cavernous pads for deep-cave dives and slow chapter opens.',
  },
  {
    id: 'ep-featured',
    title: 'Featured Music',
    artist: 'Epidemic Sound',
    source: 'epidemic',
    kind: 'music',
    url: 'https://www.epidemicsound.com/music/featured/',
    moments: ['montage', 'outro', 'clutch'],
    moods: ['curated', 'trending', 'premium'],
    license: 'Paid: subscription or Single Track license · credit "Artist / Title / courtesy of www.epidemicsound.com"',
    free: false,
    gradient: ['#e8e8e8', '#3a3a3a'],
    blurb: 'The paid upgrade path: chart-safe tracks cleared for monetized videos.',
  },
  {
    id: 'ep-track-example',
    title: 'Epidemic track page',
    artist: 'Epidemic Sound',
    source: 'epidemic',
    kind: 'music',
    url: 'https://www.epidemicsound.com/track/gRqSaqdH2e',
    moments: ['montage', 'clutch'],
    moods: ['reference', 'example'],
    license: 'Paid: subscription or Single Track license · a /track/ link in the description counts as credit',
    free: false,
    gradient: ['#ff4d6d', '#4d0f22'],
    blurb: 'Example track page: title, BPM, stems and similar tracks live here.',
  },
]

export function rankTracks(moment: Moment | 'any', query: string): Track[] {
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2)
  return TRACKS.map((t) => {
    let score = 0
    if (moment !== 'any' && t.moments.includes(moment)) score += 3
    const hay = `${t.title} ${t.artist} ${t.blurb} ${t.moods.join(' ')} ${t.moments.join(' ')}`.toLowerCase()
    for (const tok of tokens) if (hay.includes(tok)) score += 1
    if (tokens.length === 0 && moment !== 'any') score += t.free ? 0.5 : 0
    return { t, score }
  })
    .sort((a, b) => b.score - a.score || Number(b.t.free) - Number(a.t.free))
    .map((s) => s.t)
}
