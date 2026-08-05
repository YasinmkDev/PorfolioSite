'use client'

import { useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { Reveal, RevealWords } from '@/components/reveal'
import { cn } from '@/lib/utils'

const EMAIL = 'hello@yasinmalak.dev'

const availability = [
  { k: 'Time zone', v: 'UTC+5 — overlaps EU all day, US mornings' },
  { k: 'Reply time', v: 'Within 24 hours, usually much sooner' },
  { k: 'Engagements', v: 'Project, retainer or hourly contract' },
  { k: 'Best fit', v: 'React Native apps, React dashboards, API integration' },
]

/** Button that leans toward the cursor, then springs back on exit. */
function MagneticLink({
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
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.22
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.32
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      data-cursor={cursorLabel}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn('transition-transform duration-500 ease-[var(--ease-out-expo)]', className)}
    >
      {children}
    </a>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border">
      {/* atmospheric backdrop — sits far behind the type, never competes with it */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/textures/contact-bg.png"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_35%,transparent_60%,var(--background)_95%)]" />
        <div className="absolute inset-0 bg-background/55" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="relative mx-auto w-full max-w-[92rem] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <Reveal className="flex items-center gap-4" distance={12}>
          <span className="label-mono text-primary">05</span>
          <span className="label-mono">Contact</span>
        </Reveal>

        <h2 className="text-edge mt-8 max-w-[20ch] font-serif text-[clamp(2.6rem,9vw,7.5rem)]">
          <RevealWords text="Let’s talk about" />
          <RevealWords text="your project." delay={180} accentWords={['project.']} />
        </h2>

        <p className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Tell me what you are building and where it is stuck. If I am the right fit I will say so
          and give you a plan; if I am not, I will tell you that too. No forms-into-the-void — every
          message reaches me directly.
        </p>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
          <div className="flex flex-col gap-8 md:col-span-6">
            <Reveal className="flex flex-wrap items-center gap-3">
              <MagneticLink
                href={`mailto:${EMAIL}`}
                cursorLabel="Email me"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-primary px-6 py-4 text-sm font-medium text-primary-foreground"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                <span className="relative flex items-center gap-2 transition-colors duration-500 group-hover:text-background">
                  {EMAIL}
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </MagneticLink>

              <button
                type="button"
                onClick={copy}
                data-cursor={copied ? 'Copied' : 'Copy'}
                aria-label="Copy email address"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-4 text-sm text-muted-foreground transition-colors duration-500 hover:border-primary/50 hover:text-primary"
              >
                {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
                {copied ? 'Copied' : 'Copy address'}
              </button>
            </Reveal>

            <Reveal delay={90}>
              <dl className="flex flex-col rounded-sm border border-border">
                {availability.map((item) => (
                  <div
                    key={item.k}
                    className="flex flex-col gap-1 border-b border-border px-5 py-4 transition-colors duration-500 last:border-0 hover:bg-card sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="label-mono shrink-0">{item.k}</dt>
                    <dd className="text-sm text-foreground sm:text-right">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={140} direction="left" className="md:col-span-6">
            <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-sm border border-border bg-card/40 p-6 sm:p-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="label-mono">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors duration-300 placeholder:text-muted-foreground/70 focus:border-primary/60"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="label-mono">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors duration-300 placeholder:text-muted-foreground/70 focus:border-primary/60"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="brief" className="label-mono">
                  What are you building?
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  required
                  rows={4}
                  placeholder="Platform, timeline, and what needs to exist by the end of it."
                  className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none transition-colors duration-300 placeholder:text-muted-foreground/70 focus:border-primary/60"
                />
              </div>

              <button
                type="submit"
                data-cursor="Send"
                className="group relative mt-1 overflow-hidden rounded-sm border border-primary/50 px-6 py-3.5 text-sm font-medium text-primary"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
                <span className="relative flex items-center justify-center gap-2 transition-colors duration-500 group-hover:text-primary-foreground">
                  {sent ? 'Message queued — thank you' : 'Send message'}
                  {sent ? <Check className="size-4" /> : <ArrowUpRight className="size-4" />}
                </span>
              </button>

              <p aria-live="polite" className="text-xs leading-relaxed text-muted-foreground">
                {sent
                  ? 'This is a front-end demo handler — connect it to your inbox or a form service to go live.'
                  : 'Prefer email? Use the address on the left. Either way, you get a real reply.'}
              </p>
            </form>
          </Reveal>
        </div>
      </div>

      <footer className="relative border-t border-border">
        <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-sm border border-border font-mono text-xs">
              YM
            </span>
            <span className="text-sm text-muted-foreground">
              Yasin Malak — React Native &amp; React engineer
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor=""
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              Email
            </a>
            <a
              href="#top"
              data-cursor="Top"
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              Back to top
            </a>
            <span className="label-mono">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </section>
  )
}
