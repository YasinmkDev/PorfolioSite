'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectCard {
  id: string
  num: string
  title: string
  category: string
  tagline: string
  stack: string[]
  image: string
  imageAlt: string
  tag: string
  baseAngle: number
}

const PROJECT_CARDS: ProjectCard[] = [
  {
    id: 'copysprint',
    num: '01',
    title: 'CopySprint',
    category: 'AI Ad Engine · Web App',
    tagline: '1-to-5 native ad synthesis with Google RSA scoring & 1-click batch export.',
    stack: ['Next.js', 'React', 'AI Pipeline', 'TypeScript'],
    image: '/projects/AdsGenerationWebApp/screen1.png',
    imageAlt: 'CopySprint AI Advertising Engine',
    tag: 'AI Web SaaS',
    baseAngle: -3.2,
  },
  {
    id: 'fastbill',
    num: '02',
    title: 'FastBill',
    category: 'Invoicing Micro-SaaS',
    tagline: '10-second invoicing with natural-language parsing & 300 DPI vector PDF.',
    stack: ['Next.js 14', 'Supabase RLS', 'Stripe QR', 'TypeScript'],
    image: '/projects/invoiceGeneratorwebApp/screen3.png',
    imageAlt: 'FastBill Invoicing Micro-SaaS Studio',
    tag: 'Fintech SaaS',
    baseAngle: 2.8,
  },
  {
    id: 'ledger-ai',
    num: '03',
    title: 'Ledger AI',
    category: 'AI Financial App · Mobile',
    tagline: 'Offline-first expense engine with camera OCR & live budget limits.',
    stack: ['React Native', 'Expo', 'Gemini AI Vision', 'TypeScript'],
    image: '/projects/ledgerProject/first_image_withScreenShotsAndTextOnRight.png',
    imageAlt: 'Ledger AI Mobile Receipt & Expense App Flow',
    tag: 'AI Mobile',
    baseAngle: -2.1,
  },
  {
    id: 'reserve-ease',
    num: '04',
    title: 'ReserveEase',
    category: 'Studio Booking Platform',
    tagline: 'Dual customer & provider portals with real-time schedule conflict resolution.',
    stack: ['React Native', 'Expo', 'Supabase', 'Zustand'],
    image: '/projects/bookingProject/first_image_app_screeshots_and_text_on_right_side.png',
    imageAlt: 'ReserveEase Appointment & Schedule App Flow',
    tag: 'Full-Stack',
    baseAngle: 2.2,
  },
  {
    id: 'marlows-pos',
    num: '05',
    title: "Marlow's POS",
    category: 'In-Venue Dining & POS',
    tagline: 'QR table ordering, dynamic split-bill settlement & live kitchen KDS.',
    stack: ['React Native', 'Expo', 'POS Engine', 'Context API'],
    image: '/projects/orderProject/firstImageToshowInProjectSection.png',
    imageAlt: "Marlow's Dining Platform & Restaurant POS",
    tag: 'POS Dining',
    baseAngle: -2.4,
  },
]

const NUM_CARDS = PROJECT_CARDS.length

export function Hero3DPolygon() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToCard = useCallback((index: number) => {
    const normalized = (index % NUM_CARDS + NUM_CARDS) % NUM_CARDS
    setActiveIndex(normalized)
  }, [])

  const nextCard = useCallback(() => {
    goToCard(activeIndex + 1)
  }, [activeIndex, goToCard])

  const prevCard = useCallback(() => {
    goToCard(activeIndex - 1)
  }, [activeIndex, goToCard])

  const activeProject = PROJECT_CARDS[activeIndex]

  return (
    <div className="relative flex h-full min-h-[500px] sm:min-h-[540px] w-full flex-col items-center justify-center select-none py-2">
      {/* Ambient background glow & radial depth (zero-cost gradient) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(198,255,71,0.07)_0%,transparent_70%)]"
      />

      {/* Main Big Stacked Card Display Stage */}
      <div
        onClick={nextCard}
        data-cursor="Next Project"
        className="group/deck relative flex items-center justify-center w-full max-w-[340px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[580px] h-[420px] sm:h-[460px] cursor-pointer"
      >
        {PROJECT_CARDS.map((project, idx) => {
          // Calculate relative position from active card
          let offset = (idx - activeIndex + NUM_CARDS) % NUM_CARDS
          const isTop = offset === 0
          const isVisible = offset <= 3

          if (!isVisible) return null

          // Stacking geometry: each card has its own organic angle, slight vertical offset & scale
          let translateY = offset === 0 ? 0 : offset * 12
          let translateX = offset === 0 ? 0 : offset === 1 ? 6 : offset === 2 ? -6 : 8
          let scale = offset === 0 ? 1 : 1 - offset * 0.045
          let rotate = isTop ? 0 : project.baseAngle * (1 + offset * 0.25)
          let opacity = isTop ? 1 : offset === 1 ? 0.8 : offset === 2 ? 0.5 : 0.25
          let zIndex = NUM_CARDS - offset

          return (
            <div
              key={project.id}
              className={cn(
                'absolute inset-0 rounded-2xl border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shadow-2xl group/card will-change-transform',
                isTop
                  ? 'border-primary/60 bg-[#121714] ring-1 ring-primary/40 shadow-[0_24px_50px_rgba(0,0,0,0.85),0_0_26px_rgba(198,255,71,0.18)]'
                  : 'border-white/10 bg-[#0d120f]/95 hover:border-white/30',
              )}
              style={{
                transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                opacity,
                zIndex,
                contain: 'paint layout',
              }}
            >
              {/* Iridescent Top Glow Highlight */}
              <div
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300',
                  isTop ? 'opacity-100' : 'opacity-0',
                )}
              />

              {/* Card Top Glass Banner Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#151c18] px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-primary tracking-wider">
                    {project.num}
                  </span>
                  <span className="h-2.5 w-px bg-white/20" />
                  <span className="font-mono text-xs font-medium text-foreground/90 uppercase tracking-wider truncate max-w-[180px] sm:max-w-[260px]">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isTop && (
                    <span className="flex size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                  )}
                  <span className="rounded-full bg-primary/10 border border-primary/30 px-2 py-0.5 font-mono text-[0.65rem] text-primary">
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* High-Definition Big Screenshot Area */}
              <div className="relative h-[250px] sm:h-[285px] md:h-[305px] w-full overflow-hidden bg-background">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 340px, (max-width: 1200px) 540px, 600px"
                  className="object-cover object-top"
                  priority={idx === 0}
                />

                {/* Subtle Gradient Shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121714] via-transparent to-transparent opacity-85" />
              </div>

              {/* Card Bottom Details & Tech Stack */}
              <div className="flex flex-col justify-between p-4 h-[130px] sm:h-[135px] bg-[#121714]">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-serif text-lg sm:text-xl font-normal text-foreground group-hover/deck:text-primary transition-colors truncate">
                      {project.title}
                    </h4>
                    <a
                      href="#work"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors shrink-0"
                    >
                      Inspect
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>

                  <p className="mt-1 line-clamp-1 sm:line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-secondary/80 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground border border-border/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Navigation with Project Chips & Arrow Controls */}
      <div className="mt-7 flex flex-col items-center gap-3 z-10 w-full max-w-[580px]">
        {/* Project Name Chips & Prev/Next Arrows */}
        <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card/95 p-1 shadow-lg">
          <button
            type="button"
            onClick={prevCard}
            aria-label="Previous project"
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          <div className="flex items-center gap-1 px-1">
            {PROJECT_CARDS.map((p, i) => {
              const isCurrent = activeIndex === i
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goToCard(i)}
                  className={cn(
                    'relative flex h-6.5 items-center gap-1.5 rounded-full px-2.5 font-mono text-[0.65rem] transition-all duration-300 cursor-pointer',
                    isCurrent
                      ? 'bg-primary font-semibold text-primary-foreground shadow-[0_0_12px_rgba(198,255,71,0.45)]'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  )}
                >
                  <span className="font-bold">{p.num}</span>
                  <span className="max-w-[70px] sm:max-w-[100px] truncate">{p.title}</span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={nextCard}
            aria-label="Next project"
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3 text-muted-foreground font-mono text-[0.65rem]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="size-3 text-primary" />
            <span className="text-foreground/90 font-medium">Featured Stack</span>
          </div>

          <span className="text-border">|</span>

          <span className="text-muted-foreground">
            {`[0${activeIndex + 1}/0${NUM_CARDS}] Click card or chips to cycle`}
          </span>
        </div>
      </div>
    </div>
  )
}
