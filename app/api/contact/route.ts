import { NextResponse } from 'next/server'
import { escapeHtml, mailtoFor, parseContactPayload } from '@/lib/contact'
import { SITE } from '@/lib/site'

export const runtime = 'nodejs'

const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function rateLimit(ip: string) {
  const now = Date.now()
  const current = hits.get(ip)
  if (!current || now > current.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true, retryAfter: 0 }
  }
  if (current.count >= MAX_PER_WINDOW) {
    return { ok: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) }
  }
  current.count += 1
  return { ok: true, retryAfter: 0 }
}

function json(body: unknown, status = 200, extra?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extra },
  })
}

export async function POST(request: Request) {
  const limited = rateLimit(clientIp(request))
  if (!limited.ok) {
    return json(
      { error: 'Too many messages from this network. Please try again in a bit.' },
      429,
      { 'Retry-After': String(limited.retryAfter) },
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'Could not read that request.' }, 400)
  }

  const parsed = parseContactPayload(payload)
  if (!parsed.ok) {
    return json({ error: 'Please check the highlighted fields.', fields: parsed.fields }, 400)
  }

  const { name, email, brief, company } = parsed.data

  // Honeypot — bots fill hidden fields; humans never see it.
  if (company) {
    return json({ ok: true })
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || SITE.email
  const subject = `Portfolio inquiry from ${name}`
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    brief,
  ].join('\n')
  const html = `
    <div style="background:#111318;color:#e8ece6;font-family:Georgia,serif;padding:32px">
      <p style="font:12px/1.4 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#9aa39a;margin:0 0 16px">New inquiry</p>
      <h1 style="font-size:28px;line-height:1.1;margin:0 0 24px">Message from ${escapeHtml(name)}</h1>
      <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="white-space:pre-wrap;line-height:1.6;margin:24px 0 0">${escapeHtml(brief)}</p>
    </div>
  `

  try {
    const delivered = await deliver({ to, subject, html, text, replyTo: email, name })
    if (delivered) {
      return json({ ok: true })
    }
  } catch {
    return json({ error: 'The mail service did not accept the message. Please email me directly.' }, 502)
  }

  return json({
    ok: false,
    error: 'Mail delivery is not configured yet.',
    code: 'not_configured',
    mailto: mailtoFor({ name, email, brief }),
  })
}

async function deliver(input: {
  to: string
  subject: string
  html: string
  text: string
  replyTo: string
  name: string
}) {
  const resendKey = process.env.RESEND_API_KEY?.trim()
  if (resendKey) {
    const from =
      process.env.CONTACT_FROM_EMAIL?.trim() || 'Yasin Malak <beth.t@example.com>'
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        reply_to: input.replyTo,
      }),
    })
    if (!res.ok) {
      throw new Error(`resend_${res.status}`)
    }
    return true
  }

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY?.trim()
  if (web3Key) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3Key,
        subject: input.subject,
        name: input.name,
        email: input.replyTo,
        message: input.text,
        from_name: SITE.name,
      }),
    })
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null
    if (!res.ok || data?.success === false) {
      throw new Error(`web3forms_${res.status}`)
    }
    return true
  }

  return false
}
