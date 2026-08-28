'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Pause,
  Play,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectFace {
  id: string
  num: string
  title: string
  category: string
  tagline: string
  stack: string[]
  image: string
  imageAlt: string
  tag: string
}

const PROJECT_FACES: ProjectFace[] = [
  {
    id: 'taskflow',
    num: '01',
    title: 'TaskFlow',
    category: 'Full-stack Web App',
    tagline: 'Production-ready team workspace with real-time Kanban & JWT auth.',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'TypeScript'],
    image: '/projects/taskflow.png',
    imageAlt: 'TaskFlow Workspace Kanban Board',
    tag: 'Full-Stack',
  },
  {
    id: 'swiftbite',
    num: '02',
    title: 'SwiftBite',
    category: 'React Native UI Kit',
    tagline: 'Commercial food-delivery mobile kit built with NativeWind & Expo.',
    stack: ['React Native', 'Expo', 'NativeWind', 'TypeScript'],
    image: '/projects/swiftbite.png',
    imageAlt: 'SwiftBite Food Delivery Mobile App Flow',
    tag: 'Mobile UI',
  },
  {
    id: 'select-pos',
    num: '03',
    title: 'select-pos',
    category: 'Commercial POS System',
    tagline: 'High-reliability retail POS terminal running in active production.',
    stack: ['Flutter', 'Dart', 'Desktop / Mobile', 'Offline Sync'],
    image: '/projects/select-pos.png',
    imageAlt: 'select-pos Retail Checkout Terminal',
    tag: 'POS Terminal',
  },
  {
    id: 'api-integration',
    num: '04',
    title: 'API Integration',
    category: 'Client & Dashboard Layer',
    tagline: 'Type-safe OpenAPI client generation & fault-tolerant data pipelines.',
    stack: ['Swagger / OpenAPI', 'TypeScript', 'Firebase', 'REST'],
    image: '/projects/api-integration.png',
    imageAlt: 'Typed OpenAPI Client & Dashboard',
    tag: 'API Layer',
  },
  {
    id: 'engineering-stack',
    num: '05',
    title: 'Core Stack',
    category: 'Engineering Architecture',
    tagline: 'Cross-platform mobile apps, cloud backends & high-performance UI.',
    stack: ['React Native', 'Next.js 16', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/taskflow.png',
    imageAlt: 'Full-Cycle Software Engineering',
    tag: 'Architecture',
  },
]

const NUM_FACES = 5
const ANGLE_STEP = 360 / NUM_FACES // 72 degrees

export function Hero3DPolygon() {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentRotationRef = useRef(0)
  const targetRotationRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const [activeFaceIndex, setActiveFaceIndex] = useState(0)
  const [isAutoSpin, setIsAutoSpin] = useState(true)
  const [prismWidth, setPrismWidth] = useState(300)

  // Calculate the 3D inradius (distance from center to face):
  // r = (width / 2) / tan(PI / 5) = (width / 2) / tan(36deg) ≈ width * 0.68819
  const radius = Math.round((prismWidth / 2) / Math.tan(Math.PI / NUM_FACES))

  // Handle responsive width adjustment
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      if (w < 380) {
        setPrismWidth(240)
      } else if (w < 520) {
        setPrismWidth(270)
      } else if (w < 768) {
        setPrismWidth(290)
      } else {
        setPrismWidth(310)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Rotate smoothly to specific face
  const rotateToFace = useCallback((faceIdx: number) => {
    const currentAngle = targetRotationRef.current
    const targetAngle = -faceIdx * ANGLE_STEP
    // Find shortest modular rotation path
    const diff = ((targetAngle - currentAngle) % 360 + 540) % 360 - 180
    targetRotationRef.current = currentAngle + diff
    setActiveFaceIndex(faceIdx)
  }, [])

  const nextFace = () => {
    const nextIdx = (activeFaceIndex + 1) % NUM_FACES
    rotateToFace(nextIdx)
  }

  const prevFace = () => {
    const prevIdx = (activeFaceIndex - 1 + NUM_FACES) % NUM_FACES
    rotateToFace(prevIdx)
  }

  // Animation Loop: pure steady rotation without mouse tilt, with smooth navigation interpolation
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lastStamp = performance.now()

    const animate = (timestamp: number) => {
      const delta = Math.min((timestamp - lastStamp) / 1000, 0.1)
      lastStamp = timestamp

      if (isAutoSpin && !reducedMotion) {
        // Continuous auto-orbit (~28s per full 360 deg)
        targetRotationRef.current -= delta * 13
      }

      // Smooth lerp to target angle
      const diff = targetRotationRef.current - currentRotationRef.current
      currentRotationRef.current += diff * (isAutoSpin ? 0.08 : 0.12)

      // Calculate active front-facing index for badge highlighting
      const normalizedAngle = (-currentRotationRef.current % 360 + 360) % 360
      const closestIdx = Math.round(normalizedAngle / ANGLE_STEP) % NUM_FACES
      setActiveFaceIndex(closestIdx)

      // Apply CSS transform to the 3D prism group with fixed steady perspective angle (no mouse tilt)
      if (containerRef.current) {
        const prismEl = containerRef.current.querySelector<HTMLElement>('.prism-3d-rotor')
        if (prismEl) {
          prismEl.style.transform = `rotateX(-6deg) rotateY(${currentRotationRef.current}deg)`
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isAutoSpin])

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[470px] w-full flex-col items-center justify-center select-none"
      style={{ perspective: '1100px' }}
    >
      {/* Ambient background glow & radial depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(198,255,71,0.09)_0%,transparent_65%)] blur-2xl"
      />

      {/* Holographic Top Ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 z-0 flex items-center justify-center opacity-40"
      >
        <div className="size-56 rounded-full border border-dashed border-primary/40 animate-[spin_40s_linear_infinite]" />
        <div className="absolute size-44 rounded-full border border-primary/20" />
        <div className="absolute size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
      </div>

      {/* 3D Prism Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: `${prismWidth}px`,
          height: '380px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 3D Rotor Container */}
        <div
          className="prism-3d-rotor relative size-full"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {PROJECT_FACES.map((project, idx) => {
            const faceAngle = idx * ANGLE_STEP
            const isFacing = activeFaceIndex === idx

            return (
              <div
                key={project.id}
                className={cn(
                  'absolute inset-0 rounded-xl border transition-all duration-500 overflow-hidden backdrop-blur-md',
                  isFacing
                    ? 'border-primary/60 bg-card/85 shadow-[0_16px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(198,255,71,0.18)] ring-1 ring-primary/40'
                    : 'border-border/60 bg-card/50 opacity-60 shadow-[0_8px_20px_rgba(0,0,0,0.5)] grayscale-[30%]',
                )}
                style={{
                  width: `${prismWidth}px`,
                  height: '380px',
                  transform: `rotateY(${faceAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {/* Face Header & Project Tag */}
                <div className="flex items-center justify-between border-b border-border/80 bg-background/50 px-3.5 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.65rem] font-bold text-primary tracking-widest">
                      {project.num}
                    </span>
                    <span className="h-2 w-px bg-border" />
                    <span className="text-[0.7rem] font-medium text-muted-foreground uppercase tracking-wider truncate max-w-[140px]">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="flex size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                    <span className="font-mono text-[0.6rem] text-primary/90 uppercase tracking-wider">
                      {project.tag}
                    </span>
                  </div>
                </div>

                {/* Banner Clean Image Area (No overlay arrows or dots) */}
                <div className="relative h-44 w-full overflow-hidden bg-background/90">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover object-top"
                    priority={idx === 0}
                  />

                  {/* Subtle Glassmorphic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                </div>

                {/* Face Content Details */}
                <div className="flex flex-col justify-between p-3.5 h-[154px]">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-serif text-lg font-normal text-foreground group-hover:text-primary transition-colors truncate">
                        {project.title}
                      </h4>
                      <a
                        href="#work"
                        className="flex items-center gap-1 text-[0.65rem] font-mono text-muted-foreground hover:text-primary transition-colors shrink-0"
                      >
                        Details
                        <ArrowUpRight className="size-3" />
                      </a>
                    </div>

                    <p className="mt-1 line-clamp-2 text-[0.72rem] leading-relaxed text-muted-foreground">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded bg-secondary/80 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted-foreground border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="rounded bg-secondary/50 px-1 py-0.5 font-mono text-[0.55rem] text-muted-foreground/80">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Active Edge Highlighting Strip */}
                {isFacing && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Navigation with Project Names & Rotation Controls */}
      <div className="mt-7 flex flex-col items-center gap-3 z-10">
        {/* Project Name Chips & Prev/Next Arrows */}
        <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card/75 p-1 backdrop-blur-md shadow-lg">
          <button
            type="button"
            onClick={prevFace}
            aria-label="Rotate to previous project"
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          <div className="flex items-center gap-1 px-1">
            {PROJECT_FACES.map((p, i) => {
              const isCurrent = activeFaceIndex === i
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => rotateToFace(i)}
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
            onClick={nextFace}
            aria-label="Rotate to next project"
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>

        {/* Play / Pause Orbit Status Controls */}
        <div className="flex items-center gap-4 text-muted-foreground font-mono text-[0.65rem]">
          <div className="flex items-center gap-1.5">
            <Layers className="size-3 text-primary" />
            <span>3D Pentagon Showcase</span>
          </div>

          <span className="text-border">|</span>

          <button
            type="button"
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {isAutoSpin ? (
              <>
                <Pause className="size-2.5 text-primary" />
                <span>Orbiting</span>
              </>
            ) : (
              <>
                <Play className="size-2.5" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
