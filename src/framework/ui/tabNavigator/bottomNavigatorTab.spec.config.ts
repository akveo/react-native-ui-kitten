import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';


export const mapping: ThemeMappingType = {
  'BottomNavigatorTab': {
    'meta': {
      'scope': 'mobile',
      'mapping': {},
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
          'icon': {
            'width': 40,
            'height': 40,
            'marginBottom': 5,
            'tintColor': 'gray-dark',
          },
          'text': {
            'color': 'gray-dark',
          },
          'state': {
            'selected': {
              'icon': {
                'tintColor': 'blue-primary',
              },
              'text': {
                'color': 'blue-primary',
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
