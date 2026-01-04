# Portfolio content — editing guide

This project supports several content files to control what the portfolio page displays.

- `content/portfolio/projects.ts` — Static *Featured Work* items. Edit this file to change the "Featured Work" cards.
- `content/github.ts` — **New** single config file. Exports `githubUsername` (default username used when `GITHUB_USERNAME` env var is not set) and `githubFeatured` (array of GitHub repo `name`s to highlight). If `githubFeatured` is empty the page falls back to the top repos returned from GitHub.
- `content/portfolio/index.ts` — Canonical list of portfolio projects. Use this file to manage both the main portfolio grid and the "All Projects" view; mark featured items with `featured: true` to highlight them in hero/featured areas.

Examples and types are provided in `content/types.ts`.

Quick edit example:
- To highlight `my-cool-repo` in the GitHub section, edit `content/github.ts` and add `'my-cool-repo'` to the `githubFeatured` array.
- To manage all projects locally, add entries to `content/all-projects.ts` following the examples already there.
