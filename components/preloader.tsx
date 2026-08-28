'use client'

import { useEffect, useRef, useState } from 'react'
import { markSiteLoaded } from '@/hooks/use-site-loaded'
import { cn } from '@/lib/utils'

/** Resources worth waiting on: the first project shot is visible as soon as you scroll. */
const CRITICAL_IMAGES = ['/projects/ledgerProject/first_image_withScreenShotsAndTextOnRight.png']

/** Weighted real-loading milestones. Weights sum to 1. */
const WEIGHTS = { fonts: 0.28, images: 0.32, page: 0.4 }

const MIN_DURATION = 1100
const MAX_DURATION = 7000

type Phase = 'loading' | 'leaving' | 'done'

function statusFor(p: number) {
  if (p < 0.3) return 'Loading typefaces'
  if (p < 0.62) return 'Fetching assets'
  if (p < 0.92) return 'Preparing interface'
  return 'Ready'
}

export function Preloader() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0)

  const target = useRef(0)
  const shown = useRef(0)
  const startedAt = useRef(0)

  useEffect(() => {
    startedAt.current = performance.now()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minDuration = reduce ? 300 : MIN_DURATION

    let raf = 0
    let finished = false
    let cancelled = false

    const bump = (amount: number) => {
      target.current = Math.min(1, target.current + amount)
    }

    /* ---- real signals ---------------------------------------------------- */

    // 1. Web fonts
    const fontsReady = document.fonts
      ? document.fonts.ready.then(() => bump(WEIGHTS.fonts))
      : Promise.resolve(bump(WEIGHTS.fonts))

    // 2. Critical imagery, decoded not just fetched
    const per = WEIGHTS.images / CRITICAL_IMAGES.length
    const imagesReady = Promise.all(
      CRITICAL_IMAGES.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = img.onerror = () => {
              bump(per)
              resolve()
            }
            img.src = src
          }),
      ),
    )

    // 3. Document + subresources
    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        bump(WEIGHTS.page)
        resolve()
        return
      }
      const onLoad = () => {
        bump(WEIGHTS.page)
        resolve()
      }
      window.addEventListener('load', onLoad, { once: true })
    })

    /* ---- animation loop -------------------------------------------------- */

    const tick = () => {
      // ease the shown value toward the real target, with a slow creep so the
      // bar never sits perfectly still while a slow resource resolves
      const creepCap = Math.min(0.9, target.current + 0.08)
      const goal = finished ? 1 : Math.min(creepCap, target.current + 0.06)
      shown.current += (goal - shown.current) * (finished ? 0.16 : 0.055)

      const value = Math.min(1, shown.current)
      setProgress(value)

      if (finished && value > 0.997) {
        setProgress(1)
        leave()
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const leave = () => {
      if (cancelled) return
      markSiteLoaded()
      setPhase('leaving')
      window.setTimeout(() => !cancelled && setPhase('done'), reduce ? 260 : 1000)
    }

    const complete = () => {
      const elapsed = performance.now() - startedAt.current
      const wait = Math.max(0, minDuration - elapsed)
      window.setTimeout(() => {
        target.current = 1
        finished = true
      }, wait)
    }

    Promise.all([fontsReady, imagesReady, pageReady]).then(complete)

    // never trap the visitor behind a stalled resource
    const bail = window.setTimeout(complete, MAX_DURATION)

    raf = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(bail)
    }
  }, [])

  /* lock scroll while the curtain is up */
  useEffect(() => {
    if (phase === 'done') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  if (phase === 'done') return null

  const pct = Math.round(progress * 100)
  const leaving = phase === 'leaving'

  return (
    <div
      aria-busy={!leaving}
      aria-label="Loading site"
      className={cn(
        'fixed inset-0 z-[100] flex flex-col justify-between bg-background',
        'transition-transform duration-[1000ms] ease-[var(--ease-in-out-quint)]',
        leaving && '-translate-y-full',
      )}
    >
      {/* faint grid so the curtain shares the hero's material */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div
        className={cn(
          'relative flex items-center justify-between px-5 pt-8 transition-opacity duration-500 sm:px-8 lg:px-12',
          leaving && 'opacity-0',
        )}
      >
        <span className="label-mono">Yasin Malak</span>
        <span className="label-mono hidden sm:block">React Native / React Engineer</span>
      </div>

      {/* centre mark */}
      <div
        className={cn(
          'relative flex flex-1 flex-col items-center justify-center gap-6 px-5 transition-all duration-500',
          leaving && 'scale-[0.97] opacity-0',
        )}
      >
        <div className="relative flex size-20 items-center justify-center">
          {/* progress ring */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90 size-full">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46 * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 120ms linear' }}
            />
          </svg>
          <span className="font-serif text-2xl tracking-tight">YM</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            className="font-mono text-5xl tabular-nums tracking-tighter text-foreground sm:text-6xl"
          >
            {String(pct).padStart(3, '0')}
            <span className="ml-1 align-super text-base text-muted-foreground">%</span>
          </span>
          <span aria-live="polite" className="label-mono">
            {statusFor(progress)}
          </span>
        </div>
      </div>

      {/* determinate bar */}
      <div className="relative px-5 pb-8 sm:px-8 lg:px-12">
        <div
          className={cn(
            'mb-3 flex items-center justify-between transition-opacity duration-500',
            leaving && 'opacity-0',
          )}
        >
          <span className="label-mono">Building interfaces that ship</span>
          <span className="label-mono tabular-nums">{`${pct} / 100`}</span>
        </div>
        <div className="h-px w-full overflow-hidden bg-border">
          <div
            className="h-full origin-left bg-primary"
            style={{
              transform: `scaleX(${progress})`,
              transition: 'transform 140ms linear',
            }}
          />
        </div>
      </div>
    </div>
  )
}
