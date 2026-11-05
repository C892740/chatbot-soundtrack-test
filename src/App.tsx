import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { Sidebar } from './components/Sidebar'
import { useGuestTries } from './lib/guest'
import { ChatView } from './views/ChatView'
import { HomeView } from './views/HomeView'
import { SoundtracksView } from './views/SoundtracksView'

export type View = 'home' | 'chat' | 'sounds'

// BlockBard app shell: vertical nav rail (Home / Chat / Soundtracks & SFX)
// with the landing page preserved as the Home view.
export function App() {
  const [view, setView] = useState<View>('chat')
  const [drawer, setDrawer] = useState(false)
  const left = useGuestTries()

  const go = (v: View) => {
    setView(v)
    setDrawer(false)
  }

  return (
    <div className="flex h-dvh bg-bg text-fg">
      <aside className="hidden w-[272px] shrink-0 border-r border-line md:block">
        <Sidebar view={view} onNavigate={go} triesLeft={left} />
      </aside>

      {drawer && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-[300px] max-w-[85vw] bg-surface shadow-glow">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawer(false)}
              className="absolute right-2 top-2 grid size-9 place-items-center rounded-control text-muted hover:bg-white/[0.06] hover:text-fg"
            >
              <X className="size-5" />
            </button>
            <Sidebar view={view} onNavigate={go} triesLeft={left} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-line px-3 md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawer(true)}
            className="grid size-9 place-items-center rounded-control text-fg hover:bg-white/[0.06]"
          >
            <Menu className="size-5" />
          </button>
          <span className="text-[15px] font-semibold tracking-tight">BlockBard</span>
          <span className="ml-auto rounded-full bg-white/[0.06] px-2.5 py-1 text-[12px] text-muted">
            {left} of 3 tries
          </span>
        </div>

        {view === 'home' && (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <HomeView />
          </div>
        )}
        {view === 'chat' && (
          <div className="min-h-0 flex-1">
            <ChatView />
          </div>
        )}
        {view === 'sounds' && (
          <div className="min-h-0 flex-1">
            <SoundtracksView />
          </div>
        )}
      </div>
    </div>
  )
}
