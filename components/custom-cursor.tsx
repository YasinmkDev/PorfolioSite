'use client'

import { useEffect, useRef } from 'react'

/**
 * Magnetic custom cursor: a small solid dot that tracks the pointer 1:1 and a
 * larger ring that trails it with spring-ish lerping. Over any element marked
 * with `data-cursor`, the ring scales up, inverts and shows that element's label.
 * Disabled on touch / no-hover devices and when reduced motion is requested.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const canHover =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!canHover) return

    const ring = ringRef.current
    const dot = dotRef.current
    const label = labelRef.current
    if (!ring || !dot || !label) return

    const root = document.documentElement
    root.classList.add('custom-cursor')

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY
    let scale = 1
    let targetScale = 1
    let visible = false
    let raf = 0

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) {
        visible = true
        ringX = targetX
        ringY = targetY
        ring.style.opacity = '1'
        dot.style.opacity = '1'
      }
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
    }

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')
      if (target) {
        const text = target.dataset.cursor ?? ''
        targetScale = text ? 3.2 : 2.1
        label.textContent = text
        ring.dataset.active = 'true'
      } else {
        targetScale = 1
        label.textContent = ''
        delete ring.dataset.active
      }
    }

    const onDown = () => {
      ring.dataset.pressed = 'true'
    }
    const onUp = () => {
      delete ring.dataset.pressed
    }
    const onLeave = () => {
      visible = false
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }

    const tick = () => {
      ringX += (targetX - ringX) * 0.16
      ringY += (targetY - ringY) * 0.16
      scale += (targetScale - scale) * 0.12
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      root.classList.remove('custom-cursor')
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={ringRef}
        className="group/ring absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-foreground/40 opacity-0 transition-[background-color,border-color,opacity] duration-300 data-[active=true]:border-primary data-[active=true]:bg-primary data-[pressed=true]:bg-primary/30"
      >
        <span
          ref={labelRef}
          className="max-w-[3.4rem] scale-[0.32] text-center font-mono text-[0.6rem] font-medium uppercase leading-tight tracking-[0.14em] text-primary-foreground opacity-0 transition-opacity duration-200 group-data-[active=true]/ring:opacity-100"
        />
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-primary opacity-0 transition-opacity duration-300"
      />
    </div>
  )
}
