'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Magnetic ("sticking") hover, copied from the contact section's email button:
 * the element gravitates toward the cursor while it hovers, then springs back
 * to its resting position on leave. The spring is a 500ms expo-out transform
 * transition; the pull is 0.22 horizontally / 0.32 vertically of the cursor's
 * distance from the element's center.
 *
 * Pass smaller strengths for large surfaces (e.g. the hero carousel deck),
 * where the full pull would shove the element into its neighbours.
 */
function useMagnetic<T extends HTMLElement>(strengthX: number, strengthY: number) {
  const ref = useRef<T | null>(null)

  const onMove = (e: React.PointerEvent<T>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strengthX
    const y = (e.clientY - (rect.top + rect.height / 2)) * strengthY
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate3d(0, 0, 0)'
  }

  return { ref, onMove, onLeave }
}

const springClass = 'transition-transform duration-500 ease-[var(--ease-out-expo)] will-change-transform'

export function Magnetic({
  children,
  className,
  strengthX = 0.22,
  strengthY = 0.32,
}: {
  children: React.ReactNode
  className?: string
  strengthX?: number
  strengthY?: number
}) {
  const { ref, onMove, onLeave } = useMagnetic<HTMLDivElement>(strengthX, strengthY)
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(springClass, className)}
    >
      {children}
    </div>
  )
}

export function MagneticLink({
  href,
  children,
  className,
  cursorLabel,
}: {
  href: string
  children: React.ReactNode
  className?: string
  cursorLabel?: string
}) {
  const { ref, onMove, onLeave } = useMagnetic<HTMLAnchorElement>(0.22, 0.32)
  return (
    <a
      ref={ref}
      href={href}
      data-cursor={cursorLabel}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(springClass, className)}
    >
      {children}
    </a>
  )
}
