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
        'indicatorHeight': {
          'type': 'number',
        },
        'indicatorBackgroundColor': {
          'type': 'color',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
        'noIndicator': {
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
          'indicatorHeight': 3,
          'indicatorBackgroundColor': 'blue-primary',
        },
      },
      'noIndicator': {
        'mapping': {
          'indicatorHeight': 0,
          'indicatorBackgroundColor': 'transparent',
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
