import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';


export const mapping: ThemeMappingType = {
  'BottomNavigatorTab': {
    'meta': {
      'scope': 'mobile',
      'mapping': {
        'iconWidth': {
          'type': 'number',
        },
        'iconHeight': {
          'type': 'number',
        },
        'iconMarginBottom': {
          'type': 'number',
        },
        'iconTintColor': {
          'type': 'color',
        },
        'textColor': {
          'type': 'color',
        },
        'textFontWeight': {
          'type': 'string',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variants': {},
      'states': {
        'selected': {
          'default': false,
          'priority': 1,
          'scope': 'mobile',
        },
      },
    },
    'appearance': {
      'default': {
        'mapping': {
          'iconWidth': 40,
          'iconHeight': 40,
          'iconMarginBottom': 5,
          'iconTintColor': 'gray-dark',
          'textColor': 'gray-dark',
          'textFontWeight': '600',
          'state': {
            'selected': {
              'iconTintColor': 'blue-primary',
              'textColor': 'blue-primary',
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
