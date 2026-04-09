import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const externalPackages = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
]);

const isExternal = (id) => {
  if (id.startsWith('node:')) {
    return true;
  }

  for (const dep of externalPackages) {
    if (id === dep || id.startsWith(`${dep}/`)) {
      return true;
    }
  }

  return false;
};

export default defineConfig({
  plugins: [react(), libInjectCss()],
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
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'LogoraDebate',
      formats: ['es']
    },
    rollupOptions: {
      external: isExternal,
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
