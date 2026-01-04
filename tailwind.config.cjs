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

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#eef2ff',
          500: '#6366f1'
        },
        accent: {
          50: '#f5f3ff',
          100: '#efe8ff',
          300: '#a78bfa',
          500: 'rgb(var(--accent))',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95'
        },
        accent2: {
          500: 'rgb(var(--accent-2))'
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          300: '#67e8f9',
          500: '#06b6d4',
          700: '#0e7490'
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          300: '#60a5fa',
          500: '#2563eb',
          700: '#1e40af'
        },
        surface: {
          DEFAULT: '#fafafa',
          muted: '#f3f4f6'
        },
        dark: {
          DEFAULT: '#0b1220',
          muted: '#0f1724'
        }
      },
      boxShadow: {
        'card-md': '0 6px 18px rgba(16,24,40,0.08)',
        'card-lg': '0 12px 40px rgba(2,6,23,0.12)'
      },
      borderRadius: {
        xl: '1rem'
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
