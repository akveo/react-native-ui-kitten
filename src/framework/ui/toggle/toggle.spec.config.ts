import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Toggle': {
    'meta': {
      'scope': 'all',
      'mapping': {
        'width': {
          'type': 'number',
        },
        'height': {
          'type': 'number',
        },
        'borderRadius': {
          'type': 'number',
        },
        'borderWidth': {
          'type': 'number',
        },
        'offsetValue': {
          'type': 'number',
        },
        'tintColor': {
          'type': 'color',
        },
        'borderColor': {
          'type': 'color',
        },
        'thumbColor': {
          'type': 'color',
        },
        'highlightColor': {
          'type': 'color',
        },
        'highlightWidth': {
          'type': 'number',
        },
        'highlightHeight': {
          'type': 'number',
        },
        'highlightBorderRadius': {
          'type': 'number',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variants': {
        'status': {
          'primary': {
            'default': true,
          },
          'success': {
            'default': false,
          },
          'info': {
            'default': false,
          },
          'warning': {
            'default': false,
          },
          'danger': {
            'default': false,
          },
        },
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
        'checked': {
          'default': false,
          'priority': 0,
          'scope': 'all',
        },
        'disabled': {
          'default': false,
          'priority': 1,
          'scope': 'all',
        },
        'active': {
          'default': false,
          'priority': 1,
          'scope': 'all',
        },
      },
    },
    'appearance': {
      'default': {
        'mapping': {
          'offsetValue': 20,
          'thumbColor': '#ffffff',
          'highlightColor': 'transparent',
          'state': {
            'active': {
              'highlightColor': '#e5e7ea',
            },
            'disabled': {
              'borderColor': 'gray-dark',
              'tintColor': 'gray-light',
            },
          },
        },
        'variant': {
          'status': {
            'primary': {
              'tintColor': '#d9e4ff',
              'borderColor': 'blue-primary',
            },
            'success': {
              'tintColor': '#b3ffd6',
              'borderColor': '#00e096',
            },
            'info': {
              'tintColor': '#c7e2ff',
              'borderColor': '#0095ff',
            },
            'warning': {
              'tintColor': '#fff1c2',
              'borderColor': '#ffaa00',
            },
            'danger': {
              'tintColor': '#FFD6D9',
              'borderColor': 'pink-primary',
            },
          },
          'size': {
            'small': {
              'width': 38,
              'height': 22,
              'borderRadius': 11,
              'borderWidth': 0.5,
              'highlightWidth': 48,
              'highlightHeight': 32,
              'highlightBorderRadius': 16,
            },
            'medium': {
              'width': 52,
              'height': 32,
              'borderRadius': 16,
              'borderWidth': 1.5,
              'highlightWidth': 62,
              'highlightHeight': 42,
              'highlightBorderRadius': 21,
            },
            'large': {
              'width': 72,
              'height': 42,
              'borderRadius': 21,
              'borderWidth': 2,
              'highlightWidth': 82,
              'highlightHeight': 52,
              'highlightBorderRadius': 26,
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
