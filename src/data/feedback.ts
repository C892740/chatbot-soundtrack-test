// TRAINING HOOK (v0.2.0): the shape of the performance data you will feed
// the recommender later. Each entry links a used track to how the video did.
// Future: POST these to /api/feedback; the AI then suggests tracks
// "similar" to high-retention winners or "different" when a vibe flops.
export type TrackFeedback = {
  trackId: string // matches Track.id in src/data/tracks.ts
  videoTitle: string
  views: number
  retentionPct: number // average percentage viewed
  verdict: 'similar' | 'different' // want more like this, or a change
  note?: string
}

export const FEEDBACK_EXAMPLES: TrackFeedback[] = [
  {
    trackId: 'px-epic-cinematic',
    videoTitle: '100 Days Hardcore — episode 4',
    views: 48200,
    retentionPct: 61,
    verdict: 'similar',
    note: 'Montage at 3:12 held 78% — find more orchestral drops.',
  },
  {
    trackId: 'px-lofi-chill',
    videoTitle: 'Caving for 6 hours straight',
    views: 12400,
    retentionPct: 38,
    verdict: 'different',
    note: 'Too sleepy under commentary — try punchier mining beds.',
  },
]

export const FEEDBACK_ENDPOINT = '/api/feedback (planned)'
