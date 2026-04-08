import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  docs: {
    autodocs: true
  },
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    const existingAlias = Array.isArray(config.resolve.alias)
      ? config.resolve.alias
      : config.resolve.alias
        ? [config.resolve.alias]
        : [];
    config.resolve.alias = [
      ...existingAlias,
      {
        find: /^@logora\/debate$/,
        replacement: path.resolve(__dirname, '../src/index.js')
      },
      {
        find: /^@logora\/debate\/(.+)$/,
        replacement: path.resolve(__dirname, '../src/components/$1/index.js')
      }
    ];

    config.css = config.css || {};
    config.css.preprocessorOptions = config.css.preprocessorOptions || {};
    const existingScss = config.css.preprocessorOptions.scss || {};
    const loadPaths = Array.isArray(existingScss.loadPaths)
      ? existingScss.loadPaths
      : [];
    config.css.preprocessorOptions.scss = {
      ...existingScss,
      loadPaths: [...loadPaths, path.resolve(__dirname, '../src/components')]
    };
    return config;
  }
};
