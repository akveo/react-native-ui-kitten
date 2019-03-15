import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';


export const mapping: ThemeMappingType = {
  'Tab': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'textColor': {
          'type': 'string',
        },
        'textFontWeight': {
          'type': 'number',
        },
        'iconWidth': {
          'type': 'number',
        },
        'iconHeight': {
          'type': 'number',
        },
        'iconTintColor': {
          'type': 'string',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variantGroups': {},
      'states': {
        'selected': {
          'default': false,
          'priority': 0,
          'scope': 'all',
        },
      },
    },
    'appearances': {
      'default': {
        'mapping': {
          'textColor': 'gray-dark',
          'textFontWeight': '600',
          'iconWidth': 20,
          'iconHeight': 20,
          'iconTintColor': 'gray-dark',
          'state': {
            'selected': {
              'textColor': 'blue-primary',
              'iconTintColor': 'blue-primary',
            },
          },
        },
      },
    },
  },
  'TabBar': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'height': {
          'type': 'number',
        },
        'indicatorHeight': {
          'type': 'number',
        },
        'indicatorBorderRadius': {
          'type': 'number',
        },
        'indicatorBackgroundColor': {
          'type': 'string',
        },
      },
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
        'mapping': {
          'height': 42,
          'indicatorHeight': 4,
          'indicatorBorderRadius': 2,
          'indicatorBackgroundColor': 'blue-primary',
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
};
