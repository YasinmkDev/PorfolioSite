'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  accent: boolean
  trail: number[]
}

const TRAIL = 14

/**
 * Generative flow-field: particles are advected through a slowly evolving
 * pseudo-noise vector field and rendered as fading streaks. The pointer creates
 * a vortex that bends the field around it. Pauses when off-screen or when the
 * tab is hidden, and degrades to a static field under reduced-motion.
 */
export function FlowField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let particles: Particle[] = []
    let raf = 0
    let running = true
    let time = 0

    const pointer = { x: -9999, y: -9999, active: false, strength: 0 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const density = Math.round((width * height) / 7200)
      const count = Math.max(90, Math.min(420, density))
      particles = Array.from({ length: count }, () => spawn())
    }

    const spawn = (): Particle => {
      const maxLife = 140 + Math.random() * 220
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: Math.random() * maxLife,
        maxLife,
        accent: Math.random() < 0.18,
        trail: [],
      }
    }

    // cheap smooth vector field (layered sines ~ curl noise feel)
    const field = (x: number, y: number, t: number) => {
      const s = 0.0032
      const a =
        Math.sin(x * s + t * 0.28) * 1.1 +
        Math.sin(y * s * 1.35 - t * 0.21) * 1.0 +
        Math.sin((x + y) * s * 0.62 + t * 0.16) * 0.85
      return a * 1.35
    }

    const step = () => {
      time += reduced ? 0 : 0.006
      ctx.clearRect(0, 0, width, height)
      ctx.lineCap = 'round'

      if (pointer.active) pointer.strength = Math.min(1, pointer.strength + 0.05)
      else pointer.strength = Math.max(0, pointer.strength - 0.03)

      for (const p of particles) {
        const angle = field(p.x, p.y, time)
        let ax = Math.cos(angle) * 0.09
        let ay = Math.sin(angle) * 0.09

        if (pointer.strength > 0.01) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.hypot(dx, dy)
          const radius = 190
          if (dist < radius && dist > 0.001) {
            const falloff = (1 - dist / radius) ** 2 * pointer.strength
            // tangential swirl + gentle outward push
            ax += (-dy / dist) * falloff * 1.15 + (dx / dist) * falloff * 0.32
            ay += (dx / dist) * falloff * 1.15 + (dy / dist) * falloff * 0.32
          }
        }

        p.vx = (p.vx + ax) * 0.94
        p.vy = (p.vy + ay) * 0.94
        p.x += p.vx
        p.y += p.vy
        p.life += 1

        p.trail.push(p.x, p.y)
        if (p.trail.length > TRAIL * 2) p.trail.splice(0, 2)

        const out = p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40
        if (out || p.life > p.maxLife) {
          const fresh = spawn()
          fresh.life = 0
          Object.assign(p, fresh)
          continue
        }

        const fade = Math.min(1, Math.min(p.life, p.maxLife - p.life) / 45)
        if (p.trail.length >= 4) {
          ctx.beginPath()
          ctx.moveTo(p.trail[0], p.trail[1])
          for (let i = 2; i < p.trail.length; i += 2) {
            ctx.lineTo(p.trail[i], p.trail[i + 1])
          }
          ctx.strokeStyle = p.accent
            ? `rgba(198, 255, 71, ${0.5 * fade})`
            : `rgba(226, 232, 228, ${0.16 * fade})`
          ctx.lineWidth = p.accent ? 1.15 : 0.75
          ctx.stroke()
        }

        if (p.accent) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(198, 255, 71, ${0.85 * fade})`
          ctx.fill()
        }
      }

      if (running) raf = requestAnimationFrame(step)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active =
        pointer.x > -80 &&
        pointer.y > -80 &&
        pointer.x < rect.width + 80 &&
        pointer.y < rect.height + 80
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    raf = requestAnimationFrame(step)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
