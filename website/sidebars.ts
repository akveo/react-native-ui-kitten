import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/what-is-ui-kitten',
        'getting-started/where-to-start',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/getting-started',
        'guides/branding',
        'guides/icon-packages',
        'guides/configure-navigation',
        'guides/runtime-theming',
        'guides/running-on-the-web',
        'guides/testing',
        'guides/improving-performance',
      ],
    },
    {
      type: 'category',
      label: 'Design System',
      items: [
        'design-system/intro',
        'design-system/glossary',
        'design-system/theme',
        'design-system/use-theme-variables',
        'design-system/customize-mapping',
        'design-system/custom-mapping',
      ],
    },
    {
      type: 'category',
      label: 'Migration',
      items: [
        'migration/5x-to-6',
        'migration/4x-to-5',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/overview',
        {
          type: 'category',
          label: 'Styling & Theming',
          items: [
            'components/styled',
            'components/use-theme',
          ],
        },
        {
          type: 'category',
          label: 'Global',
          items: [
            'components/application-provider',
            'components/layout',
            'components/text',
            'components/divider',
            'components/icon',
            'components/card',
            'components/list',
          ],
        },
        {
          type: 'category',
          label: 'Navigation',
          items: [
            'components/top-navigation',
            'components/top-tabs',
            'components/bottom-tabs',
            'components/menu',
            'components/drawer',
            'components/view-pager',
          ],
        },
        {
          type: 'category',
          label: 'Forms',
          items: [
            'components/button',
            'components/button-group',
            'components/checkbox',
            'components/radio',
            'components/toggle',
            'components/input',
            'components/select',
            'components/autocomplete',
            'components/datepicker',
          ],
        },
        {
          type: 'category',
          label: 'Modals & Overlays',
          items: [
            'components/modal',
            'components/popover',
            'components/tooltip',
            'components/overflow-menu',
          ],
        },
        {
          type: 'category',
          label: 'Extra',
          items: [
            'components/avatar',
            'components/spinner',
            'components/progress-bar',
            'components/circular-progress-bar',
            'components/calendar',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
