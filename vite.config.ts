import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve(import.meta.dirname, 'client/src/components'),
      '@features': path.resolve(import.meta.dirname, 'client/src/features'),
      '@layouts': path.resolve(import.meta.dirname, 'client/src/layouts'),
      '@hooks': path.resolve(import.meta.dirname, 'client/src/hooks'),
      '@lib': path.resolve(import.meta.dirname, 'client/src/lib'),
      '@styles': path.resolve(import.meta.dirname, 'client/src/styles'),
      '@shared': path.resolve(import.meta.dirname, 'shared'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },
});
