Blog post format

- Create a new file in this folder (e.g., `post-4.ts`) which exports a `BlogPost` object as the default export.
- See `types.ts` for the `BlogPost` shape.
- Fields of interest:
  - `id`, `title`, `slug`, `summary` (HTML allowed — headings, <strong>bold</strong>, <u>underline</u>, `<code>inline code</code>`, and `<pre><code>` blocks are supported). Note: HTML is sanitized on render to remove unsafe content, but prefer author-controlled content when possible.
  - `author`, `categories`, `tags`, `date` (ISO), `readingTime`, `featuredImage`, `published` (boolean), `seo`, `href`.
- Example: `post-1.ts`.
- The listing and pagination are handled in `components/BlogGrid.tsx` (client-side).