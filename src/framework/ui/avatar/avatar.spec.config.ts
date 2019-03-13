import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Avatar': {
    'meta': {
      'scope': 'all',
      'mapping': {
        'roundCoefficient': {
          'type': 'number',
        },
        'margin': {
          'type': 'number',
        },
        'width': {
          'type': 'number',
        },
        'height': {
          'type': 'number',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variants': {
        'shape': {
          'round': {
            'default': true,
          },
          'rounded': {
            'default': false,
          },
          'square': {
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
      'states': {},
    },
    'appearance': {
      'default': {
        'mapping': {
          'margin': 16,
        },
        'variant': {
          'shape': {
            'round': {
              'roundCoefficient': 0.5,
            },
            'rounded': {
              'roundCoefficient': 0.3,
            },
            'square': {
              'roundCoefficient': 0,
            },
          },
          'size': {
            'small': {
              'width': 40,
              'height': 40,
            },
            'medium': {
              'width': 48,
              'height': 48,
            },
            'large': {
              'width': 64,
              'height': 64,
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
