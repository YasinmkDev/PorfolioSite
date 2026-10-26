'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/magnetic'

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
    id: 'waveform',
    num: '01',
    title: 'Waveform',
    category: 'Music Player · Mobile',
    tagline: 'A Spotify-style player with a real playback engine, queue and honest premium gates.',
    stack: ['React Native', 'Expo', 'Zustand', 'Reanimated'],
    image: '/projects/promo/waveform-promo.png',
    imageAlt: 'Waveform app promotional image',
    tag: 'Music App',
    baseAngle: -3.2,
  },
  {
    id: 'findit',
    num: '02',
    title: 'FindIt',
    category: 'AI Item Finder · Mobile',
    tagline: 'Photo → Gemini analysis → search your things by words. The scan queue never loses a photo.',
    stack: ['React Native', 'Expo', 'Gemini API', 'TypeScript'],
    image: '/projects/promo/findit-promo.png',
    imageAlt: 'FindIt app promotional image',
    tag: 'AI Mobile',
    baseAngle: 2.8,
  },
  {
    id: 'fittrack',
    num: '03',
    title: 'FitTrack',
    category: 'Gym OS · Mobile',
    tagline: 'Owner workflow modelled on real gym software, with fluid navigation and demo auth.',
    stack: ['React Native', 'Expo', 'Reanimated', 'TypeScript'],
    image: '/projects/promo/fittrack-promo.png',
    imageAlt: 'FitTrack app promotional image',
    tag: 'Gym SaaS',
    baseAngle: -2.1,
  },
  {
    id: 'mobilebazaar',
    num: '04',
    title: 'MobileBazaar',
    category: 'Phone Store · Web',
    tagline: 'Pakistan-market commerce: guest checkout, COD and JazzCash/EasyPaisa, live Supabase catalogue.',
    stack: ['Next.js 15', 'Supabase', 'TypeScript'],
    image: '/projects/mobilebazaar/home-desktop.png',
    imageAlt: 'MobileBazaar storefront home page',
    tag: 'E-Commerce',
    baseAngle: 2.2,
  },
  {
    id: 'swift-courier',
    num: '05',
    title: 'Swift Courier',
    category: 'Delivery Marketplace · Mobile',
    tagline: 'Food, grocery and package delivery with live courier tracking.',
    stack: ['React Native', 'Expo', 'Zustand', 'MapLibre'],
    image: '/projects/promo/swift-courier-promo.png',
    imageAlt: 'Swift Courier app promotional image',
    tag: 'Marketplace',
    baseAngle: -2.4,
  },
  {
    id: 'hospitality',
    num: '06',
    title: 'Hospitality',
    category: 'Hotel Admin · Web',
    tagline: 'Twenty routes, one system: bookings, rooms, rates and a demo sandbox fallback.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/hospitality/dashboard-desktop.png',
    imageAlt: 'Hospitality admin dashboard',
    tag: 'Admin SaaS',
    baseAngle: 2.6,
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

  /* keep the active tab visible inside the scrollable tab row (its scrollbar is hidden).
     Scroll ONLY the pill itself — scrollIntoView would also yank the whole page. */
  const chipsRef = useRef<Array<HTMLButtonElement | null>>([])
  const pillRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const pill = pillRef.current
    const chip = chipsRef.current[activeIndex]
    if (!pill || !chip) return
    pill.scrollTo({
      left: chip.offsetLeft - (pill.clientWidth - chip.clientWidth) / 2,
      behavior: 'auto',
    })
  }, [activeIndex])

  return (
    <div className="relative flex h-full min-h-[500px] sm:min-h-[540px] w-full flex-col items-center justify-center select-none py-2">
      {/* Ambient background glow & radial depth (zero-cost gradient) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(198,255,71,0.07)_0%,transparent_70%)]"
      />

      {/* Main Big Stacked Card Display Stage */}
      <Magnetic strengthX={0.06} strengthY={0.08} className="flex w-full items-center justify-center">
      <div
        onClick={nextCard}
        data-cursor="Next Project"
        className="group/deck relative flex items-center justify-center w-full max-w-[340px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[580px] h-[430px] sm:h-[490px] cursor-pointer"
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
              <div className="relative h-[250px] sm:h-[285px] md:h-[305px] w-full overflow-hidden bg-[#121714]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 340px, (max-width: 1200px) 540px, 600px"
                  className="object-contain"
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
      </Magnetic>

      {/* Bottom Navigation with Project Chips & Arrow Controls */}
      <div className="mt-7 flex flex-col items-center gap-3 z-10 w-full max-w-[580px]">
        {/* Project Name Chips & Prev/Next Arrows */}
        <div ref={pillRef} className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card/95 p-1 shadow-lg max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={prevCard}
            aria-label="Previous project"
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          <div className="flex w-max items-center gap-1 px-1">
            {PROJECT_CARDS.map((p, i) => {
              const isCurrent = activeIndex === i
              return (
                <button
                  key={p.id}
                  type="button"
                  ref={(el) => {
                    chipsRef.current[i] = el
                  }}
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
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
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
