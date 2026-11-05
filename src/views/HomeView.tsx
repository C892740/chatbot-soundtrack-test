import { Cta } from '../sections/Cta'
import { Faq } from '../sections/Faq'
import { Features } from '../sections/Features'
import { Footer } from '../sections/Footer'
import { Hero } from '../sections/Hero'
import { LogoCloud } from '../sections/LogoCloud'
import { Metrics } from '../sections/Metrics'
import { Nav } from '../sections/Nav'
import { Pricing } from '../sections/Pricing'
import { Showcase } from '../sections/Showcase'
import { Steps } from '../sections/Steps'
import { Testimonials } from '../sections/Testimonials'

// The original landing page, preserved as the Home view.
export function HomeView() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <Steps />
        <Showcase />
        <Metrics />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
