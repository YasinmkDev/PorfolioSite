'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, inView }
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** stagger delay in ms */
  delay?: number
  /** travel distance in px */
  distance?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  blur?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 26,
  direction = 'up',
  duration = 900,
  blur = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  const hidden = (() => {
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`
      case 'down':
        return `translate3d(0, -${distance}px, 0)`
      case 'left':
        return `translate3d(${distance}px, 0, 0)`
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`
      default:
        return 'translate3d(0, 0, 0)'
    }
  })()

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : hidden,
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : undefined,
        transition: `opacity ${duration}ms var(--ease-out-expo) ${delay}ms, transform ${duration}ms var(--ease-out-expo) ${delay}ms, filter ${duration}ms var(--ease-out-expo) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/**
 * Word-by-word masked reveal for display headlines.
 * Each word sits in an overflow-hidden line box and slides up from below the mask.
 */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  step = 55,
  accentWords = [],
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  step?: number
  accentWords?: string[]
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.25)
  const words = text.split(' ')
  const normalize = (value: string) => value.replace(/[^\w'-]/g, '').toLowerCase()
  const accentSet = new Set(accentWords.map(normalize))

  return (
    <span ref={ref} className={cn('block', className)}>
      {words.map((word, i) => {
        const isAccent = accentSet.has(normalize(word))
        return (
          <span
            key={`${word}-${i}`}
            className="inline-flex overflow-hidden pb-[0.08em] align-bottom"
          >
            <span
              className={cn(
                'inline-block will-change-transform',
                isAccent && 'text-primary',
                wordClassName,
              )}
              style={{
                transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,110%,0)',
                opacity: inView ? 1 : 0,
                transition: `transform 1100ms var(--ease-out-expo) ${delay + i * step}ms, opacity 700ms ease ${delay + i * step}ms`,
              }}
            >
              {word}
            </span>
            {i < words.length - 1 ? <span className="whitespace-pre">&nbsp;</span> : null}
          </span>
        )
      })}
    </span>
  )
}

/** Thin rule that draws itself horizontally when scrolled into view. */
export function DrawRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  return (
    <div ref={ref} className={cn('h-px w-full overflow-hidden bg-border', className)}>
      <div
        className="h-px w-full bg-primary/70"
        style={{
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform 1200ms var(--ease-out-expo) ${delay}ms`,
        }}
      />
    </div>
  )
}
