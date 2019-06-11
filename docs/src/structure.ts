export const structure = [
  {
    type: 'section',
    name: 'Getting Started',
    children: [
      {
        type: 'page',
        name: 'What is React Native UI Kitten?',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'index.md',
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
            source: 'start.md',
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
        name: 'Add into existing project',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'install-into-existing.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Theme System',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'theme-system.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Creating Styled Components',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'theme-using-mapping.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Creating Themed Components',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'theme-using-variables.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Theme Switching',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'theme-switching.md',
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
