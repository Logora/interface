import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { transformWithEsbuild } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    {
      name: 'vitest-jsx-in-js',
      enforce: 'pre',
      async transform(code, id) {
        if (id.includes('/src/') && id.endsWith('.js')) {
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic'
          });
        }
        return null;
      }
    },
    
    react({ include: /\.[jt]sx?$/ })
  ],
  oxc: {
    include: /\.[cm]?[jt]sx?$/,
    exclude: [],
    jsx: {
      runtime: 'automatic'
    }
  },
  resolve: {
    alias: [
      {
        find: /^@logora\/debate$/,
        replacement: path.resolve(__dirname, 'src/index.js')
      },
      {
        find: /^@logora\/debate\/(.+)$/,
        replacement: path.resolve(__dirname, 'src/components/$1/index.js')
      }
    ]
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'src/components')]
      }
    },
    modules: {
      generateScopedName: '[local]'
    }
  }
});
