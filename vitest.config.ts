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

import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: path.resolve(__dirname, 'test-utils', 'setupTests.ts'),
    include: ['tests/**/*.test.{ts,tsx}']
  },
  resolve: {
    alias: {
      // Mock next/image during tests
      'next/image': path.resolve(__dirname, 'test-utils', 'mockNextImage.tsx')
    }
  }
})