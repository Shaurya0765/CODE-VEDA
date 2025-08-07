import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { buildSecurityOptions } from './vite.security.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets'),
      'components': path.resolve(__dirname, './src/components'),
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: buildSecurityOptions.minify,
    terserOptions: buildSecurityOptions.terserOptions,
    sourcemap: buildSecurityOptions.sourcemap,
    rollupOptions: {
      ...buildSecurityOptions.rollupOptions,
      output: {
        ...buildSecurityOptions.rollupOptions.output,
        manualChunks: {
          ...buildSecurityOptions.rollupOptions.output.manualChunks,
          three: ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
        }
      }
    }
  },
  server: {
    // Security headers for development
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
});
