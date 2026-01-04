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

/**
 * Blog post content types
 */
export type SEO = {
  title?: string;
  description?: string;
  keywords?: string[];
};
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string; // HTML string allowed
  author: string;
  categories: string[];
  tags: string[];
  date: string; // ISO date
  updatedAt?: string; // ISO date
  readingTime?: string;
  featuredImage?: string;
  published?: boolean;
  seo?: SEO;
  href?: string; // link to the post page
};