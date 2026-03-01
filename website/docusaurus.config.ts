import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'UI Kitten',
  tagline: 'React Native UI Components powered by Eva Design System',
  favicon: 'img/favicon.ico',

  url: 'https://akveo.github.io',
  baseUrl: '/react-native-ui-kitten/',

  organizationName: 'akveo',
  projectName: 'react-native-ui-kitten',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/akveo/react-native-ui-kitten/tree/master/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'UI Kitten',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/components/overview',
          label: 'Components',
          position: 'left',
        },
        {
          href: '/react-native-ui-kitten/storybook/',
          label: 'Storybook',
          position: 'left',
        },
        {
          href: 'https://github.com/akveo/react-native-ui-kitten',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started/what-is-ui-kitten'},
            {label: 'Guides', to: '/docs/guides/getting-started'},
            {label: 'Design System', to: '/docs/design-system/intro'},
          ],
        },
        {
          title: 'Components',
          items: [
            {label: 'Overview', to: '/docs/components/overview'},
            {label: 'Button', to: '/docs/components/button'},
            {label: 'Input', to: '/docs/components/input'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub', href: 'https://github.com/akveo/react-native-ui-kitten'},
            {label: 'Storybook', href: '/react-native-ui-kitten/storybook/'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} UI Kitten Contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'tsx', 'typescript'],
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
