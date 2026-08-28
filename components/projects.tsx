'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Minus, Plus, Maximize2, Sparkles, Layers } from 'lucide-react'
import {
  ProjectGlassGalleryModal,
  GallerySlide,
} from '@/components/project-glass-gallery-modal'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

type Project = {
  id: string
  name: string
  kind: string
  year: string
  summary: string
  problem: string
  role: string
  stack: string[]
  challenges: { title: string; body: string }[]
  outcome: string
  slides: GallerySlide[]
}

const projects: Project[] = [
  {
    id: 'taskflow',
    name: 'TaskFlow',
    kind: 'Full-stack web app',
    year: '2025',
    summary: 'A production-shaped task manager: authenticated workspaces, real CRUD, and a UI that stays fast as the board fills up.',
    problem:
      'Team task tools are either too heavy or too shallow. I set out to build the honest middle: workspaces, projects, tasks and assignments with the boring parts done properly — auth, validation, and permissions.',
    role: 'Sole engineer and designer, front-end through database. Final year project, built to production conventions rather than assignment conventions.',
    stack: ['Next.js', 'TypeScript', 'Node / Express', 'MongoDB', 'Mongoose', 'JWT auth'],
    challenges: [
      {
        title: 'Auth that holds up',
        body: 'Token-based sessions with refresh handling, route protection on both the client and the Express layer, and ownership checks on every mutation so a user can never touch another workspace by guessing an id.',
      },
      {
        title: 'Data modelling for speed',
        body: 'Mongoose schemas with indexed lookups and lean, projected queries for board views, so loading a dense project does not turn into dozens of round trips.',
      },
    ],
    outcome:
      'A complete, deployable app with sign-up, workspaces, task lifecycle and assignment — and a codebase I can hand to another developer without a translation session.',
    slides: [
      {
        src: '/projects/taskflow.png',
        alt: 'TaskFlow workspace board',
        title: 'Workspace Kanban Board',
        caption: 'Interactive task management with lifecycle state columns, assignees, and filters.',
        tag: 'Kanban Board',
      },
      {
        src: '/projects/api-integration.png',
        alt: 'TaskFlow API & auth layer',
        title: 'Session & Auth Pipeline',
        caption: 'JWT token rotation, server-side middleware protection, and workspace tenant isolation.',
        tag: 'API Architecture',
      },
      {
        src: '/projects/select-pos.png',
        alt: 'TaskFlow data modeling',
        title: 'Project Data Modeling',
        caption: 'High-speed indexed lookups with lean projected queries for sub-second board loads.',
        tag: 'Data Pipeline',
      },
      {
        src: '/projects/swiftbite.png',
        alt: 'TaskFlow responsive interface',
        title: 'Responsive Workspace UI',
        caption: 'Optimistic UI mutations with automatic rollback on network failure.',
        tag: 'UI States',
      },
    ],
  },
  {
    id: 'swiftbite',
    name: 'SwiftBite',
    kind: 'Commercial React Native template',
    year: '2025',
    summary: 'A food-delivery app UI kit I designed, built and sell — packaged so another developer can ship from it on day one.',
    problem:
      'Most mobile templates on the market look good in screenshots and fall apart in code: hardcoded values, no theming, broken on the second device size. I wanted to sell the opposite.',
    role: 'Product designer and engineer. I set the visual language, built every screen, wrote the setup documentation, and shipped it as a purchasable product.',
    stack: ['React Native', 'Expo', 'NativeWind', 'TypeScript', 'React Navigation'],
    challenges: [
      {
        title: 'A theme system, not a colour list',
        body: 'Tokenised typography, spacing and colour through NativeWind so a buyer can rebrand the whole kit from one file — including dark mode — without touching component internals.',
      },
      {
        title: 'Layouts that survive real devices',
        body: 'Safe-area and notch handling, keyboard-aware checkout flows, and list virtualisation tuned so scrolling stays smooth on low-end Android as well as iOS.',
      },
    ],
    outcome:
      'A sellable product rather than a portfolio demo: documented, themeable, and structured so buyers extend it instead of fighting it.',
    slides: [
      {
        src: '/projects/swiftbite.png',
        alt: 'SwiftBite mobile screens',
        title: 'Restaurant & Checkout Screens',
        caption: 'Multi-screen flow: browse feed, restaurant menu with modifiers, and multi-step checkout.',
        tag: 'Mobile Screens',
      },
      {
        src: '/projects/select-pos.png',
        alt: 'SwiftBite performance optimization',
        title: 'Low-Latency Virtualized Lists',
        caption: 'Tuned flatlist memory footprints for smooth 60fps scrolling on low-end hardware.',
        tag: 'Performance',
      },
      {
        src: '/projects/api-integration.png',
        alt: 'SwiftBite cart state management',
        title: 'NativeWind Theme Tokens',
        caption: 'Unified design tokens allowing whole-app rebranding and dark mode in a single configuration file.',
        tag: 'Theming System',
      },
      {
        src: '/projects/taskflow.png',
        alt: 'SwiftBite cross-platform adaptation',
        title: 'Universal Safe-Area Layouts',
        caption: 'Edge-to-edge layout adaptation across both iOS notches and diverse Android safe-areas.',
        tag: 'Cross-Platform',
      },
    ],
  },
  {
    id: 'select-pos',
    name: 'select-pos',
    kind: 'Production POS · professional work',
    year: 'Ongoing',
    summary: 'A cross-platform point-of-sale system in active commercial use, where a failed build means a shop cannot take payments.',
    problem:
      'Retail POS software has to run on whatever hardware the client already owns, work offline, and never lose a transaction. The stakes are operational, not cosmetic.',
    role: 'Developer on the professional team — feature work, platform-specific debugging, and release maintenance on an existing production codebase.',
    stack: ['Flutter', 'Dart', 'Desktop + mobile targets', 'Local persistence', 'Git-based release flow'],
    challenges: [
      {
        title: 'Desktop-native dependency handling',
        body: 'Plugins that behave on mobile routinely break on desktop targets. I traced and resolved native dependency and build-configuration failures so the same codebase compiles cleanly across platforms.',
      },
      {
        title: 'Working inside someone else’s architecture',
        body: 'Reading a large, live codebase and shipping changes that match its existing patterns — the skill that actually matters when a client hands you their repository.',
      },
    ],
    outcome:
      'Real production engineering experience: legacy code, cross-platform builds, and a deployment where regressions have immediate business cost.',
    slides: [
      {
        src: '/projects/select-pos.png',
        alt: 'select-pos terminal UI',
        title: 'Cashier Terminal Interface',
        caption: 'High-speed product grid, real-time line item calculations, and instant tender flow.',
        tag: 'Counter Terminal',
      },
      {
        src: '/projects/taskflow.png',
        alt: 'select-pos offline sync logic',
        title: 'Offline-First Persistence',
        caption: 'Local database queue that commits sales offline and automatically synchronizes when online.',
        tag: 'Offline Sync',
      },
      {
        src: '/projects/api-integration.png',
        alt: 'select-pos desktop platform builds',
        title: 'Cross-Platform Compilation',
        caption: 'Shared Dart codebase targeting Windows, macOS, Android tablets, and thermal receipt printers.',
        tag: 'Native Platform',
      },
      {
        src: '/projects/swiftbite.png',
        alt: 'select-pos release flow',
        title: 'Git-Based Release Pipeline',
        caption: 'Zero-downtime regression testing ensuring critical register workflows never fail.',
        tag: 'Release Flow',
      },
    ],
  },
  {
    id: 'api-integration',
    name: 'API Integration Practice',
    kind: 'Dashboards & mobile clients',
    year: '2024 — now',
    summary: 'Business dashboards and mobile apps wired into existing backends — usually starting from nothing but a Swagger page and a staging URL.',
    problem:
      'Clients rarely need a backend built. They need someone who can read their documentation and make the front-end talk to it correctly, including the endpoints the docs got wrong.',
    role: 'Integration engineer across several dashboard and mobile projects, spanning Firebase-backed apps and documented REST services.',
    stack: ['REST', 'Swagger / OpenAPI', 'TypeScript clients', 'Firebase', 'React Query patterns'],
    challenges: [
      {
        title: 'Typed clients from the spec',
        body: 'I generate or hand-write typed request and response layers straight from the OpenAPI definition, so a contract change surfaces as a compile error instead of a production bug.',
      },
      {
        title: 'Failure states as a feature',
        body: 'Retries with backoff, token refresh on 401, optimistic updates that roll back, and empty and error states designed rather than improvised.',
      },
    ],
    outcome:
      'I can be productive against an unfamiliar API in a day, which is usually the difference between hiring a contractor and onboarding one.',
    slides: [
      {
        src: '/projects/api-integration.png',
        alt: 'API Integration Dashboard and Client',
        title: 'Typed Client & Analytics',
        caption: 'Strictly typed OpenAPI contract clients connected to live metrics dashboards.',
        tag: 'Type-Safe Client',
      },
      {
        src: '/projects/taskflow.png',
        alt: 'API retry and backoff pipeline',
        title: 'Resilient Network Layer',
        caption: 'Exponential backoff retry loops, 401 refresh interceptors, and typed error guards.',
        tag: 'Resilience Layer',
      },
      {
        src: '/projects/select-pos.png',
        alt: 'API Query Cache',
        title: 'Optimistic State Synchronization',
        caption: 'Intelligent query cache invalidation preventing stale UI state and redundant queries.',
        tag: 'State Sync',
      },
      {
        src: '/projects/swiftbite.png',
        alt: 'API Contract Testing',
        title: 'Contract Drift Validation',
        caption: 'Automated contract drift monitoring detecting breaking schema revisions early.',
        tag: 'Contract Testing',
      },
    ],
  },
]

export function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].id)
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)
  const [modalInitialIndex, setModalInitialIndex] = useState(0)

  const openGallery = (project: Project, index = 0) => {
    setActiveModalProject(project)
    setModalInitialIndex(index)
  }

  const closeGallery = () => {
    setActiveModalProject(null)
  }

  return (
    <section
      id="work"
      className="relative mx-auto w-full max-w-[92rem] px-5 py-24 sm:px-8 md:py-32 lg:px-12"
    >
      <SectionHeading
        index="01"
        label="Selected work"
        title="Four projects, four kinds of proof."
        accentWords={['proof']}
      />

      <div className="mt-14 border-t border-border md:mt-20">
        {projects.map((project, i) => {
          const isOpen = open === project.id
          const primarySlide = project.slides[0]

          return (
            <Reveal key={project.id} delay={i * 90} distance={18}>
              <article
                className={cn(
                  'group relative border-b border-border transition-colors duration-500',
                  isOpen && 'bg-card/40',
                )}
              >
                <span
                  className={cn(
                    'absolute left-0 top-0 h-full w-px origin-top bg-primary transition-transform duration-700 ease-[var(--ease-out-expo)]',
                    isOpen ? 'scale-y-100' : 'scale-y-0',
                  )}
                />

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${project.id}`}
                  data-cursor={isOpen ? 'Close' : 'Read'}
                  className="flex w-full items-start gap-5 px-1 py-7 text-left sm:gap-8 sm:px-4 md:py-9"
                >
                  <span className="label-mono mt-2 shrink-0 tabular-nums transition-colors duration-500 group-hover:text-primary">
                    {`0${i + 1}`}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <span className="label-mono">{project.kind}</span>
                      <h3 className="text-edge font-serif text-[clamp(1.9rem,4.6vw,3.4rem)] transition-colors duration-500 group-hover:text-primary">
                        {project.name}
                      </h3>
                    </div>
                    <p
                      className={cn(
                        'max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground transition-opacity duration-500 md:text-base',
                        isOpen && 'text-foreground/80',
                      )}
                    >
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <span className="label-mono hidden tabular-nums sm:block">{project.year}</span>
                    <span
                      className={cn(
                        'flex size-8 items-center justify-center rounded-full border transition-colors duration-500',
                        isOpen
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-muted-foreground group-hover:border-primary/60 group-hover:text-primary',
                      )}
                    >
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </div>
                </button>

                <div
                  id={`panel-${project.id}`}
                  className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="grid gap-8 px-1 pb-10 sm:px-4 md:grid-cols-12 md:gap-10"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                        transition:
                          'opacity 600ms var(--ease-out-expo) 120ms, transform 600ms var(--ease-out-expo) 120ms',
                      }}
                    >
                      <div className="flex flex-col gap-7 md:col-span-6 md:pl-14">
                        <Field label="The problem">{project.problem}</Field>
                        <Field label="My role">{project.role}</Field>

                        <div className="flex flex-col gap-4">
                          <span className="label-mono">What I solved</span>
                          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                            {project.challenges.map((c) => (
                              <div key={c.title} className="flex flex-col gap-2 bg-background p-4">
                                <h4 className="text-sm font-medium tracking-tight text-primary">
                                  {c.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                  {c.body}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-7 md:col-span-6">
                        {/* Interactive Glassmorphic Project Image Card */}
                        {isOpen ? (
                          <div
                            onClick={() => openGallery(project, 0)}
                            className="group/gallery relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-card cursor-pointer"
                          >
                            <Image
                              src={primarySlide.src}
                              alt={primarySlide.alt}
                              fill
                              sizes="(min-width: 768px) 45vw, 100vw"
                              priority={i === 0}
                              className="object-cover object-top transition-all duration-700 ease-[var(--ease-out-expo)] group-hover/gallery:scale-105"
                            />

                            {/* Dark shade gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

                            {/* Floating Glassmorphic Click Prompt */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover/gallery:opacity-100 bg-background/40 backdrop-blur-xs">
                              <div className="flex items-center gap-2.5 rounded-full border border-primary/40 bg-card/90 px-4 py-2 text-xs font-mono text-foreground backdrop-blur-md shadow-2xl transition-transform duration-300 group-hover/gallery:scale-105">
                                <Sparkles className="size-3.5 text-primary" />
                                <span className="font-medium">Open 3D Glass Gallery</span>
                                <Maximize2 className="size-3 text-muted-foreground" />
                              </div>
                            </div>

                            {/* Top Badge & Slide Count Indicator */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                              <span className="rounded-full bg-background/80 px-2.5 py-1 font-mono text-[0.65rem] text-primary border border-border/80 backdrop-blur-md">
                                {primarySlide.tag}
                              </span>
                              <span className="rounded-full bg-background/80 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground border border-border/80 backdrop-blur-md flex items-center gap-1">
                                <Layers className="size-3 text-primary" />
                                {`${project.slides.length} Screens`}
                              </span>
                            </div>

                            {/* Bottom Caption */}
                            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-muted-foreground pointer-events-none">
                              <span className="label-mono text-foreground/90 truncate max-w-[280px]">
                                {primarySlide.caption}
                              </span>
                              <span className="font-mono text-[0.65rem] text-primary">
                                Click to expand
                              </span>
                            </div>
                          </div>
                        ) : null}

                        <div className="flex flex-col gap-3">
                          <span className="label-mono">Stack</span>
                          <ul className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <li
                                key={tech}
                                className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-500 hover:border-primary/50 hover:text-primary"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-sm border border-primary/25 bg-primary/[0.04] p-5">
                          <span className="label-mono text-primary">Outcome</span>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                            {project.outcome}
                          </p>
                        </div>

                        <a
                          href="#contact"
                          data-cursor="Ask"
                          className="group/link inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-500 hover:text-primary"
                        >
                          Ask me about this project
                          <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      {/* Fullscreen 3D Spatial Glassmorphic Gallery Modal */}
      {activeModalProject && (
        <ProjectGlassGalleryModal
          isOpen={!!activeModalProject}
          onClose={closeGallery}
          slides={activeModalProject.slides}
          projectName={activeModalProject.name}
          projectKind={activeModalProject.kind}
          initialIndex={modalInitialIndex}
        />
      )}
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="label-mono">{label}</span>
      <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}
