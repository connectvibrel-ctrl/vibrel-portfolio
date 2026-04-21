/* ================================================================
   VIBREL — SECURITY, PERFORMANCE & CONTENT SECURITY POLICY
   ================================================================ */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['.lhr.life', '.loca.lt', '.serveousercontent.com'],
    headers: {
      // Prevent clickjacking
      'X-Frame-Options': 'DENY',
      // Prevent MIME-type sniffing
      'X-Content-Type-Options': 'nosniff',
      // Force HTTPS
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      // Prevent XSS
      'X-XSS-Protection': '1; mode=block',
      // Control referrer data
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Permissions policy — restrict access to sensors/camera/mic
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
      // Content Security Policy
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data:",
        "connect-src 'self' ws: wss: https://script.google.com https://script.googleusercontent.com https://formsubmit.co",
        "frame-src 'self' https://script.google.com",
        "media-src 'none'",
        "object-src 'none'",
      ].join('; '),
    },
  },
  build: {
    // Source maps off in production to protect business logic
    sourcemap: false,
    // Minify aggressively
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove all console logs in production build
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Code-split by route for faster initial load
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'react-vendor';
            if (id.includes('gsap')) return 'gsap-vendor';
            if (id.includes('lenis') || id.includes('@studio-freight/lenis')) return 'lenis-vendor';
            return 'vendor'; // Fallback for other modules
          }
        }
      },
    },
  },
})
