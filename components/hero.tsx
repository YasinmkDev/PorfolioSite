'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Hero3DPolygon } from '@/components/hero-3d-polygon'
import { Marquee } from '@/components/marquee'
import { useSiteLoaded } from '@/hooks/use-site-loaded'

const marquee = [
  'React Native',
  'React',
  'TypeScript',
  'Expo',
  'Firebase',
  'Next.js',
  'REST / Swagger',
  'Node',
  'MongoDB',
  'NativeWind',
  'Flutter',
]

function LocalClock() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Karachi',
        hour12: false,
      }).format(new Date())

    setTime(format())
    const id = setInterval(() => setTime(format()), 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-xs tracking-tight text-foreground">
      {time ?? '--:--'}
      <span className="ml-1 text-muted-foreground">PKT · UTC+5</span>
    </span>
  )
}

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null)
  /* hold the entrance until the preloader curtain starts lifting */
  const mounted = useSiteLoaded()

  const enter = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translate3d(0,0,0)' : 'translate3d(0,22px,0)',
    transition: `opacity 1000ms var(--ease-out-expo) ${delay}ms, transform 1000ms var(--ease-out-expo) ${delay}ms`,
  })

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-16"
    >
      {/* Ambient background aura (zero-cost native gradient layer without blur filters) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 size-[800px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(198,255,71,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-[35%] -right-[10%] size-[600px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.04)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[92rem] flex-1 flex-col justify-center px-5 pb-10 pt-16 sm:px-8 lg:px-12">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.95fr)] lg:gap-8">
          <div>
            <div
              className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2"
              style={enter(120)}
            >
              <span className="label-mono">Yasin Malak</span>
              <span className="h-px w-8 bg-border" />
              <span className="label-mono">React Native / React Engineer</span>
            </div>

            <h1 className="text-edge max-w-[22ch] font-serif text-[clamp(3.1rem,11.5vw,10.5rem)] font-normal">
              <span className="block overflow-hidden">
                <span className="block" style={enter(220)}>
                  Interfaces
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block italic text-primary" style={enter(320)}>
                  engineered
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block" style={enter(420)}>
                  to ship.
                </span>
              </span>
            </h1>
          </div>

          <div
            className="relative mx-auto mt-6 flex w-full max-w-xl items-center justify-center lg:mt-0 lg:block"
            style={enter(380)}
          >
            <Hero3DPolygon />
          </div>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
          <p
            className="max-w-xl text-pretty leading-relaxed text-muted-foreground md:col-span-6 lg:col-span-5"
            style={enter(540)}
          >
            Final-year Computer Science student and working React Native / React developer. I build
            cross-platform mobile apps, business dashboards, and the API layers that hold them
            together — production code, not prototypes.
          </p>

          <div
            className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7"
            style={enter(640)}
          >
            <a
              href="#work"
              data-cursor="See work"
              className="group relative overflow-hidden rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              <span className="relative flex items-center gap-2 transition-colors duration-500 group-hover:text-background">
                Selected work
                <ArrowDown className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5" />
              </span>
            </a>
            <a
              href="#contact"
              data-cursor="Email"
              className="group flex items-center gap-2 rounded-sm border border-border px-6 py-3.5 text-sm font-medium transition-colors duration-500 hover:border-primary/50 hover:text-primary"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* base strip */}
      <div className="relative border-y border-border bg-background/90">
        <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-primary motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs text-muted-foreground">
              Open to remote contracts — overlapping EU &amp; US mornings
            </span>
          </div>
          <LocalClock />
        </div>

        <Marquee
          items={marquee}
          duration="38s"
          className="border-t border-border py-3"
          trackClassName="gap-8 pr-8"
          renderItem={(item) => (
            <span className="flex shrink-0 items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {item}
              <span className="size-1 rounded-full bg-primary/60" />
            </span>
          )}
        />
      </div>
    </section>
  )
}
