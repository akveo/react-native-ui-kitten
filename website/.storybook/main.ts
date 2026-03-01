import type { StorybookConfig } from '@storybook/react-native-web-vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcRoot = path.resolve(__dirname, '../../src');
const websiteRoot = path.resolve(__dirname, '..');

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      pluginReactOptions: {
        jsxRuntime: 'automatic',
      },
    },
  },
  typescript: {
    // Disable react-docgen — our RN component types are too complex for it
    reactDocgen: false,
  },
  viteFinal: async (config) => {
    // resolve to package root directories, not entry file directories
    const rnwPkgRoot = path.resolve(require.resolve('react-native-web/package.json'), '..');
    const svgWebPath = path.dirname(require.resolve('react-native-svg-web'));

    config.resolve = config.resolve || {};

    // Prefer source/react-native fields from package.json exports
    config.resolve.conditions = [
      'source',
      'react-native',
      ...(config.resolve.conditions || []),
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      // Map @ui-kitten/* packages to monorepo source directories
      '@ui-kitten/components': path.resolve(srcRoot, 'components'),
      '@ui-kitten/eva': path.resolve(srcRoot, 'eva'),
      '@ui-kitten/eva-icons': path.resolve(srcRoot, 'eva-icons'),
      '@ui-kitten/processor': path.resolve(srcRoot, 'processor'),
      '@ui-kitten/mapping-base': path.resolve(srcRoot, 'mapping-base'),
      // SVG web polyfill
      'react-native-svg': svgWebPath,
    };

    // Pre-bundle CJS packages from monorepo source so Vite converts them to ESM.
    // Without this, the dev server serves them as-is and the browser can't
    // execute require()/exports (CJS) as native ES modules.
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include || []),
      '@ui-kitten/eva',
      '@ui-kitten/processor',
      '@ui-kitten/mapping-base',
    ];

    // Ensure source files outside website/ can resolve website/node_modules
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = [
      ...(config.server.fs.allow || []),
      srcRoot,
      websiteRoot,
    ];

    // vite-plugin-rnw aliases "react-native" → "react-native-web" (bare specifier)
    // in its config() hook, which runs AFTER viteFinal. That bare specifier fails
    // for source files outside website/node_modules. We intercept the aliased
    // "react-native-web" import via resolveId and resolve it to an absolute path.
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: 'fix-rnw-monorepo-resolve',
      enforce: 'pre' as const,
      resolveId(source) {
        // Intercept the bare "react-native-web" specifier that vite-plugin-rnw
        // produces and resolve it to the absolute package path
        if (source === 'react-native-web') {
          return { id: rnwPkgRoot + '/dist/index.js', external: false };
        }
        // Also handle subpath imports like "react-native-web/dist/..."
        if (source.startsWith('react-native-web/')) {
          const subpath = source.slice('react-native-web/'.length);
          return { id: rnwPkgRoot + '/' + subpath, external: false };
        }
      },
    });

    return config;
  },
};

export default config;
