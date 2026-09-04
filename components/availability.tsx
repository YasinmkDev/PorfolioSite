import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Marquee } from '@/components/marquee'
import { Reveal } from '@/components/reveal'

const services = [
  {
    title: 'Build it with me',
    body: 'A full mobile app or dashboard from scoping to store release — design, front-end, and the API layer in between.',
  },
  {
    title: 'Join your team',
    body: 'Drop into an existing React Native or React codebase and ship features at your team’s pace, in your team’s patterns.',
  },
  {
    title: 'Wire it up',
    body: 'Your backend exists but the client does not talk to it properly. Give me the spec and I will make it correct.',
  },
]

const words = ['Available for remote work', 'Open to international clients', 'Let’s build something']

export function Availability() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-primary/[0.03]">
      {/* earth at night — literal support for "remote, international" */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/textures/world-bg.png"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_40%,var(--background)_100%)]" />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="relative mx-auto w-full max-w-[92rem] px-5 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="label-mono text-primary">Freelance · Remote</p>
            <p className="text-edge mt-5 max-w-[24ch] font-serif text-[clamp(1.9rem,4.4vw,3.4rem)]">
              Three ways to work together.
            </p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5 md:justify-self-end">
            <a
              href="#contact"
              data-cursor="Let's talk"
              className="group inline-flex items-center gap-3 rounded-sm border border-primary/40 px-6 py-4 text-sm font-medium text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
            >
              Check availability
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 110}
              className="group relative flex h-full flex-col gap-3.5 bg-background p-6 sm:p-7 transition-all duration-300 hover:bg-card hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded bg-primary/10 border border-primary/30 font-mono text-xs font-bold text-primary">
                  {`0${i + 1}`}
                </span>
                <span className="h-1 w-6 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />
              </div>
              <h3 className="font-serif text-2xl tracking-tight text-foreground transition-colors group-hover:text-primary">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Marquee
        items={words}
        duration="30s"
        className="border-t border-border py-6"
        renderItem={(word) => (
          <span className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 font-serif text-[clamp(1.8rem,4.5vw,3.5rem)] text-foreground/25">
            {word}
            <span className="size-2 shrink-0 rounded-full bg-primary" />
          </span>
        )}
      />
    </section>
  )
}
