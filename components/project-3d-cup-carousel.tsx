'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ProjectSlide {
  src: string
  alt: string
  caption: string
  tag?: string
}

interface Project3DCupCarouselProps {
  slides: ProjectSlide[]
  projectName: string
  priority?: boolean
  className?: string
}

export function Project3DCupCarousel({
  slides,
  projectName,
  priority = false,
  className,
}: Project3DCupCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const currentRotationRef = useRef(0)
  const targetRotationRef = useRef(0)
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const count = slides.length
  const stepAngle = 360 / count
  const cardWidth = 240
  // Inradius for cylinder / cup shape
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / count)) + 20

  const rotateTo = useCallback(
    (index: number) => {
      const normalizedIndex = (index % count + count) % count
      const currentAngle = targetRotationRef.current
      const targetAngle = -normalizedIndex * stepAngle
      const diff = ((targetAngle - currentAngle) % 360 + 540) % 360 - 180
      targetRotationRef.current = currentAngle + diff
      setActiveIndex(normalizedIndex)
    },
    [count, stepAngle],
  )

  const handleNext = () => rotateTo(activeIndex + 1)
  const handlePrev = () => rotateTo(activeIndex - 1)

  // Smooth physics animation loop
  useEffect(() => {
    let lastStamp = performance.now()

    const animate = (timestamp: number) => {
      const delta = Math.min((timestamp - lastStamp) / 1000, 0.1)
      lastStamp = timestamp

      if (!isDraggingRef.current) {
        // Apply damping friction
        targetRotationRef.current += velocityRef.current * delta * 60
        velocityRef.current *= 0.9
        if (Math.abs(velocityRef.current) < 0.001) velocityRef.current = 0
      }

      // Smooth lerp
      const diff = targetRotationRef.current - currentRotationRef.current
      currentRotationRef.current += diff * 0.12

      // Calculate active front card
      const normalizedAngle = (-currentRotationRef.current % 360 + 360) % 360
      const closestIdx = Math.round(normalizedAngle / stepAngle) % count
      setActiveIndex(closestIdx)

      if (containerRef.current) {
        const rotor = containerRef.current.querySelector<HTMLElement>('.cup-3d-rotor')
        if (rotor) {
          rotor.style.transform = `rotateX(-10deg) rotateY(${currentRotationRef.current}deg)`
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [count, stepAngle])

  // Drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    isDraggingRef.current = true
    setIsDragging(true)
    startXRef.current = e.clientX
    lastXRef.current = e.clientX
    lastTimeRef.current = performance.now()
    velocityRef.current = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const currentX = e.clientX
    const deltaX = currentX - lastXRef.current
    const now = performance.now()
    const dt = Math.max(1, now - lastTimeRef.current)

    targetRotationRef.current += deltaX * 0.45
    velocityRef.current = (deltaX / dt) * 7

    lastXRef.current = currentX
    lastTimeRef.current = now
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const activeSlide = slides[activeIndex] || slides[0]

  return (
    <figure className={cn('flex flex-col gap-4', className)}>
      {/* 3D Curved Cup / Cylinder Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-cursor={isDragging ? 'Grabbing' : 'Drag 3D Gallery'}
        className="group/stage relative h-[310px] sm:h-[340px] w-full overflow-hidden rounded-sm border border-border bg-card/60 backdrop-blur-md flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: '950px' }}
      >
        {/* Subtle holographic ambient ring on stage */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 size-72 rounded-full border border-primary/20 bg-[radial-gradient(circle_at_50%_50%,rgba(198,255,71,0.08)_0%,transparent_70%)] blur-md"
        />

        {/* 3D Rotor Cylinder */}
        <div
          className="cup-3d-rotor relative flex items-center justify-center"
          style={{
            width: `${cardWidth}px`,
            height: '190px',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {slides.map((slide, idx) => {
            const angle = idx * stepAngle
            const isFront = activeIndex === idx

            return (
              <div
                key={idx}
                onClick={(e) => {
                  if (Math.abs(velocityRef.current) < 0.5) {
                    e.stopPropagation()
                    rotateTo(idx)
                  }
                }}
                className={cn(
                  'absolute inset-0 rounded-lg border overflow-hidden transition-all duration-500 cursor-pointer shadow-xl',
                  isFront
                    ? 'border-primary/70 bg-card ring-2 ring-primary/40 shadow-[0_12px_28px_rgba(0,0,0,0.7),0_0_20px_rgba(198,255,71,0.2)]'
                    : 'border-border/70 bg-card/75 opacity-55 hover:opacity-85 grayscale-[25%] shadow-[0_6px_16px_rgba(0,0,0,0.5)]',
                )}
                style={{
                  width: `${cardWidth}px`,
                  height: '190px',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-border/80 bg-background/60 px-2.5 py-1.5 text-[0.65rem] font-mono text-muted-foreground">
                  <span className="text-primary font-bold">{`0${idx + 1}`}</span>
                  <span>{slide.tag || projectName}</span>
                </div>

                {/* Screenshot Frame */}
                <div className="relative h-[155px] w-full bg-background/90">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="260px"
                    priority={priority && idx === 0}
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Carousel Prev / Next Controls */}
        <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            aria-label="Previous image"
            className="pointer-events-auto flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            aria-label="Next image"
            className="pointer-events-auto flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* 3D Round Carousel Status & Slide Dots */}
        <div className="absolute bottom-2.5 inset-x-0 flex flex-col items-center gap-1.5 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  rotateTo(dotIdx)
                }}
                className={cn(
                  'pointer-events-auto h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                  dotIdx === activeIndex
                    ? 'w-5 bg-primary shadow-[0_0_8px_var(--primary)]'
                    : 'w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground',
                )}
              />
            ))}
          </div>
          <span className="font-mono text-[0.6rem] text-muted-foreground tracking-wider uppercase">
            3D Cup Carousel · Drag to Spin
          </span>
        </div>
      </div>

      {/* Active Slide Caption */}
      <figcaption className="label-mono flex items-center gap-2 text-foreground/90">
        <span className="h-px w-6 bg-primary" />
        <span className="text-primary font-bold">{`[0${activeIndex + 1}/${count}]`}</span>
        <span>{activeSlide.caption}</span>
      </figcaption>
    </figure>
  )
}
