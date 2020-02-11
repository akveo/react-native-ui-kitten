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
        name: 'Light Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Light',
            source: 'light',
          },
        ],
      },
      {
        type: 'page',
        name: 'Dark Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Dark',
            source: 'dark',
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
        name: 'Application Provider',
        icon: 'application-provider.svg',
        source: [
          'ApplicationProvider',
        ],
      },
      {
        type: 'tabs',
        name: 'Styled Component',
        icon: 'styled.svg',
        source: [
          'styled',
        ],
      },
      {
        type: 'tabs',
        name: 'Themed Component',
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
        name: 'Text',
        icon: 'text.svg',
        source: [
          'Text',
        ],
        overview: [
          {
            name: 'Text',
            images: ['text.png'],
          },
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
        name: 'Card',
        icon: 'card.svg',
        source: [
          'Card',
          'CardHeader',
        ],
      },
      {
        type: 'tabs',
        name: 'Menu',
        icon: 'menu.svg',
        source: [
          'Menu',
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
        overview: [
          {
            name: 'List',
            images: ['list.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Icon',
        icon: 'icon.svg',
        source: [
          'Icon',
        ],
        overview: [
          {
            name: 'Icon',
            images: ['icon.png'],
          },
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
        name: 'Bottom Navigation',
        icon: 'bottom-navigation.svg',
        source: [
          'BottomNavigation',
          'BottomNavigationTab',
        ],
        overview: [
          {
            name: 'BottomNavigation',
            images: ['bottom-navigation.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Drawer',
        icon: 'drawer.svg',
        source: [
          'Drawer',
          'DrawerHeaderFooter',
        ],
        overview: [
          {
            name: 'Drawer',
            images: ['drawer.png'],
          },
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
        type: 'tabs',
        name: 'Tab View',
        icon: 'tab.svg',
        source: [
          'TabView',
          'TabBar',
          'Tab',
        ],
        overview: [
          {
            name: 'TabBar',
            images: ['tab-menu.png'],
          },
        ],
      },
      {
        type: 'group',
        name: 'Forms',
      },
      {
        type: 'tabs',
        name: 'Input',
        icon: 'input.svg',
        source: [
          'Input',
        ],
        overview: [
          {
            name: 'Input',
            images: ['input.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Button',
        icon: 'button.svg',
        source: [
          'Button',
        ],
        overview: [
          {
            name: 'Button',
            images: ['button.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Button Group',
        icon: 'button-group.svg',
        source: [
          'ButtonGroup',
        ],
        overview: [
          {
            name: 'ButtonGroup',
            images: ['button-group.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'CheckBox',
        icon: 'checkbox.svg',
        source: [
          'CheckBox',
        ],
        overview: [
          {
            name: 'CheckBox',
            images: ['checkbox.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Toggle',
        icon: 'toggle.svg',
        source: [
          'Toggle',
        ],
        overview: [
          {
            name: 'Toggle',
            images: ['toggle.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Radio',
        icon: 'radio.svg',
        source: [
          'RadioGroup',
          'Radio',
        ],
        overview: [
          {
            name: 'Radio',
            images: ['radio.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Select',
        icon: 'select.svg',
        source: [
          'Select',
        ],
        overview: [],
      },
      {
        type: 'tabs',
        name: 'Datepicker',
        icon: 'datepicker.svg',
        source: [
          'Datepicker',
          'RangeDatepicker',
        ],
        overview: [
          {
            name: 'Datepicker',
            images: [],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Autocomplete',
        icon: 'autocomplete.svg',
        source: [
          'Autocomplete',
        ],
        overview: [
          {
            name: 'Autocomplete',
            images: [],
          },
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
        overview: [
          {
            name: 'Popover',
            images: ['popover.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Tooltip',
        icon: 'tooltip.svg',
        source: [
          'Tooltip',
        ],
        overview: [
          {
            name: 'Tooltip',
            images: ['tooltip.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Overflow Menu',
        icon: 'menu.svg',
        source: [
          'OverflowMenu',
        ],
        overview: [
          {
            name: 'OverflowMenu',
            images: ['overflow-menu.png'],
          },
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
        overview: [
          {
            name: 'Avatar',
            images: ['avatar.png'],
          },
        ],
      },
      {
        type: 'tabs',
        name: 'Spinner',
        icon: 'spinner.svg',
        source: [
          'Spinner',
        ],
        overview: [
          {
            name: 'Spinner',
            images: ['spinner.png'],
          },
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
        overview: [
          {
            name: 'Calendar',
            images: [],
          },
        ],
      },
    ],
  },
];
