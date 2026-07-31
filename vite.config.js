import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Security headers applied to every response (dev server + preview server).
// For production, replicate these in your web server config (Nginx / Firebase / Vercel).
const securityHeaders = {
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',

  // Prevent MIME-type sniffing
  'X-Content-Type-Options': 'nosniff',

  // Enable strict HSTS (only meaningful over HTTPS)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // XSS filter for legacy browsers
  'X-XSS-Protection': '1; mode=block',

  // Referrer policy — don't leak full URL cross-origin
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions policy — restrict unnecessary browser APIs
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',

  // Prevent sensitive pages being cached by intermediate proxies
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',

  // Content Security Policy — whitelist only what is needed
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://images.unsplash.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' ws: wss: http: https:",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
}

export default defineConfig({
  base: '/GramSetu/',
  plugins: [react()],

  server: {
    headers: securityHeaders,
  },

  preview: {
    headers: securityHeaders,
  },

  build: {
    // Emit source maps only in development; never in production to avoid source disclosure
    sourcemap: false,

    rollupOptions: {
      output: {
        // Content-addressable hashed filenames prevent cache poisoning
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
})
