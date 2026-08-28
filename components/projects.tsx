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
    id: 'ledger-ai',
    name: 'Ledger AI',
    kind: 'AI Receipt & Expense Scanner · React Native',
    year: '2025',
    summary: 'An offline-first mobile expense tracker powered by camera-based OCR, AI-driven receipt line-item parsing, and real-time category budget enforcement.',
    problem:
      'Manual expense entry is tedious and slow, while cloud-only budgeting apps demand intrusive bank logins. Users needed a private, on-device mobile solution to instantly convert physical paper receipts into categorized, line-itemized expenses with zero manual typing.',
    role: 'Lead Mobile Engineer & Product Architect. Engineered the entire React Native / Expo application, camera OCR vision pipeline, local AsyncStorage persistence, budget tracking engine, and 60fps gesture-driven animations.',
    stack: ['React Native', 'Expo (SDK 57)', 'TypeScript', 'Gemini AI Vision OCR', 'Reanimated 4', 'AsyncStorage', 'Lucide'],
    challenges: [
      {
        title: 'Sub-second thermal receipt parsing',
        body: 'Deconstructing unformatted, crumpled paper receipts into clean, structured LineItem records with automated tax isolation and high/medium/low confidence scoring indicators.',
      },
      {
        title: 'Zero-latency offline persistence',
        body: 'Engineered an offline-first storage architecture that recalculates category spending velocity and updates monthly budget health bars with zero UI stutter.',
      },
    ],
    outcome:
      'A production-grade native iOS and Android application with sub-second receipt ingestion, intuitive expense review workflows, and total user financial privacy.',
    slides: [
      {
        src: '/projects/ledgerProject/first_image_withScreenShotsAndTextOnRight.png',
        alt: 'Ledger Mobile App Overview and UI Kit',
        title: 'Ledger Mobile Architecture',
        caption: 'End-to-end financial workflows: instant budget overview, searchable transaction ledger, and dynamic spending limits.',
        tag: 'Mobile Architecture',
      },
      {
        src: '/projects/ledgerProject/appOpenInPhone.png',
        alt: 'Ledger mobile app open in phone mockup',
        title: 'Interactive Financial Dashboard',
        caption: 'High-performance dashboard tracking monthly spending caps, category breakdown, and recent transactions.',
        tag: 'Live Mobile App',
      },
      {
        src: '/projects/ledgerProject/imageShowingAiPoweredORC.png',
        alt: 'AI-Powered OCR Vision Scanner',
        title: 'AI Vision OCR Ingestion',
        caption: 'Smart camera scanner decomposing physical receipts into structured itemized line items with confidence scoring.',
        tag: 'AI Vision OCR',
      },
      {
        src: '/projects/ledgerProject/imageShowingProblemAndSolutionUsingThisApp.png',
        alt: 'Problem and Solution comparison',
        title: 'Problem vs. Solution Architecture',
        caption: 'Eliminating manual receipt entry through instant automated ingestion and category assignment.',
        tag: 'Solution Design',
      },
    ],
  },
  {
    id: 'reserve-ease',
    name: 'ReserveEase',
    kind: 'Studio & Appointment Booking Platform · Supabase',
    year: '2025',
    summary: 'A cross-platform appointment scheduling system with dual customer/provider role portals, real-time availability conflict resolution, and calendar sync.',
    problem:
      'Service studios face scheduling chaos with double-bookings, manual confirmations, and time-zone mismatches. ReserveEase provides an automated scheduling engine where providers manage custom availability, buffers, and instant slot reservations without friction.',
    role: 'Lead Full-Stack Engineer & Mobile Architect. Built the Supabase backend schema, client booking state with Zustand, slot interval generator, and responsive iOS / Android mobile interface.',
    stack: ['React Native', 'Expo (SDK 57)', 'Supabase', 'PostgreSQL', 'Zustand', 'TypeScript', 'Reanimated'],
    challenges: [
      {
        title: 'Real-time slot generation & conflict prevention',
        body: 'Engineered an on-the-fly calendar algorithm calculating service durations, dynamic buffer minutes, and date overrides to prevent double-booking race conditions.',
      },
      {
        title: 'Dual-portal role segregation',
        body: 'Implemented clean role-based flows isolating customer booking funnels from provider schedule controls, appointment request approvals, and revenue metrics.',
      },
    ],
    outcome:
      'A seamless studio booking platform with instant booking confirmations, digital ticket generation, and automated schedule synchronization.',
    slides: [
      {
        src: '/projects/bookingProject/first_image_app_screeshots_and_text_on_right_side.png',
        alt: 'ReserveEase App Overview and Screens',
        title: 'ReserveEase Architecture & Overview',
        caption: 'Full appointment lifecycle: service discovery, interactive calendar date/time picker, and instant booking confirmation.',
        tag: 'Mobile Platform',
      },
      {
        src: '/projects/bookingProject/app_open_inPhone_held_hand.png',
        alt: 'ReserveEase mobile app in hand',
        title: 'Provider Schedule & Studio Portal',
        caption: 'Real-time studio controls allowing providers to adjust business hours, slot intervals, and buffer times.',
        tag: 'Studio Portal',
      },
      {
        src: '/projects/bookingProject/app_opened_in_Phone_on_table.png',
        alt: 'ReserveEase mobile app on table',
        title: 'Customer Booking Experience',
        caption: 'Frictionless client reservation flow with instant provider bio, ratings, and time slot availability.',
        tag: 'Client Flow',
      },
      {
        src: '/projects/bookingProject/tickets_around_app_open_in phone.png',
        alt: 'Digital Booking Tickets & Pass generator',
        title: 'Digital Reservation Pass',
        caption: 'Automated digital pass generation with unique reference codes, service details, and calendar sync.',
        tag: 'Digital Passes',
      },
    ],
  },
  {
    id: 'marlows-pos',
    name: "Marlow's Dining Engine",
    kind: 'In-Venue Restaurant Platform & POS · Production',
    year: '2025',
    summary: 'A full-stack restaurant operations platform featuring QR-driven guest table ordering, split-bill settlement, Kitchen Display System (KDS), and 86 inventory controls.',
    problem:
      'Restaurant guests endure long waits for printed menus and servers with payment terminals, while kitchens struggle with manual ticket miscommunication. Marlow’s bridges the gap with table-synced digital ordering, instant gratuity calculation, and live kitchen dispatching.',
    role: 'Lead Architect & UI/UX Engineer. Built the interactive diner menu (Photo + Classic Bistro views), table QR check-in, dynamic split-bill calculator, staff KDS station, and restaurant onboarding wizard.',
    stack: ['React Native / Expo', 'TypeScript', 'Context Architecture', 'Reanimated', 'Local POS Storage', 'Lucide'],
    challenges: [
      {
        title: 'Real-time table session & split billing',
        body: 'Built an interactive check settlement engine with even-split guest steppers, itemized division, tip presets, and digital perforated receipt slips.',
      },
      {
        title: 'Dual Guest & Staff operating modes',
        body: 'Engineered a unified application housing both the customer dining interface and a high-efficiency staff management center with KDS, 86 catalog toggles, and table floor plans.',
      },
    ],
    outcome:
      'An institutional-grade in-venue dining ecosystem speeding table turnover by 30% and eliminating ordering errors.',
    slides: [
      {
        src: '/projects/orderProject/firstImageToshowInProjectSection.png',
        alt: "Marlow's Dining App Overview",
        title: 'Dining Platform & Menu Architecture',
        caption: 'Atmospheric guest dining interface with Photo Grid, Classic Bistro board, and live order tracking.',
        tag: 'Guest Experience',
      },
      {
        src: '/projects/orderProject/ImageOfproblemVsSolutionAsOurApp.png',
        alt: 'Problem vs Solution in Restaurant Operations',
        title: 'Problem vs. Solution Architecture',
        caption: 'Replacing paper bottlenecks with direct QR table ordering, automated KDS dispatch, and instant split payment.',
        tag: 'System Architecture',
      },
      {
        src: '/projects/orderProject/imageShowingOrderConfirmed.png',
        alt: 'Order confirmation and live kitchen tracking',
        title: 'Live Order Dispatch & Receipt Settlement',
        caption: 'Instant kitchen confirmation with animated order status tracking and digital receipt settlement.',
        tag: 'Live KDS Tracking',
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
