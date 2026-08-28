'use client'

import { useEffect, useRef } from 'react'

type Vec = [number, number, number]

const PHI = (1 + Math.sqrt(5)) / 2

const ICO_RAW: Vec[] = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1],
]

function norm(v: Vec, scale = 1): Vec {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [(v[0] / l) * scale, (v[1] / l) * scale, (v[2] / l) * scale]
}

const CORE = ICO_RAW.map((v) => norm(v, 1))
const CAGE = ICO_RAW.map((v) => norm(v, 1.72))

function edgesOf(verts: Vec[]) {
  const pairs: [number, number][] = []
  let min = Infinity
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const d = Math.hypot(
        verts[i][0] - verts[j][0],
        verts[i][1] - verts[j][1],
        verts[i][2] - verts[j][2],
      )
      if (d < min - 0.01) min = d
    }
  }
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const d = Math.hypot(
        verts[i][0] - verts[j][0],
        verts[i][1] - verts[j][1],
        verts[i][2] - verts[j][2],
      )
      if (Math.abs(d - min) < 0.08) pairs.push([i, j])
    }
  }
  return pairs
}

const CORE_EDGES = edgesOf(CORE)
const CAGE_EDGES = edgesOf(CAGE)

type Panel = {
  corners: Vec[]
  bars: Vec[][]
  accent: boolean
}

function panel(cx: number, cy: number, cz: number, w: number, h: number, yaw: number, pitch: number, accent = false): Panel {
  const hw = w / 2
  const hh = h / 2
  const local: Vec[] = [
    [-hw, -hh, 0],
    [hw, -hh, 0],
    [hw, hh, 0],
    [-hw, hh, 0],
  ]
  const rot = (p: Vec): Vec => {
    const [x, y, z] = p
    const x1 = x
    const y1 = y * Math.cos(pitch) - z * Math.sin(pitch)
    const z1 = y * Math.sin(pitch) + z * Math.cos(pitch)
    const x2 = x1 * Math.cos(yaw) + z1 * Math.sin(yaw)
    const z2 = -x1 * Math.sin(yaw) + z1 * Math.cos(yaw)
    return [x2 + cx, y1 + cy, z2 + cz]
  }
  const bars: Vec[][] = [-0.72, -0.2, 0.28, 0.74].map((t) => {
    const y = t * hh
    return [rot([-hw * 0.62, y, 0.02]), rot([hw * 0.62, y, 0.02])]
  })
  return { corners: local.map(rot), bars, accent }
}

const PANELS: Panel[] = [
  panel(-1.15, 0.12, 0.35, 1.55, 2.25, 0.72, 0.1),
  panel(0.08, -0.06, 1.05, 1.72, 2.5, -0.16, -0.08, true),
  panel(1.18, 0.18, 0.22, 1.42, 2.05, -0.78, 0.14),
]

function rotXY(v: Vec, ax: number, ay: number): Vec {
  const [x, y, z] = v
  const y1 = y * Math.cos(ax) - z * Math.sin(ax)
  const z1 = y * Math.sin(ax) + z * Math.cos(ax)
  const x2 = x * Math.cos(ay) + z1 * Math.sin(ay)
  const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay)
  return [x2, y1, z2]
}

/**
 * Lightweight 3D module drawn in canvas — same stack as the hero flow field,
 * no extra WebGL runtime. A lattice core with three glass interface plates.
 */
export function HeroSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let running = true
    let time = 0
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const project = (v: Vec) => {
      const z = v[2] + 4.6
      const f = Math.min(width, height) * 0.42 / z
      return {
        x: width * 0.5 + v[0] * f,
        y: height * 0.52 - v[1] * f,
        z,
      }
    }

    const draw = () => {
      time += reduced ? 0 : 0.012
      pointer.x += (pointer.tx - pointer.x) * 0.08
      pointer.y += (pointer.ty - pointer.y) * 0.08

      const ax = reduced ? 0.22 : 0.22 - pointer.y * 0.35
      const ay = reduced ? 0.46 : time * 0.55 + pointer.x * 0.55

      ctx.clearRect(0, 0, width, height)

      const xf = (v: Vec) => rotXY(v, ax, ay)

      const cagePts = CAGE.map((v) => project(xf(v)))
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = 'rgba(198, 255, 71, 0.16)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (const [a, b] of CAGE_EDGES) {
        ctx.moveTo(cagePts[a].x, cagePts[a].y)
        ctx.lineTo(cagePts[b].x, cagePts[b].y)
      }
      ctx.stroke()

      const panels = PANELS.map((p) => {
        const corners = p.corners.map((c) => project(xf(c)))
        const depth = corners.reduce((s, c) => s + c.z, 0) / corners.length
        return { ...p, corners, depth, bars: p.bars.map((bar) => bar.map((q) => project(xf(q)))) }
      }).sort((a, b) => b.depth - a.depth)

      for (const p of panels) {
        ctx.beginPath()
        ctx.moveTo(p.corners[0].x, p.corners[0].y)
        for (let i = 1; i < p.corners.length; i++) ctx.lineTo(p.corners[i].x, p.corners[i].y)
        ctx.closePath()
        ctx.fillStyle = 'rgba(14, 18, 16, 0.55)'
        ctx.fill()
        ctx.strokeStyle = p.accent ? 'rgba(198, 255, 71, 0.92)' : 'rgba(198, 255, 71, 0.5)'
        ctx.lineWidth = p.accent ? 1.35 : 1
        ctx.stroke()

        for (let i = 0; i < p.bars.length; i++) {
          const [a, b] = p.bars[i]
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle =
            i === p.bars.length - 1
              ? 'rgba(198, 255, 71, 0.7)'
              : 'rgba(198, 255, 71, 0.18)'
          ctx.lineWidth = i === p.bars.length - 1 ? 1.6 : 0.8
          ctx.stroke()
        }
      }

      const corePts = CORE.map((v) => project(xf(v)))
      ctx.shadowColor = 'rgba(198, 255, 71, 0.35)'
      ctx.shadowBlur = 10
      ctx.strokeStyle = 'rgba(198, 255, 71, 0.88)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      for (const [a, b] of CORE_EDGES) {
        ctx.moveTo(corePts[a].x, corePts[a].y)
        ctx.lineTo(corePts[b].x, corePts[b].y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      for (const pt of corePts) {
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(198, 255, 71, 0.9)'
        ctx.fill()
      }

      if (running && !reduced) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      pointer.tx = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1))
      pointer.ty = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1))
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    draw()
    if (!reduced) raf = requestAnimationFrame(draw)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 },
    )
    io.observe(canvas)

    window.addEventListener('pointermove', onMove, { passive: true })
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-cursor="Tilt"
      className="block size-full"
    />
  )
}
