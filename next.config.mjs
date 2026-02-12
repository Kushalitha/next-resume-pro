// next.config.mjs

/**
 * Next.js configuration for a flexible template
 * Supports:
 * - Static export / shared hosting (Hostinger)
 * - Node server / Vercel / VPS
 * Works with PNG, JPG, WebP, AVIF images
 */

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=()' },
]

// Detect if building for static export / shared hosting
const isStaticExport = process.env.NEXT_STATIC_EXPORT === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Use 'export' mode if static hosting
  output: isStaticExport ? 'export' : undefined,

  // Image settings
  images: isStaticExport
    ? {
        // Disable Next.js Image Optimization for static export
        unoptimized: true,
      }
    : {
        // Node/Vercel: optimize images and generate WebP/AVIF
        minimumCacheTTL: 60,
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig