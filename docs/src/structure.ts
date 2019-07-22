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
        name: 'Install UI Kitten',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/install.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Using with React Native Web',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/using-web.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Create UI Kitten Screen',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/create-screen.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Eva Icons',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/setup-icons-module.md',
          },
        ],
      },
      {
        type: 'page',
        name: '3rd party Icons',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/setup-vector-icons.md',
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
        name: 'Customize Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/customize-theme.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Create Custom Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/custom-theme.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Changing Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/theme-change.md',
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
        name: 'ApplicationProvider',
        icon: 'application-provider.svg',
        source: [
          'ApplicationProvider',
        ],
      },
      {
        type: 'tabs',
        name: 'styled',
        icon: 'styled.svg',
        source: [
          'styled',
        ],
      },
      {
        type: 'tabs',
        name: 'withStyles',
        icon: 'with-styles.svg',
        source: [
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
        type: 'group',
        name: 'Navigation',
      },
      {
        type: 'tabs',
        name: 'Top Navigation',
        icon: 'top-navigation.svg',
        source: [
          'TopNavigation',
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
        name: 'ViewPager',
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
        name: 'Radio',
        icon: 'radio.svg',
        source: [
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
        name: 'RadioGroup',
        icon: 'radio-group.svg',
        source: [
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
        overview: [
          {
            name: 'Toggle',
            images: ['toggle.png'],
          },
        ],
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
        name: 'Overflow Menu',
        icon: 'menu.svg',
        source: [
          'OverflowMenu',
          'OverflowMenuItem',
        ],
        overview: [
          {
            name: 'OverflowMenu',
            images: ['overflow-menu.png'],
          },
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
        type: 'group',
        name: 'Extra',
      },
      {
        type: 'tabs',
        name: 'Avatar',
        icon: 'user.svg',
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
    ],
  },
  {
    type: 'section',
    name: 'Services',
    children: [
      {
        type: 'page',
        name: 'ModalService',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'ModalServiceType',
          },
        ],
      },
    ],
  },
];
