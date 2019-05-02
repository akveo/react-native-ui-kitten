export const structure = [
  {
    type: 'section',
    name: 'Getting Started',
    children: [
      {
        type: 'page',
        name: 'What is Kitten?',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'index.md',
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
        name: 'All Components',
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
        ],
      },
      {
        type: 'tabs',
        name: 'Toggle',
        icon: 'checkbox.svg',
        source: [
          'Toggle',
        ],
      },
      {
        type: 'tabs',
        name: 'Bottom Navigation',
        icon: 'checkbox.svg',
        source: [
          'BottomNavigation',
          'BottomNavigationTab',
        ],
      },
      {
        type: 'tabs',
        name: 'Overflow Menu',
        icon: 'checkbox.svg',
        source: [
          'OverflowMenu',
          'OverflowMenuItem',
        ],
      },
      {
        type: 'tabs',
        name: 'Modal',
        icon: 'checkbox.svg',
        source: [
          'Modal',
        ],
      },
      {
        type: 'tabs',
        name: 'Top Navigation',
        icon: 'checkbox.svg',
        source: [
          'TopNavigation',
        ],
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
        icon: 'button.svg',
        source: [
          'ButtonGroup',
        ],
      },
      {
        type: 'tabs',
        name: 'Input',
        icon: 'button.svg',
        source: [
          'Input',
        ],
      },
      {
        type: 'tabs',
        name: 'Avatar',
        icon: 'button.svg',
        source: [
          'Avatar',
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
