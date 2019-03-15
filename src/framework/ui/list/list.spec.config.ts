import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'List': {
    'meta': {
      'scope': 'all',
      'parameters': {},
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variantGroups': {},
      'states': {},
    },
    'appearances': {
      'default': {
        'mapping': {},
      },
    },
  },
  'ListItem': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'paddingVertical': {
          'type': 'number',
        },
        'paddingHorizontal': {
          'type': 'number',
        },
        'iconWidth': {
          'type': 'number',
        },
        'iconHeight': {
          'type': 'number',
        },
        'iconMarginHorizontal': {
          'type': 'number',
        },
        'iconTintColor': {
          'type': 'string',
        },
        'titleColor': {
          'type': 'string',
        },
        'titleFontSize': {
          'type': 'number',
        },
        'titleFontWeight': {
          'type': 'string',
        },
        'titleMarginHorizontal': {
          'type': 'number',
        },
        'titleMarginVertical': {
          'type': 'number',
        },
        'descriptionColor': {
          'type': 'string',
        },
        'descriptionFontSize': {
          'type': 'number',
        },
        'descriptionMarginHorizontal': {
          'type': 'number',
        },
        'descriptionMarginVertical': {
          'type': 'number',
        },
        'accessoryWidth': {
          'type': 'number',
        },
        'accessoryHeight': {
          'type': 'number',
        },
        'accessoryMarginHorizontal': {
          'type': 'number',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variantGroups': {},
      'states': {
        'active': {
          'default': false,
          'priority': 0,
          'scope': 'all',
        },
      },
    },
    'appearances': {
      'default': {
        'mapping': {
          'paddingVertical': 12,
          'paddingHorizontal': 6,
          'iconWidth': 48,
          'iconHeight': 48,
          'iconMarginHorizontal': 6,
          'iconTintColor': 'gray-primary',
          'titleColor': 'text-primary',
          'titleFontSize': 20,
          'titleFontWeight': '600',
          'titleMarginHorizontal': 6,
          'titleMarginVertical': 4,
          'descriptionColor': 'gray-400',
          'descriptionFontSize': 14,
          'descriptionMarginHorizontal': 6,
          'descriptionMarginVertical': 4,
          'accessoryWidth': 48,
          'accessoryHeight': 48,
          'accessoryMarginHorizontal': 6,
          'state': {
            'active': {
              'backgroundColor': 'gray-100',
            },
          },
        },
      },
    },
  },
  'Text': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'color': {
          'type': 'string',
        },
        'fontSize': {
          'type': 'number',
        },
      },
      'appearances': {
        'primary': {
          'default': true,
        },
      },
      'variantGroups': {
        'category': {
          'h1': {
            'default': false,
          },
          'h2': {
            'default': false,
          },
          'h3': {
            'default': false,
          },
          'h4': {
            'default': false,
          },
          'h5': {
            'default': false,
          },
          'h6': {
            'default': false,
          },
          'body': {
            'default': true,
          },
        },
      },
      'states': {},
    },
    'appearances': {
      'primary': {
        'mapping': {
          'color': 'text-primary',
        },
        'variantGroups': {
          'category': {
            'h1': {
              'fontSize': 64,
            },
            'h2': {
              'fontSize': 40,
            },
            'h3': {
              'fontSize': 32,
            },
            'h4': {
              'fontSize': 24,
            },
            'h5': {
              'fontSize': 16,
            },
            'h6': {
              'fontSize': 14,
            },
            'body': {
              'fontSize': 16,
            },
          },
        },
      },
    },
  },
};

export const theme: ThemeType = {
  'blue-primary': '#3366FF',
  'blue-dark': '#2541CC',
  'gray-light': '#DDE1EB',
  'gray-primary': '#A6AEBD',
  'gray-dark': '#8992A3',
  'gray-highlight': '#EDF0F5',
  'pink-primary': '#FF3D71',
  'text-primary': '#000000',
  'text-primary-inverse': '#ffffff',

  'gray-100': '#f7f8fa',
  'gray-200': '#edf0f5',
  'gray-300': '#c8cedb',
  'gray-400': '#a6aebd',
};
