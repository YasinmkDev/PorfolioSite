'use client'

import { useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Check, Copy, LoaderCircle } from 'lucide-react'
import { Reveal, RevealWords } from '@/components/reveal'
import { CONTACT_LIMITS, mailtoFor, parseContactPayload } from '@/lib/contact'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

const availability = [
  { k: 'Time zone', v: 'UTC+5 — overlaps EU all day, US mornings' },
  { k: 'Reply time', v: 'Within 24 hours, usually much sooner' },
  { k: 'Engagements', v: 'Project, retainer or hourly contract' },
  { k: 'Best fit', v: 'React Native apps, React dashboards, API integration' },
]

type FieldErrors = Partial<Record<'name' | 'email' | 'brief', string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

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

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [fields, setFields] = useState<FieldErrors>({})
  const [message, setMessage] = useState('')
  const [mailto, setMailto] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const brief = String(data.get('brief') ?? '')
    const company = String(data.get('company') ?? '')

    const parsed = parseContactPayload({ name, email, brief, company })
    if (!parsed.ok) {
      setFields(parsed.fields)
      setStatus('error')
      setMessage('Please check the highlighted fields.')
      return
    }

    setStatus('submitting')
    setFields({})
    setMessage('')
    setMailto(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, brief, company }),
      })
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        fields?: FieldErrors
        code?: string
        mailto?: string
      }

      if (res.ok && json.code !== 'not_configured') {
        setStatus('success')
        form.reset()
        return
      }

      if (json.fields) setFields(json.fields)

      if (json.code === 'not_configured') {
        const fallback = json.mailto || mailtoFor({ name, email, brief })
        setMailto(fallback)
        setStatus('error')
        setMessage('The inbox connection is not live yet — send this from your email app instead.')
        return
      }

      setStatus('error')
      setMessage(json.error || 'Could not send that just now. Please email me directly.')
    } catch {
      const fallback = mailtoFor({ name, email, brief })
      setMailto(fallback)
      setStatus('error')
      setMessage('Network hiccup — you can send the same note from your email app.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-5 rounded-sm border border-primary/30 bg-card/40 p-6 sm:p-8">
        <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 text-primary">
          <Check className="size-5" />
        </span>
        <div className="flex flex-col gap-2">
          <p className="font-serif text-2xl tracking-tight">Message received.</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            I will read it personally and reply within 24 hours — usually sooner.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="self-start text-sm text-primary transition-colors hover:text-foreground"
        >
          Send another
        </button>
      </div>
    )
  }

  const busy = status === 'submitting'

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5 rounded-sm border border-border bg-card/40 p-6 sm:p-8">
      <div className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="name" label="Name" error={fields.name}>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name.max}
          placeholder="Your name"
          disabled={busy}
          aria-invalid={fields.name ? true : undefined}
          aria-describedby={fields.name ? 'name-error' : undefined}
          className={inputClass(fields.name)}
        />
      </Field>

      <Field id="email" label="Email" error={fields.email}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={CONTACT_LIMITS.email.max}
          placeholder="you@company.com"
          disabled={busy}
          aria-invalid={fields.email ? true : undefined}
          aria-describedby={fields.email ? 'email-error' : undefined}
          className={inputClass(fields.email)}
        />
      </Field>

      <Field id="brief" label="What are you building?" error={fields.brief}>
        <textarea
          id="brief"
          name="brief"
          required
          rows={4}
          maxLength={CONTACT_LIMITS.brief.max}
          placeholder="Platform, timeline, and what needs to exist by the end of it."
          disabled={busy}
          aria-invalid={fields.brief ? true : undefined}
          aria-describedby={fields.brief ? 'brief-error' : undefined}
          className={cn(inputClass(fields.brief), 'resize-none leading-relaxed')}
        />
      </Field>

      <button
        type="submit"
        disabled={busy}
        data-cursor={busy ? 'Sending' : 'Send'}
        className="group relative mt-1 overflow-hidden rounded-sm border border-primary/50 px-6 py-3.5 text-sm font-medium text-primary disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 group-disabled:scale-y-0" />
        <span className="relative flex items-center justify-center gap-2 transition-colors duration-500 group-hover:text-primary-foreground group-disabled:text-primary">
          {busy ? 'Sending…' : 'Send message'}
          {busy ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <ArrowUpRight className="size-4" />
          )}
        </span>
      </button>

      <p aria-live="polite" className="text-xs leading-relaxed text-muted-foreground">
        {status === 'error' ? (
          <span className="text-destructive">
            {message}{' '}
            {mailto ? (
              <a href={mailto} className="text-primary underline-offset-4 hover:underline">
                Open email app
              </a>
            ) : (
              <a href={`mailto:${SITE.email}`} className="text-primary underline-offset-4 hover:underline">
                {SITE.email}
              </a>
            )}
          </span>
        ) : (
          'Prefer email? Use the address on the left. Either way, you get a real reply.'
        )}
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label-mono">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function inputClass(error?: string) {
  return cn(
    'rounded-md border bg-background px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary/40 disabled:opacity-60',
    error ? 'border-destructive/80 focus:border-destructive focus:ring-destructive/30' : 'border-border',
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setCopyError(false)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
      setCopyError(true)
      setTimeout(() => setCopyError(false), 2500)
    }
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
        <Reveal className="flex items-center gap-3.5" distance={12}>
          <span className="flex size-6 items-center justify-center rounded-sm bg-primary/10 border border-primary/30 font-mono text-xs font-bold text-primary">
            05
          </span>
          <span className="label-mono uppercase tracking-[0.16em] text-muted-foreground">Contact</span>
        </Reveal>

        <h2 className="text-edge mt-8 max-w-[20ch] font-serif text-[clamp(2.6rem,8.5vw,7rem)] font-normal leading-[1.05]">
          <RevealWords text="Let’s talk about" />
          <RevealWords text="your project." delay={180} accentWords={['project']} />
        </h2>

        <p className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
          Tell me what you are building and where it is stuck. If I am the right fit I will say so
          and give you a plan; if I am not, I will tell you that too. No forms-into-the-void — every
          message reaches me directly.
        </p>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
          <div className="flex flex-col gap-8 md:col-span-6">
            <Reveal className="flex flex-wrap items-center gap-3">
              <MagneticLink
                href={`mailto:${SITE.email}`}
                cursorLabel="Email me"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-md"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                <span className="relative flex items-center gap-2 transition-colors duration-500 group-hover:text-background">
                  {SITE.email}
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </MagneticLink>

              <a
                href={SITE.upwork}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Upwork"
                className="group inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-4 text-sm font-medium text-foreground transition-colors duration-300 hover:border-primary/60 hover:text-primary"
              >
                Upwork Profile
                <ArrowUpRight className="size-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <button
                type="button"
                onClick={copy}
                data-cursor={copied ? 'Copied' : copyError ? 'Failed' : 'Copy'}
                aria-label="Copy email address"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-4 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:border-primary/50 hover:text-primary cursor-pointer"
              >
                {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
                {copied ? 'Copied' : copyError ? 'Copy failed' : 'Copy address'}
              </button>
            </Reveal>
            <p aria-live="polite" className="sr-only">
              {copied ? 'Email address copied' : copyError ? 'Could not copy email address' : ''}
            </p>

            <Reveal delay={90}>
              <dl className="flex flex-col rounded-md border border-border overflow-hidden bg-card/20">
                <div className="border-b border-border bg-card/40 px-5 py-3">
                  <span className="label-mono uppercase text-xs tracking-wider text-primary">Availability & Terms</span>
                </div>
                {availability.map((item) => (
                  <div
                    key={item.k}
                    className="flex flex-col gap-1 border-b border-border/80 px-5 py-3.5 transition-colors duration-200 last:border-0 hover:bg-card sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="label-mono text-xs text-muted-foreground shrink-0">{item.k}</dt>
                    <dd className="text-sm font-medium text-foreground/90 sm:text-right">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={140} direction="left" className="relative md:col-span-6">
            <ContactForm />
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
              {SITE.name} — {SITE.role}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={SITE.upwork}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Upwork"
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              Upwork
            </a>
            <a
              href={`mailto:${SITE.email}`}
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
