import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'src/components')]
      }
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
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'LogoraDebate',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router', 'react-router-dom'],
      output: {
        format: 'es',
        dir: 'dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router': 'ReactRouter',
          'react-router-dom': 'ReactRouterDOM'
        }
      }
    }
  }
});
