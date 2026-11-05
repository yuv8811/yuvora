import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
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
});
