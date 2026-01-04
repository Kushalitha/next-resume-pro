# Contributing to Next Resume Pro

Thanks for your interest in contributing! We welcome bug reports, improvements, accessibility fixes, and documentation contributions.

Getting started

- Fork the repo and open a branch for your work.
- Run `npm install` and `npm run dev` for local development.
- Follow the existing code style (TypeScript, Tailwind, and ESLint rules). Run `npm run lint` and `npx tsc --noEmit` before submitting.

Tests and checks

- Run unit and a11y tests: `npm test`.
- Ensure ESLint and TypeScript checks pass: `npm run lint` and `npm run typecheck`.
- If your change affects the UI, please add/adjust accessibility tests and verify with `npm run a11y`.

Pull request guidelines

- Create small, focused PRs with clear descriptions.
- Include tests and update docs when behavior changes.
- Reference related issues and add screenshots or a short demo when appropriate.

Design & attribution

- The UI and design parts are licensed under CC BY 4.0. If you reuse or redistribute UI elements, please keep attribution and license details.

Security

- Do not commit secrets or `.env` files. Use `.env.example` to document required environment variables.

Husky (pre-commit hooks)

- This repository uses Husky for pre-commit checks. To set up Husky locally run:

```bash
npm run prepare
```

- The pre-commit hook runs `npm run check:headers`, `npm run lint`, and `npm run typecheck`. Make sure these pass before committing.

Thanks for helping improve Next Resume Pro! If you have questions about contributing, open an issue and we'll help you get started.
