/**
 * Next Resume Pro v2.0.0
 * Author: Kushalitha Maduranga
 * Year: 2026
 *
 * License:
 * - Code (TypeScript, JavaScript, build scripts): MIT License
 * - UI / Design (CSS, layout, visual components): CC BY 4.0
 *	Attribution Required
 *
 * Repository:
 * https://github.com/Kushalitha
 *
 * ESLint flat config for Next.js + TypeScript
 * Generated: 2025-12-29
 * Note: This replaces legacy .eslintrc.* usage for ESLint v9+
 */

import next from 'eslint-config-next';

const eslintConfig = [
  // Ignore build, dependencies and static output
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', 'public/**']
  },
  // Spread Next's recommended flat config
  ...next,
];

export default eslintConfig;