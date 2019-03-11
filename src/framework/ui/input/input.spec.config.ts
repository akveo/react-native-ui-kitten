import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Input': {
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
          'primary': {
            'default': true,
          },
          'success': {
            'default': false,
          },
          'info': {
            'default': false,
          },
          'warning': {
            'default': false,
          },
          'error': {
            'default': false,
          },
        },
      },
      'states': {
        'disabled': {
          'default': false,
          'priority': 0,
          'scope': 'all',
        },
        'focused': {
          'default': false,
          'priority': 1,
          'scope': 'all',
        },
      },
    },
    'appearance': {
      'default': {
        'mapping': {
          'paddingVertical': 12,
          'paddingHorizontal': 6,
          'minHeight': 48,
          'borderRadius': 6,
          'borderWidth': 2,
          'backgroundColor': 'gray-100',
          'borderColor': 'transparent',
          'text': {
            'marginHorizontal': 6,
            'color': 'gray-400',
          },
          'icon': {
            'width': 24,
            'height': 24,
            'marginHorizontal': 6,
            'tintColor': 'gray-400',
          },
          'state': {
            'disabled': {
              'backgroundColor': 'gray-200',
              'text': {
                'color': 'gray-300',
              },
              'icon': {
                'tintColor': 'gray-300',
              },
            },
          },
        },
        'variant': {
          'status': {
            'primary': {
              'state': {
                'focused': {
                  'borderColor': 'blue-primary',
                  'icon': {
                    'tintColor': 'blue-primary',
                  },
                },
              },
            },
            'success': {
              'state': {
                'focused': {
                  'borderColor': '#4CAF50',
                  'icon': {
                    'tintColor': '#4CAF50',
                  },
                },
              },
            },
            'info': {
              'state': {
                'focused': {
                  'borderColor': '#03A9F4',
                  'icon': {
                    'tintColor': '#03A9F4',
                  },
                },
              },
            },
            'warning': {
              'state': {
                'focused': {
                  'borderColor': '#FFC107',
                  'icon': {
                    'tintColor': '#FFC107',
                  },
                },
              },
            },
            'error': {
              'state': {
                'focused': {
                  'borderColor': '#F44336',
                  'icon': {
                    'tintColor': '#F44336',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  'Text': {
    'meta': {
      'scope': 'all',
      'mapping': {
        'color': {
          'type': 'color',
        },
        'fontSize': {
          'type': 'number',
        },
      },
      'appearances': {
        'primary': {
          'default': true,
        },
      },
      'variants': {
        'category': {
          'h1': {
            'default': false,
          },
          'h2': {
            'default': false,
          },
          'h3': {
            'default': false,
          },
          'h4': {
            'default': false,
          },
          'h5': {
            'default': false,
          },
          'h6': {
            'default': false,
          },
          'body': {
            'default': true,
          },
        },
      },
      'states': {},
    },
    'appearance': {
      'primary': {
        'mapping': {
          'color': 'text-primary',
        },
        'variant': {
          'category': {
            'h1': {
              'fontSize': 64,
            },
            'h2': {
              'fontSize': 40,
            },
            'h3': {
              'fontSize': 32,
            },
            'h4': {
              'fontSize': 24,
            },
            'h5': {
              'fontSize': 16,
            },
            'h6': {
              'fontSize': 14,
            },
            'body': {
              'fontSize': 16,
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
  }
;
