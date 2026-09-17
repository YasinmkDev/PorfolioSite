'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export function SiteNav() {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
        setScrolled(window.scrollY > 40)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const ids = ['top', ...links.map((l) => l.id)]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        setActive(visible.target.id === 'top' ? '' : visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.6] },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500',
        scrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[92rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          data-cursor="Top"
          className="group flex items-center gap-3"
          aria-label="Yasin Malak — back to top"
        >
          <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-sm border border-border font-mono text-xs font-medium tracking-tight">
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
            <span className="relative transition-colors duration-500 group-hover:text-primary-foreground">
              YM
            </span>
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">Yasin Malak</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-cursor=""
              className={cn(
                'relative rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground',
                active === link.id && 'text-foreground',
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-500 ease-[var(--ease-out-expo)]',
                  active === link.id ? 'scale-x-100' : 'scale-x-0',
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.upwork}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Upwork"
            className="group hidden items-center gap-1.5 rounded-sm border border-border/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:inline-flex"
          >
            Upwork
            <ArrowUpRight className="size-3 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <a
            href="#contact"
            data-cursor="Let's talk"
            className="group relative hidden overflow-hidden rounded-sm border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors duration-500 hover:text-primary-foreground sm:block"
          >
            <span className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
            <span className="relative flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary transition-colors duration-500 group-hover:bg-primary-foreground" />
              Available for work
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex size-9 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-primary/50 md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-border/60">
        <div
          className="h-px origin-left bg-primary"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* mobile sheet */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 top-16 z-40 origin-top overflow-y-auto bg-background transition-all duration-500 ease-[var(--ease-out-expo)] md:hidden',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-4 opacity-0',
        )}
      >
        <nav className="flex flex-col px-5 py-4" aria-label="Mobile sections">
          {links.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-border/60 py-4 font-serif text-3xl tracking-tight last:border-0"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity 500ms var(--ease-out-expo) ${i * 60}ms, transform 500ms var(--ease-out-expo) ${i * 60}ms`,
              }}
            >
              {link.label}
              <span className="label-mono">{`0${i + 1}`}</span>
            </a>
          ))}
        </nav>

        <div
          className="mt-6 flex flex-col gap-4 px-5 pb-8"
          style={{
            opacity: open ? 1 : 0,
            transition: 'opacity 500ms var(--ease-out-expo) 340ms',
          }}
        >
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3.5 text-sm font-medium text-primary-foreground"
          >
            <span className="size-1.5 rounded-full bg-primary-foreground" />
            Start a project
          </a>
          <a
            href={SITE.upwork}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 rounded-sm border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Hire on Upwork
            <ArrowUpRight className="size-4 text-primary" />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-center font-mono text-xs tracking-widest text-muted-foreground uppercase"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </header>
  )
}
