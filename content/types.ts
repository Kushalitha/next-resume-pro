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

export type ContentProject = {
  id: string;
  title: string;
  category?: string;
  short?: string;
  cover?: string;
  tags?: string[];
  href?: string;
  details?: string;
};

export type GithubFeatured = string[];
