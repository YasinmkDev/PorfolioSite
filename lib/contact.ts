import { SITE } from '@/lib/site'

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  brief: { min: 10, max: 4000 },
} as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactPayload = {
  name: string
  email: string
  brief: string
  company?: string
}

export type ContactField = 'name' | 'email' | 'brief'

export function parseContactPayload(input: unknown): {
  ok: true
  data: ContactPayload
} | {
  ok: false
  fields: Partial<Record<ContactField, string>>
} {
  const body = (input ?? {}) as Record<string, unknown>
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const brief = typeof body.brief === 'string' ? body.brief.trim() : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''

  const fields: Partial<Record<ContactField, string>> = {}

  if (name.length < CONTACT_LIMITS.name.min) {
    fields.name = 'Please enter your name.'
  } else if (name.length > CONTACT_LIMITS.name.max) {
    fields.name = 'Name is a bit too long.'
  }

  if (!email) {
    fields.email = 'Please enter your email.'
  } else if (!EMAIL_RE.test(email) || email.length > CONTACT_LIMITS.email.max) {
    fields.email = 'That email does not look valid.'
  }

  if (brief.length < CONTACT_LIMITS.brief.min) {
    fields.brief = 'A short sentence about the project is enough.'
  } else if (brief.length > CONTACT_LIMITS.brief.max) {
    fields.brief = 'Please keep the brief under 4,000 characters.'
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, fields }
  }

  return { ok: true, data: { name, email, brief, company } }
}

export function mailtoFor(data: Pick<ContactPayload, 'name' | 'email' | 'brief'>) {
  const subject = `Project inquiry from ${data.name}`
  const body = `${data.brief}\n\n— ${data.name}\n${data.email}`
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
