import { ThemeMappingType } from 'eva/packages/common';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Toggle': {
    'meta': {
      'variants': {
        'status': [
          'error',
        ],
        'size': [
          'small',
          'big',
        ],
      },
      'states': [
        'checked',
        'disabled',
        'active',
      ],
    },
    'appearance': {
      'default': {
        'mapping': {
          'borderWidth': 1.5,
          'height': 32,
          'width': 52,
          'offsetValue': 20,
          'thumbColor': '#ffffff',
          'tintColor': 'gray-light',
          'onTintColor': 'blue-primary',
          'highlightWidth': 62,
          'highlightHeight': 42,
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
            'big': {
              'mapping': {
                'borderWidth': 2,
                'height': 42,
                'width': 72,
                'highlightWidth': 82,
                'highlightHeight': 52,
              },
            },
            'small': {
              'mapping': {
                'borderWidth': 0.5,
                'height': 22,
                'width': 38,
                'highlightWidth': 48,
                'highlightHeight': 32,
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
