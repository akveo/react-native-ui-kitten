export const STRUCTURE = [
  {
    type: 'section',
    name: 'Quick Start',
    children: [
      {
        type: 'page',
        name: 'Getting Started',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'index.md'
          }
        ]
      },
      {
        type: 'page',
        name: 'Customization',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'customization.md'
          }
        ]
      },
      {
        type: 'page',
        name: 'Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'theme.md'
          }
        ]
      },
      {
        type: 'page',
        name: 'Create custom component',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guide.md'
          }
        ]
      },
    ],
  },
  {
    type: 'section',
    name: 'UI Components',
    children: [
      {
        type: 'page',
        name: 'RkButton',
        demogif: 'button.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkButton',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkButton',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkButton',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkButton',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkCalendar',
        demogif: 'calendar-range.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkCalendar',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkCalendar',
          },
          {
            type: 'block',
            block: 'rk-methods',
            klass: 'RkCalendar',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkCalendar',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkCalendar',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkCard',
        demogif: 'card.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkCard',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkCard',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkCard',
          },

          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkCard',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkAvoidKeyboard',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkAvoidKeyboard',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkAvoidKeyboard',
          },
        ]
      },
      {
        type: 'page',
        name: 'RkChoice',
        demogif: 'choice.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkChoice',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkChoice',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkChoice',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkChoice',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkChoiceGroup',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkChoiceGroup',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkChoiceGroup',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkChoiceGroup',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkChoiceGroup',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkModalImg',
        demogif: 'image.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkModalImg',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkModalImg',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkModalImg',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkModalImg',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkGallery',
        demogif: 'gallery.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkGallery',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkGallery',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkGallery',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkGallery',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkGalleryImage',
        demogif: 'gallery.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkGalleryImage',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkGalleryImage',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkGalleryImage',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkGalleryImage',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkTabView',
        demogif: 'tab.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkTabView',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkTabView',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkTabView',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkTabView',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkText',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkText',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkText',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkText',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkText',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkTextInput',
        demogif: 'input.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkTextInput',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkTextInput',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkTextInput',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkTextInput',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkPicker',
        demogif: 'picker.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkPicker',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkPicker',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkPicker',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkPicker',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkSwitch',
        demogif: 'switch.gif',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkSwitch',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'RkSwitch',
          },
          {
            type: 'block',
            block: 'rk-props',
            klass: 'RkSwitch',
          },
          {
            type: 'block',
            block: 'rk-styles',
            klass: 'RkSwitch',
          }
        ]
      },
    ],
  },
  {
    type: 'section',
    name: 'API',
    children: [
      {
        type: 'page',
        name: 'RkComponent',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'RkComponent',
          },
          {
            type: 'block',
            block: 'rk-properties',
            klass: 'RkComponent',
          },
          {
            type: 'block',
            block: 'rk-methods',
            klass: 'RkComponent',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkTheme',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'ThemeManager',
          },
          {
            type: 'block',
            block: 'rk-methods',
            klass: 'ThemeManager',
          }
        ]
      },
      {
        type: 'page',
        name: 'RkStyleSheet',
        children: [
          {
            type: 'block',
            block: 'rk-description',
            klass: 'ThemedStyleSheet',
          },
          {
            type: 'block',
            block: 'rk-examples',
            klass: 'ThemedStyleSheet',
          },
          {
            type: 'block',
            block: 'rk-methods',
            klass: 'ThemedStyleSheet',
          }
        ]
      },
    ],
  },
];
