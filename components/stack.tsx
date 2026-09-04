'use client'

import { useState } from 'react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

type Tech = { name: string; note: string; level: number }

const groups: { title: string; items: Tech[] }[] = [
  {
    title: 'Mobile',
    items: [
      { name: 'React Native', note: 'Daily driver. Navigation, native modules, store releases.', level: 0.95 },
      { name: 'Expo', note: 'EAS builds, OTA updates, config plugins, dev clients.', level: 0.9 },
      { name: 'NativeWind', note: 'Tokenised styling shared between design and code.', level: 0.88 },
      { name: 'Flutter', note: 'Production POS work — cross-platform desktop and mobile builds.', level: 0.7 },
    ],
  },
  {
    title: 'Web',
    items: [
      { name: 'React', note: 'Component architecture, state boundaries, render discipline.', level: 0.94 },
      { name: 'Next.js', note: 'App Router, server components, route handlers, deployment.', level: 0.85 },
      { name: 'TypeScript', note: 'Strict mode by default across client and API contracts.', level: 0.9 },
      { name: 'Tailwind CSS', note: 'Design systems built on tokens, not one-off utilities.', level: 0.9 },
    ],
  },
  {
    title: 'Backend & data',
    items: [
      { name: 'Node / Express', note: 'REST services, middleware, auth and validation layers.', level: 0.8 },
      { name: 'MongoDB / Mongoose', note: 'Schema design, indexing, lean queries for list views.', level: 0.8 },
      { name: 'Firebase', note: 'Auth, Firestore, storage, push notifications, rules.', level: 0.86 },
      { name: 'REST / Swagger', note: 'Typed clients straight from an OpenAPI definition.', level: 0.92 },
    ],
  },
  {
    title: 'Craft',
    items: [
      { name: 'Git / PR flow', note: 'Reviewable commits, branch hygiene, release tags.', level: 0.88 },
      { name: 'UI animation', note: 'Reanimated on mobile, CSS and canvas on web.', level: 0.84 },
      { name: 'Figma handoff', note: 'Reading a file properly — spacing, states, edge cases.', level: 0.82 },
      { name: 'Debugging', note: 'Native build failures, platform quirks, performance profiling.', level: 0.87 },
    ],
  },
]

export function Stack() {
  const [hovered, setHovered] = useState<Tech>(groups[0].items[0])

  return (
    <section id="stack" className="relative border-y border-border bg-card/25">
      <div className="mx-auto w-full max-w-[92rem] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <SectionHeading
          index="03"
          label="Stack"
          title="The tools, and what I actually do with them."
          accentWords={['actually']}
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:mt-20 md:grid-cols-4">
          {groups.map((group, gi) => (
            <div key={group.title} className="flex flex-col bg-background">
              <div className="border-b border-border px-5 py-4">
                <span className="label-mono text-primary">{group.title}</span>
              </div>
              <ul className="flex flex-1 flex-col">
                {group.items.map((tech, ti) => (
                  <li key={tech.name}>
                    <Reveal delay={gi * 70 + ti * 55} distance={12}>
                      <button
                        type="button"
                        onClick={() => setHovered(tech)}
                        onMouseEnter={() => setHovered(tech)}
                        onFocus={() => setHovered(tech)}
                        data-cursor=""
                        className={cn(
                          'group relative flex w-full flex-col gap-2 border-b border-border/60 px-5 py-4 text-left transition-colors duration-200 last:border-0 cursor-pointer',
                          hovered.name === tech.name ? 'bg-card/90' : 'hover:bg-card/50',
                        )}
                      >
                        <span className="flex items-baseline justify-between gap-3">
                          <span
                            className={cn(
                              'text-sm font-medium tracking-tight transition-colors duration-200',
                              hovered.name === tech.name ? 'text-primary font-semibold' : 'text-foreground/90',
                            )}
                          >
                            {tech.name}
                          </span>
                          <span className="font-mono text-[0.65rem] tabular-nums text-muted-foreground">
                            {Math.round(tech.level * 100)}%
                          </span>
                        </span>
                        <span className="block h-1 w-full rounded-full bg-border/60 overflow-hidden">
                          <span
                            className={cn(
                              'block h-full origin-left transition-all duration-500 ease-[var(--ease-out-expo)]',
                              hovered.name === tech.name ? 'bg-primary' : 'bg-primary/40',
                            )}
                            style={{
                              transform: `scaleX(${hovered.name === tech.name ? tech.level : tech.level * 0.6})`,
                            }}
                          />
                        </span>
                      </button>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal
          delay={120}
          className="mt-6 flex min-h-24 flex-col justify-center rounded-md border border-border bg-background p-5 sm:flex-row sm:items-center sm:gap-8 shadow-sm"
        >
          <div className="flex items-center gap-2.5 shrink-0 sm:w-48">
            <span className="size-2 rounded-full bg-primary motion-safe:animate-pulse" />
            <span className="label-mono font-bold text-primary">{hovered.name}</span>
          </div>
          <p key={hovered.name} className="mt-2 text-pretty leading-relaxed text-foreground/90 text-sm sm:mt-0">
            {hovered.note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
