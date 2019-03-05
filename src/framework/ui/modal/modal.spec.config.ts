import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Modal': {
    'meta': {
      'scope': 'all',
      'mapping': {
        'paddingHorizontal': {
          'type': 'number',
        },
        'paddingVertical': {
          'type': 'number',
        },
        'backgroundColor': {
          'type': 'color',
        },
        'borderColor': {
          'type': 'color',
        },
        'borderRadius': {
          'type': 'number',
        },
        'borderWidth': {
          'type': 'number',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variants': {},
      'states': {},
    },
    'appearance': {
      'default': {
        'mapping': {
          'paddingHorizontal': 16,
          'paddingVertical': 8,
          'backgroundColor': 'transparent',
          'borderColor': 'blue-dark',
          'borderRadius': 3,
          'borderWidth': 1,
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
