import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';


export const mapping: ThemeMappingType = {
  'BottomTabNavigator': {
    'meta': {
      'scope': 'mobile',
      'mapping': {
        'backgroundColor': {
          'type': 'color',
        },
        'paddingVertical': {
          'type': 'number',
        },
        'borderTopColor': {
          'type': 'color',
        },
        'borderTopWidth': {
          'type': 'number',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
        'no-indicator': {
          'default': false,
        },
      },
      'variants': {},
      'states': {},
    },
    'appearance': {
      'default': {
        'mapping': {
          'backgroundColor': 'transparent',
          'paddingVertical': 16,
          'borderTopColor': 'gray-primary',
          'borderTopWidth': 1,
          'indicator': {
            'height': 3,
            'backgroundColor': 'blue-primary',
          },
        },
      },
      'no-indicator': {
        'mapping': {
          'indicator': {
            'height': 0,
            'backgroundColor': 'transparent',
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
