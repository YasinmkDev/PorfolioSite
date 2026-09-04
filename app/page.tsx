import { About } from '@/components/about'
import { Availability } from '@/components/availability'
import { Contact } from '@/components/contact'
import { CustomCursor } from '@/components/custom-cursor'
import { Experience } from '@/components/experience'
import { Hero } from '@/components/hero'
import { Preloader } from '@/components/preloader'
import { Projects } from '@/components/projects'
import { SiteNav } from '@/components/site-nav'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Stack } from '@/components/stack'

export default function Page() {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <SiteNav />
      <main id="main" className="relative">
        <Hero />
        <Projects />
        <About />
        <Stack />
        <Experience />
        <Availability />
        <Contact />
      </main>
    </SmoothScroll>
  )
}
