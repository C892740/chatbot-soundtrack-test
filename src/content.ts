// All copy lives here so the page can be re-themed for a product without
// touching layout. Sections read from this file; remove a section by deleting
// it from HomeView.

export const brand = {
  name: 'BlockBard',
  tagline: 'Soundtracks for Minecraft videos',
}

export const nav = {
  links: [
    { label: 'Product', href: '#features' },
    { label: 'How it works', href: '#how' },
    { label: 'Customers', href: '#customers' },
    { label: 'Pricing', href: '#pricing' },
  ],
  signIn: { label: 'See pricing', href: '#pricing' },
  cta: { label: 'Get 3 free tries', href: '#cta' },
}

export const hero = {
  badge: '3 free tries · no account needed',
  title: ['Score your Minecraft video', 'without the copyright claim'],
  highlight: 'copyright claim',
  description:
    'BlockBard writes your hook, outline and pacing, then finds claim-safe tracks and SFX for every scene. Built for Minecraft YouTubers, priced for upload schedules.',
  primary: { label: 'Score my next video', href: '#cta' },
  secondary: { label: 'See how it works', href: '#how' },
  footnote: 'Free guest pass: 3 chat tries + 3 finder tries. No card required.',
}

export const logos = [
  'PixelCraft',
  'BlockyBits',
  'CreeperCam',
  'RedstoneLab',
  'EnderPlays',
  'DiamondDash',
  'VillagerVids',
  'NetherNate',
]

export const features = {
  eyebrow: 'Everything in one tab',
  title: 'Script it. Score it. Ship it.',
  description: 'Chat writes the video. The finder scores it. Both tuned for Minecraft pacing, both free to try.',
  items: [
    {
      key: 'chat',
      title: 'AI scripts with 3 director personas',
      description: 'Hooks, beats, chapters and a CTA, paced for 8–14 minute videos. Pick Hype, Chill or Lore and the whole script follows.',
      span: 2,
    },
    {
      key: 'finder',
      title: 'A soundtrack finder, not a 40-tab hunt',
      description: 'Search by mood, not genre: “calm build montage”, “tense cave scene”, “boss-fight drop”.',
      span: 1,
    },
    {
      key: 'license',
      title: 'Licensing you can actually read',
      description: 'Every pick traces to Pixabay or Epidemic Sound terms, with attribution and claim-handling notes attached.',
      span: 1,
    },
    {
      key: 'guest',
      title: 'Free to try, and your taste teaches it',
      description:
        '3 guest tries for chat and the finder, no account. The tracks you keep feed our training picks — similar vibes next time, different ones when you ask.',
      span: 2,
    },
  ],
}

export const steps = {
  eyebrow: 'How it works',
  title: 'From idea to upload in three moves',
  items: [
    {
      title: 'Describe the video',
      description: '“Cave-diving episode, tense but family-friendly, 10 minutes.” That is the whole brief.',
    },
    {
      title: 'Get script plus tracks',
      description: 'A hook, beat map and chapters — each scene already paired with a licensed track or SFX.',
    },
    {
      title: 'Publish with confidence',
      description: 'License notes travel with every pick, so Content ID disputes start with paperwork, not panic.',
    },
  ],
}

export const showcase = {
  eyebrow: 'One bard, three acts',
  title: 'Every part of your video, scored',
  tabs: [
    {
      key: 'chat',
      title: 'Script chat',
      description: 'Three personas write hooks, pacing and chapters for your series.',
    },
    {
      key: 'tracks',
      title: 'Track cards',
      description: 'Pixabay and Epidemic picks matched to each scene, not a playlist dump.',
    },
    {
      key: 'license',
      title: 'License receipts',
      description: 'Terms, attribution and claim-handling notes attached to every track.',
    },
  ],
}

export const metrics = [
  { value: 3, suffix: '', decimals: 0, label: 'Free tries, no login' },
  { value: 8, suffix: '', decimals: 0, label: 'Curated starter tracks' },
  { value: 2, suffix: '', decimals: 0, label: 'Licensed music sources' },
  { value: 3, suffix: '', decimals: 0, label: 'Director personas' },
]

export const testimonials = {
  eyebrow: 'Customers',
  title: 'Channels that stopped fearing Content ID',
  items: [
    {
      quote:
        'The beat map alone is worth it. I describe the episode, and every scene already has music that fits — I just swap in my gameplay.',
      name: 'Ash K.',
      role: '860K subs · SMP series',
      hue: 120,
    },
    {
      quote: 'Three personas sounds like a gimmick until Lore mode writes your finale narration better than you do.',
      name: 'Marta R.',
      role: '320K subs · Story builds',
      hue: 20,
    },
    {
      quote: 'I used to keep 40 tabs open for music. Now I search “tense cave scene” once and move on with my life.',
      name: 'Dev P.',
      role: '1.1M subs · Hardcore runs',
      hue: 250,
    },
    {
      quote: 'The license notes are the feature nobody else has. My first dispute took ten minutes because the paperwork was already there.',
      name: 'Jonas W.',
      role: '540K subs · Redstone contraptions',
      hue: 300,
    },
    {
      quote: 'Guest pass hooked me — three free scripts, zero signup. I paid before the third video was even edited.',
      name: 'Priya N.',
      role: '210K subs · Cozy builds',
      hue: 170,
    },
    {
      quote: 'It keeps suggesting tracks in the vibe my viewers actually watch through. My retention graph noticed before I did.',
      name: 'Lucas F.',
      role: '690K subs · Challenge videos',
      hue: 40,
    },
  ],
}

export const pricing = {
  eyebrow: 'Pricing',
  title: 'Cheaper than one claimed video',
  description: 'Start free. Upgrade when the upload schedule does.',
  yearlyNote: 'Two months free',
  tiers: [
    {
      name: 'Guest',
      monthly: 0,
      yearly: 0,
      description: 'For trying the bard on your next video.',
      cta: 'Start free now',
      features: ['3 chat tries', '3 soundtrack finder tries', 'Pixabay starter tracks', 'License notes included'],
    },
    {
      name: 'Creator',
      monthly: 9,
      yearly: 7,
      description: 'For weekly uploaders with a series to score.',
      cta: 'Score every upload',
      popular: true,
      features: [
        'Unlimited chat scripts',
        'Unlimited finder searches',
        'Per-scene beat maps',
        'All 3 director personas',
        'Your picks train future suggestions',
      ],
    },
    {
      name: 'Studio',
      monthly: 24,
      yearly: 20,
      description: 'For teams and networks running channels.',
      cta: 'Talk to us',
      features: ['Everything in Creator', '5 seats included', 'Shared track libraries', 'Priority support'],
    },
  ],
}

export const faq = {
  title: 'Questions, answered',
  items: [
    {
      q: 'Is the music really safe from copyright claims?',
      a: 'Every track links to its source license. Pixabay tracks are free for monetized YouTube with no attribution, but Pixabay does not pre-clear Content ID — if a contributor registered the track, you dispute with the license link we attach. Epidemic Sound tracks need an active Epidemic subscription with your channel safelisted; then claims are released automatically. Nothing here is “100% claim-proof” — that promise does not exist — but every pick ships with the paperwork to win disputes fast.',
    },
    {
      q: 'Do I need an account?',
      a: 'No. The guest pass gives you 3 chat tries and 3 finder tries with nothing to sign. Accounts arrive with paid plans.',
    },
    {
      q: 'What happens after my 3 free tries?',
      a: 'Chat and the finder pause until you pick a plan. Your previous scripts and picks stay visible so you can pick up where you left off.',
    },
    {
      q: 'Can I use Minecraft’s own music (C418, Lena Raine)?',
      a: 'Not through us. Mojang does not clear its licensed music for creators, so BlockBard only suggests library tracks styled for Minecraft videos — calm piano builds, cave ambience, adventure folk — that are licensed for monetized YouTube.',
    },
    {
      q: 'How does it learn my taste?',
      a: 'The tracks you keep and the ones you skip feed our suggestion training: more of what your viewers watch through, different directions when you ask. Paid plans make every pick a training vote.',
    },
    {
      q: 'Which music sources do you use?',
      a: 'Pixabay for free, no-attribution tracks and Epidemic Sound for its claim-safe catalog (requires your own Epidemic subscription, safelisted to your channel). Both open as curved link cards from the finder so you always land on the real license page.',
    },
  ],
}

export const cta = {
  title: 'Your next video deserves a score',
  description: 'Join Minecraft creators scripting and scoring with BlockBard.',
  placeholder: 'you@yourchannel.com',
  button: 'Get my 3 free tries',
  success: 'You are on the list. Watch your inbox.',
}

export const footer = {
  blurb: 'Soundtracks for Minecraft videos.',
  columns: [
    { title: 'Product', links: ['AI chat', 'Soundtrack finder', 'Pricing', 'Changelog'] },
    { title: 'Sources', links: ['Pixabay', 'Epidemic Sound', 'Licensing notes'] },
    { title: 'Company', links: ['About', 'Blog', 'Contact', 'Press'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Licenses'] },
  ],
  legal: `© ${new Date().getFullYear()} BlockBard. Guest demos only — verify every track license before publishing.`,
}
