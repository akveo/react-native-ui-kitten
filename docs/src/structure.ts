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
        name: 'Form',
      },
      {
        type: 'tabs',
        name: 'CheckBox',
        icon: 'checkbox.svg',
        source: [
          'CheckBox',
        ],
      },
    ],
  },
];
