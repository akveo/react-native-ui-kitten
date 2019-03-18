import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'TopNavigationBar': {
    'meta': {
      'scope': 'mobile',
      'parameters': {
        'height': {
          'type': 'number',
        },
        'paddingTop': {
          'type': 'number',
        },
        'paddingBottom': {
          'type': 'number',
        },
        'paddingHorizontal': {
          'type': 'number',
        },
        'backgroundColor': {
          'type': 'string',
        },
        'textAlign': {
          'type': 'string',
        },
        'titleColor': {
          'type': 'string',
        },
        'titleFontSize': {
          'type': 'number',
        },
        'titleFontWeight': {
          'type': 'string',
        },
        'subtitleColor': {
          'type': 'string',
        },
        'subtitleFontSize': {
          'type': 'number',
        },
        'subtitleFontWeight': {
          'type': 'string',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
        'titleCentered': {
          'default': false,
        },
      },
      'variantGroups': {},
      'states': {},
    },
    'appearances': {
      'default': {
        'mapping': {
          'height': 46,
          'paddingTop': 4,
          'paddingBottom': 12,
          'paddingHorizontal': 16,
          'backgroundColor': 'blue-primary',
          'titleColor': 'text-primary-inverse',
          'titleFontSize': 16,
          'titleFontWeight': '600',
          'subtitleColor': 'text-primary-inverse',
          'subtitleFontSize': 12,
          'subtitleFontWeight': '400',
          'textAlign': 'start',
        },
      },
      'titleCentered': {
        'mapping': {
          'textAlign': 'center',
        },
      },
    },
  },
  'TopNavigationBarAction': {
    'meta': {
      'scope': 'mobile',
      'parameters': {
        'width': {
          'type': 'number',
        },
        'height': {
          'type': 'number',
        },
        'marginRight': {
          'type': 'number',
        },
        'tintColor': {
          'type': 'string',
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
          'width': 25,
          'height': 25,
          'marginRight': 8,
          'tintColor': 'white',
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
  'text-primary-inverse': '#ffffff',
};
