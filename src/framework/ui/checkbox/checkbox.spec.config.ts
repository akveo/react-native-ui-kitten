import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'CheckBox': {
    'meta': {
      'scope': 'all',
      'mapping': {
        'width': {
          'type': 'number',
        },
        'height': {
          'type': 'number',
        },
        'borderWidth': {
          'type': 'number',
        },
        'borderRadius': {
          'type': 'number',
        },
        'borderColor': {
          'type': 'color',
        },
        'backgroundColor': {
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
          'borderRadius': 4,
          'borderColor': 'gray-primary',
          'backgroundColor': 'gray-light',
          'highlight': {
            'borderRadius': 8,
            'backgroundColor': 'transparent',
          },
          'select': {
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
              'borderColor': 'transparent',
              'backgroundColor': 'blue-primary',
              'select': {
                'backgroundColor': '#FFFFFF',
              },
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
                'width': 24,
                'height': 24,
                'highlight': {
                  'width': 40,
                  'height': 40,
                },
              },
            },
            'medium': {
              'mapping': {
                'width': 30,
                'height': 30,
                'highlight': {
                  'width': 50,
                  'height': 50,
                },
              },
            },
            'large': {
              'mapping': {
                'width': 36,
                'height': 36,
                'highlight': {
                  'width': 60,
                  'height': 60,
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
