# Next Resume Pro — Configuration & Editing Guide

This guide explains how to configure and customize the project: change data content, edit pages, wire up the contact form, manage images, run tests, and deploy. Keep the repository structure in mind and edit the files noted below.

---

## Quick checklist (common edits)
- Project metadata: `content/site.ts` (site title, social links)
- Author & contact: `content/contact.ts`
- Portfolio entries (featured): `content/portfolio/projects.ts`
- Portfolio grid / catalog: `content/portfolio/index.ts`
- Blog posts: `content/blog/*.ts`
- Add images to: `public/portfolio/` (covers, gallery assets, placeholders)
- Contact form behavior: `components/ContactForm.tsx` and server API `app/api/contact/route.ts`
- Environment vars: copy `.env.example` -> `.env.local` and set values

---

## Content files

### Portfolio
- File: `content/portfolio/index.ts`
  - Purpose: canonical list of portfolio items used for the main grid and featured work.
  - Fields: `id`, `title`, `subtitle`, `category`, `image` (SVG/icon path), `cover` (large image path), `details`, `gallery` (string[]), `tags`, `featured?: boolean`.
  - Add an item by following existing objects. Use `id` as the URL slug: `/portfolio/{id}`.

- File: `content/portfolio/projects.ts`
  - Purpose: optional smaller set used for featured project cards and project detail routes.
  - Keep gallery image paths relative to `/portfolio/`.

### Blog posts
- Files: `content/blog/*.ts`
  - Each post exports a typed object with `id`, `title`, `slug`, `summary`, `date`, `published`, etc.
  - To add a post: create `content/blog/post-<n>.ts` following examples.

### Other content
- `content/site.ts` — site metadata (title, social links, email)
- `content/contact.ts` — contact blurb and default email recipients
- `content/github.ts` — optional GitHub integration settings

---

## Pages & Routing (App Router)
- App folder: `app/`
  - `app/portfolio/[slug]/page.tsx` — dynamic project page using `projects` data
  - `app/blog/[slug]/page.tsx` — blog post pages
  - To add a new page: create `app/<pagename>/page.tsx` (use server components by default)

### Static generation
- Many pages call `generateStaticParams()` or `generateMetadata()` to be pre-rendered. Refer to the dynamic routes for examples.

---

## Contact form
- Frontend: `components/ContactForm.tsx`
  - Client-side validation, inline errors, honeypot field (`hp`), and accessible status messages.
  - On success the form clears and focuses the Name field.

- Server: `app/api/contact/route.ts`
  - Performs minimal validation (name, email, subject, message).
  - Rate limiting: naive in-memory limiter for demo; **not** suitable for distributed production.
  - To actually send emails: set `EMAIL_ENABLED=true` and configure SMTP env vars. The code uses `lib/email.ts`.

- Environment variables (from `.env.example`):
  - `EMAIL_ENABLED` (true/false)
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
  - `CONTACT_TO_EMAIL` (recipient), `CONTACT_REPLY_TO`

- Testing/send preview:
  - Use MailHog or a test SMTP provider for local testing, or run `node scripts/test-smtp.js`.

- Server responses:
  - `{ ok: true }` → 200 success
  - `{ ok: false, error: 'invalid' }` → 400 validation
  - `{ ok: false, error: 'rate_limited' }` → 429
  - `{ ok: false, error: 'email-failed' }` → 500 (email send failed)

---

## Images & Assets
- Place images under `public/portfolio/` for project assets and `public/blog/` for blog illustrations.
- The gallery component uses `components/Gallery.tsx` and `ImgWithFallback` to gracefully fallback to `public/portfolio/placeholder.svg`.
- For production-quality images, prefer `next/image` where appropriate (example: project cover uses `<Image />`).

---

## Styling & Theme
- Tailwind config: `tailwind.config.cjs`
  - Change colors, theme tokens here.
- Global CSS: `app/globals.css`
  - Additional global rules or animations can be added.
- Theme switching: `next-themes` integration in `components/ThemeProviderClient.tsx` and `ThemeToggle.tsx`.

---

## Tests & Accessibility
- Unit/A11y tests: use Vitest + axe-core. Test config: `vitest.config.ts`.
- Accessibility sweep: Pa11y is used in `a11y` scripts: `npm run a11y` (requires a running server) and `npm run a11y:ci`.
- To run tests: `npm test`, or `npm run test:watch` for interactive development.

---

## Dev & Tooling
- Lint: `npm run lint` (ESLint)
- Typecheck: `npm run typecheck` (tsc --noEmit)
- Dev server: `npm run dev`
- Build + Start: `npm run build && npm start` (or `npm run start:ci` for port 3000)
- Optional helpful scripts:
  - `npm run dev:watch` — autorestart + clean `.next` for HMR issues
  - `npm run debug:dump` / `npm run debug:clear` — debug log helpers

---

## CI & Preflight checks
- Lint/Typecheck run in CI (see `.github/workflows`)
- Optional checks: `scripts/check-chunks.js` verifies compiled `.next` chunks for syntax errors (useful to catch broken bundle artifacts).
- The README contains a Sponsors and Licensing section (`README.md`).

---

## Security & Production Notes
- Do not commit secrets; use environment variables and deployment secrets (Vercel, Netlify, etc.).
- For production email and rate-limiting, configure reliable providers (SMTP with TLS, transactional email services). This project supports Redis for distributed rate-limiting; set `REDIS_URL` in your environment to enable it.
- Disable debug endpoints in production and keep logs out of version control.

---

## Troubleshooting
- Hydration mismatch: avoid server/client-only mismatches (see `components/ThemeToggle.tsx` for pattern to render both icons and use CSS to toggle visibility).
- Image 404s: verify `public/portfolio/` contains the referenced files and check paths are `/portfolio/...`.
- Gallery modal issues: ensure `createPortal` is working and the modal is not blocked by ancestor stacking context; the gallery uses `max-w-[95vw]` and `h-[60vh]` for responsive behavior.

---

## Quick commands
- Install: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Tests: `npm test`
- A11y: `npm run a11y` (run with server on 3000)

---

## Examples & Code Snippets (Common Edits)

### 1) Add a portfolio item
Edit `content/portfolio/index.ts` and add an object like:

```ts
  {
    id: 'my-project',
    title: 'My Project',
    subtitle: 'Web design',
    category: 'Web design',
    image: '/portfolio/my-project.svg',
    cover: '/portfolio/my-project-cover.jpg',
    details: 'Short project description with highlights and links.',
    gallery: ['/portfolio/my-project-1.jpg', '/portfolio/my-project-2.jpg'],
    tags: ['design', 'accessibility'],
    featured: true
  }
```

Then push and the site will include it (project page: `/portfolio/my-project`). Add your images to `public/portfolio/`.

---

### 2) Create a blog post
Create `content/blog/post-7.ts` following the pattern in existing posts:

```ts
export const post7 = {
  id: 'post-7',
  title: 'My New Post',
  slug: 'my-new-post',
  date: '2026-01-01',
  summary: `<p>Short summary</p>`,
  featuredImage: '/blog/my-image.svg',
  published: true,
  href: '/blog/my-new-post'
}
```

The App Router page will pick it up automatically if you follow the structure used by other posts.

---

### 3) Contact form: enable real email sending
Set environment variables in `.env.local` (copy `.env.example`):

```
EMAIL_ENABLED=true
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-pass
CONTACT_TO_EMAIL=you@example.com
CONTACT_REPLY_TO=no-reply@example.com
```

Use `scripts/test-smtp.js` to validate credentials locally before enabling in production.

Server-side code path: `app/api/contact/route.ts` uses `lib/email.sendEmail({ to, subject, text, replyTo })` when `EMAIL_ENABLED` is true.

**CI enforcement:** This project enforces that `EMAIL_ENABLED` is **not** set to `true` during the main CI `build-and-check` workflow. If `EMAIL_ENABLED=true` is detected, the build will fail to prevent accidental credential leaks or accidental email sends during CI runs.

---

## Debug logging (detailed)
This project includes an optional debug logging system intended for local development and staging. The helpers write to `logs/debug.log` and support rotation and dump files for error-level incidents.

Environment variables (debug):

- `DEBUG_LOG` — set to `true` to enable file logging to `logs/debug.log`.
- `DEBUG_AUTO_DUMP` — set to `true` to generate `debug-error-<ts>.log` on error-level logs.
- `DEBUG_CAPTURE_UNCAUGHT` — set to `true` to register `uncaughtException` and `unhandledRejection` handlers.
- `DEBUG_WRITE_SECRET` — optional secret required for POST requests to `/api/debug/log` via header `x-debug-secret`.
- `DEBUG_READ_SECRET` — optional secret required for GET requests to `/api/debug/log` and `/api/debug/download`.
- `DEBUG_ALLOW_READ` — set to `true` to permit reading logs via the API (DO NOT enable in production).
- `DEBUG_LOG_DIR` — override logs directory (default: `./logs`).

Quick commands:

- Dump recent logs: `npm run debug:dump` (prints latest tail of the log).
- Clear logs: `npm run debug:clear` (removes the log file).
- Programmatic write: POST to `/api/debug/log` with `{ level, message, meta }` (requires `DEBUG_LOG=true` and `x-debug-secret` if `DEBUG_WRITE_SECRET` is set).
- Read logs (opt-in): GET `/api/debug/log?chars=2000` or `/api/debug/download` (requires `DEBUG_ALLOW_READ=true` and `x-debug-secret` if `DEBUG_READ_SECRET` is set).

Security and best practices:

- **Never** enable `DEBUG_ALLOW_READ` or `DEBUG_LOG` in production. Doing so exposes internal log content and may reveal sensitive data.

> CI enforcement: a workflow (`.github/workflows/debug-safety.yml`) runs on pushes to `main`/`master` and fails if `DEBUG_ALLOW_READ` or `DEBUG_LOG` are set to `true` in repository secrets for production.

If you need debug capabilities in **staging**, enable them only with secrets set: `DEBUG_READ_SECRET` and `DEBUG_WRITE_SECRET`. The staging check in CI (`debug-safety.yml`) will fail if debug is enabled in staging but either secret is missing. Ensure secrets are configured in the environment settings (GitHub Action secrets or environment secrets), not in source code or .env files committed to the repo.
- Use `DEBUG_WRITE_SECRET` and `DEBUG_READ_SECRET` in staging; store them securely in your deploy platform (e.g., GitHub secrets, Vercel env vars).
- Prefer centralized logging services (Sentry, Datadog) for production observability and alerting.
- Rotate secrets regularly and restrict access using network allow-lists where possible.

---

## SMTP / Email sending (detailed)
Email is opt-in. Enable with `EMAIL_ENABLED=true` and configure SMTP via the following variables.

Environment variables (SMTP):

- `EMAIL_ENABLED` — `true` to enable sending.
- `SMTP_HOST` — SMTP host (e.g., `smtp.example.com`).
- `SMTP_PORT` — SMTP port (e.g., `587` for STARTTLS, `465` for TLS).
- `SMTP_SECURE` — `true` if using implicit TLS (465), otherwise `false`.
- `SMTP_USER` — SMTP username (if required).
- `SMTP_PASS` — SMTP password.
- `CONTACT_FROM` — From address (e.g., `"Your Name" <no-reply@example.com>`).
- `CONTACT_TO_EMAIL` — recipient for contact form messages.
- `CONTACT_REPLY_TO` — reply-to address.

Testing SMTP locally

- Use MailHog (recommended for local testing):

```bash
# Run MailHog via Docker
docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog
# In .env.local
EMAIL_ENABLED=true
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
```

- Validate sending using the included helper:

```bash
node scripts/test-smtp.js
```

Error handling

- Contact API returns `{ ok: false, error: 'email-failed' }` on send failure. When `DEBUG_LOG=true`, check logs via `npm run debug:dump` for details.
- For production, use a transactional email provider (e.g., SES, SendGrid) and set up alerts and retries.

CI / deployment notes

- Store SMTP credentials and debug secrets in CI/host provider secret storage.
- Keep `EMAIL_ENABLED` disabled in CI unless testing with a controlled recipient to avoid accidental sends.

---

### 4) Use `next/image` for optimized covers
Example usage in a page (already used in `app/portfolio/[slug]/page.tsx`):

```tsx
import Image from 'next/image'

<Image src={project.cover} alt={project.title} width={1200} height={800} className="rounded-lg object-cover" />
```

Use fixed width/height for better LCP; `next/image` will optimize images on demand.

---

### 5) Add a SSG dynamic route (example)
Server component in `app/portfolio/[slug]/page.tsx` uses `generateStaticParams()`:

```ts
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }))
}
```

This ensures pages are statically generated for each project at build time.

---

### 6) Quick test example — Contact form (Vitest + Testing Library)
Add a test `tests/contactform.submit.test.tsx`:

```ts
import { render, screen, fireEvent } from '@testing-library/react'
import ContactForm from '../components/ContactForm'

test('shows success on valid submit', async () => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true }))
  render(<ContactForm />)
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
  fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Hello' } })
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Message' } })
  fireEvent.click(screen.getByText(/send/i))
  expect(await screen.findByText(/Message sent/i)).toBeInTheDocument()
})
```

Adjust for Vitest environment (mock `fetch` appropriately).

---

### 7) Run MailHog locally to test SMTP
- Install MailHog (macOS: `brew install mailhog`) or use Docker:
  - `docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog`
- Set SMTP host to `localhost` port `1025` in `.env.local` and enable `EMAIL_ENABLED=true`.
- MailHog web UI: http://localhost:8025

---