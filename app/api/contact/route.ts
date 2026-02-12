/**
* Next Resume Pro v2.0.0
* Author: Kushalitha Maduranga
* Year: 2026
*
* License:
* - Code (TypeScript, JavaScript, build scripts): MIT License
* - UI / Design (CSS, layout, visual components): CC BY 4.0
* 	Attribution Required
*
* Repository:
* https://github.com/Kushalitha
*/

import { NextResponse } from 'next/server';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_PER_WINDOW = 10;

// naive in-memory rate limiter keyed by IP
// note: serverless environments may not persist this across invocations
// but it's a basic protection for demo
// @ts-ignore
const globalAny: any = globalThis;
if (!globalAny.__contact_rl) globalAny.__contact_rl = new Map();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const rl = await (await import('../../../lib/rateLimiter')).checkRateLimit(`contact:${ip}`, MAX_PER_WINDOW, RATE_LIMIT_WINDOW);
    if (!rl.allowed) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
    }

    const body = await req.json();
    // honeypot
    if (body.hp) return NextResponse.json({ ok: true });

    // minimal validation
    if (!body.name || !body.email || !body.message || !body.subject) return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });

    // In production, send email via provider (SendGrid, Mailgun, SMTP, etc.).
    // The preferred recipient is configured via environment variable CONTACT_TO_EMAIL
    // or falls back to the value from the content file.
    const to = process.env.CONTACT_TO_EMAIL || (await import('../../../content/contact')).contact.sendTo;
    const replyTo = process.env.CONTACT_REPLY_TO || (await import('../../../content/contact')).contact.replyTo;

    // Send email if enabled (opt-in via env var)
    if (process.env.EMAIL_ENABLED === 'true') {
      try {
        const { sendEmail } = await import('../../../lib/email');
        await sendEmail({
          to,
          subject: `[Website] ${body.subject}`,
          text: `Name: ${body.name}\nEmail: ${body.email}\nSubject: ${body.subject}\n\n${body.message}`,
          replyTo: body.email
        });
      } catch (err) {
        console.error('Email send failed', err);
        return NextResponse.json({ ok: false, error: 'email-failed' }, { status: 500 });
      }
    } else {
      // Avoid logging raw message bodies or PII. Log a minimal summary instead.
      await (await import('../../../lib/logger')).log('info', 'contact-form-submission', { to, replyTo, subject: body.subject, messageLength: typeof body.message === 'string' ? body.message.length : 0, ip });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
