import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Radio': {
    'meta': {
      'scope': 'all',
      'mapping': {},
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
          'selectColor': 'transparent',
          'highlightColor': 'transparent',
          'state': {
            'active': {
              'borderColor': 'gray-dark',
              'highlightColor': 'gray-light',
            },
            'checked': {
              'borderColor': 'blue-primary',
              'selectColor': 'blue-primary',
            },
            'disabled': {
              'borderColor': 'gray-light',
            },
            'checked.active': {
              'borderColor': 'blue-dark',
            },
            'checked.disabled': {
              'selectColor': 'gray-primary',
            },
          },
        },
        'variant': {
          'status': {
            'error': {
              'mapping': {
                'borderColor': 'pink-primary',
                'state': {
                  'checked': {
                    'borderColor': 'pink-primary',
                    'selectColor': 'pink-primary',
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
                'size': 30,
                'innerSize': 20,
                'highlightSize': 50,
              },
            },
            'medium': {
              'mapping': {
                'size': 36,
                'innerSize': 24,
                'highlightSize': 60,
              },
            },
            'large': {
              'mapping': {
                'size': 42,
                'innerSize': 28,
                'highlightSize': 70,
              },
            },
          },
        },
      },
    },
  },
  'RadioGroup': {
    'meta': {
      'scope': 'all',
      'mapping': {
        'padding': {
          'type': 'number',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variants': {},
      'states': {},
    },
    'appearance': {
      'default': {
        'mapping': {
          'padding': 0,
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
