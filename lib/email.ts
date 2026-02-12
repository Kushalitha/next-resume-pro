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

import nodemailer from 'nodemailer';
import { contact } from '../content/contact';

export type EmailOptions = {
  to?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export async function sendEmail(opts: EmailOptions) {
  // Opt-in guard
  if (process.env.EMAIL_ENABLED !== 'true') {
    throw new Error('email-disabled');
  }

  const host = process.env.SMTP_HOST;
  if (!host) throw new Error('smtp-missing');

  const port = Number(process.env.SMTP_PORT || '587');
  const secure = process.env.SMTP_SECURE === 'true';

  const authUser = process.env.SMTP_USER;
  const authPass = process.env.SMTP_PASS;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: authUser ? { user: authUser, pass: authPass } : undefined,
  });

  const to = opts.to || process.env.CONTACT_TO_EMAIL || contact.sendTo;
  const from = process.env.CONTACT_FROM || `${contact.owner.name} <${contact.sendTo}>`;
  const replyTo = opts.replyTo || process.env.CONTACT_REPLY_TO || contact.replyTo;

  const info = await transporter.sendMail({
    from,
    to,
    replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });

  return info;
}