'use client'

import React, { useState, useEffect, useCallback } from 'react'
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
  const count = slides.length

  // Synchronize index and freeze body / Lenis scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex)
      document.body.style.overflow = 'hidden'
      ;(window as any).__lenis?.stop()
    } else {
      document.body.style.overflow = ''
      ;(window as any).__lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      ;(window as any).__lenis?.start()
    }
  }, [isOpen, initialIndex])

  // Instant navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count)
  }, [count])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count)
  }, [count])

  // Keyboard navigation
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

  if (!isOpen) return null

  const activeSlide = slides[activeIndex] || slides[0]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} Gallery`}
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-[#080b09] select-none"
    >
      {/* Top Header Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between border-b border-zinc-800 bg-[#0d120f] px-5 py-3.5 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-850 text-zinc-300 shadow-sm">
            <Layers className="size-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base sm:text-lg font-normal text-zinc-100">
                {projectName}
              </h3>
              <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-[0.62rem] text-zinc-300">
                {projectKind}
              </span>
            </div>
            <span className="font-mono text-[0.68rem] text-zinc-400 hidden sm:block">
              Project Showcase · Use Arrow Keys ← → to navigate
            </span>
          </div>
        </div>

        {/* Center Slide Indicator */}
        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-[#121815] px-3.5 py-1.5 shadow-sm">
          <span className="font-mono text-xs font-bold text-zinc-100">
            {`0${activeIndex + 1}`}
          </span>
          <span className="text-zinc-500 text-xs">/</span>
          <span className="font-mono text-xs text-zinc-400">
            {`0${count}`}
          </span>
          <span className="h-2.5 w-px bg-zinc-700 ml-1" />
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-zinc-300">
            {activeSlide.tag || 'Slide'}
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Gallery"
          data-cursor="Close"
          className="group/close flex size-9 sm:size-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 transition-colors hover:border-zinc-400 hover:bg-zinc-800 hover:text-white shadow-lg cursor-pointer"
        >
          <X className="size-4.5 transition-transform duration-200 group-hover/close:rotate-90" />
        </button>
      </header>

      {/* Main Focal Display Stage */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-4 sm:px-12 overflow-hidden">
        {/* Left Floating Previous Chevron */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          data-cursor="Prev"
          className="group/btn absolute left-3 sm:left-8 z-30 flex size-11 sm:size-12 items-center justify-center rounded-full border border-zinc-700 bg-[#121815] text-zinc-200 shadow-xl transition-colors hover:border-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
        >
          <ChevronLeft className="size-6 transition-transform group-hover/btn:-translate-x-0.5" />
        </button>

        {/* Main Screenshot Showcase Card - Solid Dark Silver Theme */}
        <div className="relative flex flex-col w-full max-w-4xl h-[380px] sm:h-[460px] md:h-[500px] rounded-xl border border-zinc-700/80 bg-[#111613] shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Card Top Title Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-[#141b17] px-4 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-zinc-300">
                {`0${activeIndex + 1}`}
              </span>
              <span className="h-2.5 w-px bg-zinc-700" />
              <span className="font-mono text-xs font-medium text-zinc-200 truncate max-w-[240px] sm:max-w-md">
                {activeSlide.title || projectName}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 font-mono text-[0.65rem] text-zinc-300 border border-zinc-700">
                {activeSlide.tag || 'Preview'}
              </span>
            </div>
          </div>

          {/* High-Definition Screenshot Display */}
          <div className="relative flex-1 w-full bg-[#0a0e0c] overflow-hidden">
            <Image
              key={activeSlide.src}
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 950px"
              className="object-contain object-center"
              priority
            />
          </div>

          {/* Card Bottom Caption Info */}
          <div className="flex items-center justify-between border-t border-zinc-800 bg-[#141b17] px-4 py-2.5">
            <p className="line-clamp-1 font-mono text-xs text-zinc-400 max-w-[85%]">
              {activeSlide.caption}
            </p>
            <span className="font-mono text-[0.65rem] text-zinc-400 shrink-0">
              HD Preview
            </span>
          </div>
        </div>

        {/* Right Floating Next Chevron */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          data-cursor="Next"
          className="group/btn absolute right-3 sm:right-8 z-30 flex size-11 sm:size-12 items-center justify-center rounded-full border border-zinc-700 bg-[#121815] text-zinc-200 shadow-xl transition-colors hover:border-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
        >
          <ChevronRight className="size-6 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
      </main>

      {/* Bottom Thumbnail Strip Dock */}
      <footer className="relative z-20 flex flex-col items-center gap-2.5 border-t border-zinc-800 bg-[#0d120f] px-6 py-3">
        {/* Caption Display */}
        <div className="flex items-center gap-2 text-center max-w-2xl">
          <p className="font-mono text-xs text-zinc-300 leading-relaxed truncate">
            {activeSlide.caption}
          </p>
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-[#121815] p-1.5 shadow-xl">
          {slides.map((s, tIdx) => {
            const isSelected = tIdx === activeIndex
            return (
              <button
                key={tIdx}
                type="button"
                onClick={() => setActiveIndex(tIdx)}
                data-cursor="Select"
                className={cn(
                  'group/thumb relative h-9 w-14 sm:h-10 sm:w-16 overflow-hidden rounded-md border transition-all duration-150 cursor-pointer',
                  isSelected
                    ? 'border-zinc-300 ring-2 ring-zinc-400/40 opacity-100 shadow-md scale-105'
                    : 'border-zinc-800 opacity-50 hover:opacity-90 hover:border-zinc-600',
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
