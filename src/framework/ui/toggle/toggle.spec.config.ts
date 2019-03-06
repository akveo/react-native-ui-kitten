import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Toggle': {
    'meta': {
      'scope': 'all',
      'mapping': {
        'width': {
          'type': 'number',
        },
        'height': {
          'type': 'number',
        },
        'borderRadius': {
          'type': 'number',
        },
        'borderWidth': {
          'type': 'number',
        },
        'offsetValue': {
          'type': 'number',
        },
        'tintColor': {
          'type': 'color',
        },
        'borderColor': {
          'type': 'color',
        },
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
          'priority': 1,
          'scope': 'all',
        },
      },
    },
    'appearance': {
      'default': {
        'mapping': {
          'offsetValue': 20,
          'tintColor': 'gray-light',
          'borderColor': 'blue-primary',
          'thumb': {
            'backgroundColor': '#ffffff',
          },
          'highlight': {
            'backgroundColor': 'transparent',
          },
          'state': {
            'active': {
              'highlight': {
                'backgroundColor': '#e5e7ea',
              },
            },
            'disabled': {
              'borderColor': 'gray-dark',
            },
          },
        },
        'variant': {
          'status': {
            'error': {
              'mapping': {
                'tintColor': '#FFD6D9',
                'borderColor': 'pink-primary',
                'state': {
                  'disabled': {
                    'tintColor': 'gray-light',
                  },
                },
              },
            },
          },
          'size': {
            'small': {
              'mapping': {
                'width': 38,
                'height': 22,
                'borderRadius': 11,
                'borderWidth': 0.5,
                'highlight': {
                  'width': 48,
                  'height': 32,
                  'borderRadius': 16,
                },
              },
            },
            'medium': {
              'mapping': {
                'width': 52,
                'height': 32,
                'borderRadius': 16,
                'borderWidth': 1.5,
                'highlight': {
                  'width': 62,
                  'height': 42,
                  'borderRadius': 21,
                },
              },
            },
            'large': {
              'mapping': {
                'width': 72,
                'height': 42,
                'borderRadius': 21,
                'borderWidth': 2,
                'highlight': {
                  'width': 82,
                  'height': 52,
                  'borderRadius': 26,
                },
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
