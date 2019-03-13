import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Radio': {
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
          'priority': 2,
          'scope': 'all',
        },
      },
    },
    'appearance': {
      'default': {
        'mapping': {
          'borderWidth': 2,
          'borderColor': 'gray-primary',
          'text': {
            'color': 'text-primary',
            'fontWeight': '500',
          },
          'select': {
            'backgroundColor': 'transparent',
          },
          'highlight': {
            'backgroundColor': 'transparent',
          },
          'state': {
            'active': {
              'borderColor': 'gray-dark',
              'highlight': {
                'backgroundColor': 'gray-light',
              },
            },
            'checked': {
              'borderColor': 'blue-primary',
              'select': {
                'backgroundColor': 'blue-primary',
              },
            },
            'disabled': {
              'borderColor': 'gray-light',
              'text': {
                'color': 'gray-300',
              },
            },
            'checked.active': {
              'borderColor': 'blue-dark',
            },
            'checked.disabled': {
              'select': {
                'backgroundColor': 'gray-primary',
              },
            },
          },
        },
        'variant': {
          'status': {
            'error': {
              'borderColor': 'pink-primary',
              'state': {
                'checked': {
                  'borderColor': 'pink-primary',
                  'select': {
                    'backgroundColor': 'pink-primary',
                  },
                },
                'checked.active': {
                  'borderColor': 'pink-primary',
                },
              },
            },
          },
          'size': {
            'small': {
              'width': 30,
              'height': 30,
              'borderRadius': 15,
              'select': {
                'width': 20,
                'height': 20,
                'borderRadius': 10,
              },
              'highlight': {
                'width': 50,
                'height': 50,
                'borderRadius': 25,
              },
              'text': {
                'marginLeft': 10,
                'fontSize': 14,
              },
            },
            'medium': {
              'width': 36,
              'height': 36,
              'borderRadius': 18,
              'select': {
                'width': 24,
                'height': 24,
                'borderRadius': 12,
              },
              'highlight': {
                'width': 60,
                'height': 60,
                'borderRadius': 30,
              },
              'text': {
                'marginLeft': 12,
                'fontSize': 16,
              },
            },
            'large': {
              'width': 42,
              'height': 42,
              'borderRadius': 21,
              'select': {
                'width': 28,
                'height': 28,
                'borderRadius': 14,
              },
              'highlight': {
                'width': 70,
                'height': 70,
                'borderRadius': 35,
              },
              'text': {
                'marginLeft': 14,
                'fontSize': 18,
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
  'text-primary': '#000000',
  'text-primary-inverse': '#ffffff',

  'gray-100': '#f7f8fa',
  'gray-200': '#edf0f5',
  'gray-300': '#c8cedb',
  'gray-400': '#a6aebd',
};
