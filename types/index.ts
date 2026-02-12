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

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description?: string | null;
  stargazers_count: number;
  language?: string | null;
};

export type ContentProject = {
  id: string;
  name?: string;
  title?: string;
  category?: string;
  short?: string;
  description?: string;
  cover?: string;
  tags?: string[];
  href?: string;
  liveUrl?: string;
  repoUrl?: string;
  language?: string | null;
  stargazers_count?: number;
};

export type Project = Repo | ContentProject;
