import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'OverflowMenu': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'borderRadius': {
          'type': 'number',
        },
        'itemBorderRadius': {
          'type': 'number',
        },
        'popoverBackgroundColor': {
          'type': 'string',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'states': {},
      'variantGroups': {},
    },
    'appearances': {
      'default': {
        'mapping': {
          'borderRadius': 6,
          'itemBorderRadius': 6,
          'popoverBackgroundColor': 'white',
        },
      },
    },
  },
  'OverflowMenuItem': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'minHeight': {
          'type': 'number',
        },
        'padding': {
          'type': 'number',
        },
        'backgroundColor': {
          'type': 'string',
        },
        'borderColor': {
          'type': 'string',
        },
        'borderWidth': {
          'type': 'number',
        },
        'textColor': {
          'type': 'string',
        },
        'textFontWeight': {
          'type': 'string',
        },
        'textFontSize': {
          'type': 'number',
        },
        'textMarginHorizontal': {
          'type': 'number',
        },
        'iconTintColor': {
          'type': 'string',
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
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variantGroups': {
        'size': {
          'small': {
            'default': false,
          },
          'medium': {
            'default': true,
          },
          'large': {
            'default': false,
          },
        },
      },
      'states': {
        'disabled': {
          'default': false,
          'priority': 0,
          'scope': 'all',
        },
        'active': {
          'default': false,
          'priority': 1,
          'scope': 'all',
        },
      },
    },
    'appearances': {
      'default': {
        'mapping': {
          'backgroundColor': 'white',
          'borderColor': 'gray-light',
          'borderWidth': 1.2,
          'textColor': 'blue-pitch-dark',
          'textFontWeight': '600',
          'iconTintColor': 'blue-pitch-dark',
          'state': {
            'disabled': {
              'backgroundColor': 'gray-dark',
            },
            'active': {
              'textColor': 'blue-primary',
              'iconTintColor': 'blue-primary',
            },
          },
        },
        'variantGroups': {
          'size': {
            'small': {
              'minHeight': 40,
              'padding': 10,
              'textFontSize': 13,
              'textMarginHorizontal': 6,
              'iconWidth': 20,
              'iconHeight': 20,
              'iconMarginHorizontal': 6,
            },
            'medium': {
              'minHeight': 48,
              'padding': 12,
              'textFontSize': 15,
              'textMarginHorizontal': 8,
              'iconWidth': 24,
              'iconHeight': 24,
              'iconMarginHorizontal': 8,
            },
            'large': {
              'minHeight': 56,
              'padding': 14,
              'textFontSize': 17,
              'textMarginHorizontal': 10,
              'iconWidth': 28,
              'iconHeight': 28,
              'iconMarginHorizontal': 10,
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
  'Popover': {
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
};

export const theme: ThemeType = {
  'blue-primary': '#3366FF',
  'blue-dark': '#2541CC',
  'blue-pitch-dark': '#0D1C2E',
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
