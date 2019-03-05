import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'CheckBox': {
    'meta': {
      'scope': 'all',
      'mapping': {
      },
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
          'priority': 2,
          'scope': 'all',
        },
      },
    },
    'appearance': {
      'default': {
        'mapping': {
          'borderWidth': 2,
          'borderRadius': 4,
          'highlightBorderRadius': 8,
          'borderColor': 'gray-primary',
          'backgroundColor': 'gray-light',
          'selectColor': 'transparent',
          'highlightColor': 'transparent',
          'state': {
            'active': {
              'borderColor': 'gray-dark',
              'highlightColor': 'gray-light',
            },
            'checked': {
              'borderColor': 'transparent',
              'selectColor': '#FFFFFF',
              'backgroundColor': 'blue-primary',
            },
            'disabled': {
              'borderColor': 'gray-light',
              'backgroundColor': '#F1F5F5',
            },
            'checked.active': {
              'borderColor': 'blue-dark',
            },
            'checked.disabled': {
              'borderColor': 'transparent',
              'backgroundColor': 'gray-primary',
            },
          },
        },
        'variant': {
          'status': {
            'error': {
              'mapping': {
                'borderColor': 'pink-primary',
                'backgroundColor': '#FFC9D9',
                'state': {
                  'active': {
                    'borderColor': 'pink-primary',
                  },
                  'checked': {
                    'borderColor': 'pink-primary',
                    'backgroundColor': 'pink-primary',
                  },
                  'checked.active': {
                    'borderColor': 'pink-primary',
                  },
                },
              },
            },
          },
          'size': {
            'small': {
              'mapping': {
                'size': 24,
                'highlightSize': 40,
              },
            },
            'medium': {
              'mapping': {
                'size': 30,
                'highlightSize': 50,
              },
            },
            'large': {
              'mapping': {
                'size': 36,
                'highlightSize': 60,
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
