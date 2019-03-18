import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Layout': {
    'meta': {
      'scope': 'mobile',
      'parameters': {
        'paddingHorizontal': {
          'type': 'number',
        },
        'paddingVertical': {
          'type': 'number',
        },
        'backgroundColor': {
          'type': 'string',
        },
        'borderColor': {
          'type': 'number',
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
      'variantGroups': {},
      'states': {},
    },
    'appearances': {
      'default': {
        'mapping': {
          'paddingHorizontal': 16,
          'paddingVertical': 8,
          'backgroundColor': 'transparent',
          'borderColor': 'blue-primary',
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
