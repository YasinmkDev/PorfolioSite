'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GallerySlide {
  src: string
  alt: string
  title: string
  caption: string
  tag?: string
}

interface ProjectGlassGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  slides: GallerySlide[]
  projectName: string
  projectKind: string
  initialIndex?: number
}

export function ProjectGlassGalleryModal({
  isOpen,
  onClose,
  slides,
  projectName,
  projectKind,
  initialIndex = 0,
}: ProjectGlassGalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const modalRef = useRef<HTMLDivElement>(null)

  const count = slides.length

  // Synchronize initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialIndex])

  // Functional navigation handlers (pure & instant)
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count)
  }, [count])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count)
  }, [count])

  // Keyboard navigation with event prevention
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleNext, handlePrev, onClose])

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = (e.clientY / window.innerHeight) * 2 - 1
    setMousePos({ x, y })
  }

  if (!isOpen) return null

  const activeSlide = slides[activeIndex] || slides[0]

  return (
    <div
      ref={modalRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-background/80 backdrop-blur-2xl select-none animate-in fade-in zoom-in-95 duration-300"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Dynamic Glassmorphic Ambient Aura & Reflections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(198,255,71,0.14)_0%,transparent_60%)] blur-3xl transition-transform duration-500"
        style={{
          transform: `translate3d(calc(-50% + ${mousePos.x * 35}px), ${mousePos.y * 25}px, 0)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 size-[550px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.09)_0%,transparent_60%)] blur-3xl"
      />

      {/* Futuristic Mesh Grid Pattern Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      {/* Glass Top Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between border-b border-white/10 bg-card/40 px-6 py-4 backdrop-blur-xl sm:px-10">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary shadow-[0_0_12px_rgba(198,255,71,0.25)]">
            <Layers className="size-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-normal text-foreground sm:text-xl">
                {projectName}
              </h3>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[0.65rem] text-primary">
                {projectKind}
              </span>
            </div>
            <span className="font-mono text-[0.7rem] text-muted-foreground">
              3D Spatial Glassmorphic Gallery · Use Arrow Keys ← →
            </span>
          </div>
        </div>

        {/* Center Slide Counter Indicator */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-background/50 px-4 py-1.5 backdrop-blur-md">
          <span className="font-mono text-xs font-bold text-primary">
            {`0${activeIndex + 1}`}
          </span>
          <span className="text-muted-foreground text-xs">/</span>
          <span className="font-mono text-xs text-muted-foreground">
            {`0${count}`}
          </span>
          <span className="h-2.5 w-px bg-white/20 ml-1" />
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-primary/90">
            {activeSlide.tag || 'Slide'}
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close 3D Gallery"
          data-cursor="Close"
          className="group/close flex size-10 items-center justify-center rounded-full border border-white/15 bg-card/70 text-muted-foreground backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
        >
          <X className="size-5 transition-transform duration-300 group-hover/close:rotate-90" />
        </button>
      </header>

      {/* 3D Spatial Carousel Center Stage */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-6 sm:px-12">
        {/* Left Floating Previous Chevron */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          data-cursor="Prev"
          className="group/btn absolute left-4 sm:left-8 z-30 flex size-12 items-center justify-center rounded-full border border-white/20 bg-card/80 text-foreground backdrop-blur-xl shadow-2xl transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="size-6 transition-transform group-hover/btn:-translate-x-0.5" />
        </button>

        {/* Spatial 3D Card Stack Container */}
        <div
          className="relative flex items-center justify-center w-full max-w-5xl h-[380px] sm:h-[480px] md:h-[520px]"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {slides.map((slide, idx) => {
            // Calculate spatial offset relative to active index
            let offset = idx - activeIndex
            // Handle wrap-around for smooth circular spatial feel
            if (offset < -Math.floor(count / 2)) offset += count
            if (offset > Math.floor(count / 2)) offset -= count

            const isCurrent = offset === 0
            const isVisible = Math.abs(offset) <= 2

            if (!isVisible) return null

            // 3D Spatial transform math
            const rotateY = offset * 26 + mousePos.x * 4
            const translateX = offset * 260 + mousePos.x * 12
            const translateZ = -Math.abs(offset) * 160 + (isCurrent ? 20 : 0)
            const scale = isCurrent ? 1 : 0.82
            const opacity = isCurrent ? 1 : Math.abs(offset) === 1 ? 0.65 : 0.3

            return (
              <div
                key={idx}
                onClick={() => {
                  if (!isCurrent) setActiveIndex(idx)
                }}
                data-cursor={isCurrent ? undefined : 'Focus'}
                className={cn(
                  'absolute w-[86vw] max-w-[680px] sm:w-[580px] md:w-[680px] h-[340px] sm:h-[440px] rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer backdrop-blur-2xl shadow-2xl group/card',
                  isCurrent
                    ? 'border-primary/60 bg-card/75 ring-1 ring-primary/40 shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(198,255,71,0.25)] z-20 cursor-default'
                    : 'border-white/10 bg-card/45 hover:border-white/30 z-10',
                )}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Iridescent Glass Edge Highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />

                {/* Card Top Glass Banner Bar */}
                <div className="flex items-center justify-between border-b border-white/10 bg-background/50 px-4 py-2.5 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      {`0${idx + 1}`}
                    </span>
                    <span className="h-2 w-px bg-white/20" />
                    <span className="font-mono text-xs text-foreground/90 font-medium">
                      {slide.title || projectName}
                    </span>
                  </div>

                  <span className="rounded-full bg-secondary/80 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground border border-white/10">
                    {slide.tag || 'Preview'}
                  </span>
                </div>

                {/* High-Definition Screenshot Display */}
                <div className="relative h-[250px] sm:h-[340px] w-full overflow-hidden bg-background/95">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.02]"
                    priority={isCurrent}
                  />

                  {/* Glassmorphic Gradient Shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-80" />

                  {/* Front card subtle interactive light reflection */}
                  {isCurrent && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]"
                    />
                  )}
                </div>

                {/* Card Bottom Caption Info */}
                <div className="flex items-center justify-between border-t border-white/10 bg-card/90 px-4 py-2.5">
                  <p className="line-clamp-1 font-mono text-xs text-muted-foreground">
                    {slide.caption}
                  </p>
                  {isCurrent && (
                    <span className="flex items-center gap-1 font-mono text-[0.65rem] text-primary shrink-0">
                      <Sparkles className="size-3" />
                      Active
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Floating Next Chevron */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          data-cursor="Next"
          className="group/btn absolute right-4 sm:right-8 z-30 flex size-12 items-center justify-center rounded-full border border-white/20 bg-card/80 text-foreground backdrop-blur-xl shadow-2xl transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="size-6 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
      </main>

      {/* Glassmorphic Floating Bottom Dock */}
      <footer className="relative z-20 flex flex-col items-center gap-3 border-t border-white/10 bg-card/50 px-6 py-4 backdrop-blur-xl">
        {/* Caption Display */}
        <div className="flex items-center gap-2.5 text-center max-w-2xl">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <p className="font-mono text-xs text-foreground/90 leading-relaxed">
            {activeSlide.caption}
          </p>
        </div>

        {/* Glass Thumbnail Strip */}
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-background/60 p-1.5 backdrop-blur-md shadow-xl">
          {slides.map((s, tIdx) => {
            const isSelected = tIdx === activeIndex
            return (
              <button
                key={tIdx}
                type="button"
                onClick={() => setActiveIndex(tIdx)}
                data-cursor="Select"
                className={cn(
                  'group/thumb relative h-10 w-16 overflow-hidden rounded-md border transition-all duration-300 cursor-pointer',
                  isSelected
                    ? 'border-primary ring-2 ring-primary/50 scale-105 opacity-100 shadow-[0_0_12px_rgba(198,255,71,0.4)]'
                    : 'border-white/15 opacity-50 hover:opacity-90 hover:border-white/40',
                )}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </button>
            )
          })}
        </div>
      </footer>
    </div>
  )
}
