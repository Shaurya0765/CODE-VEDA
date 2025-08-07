/**
 * Security configuration for Vite build
 * Implements security headers and build optimizations
 */

export const securityHeaders = {
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: Remove unsafe-* in production
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://vision.hack2skill.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://vision.hack2skill.com"
  ].join('; '),

  // Security headers
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

  // CORS headers (if needed)
  'Access-Control-Allow-Origin': 'https://codeveda.tech',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export const buildSecurityOptions = {
  // Remove console logs in production
  drop: ['console', 'debugger'],
  
  // Minification options for security
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info', 'console.debug']
    },
    mangle: {
      safari10: true
    },
    format: {
      comments: false
    }
  },

  // Source map configuration (disable in production for security)
  sourcemap: process.env.NODE_ENV === 'development',
  
  // Bundle analysis
  rollupOptions: {
    output: {
      // Manual chunks for better security analysis
      manualChunks: {
        vendor: ['react', 'react-dom'],
        animation: ['framer-motion'],
        icons: ['react-icons'],
        styling: ['styled-components']
      }
    }
  }
};

export default {
  securityHeaders,
  buildSecurityOptions
};
