export const structure = [
  {
    type: 'section',
    name: 'Getting Started',
    children: [
      {
        type: 'page',
        name: 'What is UI Kitten?',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'getting-started/what-is-ui-kitten.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Where to start?',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'getting-started/where-to-start.md',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Guides',
    children: [
      {
        type: 'page',
        name: 'Getting Started',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/getting-started.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Branding',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/branding.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Icon Packages',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/icon-packages.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Configure Navigation',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/configure-navigation.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Runtime Theming',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/runtime-theming.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Running on the Web',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/running-on-the-web.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Improving Performance',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/improving-performance.md',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Design System',
    children: [
      {
        type: 'page',
        name: 'Eva Design System Intro',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/intro.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Design System Glossary',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/glossary.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Design System Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/theme.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Use Theme Variables',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/use-theme-variables.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Customize Mapping',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/customize-mapping.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Custom Component Mapping',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/custom-mapping.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Eva Light Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Eva Light',
            source: 'eva light',
          },
        ],
      },
      {
        type: 'page',
        name: 'Eva Dark Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Eva Dark',
            source: 'eva dark',
          },
        ],
      },
      {
        type: 'page',
        name: 'Material Light Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Material Light',
            source: 'material light',
          },
        ],
      },
      {
        type: 'page',
        name: 'Material Dark Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Material Dark',
            source: 'material dark',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Migration',
    children: [
      {
        type: 'page',
        name: '4.x-5.0.0 Migration',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'migration/4.x-5.0.0-migration.md',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Components',
    children: [
      {
        type: 'page',
        name: 'Components Overview',
        children: [
          {
            type: 'block',
            block: 'components-overview',
          },
        ],
      },
      {
        type: 'group',
        name: 'Styling & Theming',
      },
      {
        type: 'tabs',
        name: 'Using Mapping',
        icon: 'styled.svg',
        source: [
          'styled',
        ],
      },
      {
        type: 'tabs',
        name: 'Using Theme',
        icon: 'with-styles.svg',
        source: [
          'useTheme',
          'useStyleSheet',
          'withStyles',
        ],
      },
      {
        type: 'group',
        name: 'Global',
      },
      {
        type: 'tabs',
        name: 'Application Provider',
        icon: 'application-provider.svg',
        source: [
          'ApplicationProvider',
        ],
      },
      {
        type: 'tabs',
        name: 'Layout',
        icon: 'layout.svg',
        source: [
          'Layout',
        ],
      },
      {
        type: 'tabs',
        name: 'Text',
        icon: 'text.svg',
        source: [
          'Text',
        ],
      },
      {
        type: 'tabs',
        name: 'Divider',
        icon: 'icon.svg',
        source: [
          'Divider',
        ],
      },
      {
        type: 'tabs',
        name: 'Icon',
        icon: 'icon.svg',
        source: [
          'Icon',
        ],
      },
      {
        type: 'tabs',
        name: 'Card',
        icon: 'card.svg',
        source: [
          'Card',
        ],
      },
      {
        type: 'tabs',
        name: 'List',
        icon: 'list.svg',
        source: [
          'List',
          'ListItem',
        ],
      },
      {
        type: 'group',
        name: 'Navigation',
      },
      {
        type: 'tabs',
        name: 'Top Navigation',
        icon: 'top-navigation.svg',
        source: [
          'TopNavigation',
          'TopNavigationAction',
        ],
        overview: [
          {
            name: 'TopNavigation',
            images: ['top-navigation.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Top Tabs',
        icon: 'tab.svg',
        source: [
          'TabBar',
          'TabView',
          'Tab',
        ],
      },
      {
        type: 'tabs',
        name: 'Bottom Tabs',
        icon: 'bottom-navigation.svg',
        source: [
          'BottomNavigation',
          'BottomNavigationTab',
        ],
      },
      {
        type: 'tabs',
        name: 'Menu',
        icon: 'menu.svg',
        source: [
          'Menu',
          'MenuGroup',
          'MenuItem',
        ],
      },
      {
        type: 'tabs',
        name: 'Drawer',
        icon: 'drawer.svg',
        source: [
          'Drawer',
          'DrawerGroup',
          'DrawerItem',
        ],
      },
      {
        type: 'tabs',
        name: 'View Pager',
        icon: 'view-pager.svg',
        source: [
          'ViewPager',
        ],
      },
      {
        type: 'group',
        name: 'Forms',
      },
      {
        type: 'tabs',
        name: 'Button',
        icon: 'button.svg',
        source: [
          'Button',
        ],
      },
      {
        type: 'tabs',
        name: 'Button Group',
        icon: 'button-group.svg',
        source: [
          'ButtonGroup',
        ],
      },
      {
        type: 'tabs',
        name: 'CheckBox',
        icon: 'checkbox.svg',
        source: [
          'CheckBox',
        ],
      },
      {
        type: 'tabs',
        name: 'Radio',
        icon: 'radio.svg',
        source: [
          'Radio',
          'RadioGroup',
        ],
      },
      {
        type: 'tabs',
        name: 'Toggle',
        icon: 'toggle.svg',
        source: [
          'Toggle',
        ],
      },
      {
        type: 'tabs',
        name: 'Input',
        icon: 'input.svg',
        source: [
          'Input',
        ],
      },
      {
        type: 'tabs',
        name: 'Select',
        icon: 'select.svg',
        source: [
          'Select',
          'SelectGroup',
          'SelectItem',
        ],
      },
      {
        type: 'tabs',
        name: 'Autocomplete',
        icon: 'autocomplete.svg',
        source: [
          'Autocomplete',
        ],
      },
      {
        type: 'tabs',
        name: 'Datepicker',
        icon: 'datepicker.svg',
        source: [
          'Datepicker',
          'RangeDatepicker',
        ],
      },
      {
        type: 'group',
        name: 'Modals & Overlays',
      },
      {
        type: 'tabs',
        name: 'Modal',
        icon: 'dialog.svg',
        source: [
          'Modal',
        ],
      },
      {
        type: 'tabs',
        name: 'Popover',
        icon: 'popover.svg',
        source: [
          'Popover',
        ],
      },
      {
        type: 'tabs',
        name: 'Tooltip',
        icon: 'tooltip.svg',
        source: [
          'Tooltip',
        ],
      },
      {
        type: 'tabs',
        name: 'Overflow Menu',
        icon: 'menu.svg',
        source: [
          'OverflowMenu',
          'MenuItem',
        ],
      },
      {
        type: 'group',
        name: 'Extra',
      },
      {
        type: 'tabs',
        name: 'Avatar',
        icon: 'avatar.svg',
        source: [
          'Avatar',
        ],
      },
      {
        type: 'tabs',
        name: 'Spinner',
        icon: 'spinner.svg',
        source: [
          'Spinner',
        ],
      },
      {
        type: 'tabs',
        name: 'Calendar',
        icon: 'calendar.svg',
        source: [
          'Calendar',
          'RangeCalendar',
        ],
      },
    ],
  },
];
