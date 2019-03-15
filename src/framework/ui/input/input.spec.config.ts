import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'Input': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'paddingVertical': {
          'type': 'number',
        },
        'paddingHorizontal': {
          'type': 'number',
        },
        'minHeight': {
          'type': 'number',
        },
        'borderRadius': {
          'type': 'number',
        },
        'borderWidth': {
          'type': 'number',
        },
        'borderColor': {
          'type': 'string',
        },
        'backgroundColor': {
          'type': 'string',
        },
        'textMarginHorizontal': {
          'type': 'number',
        },
        'textColor': {
          'type': 'string',
        },
        'iconWidth': {
          'type': 'number',
        },
        'iconHeight': {
          'type': 'number',
        },
        'iconMarginHorizontal': {
          'type': 'number',
        },
        'iconTintColor': {
          'type': 'string',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variantGroups': {
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
    'appearances': {
      'default': {
        'mapping': {
          'paddingVertical': 12,
          'paddingHorizontal': 6,
          'minHeight': 48,
          'borderRadius': 6,
          'borderWidth': 2,
          'borderColor': 'transparent',
          'backgroundColor': 'gray-100',
          'textMarginHorizontal': 6,
          'textColor': 'gray-400',
          'iconWidth': 24,
          'iconHeight': 24,
          'iconMarginHorizontal': 6,
          'iconTintColor': 'gray-400',
          'state': {
            'disabled': {
              'backgroundColor': 'gray-200',
              'textColor': 'gray-300',
              'iconTintColor': 'gray-300',
            },
          },
        },
        'variantGroups': {
          'status': {
            'primary': {
              'state': {
                'focused': {
                  'borderColor': 'blue-primary',
                  'iconTintColor': 'blue-primary',
                },
              },
            },
            'success': {
              'state': {
                'focused': {
                  'borderColor': '#4CAF50',
                  'iconTintColor': '#4CAF50',
                },
              },
            },
            'info': {
              'state': {
                'focused': {
                  'borderColor': '#03A9F4',
                  'iconTintColor': '#03A9F4',
                },
              },
            },
            'warning': {
              'state': {
                'focused': {
                  'borderColor': '#FFC107',
                  'iconTintColor': '#FFC107',
                },
              },
            },
            'error': {
              'state': {
                'focused': {
                  'borderColor': '#F44336',
                  'iconTintColor': '#F44336',
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
      'parameters': {
        'color': {
          'type': 'string',
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
      'variantGroups': {
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
    'appearances': {
      'primary': {
        'mapping': {
          'color': 'text-primary',
        },
        'variantGroups': {
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
