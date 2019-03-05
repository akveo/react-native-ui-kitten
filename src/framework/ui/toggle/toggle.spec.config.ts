import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Toggle': {
    'meta': {
      'scope': 'all',
      'mapping': {},
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variants': {
        'status': {
          'error': {
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
          'tintColor': 'gray-light',
          'onTintColor': 'blue-primary',
          'highlightColor': 'transparent',
          'state': {
            'active': {
              'highlightColor': '#e5e7ea',
            },
            'disabled': {
              'onTintColor': 'gray-dark',
            },
          },
        },
        'variant': {
          'status': {
            'error': {
              'mapping': {
                'tintColor': '#FFD6D9',
                'onTintColor': 'pink-primary',
                'state': {
                  'disabled': {
                    'tintColor': 'gray-light',
                  },
                },
              },
            },
          },
          'size': {
            'small': {
              'mapping': {
                'borderWidth': 0.5,
                'height': 22,
                'width': 38,
                'highlightWidth': 48,
                'highlightHeight': 32,
              },
            },
            'medium': {
              'mapping': {
                'borderWidth': 1.5,
                'height': 32,
                'width': 52,
                'highlightWidth': 62,
                'highlightHeight': 42,
              },
            },
            'large': {
              'mapping': {
                'borderWidth': 2,
                'height': 42,
                'width': 72,
                'highlightWidth': 82,
                'highlightHeight': 52,
              },
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
