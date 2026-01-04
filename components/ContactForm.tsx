/**
* Next Resume Pro v1.0.0
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

'use client';

import React, { useState, useRef } from 'react';
import UIInput from './ui/input';
import UIPrimaryButton from './ui/button';

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '', hp: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Refs for focusing fields when validation fails / after success
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const subjectRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = 'Please enter your name.';
    if (!values.email.trim()) errs.email = 'Please enter your email address.';
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = 'Please enter a valid email address.';
    if (!values.subject.trim()) errs.subject = 'Please provide a subject.';
    if (!values.message.trim()) errs.message = 'Please enter a message.';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot: treat as successfully handled to avoid processing
    if (values.hp) {
      setStatus('success');
      setValues({ name: '', email: '', subject: '', message: '', hp: '' });
      nameRef.current?.focus();
      return;
    }

    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus('error');
      // focus the first invalid field in order
      if (clientErrors.name) nameRef.current?.focus();
      else if (clientErrors.email) emailRef.current?.focus();
      else if (clientErrors.subject) subjectRef.current?.focus();
      else if (clientErrors.message) messageRef.current?.focus();
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (res.ok) {
        setStatus('success');
        setValues({ name: '', email: '', subject: '', message: '', hp: '' });
        // focus the name input so keyboard users can start another message easily
        nameRef.current?.focus();
      } else {
        // Try to parse returned validation errors from the server
        let data: any = null;
        try { data = await res.json(); } catch (err) { /* ignore */ }
        if (data && data.errors && typeof data.errors === 'object') {
          setErrors(data.errors);
          setStatus('error');
          const first = Object.keys(data.errors)[0];
          if (first === 'name') nameRef.current?.focus();
          else if (first === 'email') emailRef.current?.focus();
          else if (first === 'subject') subjectRef.current?.focus();
          else if (first === 'message') messageRef.current?.focus();
        } else {
          setStatus('error');
        }
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite" noValidate>
      <input name="hp" value={values.hp} onChange={(e) => setValues({ ...values, hp: e.target.value })} className="sr-only" aria-hidden />

      <div>
        <label htmlFor="name" className="block text-sm">Name</label>
        <UIInput
          id="name"
          name="name"
          placeholder="Your full name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          ref={nameRef}
        />
        {errors.name && <p id="name-error" className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm">Email</label>
        <UIInput
          id="email"
          name="email"
          placeholder="your@company.com"
          type="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          ref={emailRef}
        />
        {errors.email && <p id="email-error" className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm">Subject</label>
        <UIInput
          id="subject"
          name="subject"
          placeholder="Brief subject (e.g., project inquiry)"
          value={values.subject}
          onChange={(e) => setValues({ ...values, subject: e.target.value })}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          ref={subjectRef}
        />
        {errors.subject && <p id="subject-error" className="text-red-600 text-sm mt-1">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project — goals, timeline, and a rough budget help me reply faster."
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          ref={messageRef}
          className="w-full mt-1 p-2 border rounded-md"
          rows={5}
        />
        {errors.message && <p id="message-error" className="text-red-600 text-sm mt-1">{errors.message}</p>}
      </div>

      <div>
        <UIPrimaryButton type="submit" aria-busy={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send'}
        </UIPrimaryButton>
      </div>

      <div role="status" aria-live="polite">
        {status === 'success' && <p className="text-green-600 mt-2">Message sent. Thank you!</p>}
        {status === 'error' && Object.keys(errors).length === 0 && <p className="text-red-600 mt-2">There was an error sending your message.</p>}
        {status === 'error' && Object.keys(errors).length > 0 && <p className="text-red-600 mt-2">Please fix the highlighted fields and try again.</p>}
      </div>
    </form>
  );
}
