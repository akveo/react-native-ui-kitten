import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'RadioGroup': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'padding': {
          'type': 'number',
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
          'padding': 0,
        },
      },
    },
  },
  'Radio': {
    'meta': {
      'scope': 'all',
      'parameters': {
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
          'type': 'string',
        },
        'textColor': {
          'type': 'string',
        },
        'textMarginLeft': {
          'type': 'number',
        },
        'textFontSize': {
          'type': 'number',
        },
        'textFontWeight': {
          'type': 'string',
        },
        'selectWidth': {
          'type': 'number',
        },
        'selectHeight': {
          'type': 'number',
        },
        'selectBorderRadius': {
          'type': 'number',
        },
        'selectBackgroundColor': {
          'type': 'string',
        },
        'highlightWidth': {
          'type': 'number',
        },
        'highlightHeight': {
          'type': 'number',
        },
        'highlightBorderRadius': {
          'type': 'number',
        },
        'highlightBackgroundColor': {
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
    'appearances': {
      'default': {
        'mapping': {
          'borderWidth': 2,
          'borderColor': 'gray-primary',
          'textColor': 'text-primary',
          'textFontWeight': '500',
          'selectBackgroundColor': 'transparent',
          'highlightBackgroundColor': 'transparent',
          'state': {
            'active': {
              'borderColor': 'gray-dark',
              'highlightBackgroundColor': 'gray-light',
            },
            'checked': {
              'borderColor': 'blue-primary',
              'selectBackgroundColor': 'blue-primary',
            },
            'disabled': {
              'borderColor': 'gray-light',
              'textColor': 'gray-300',
            },
            'checked.active': {
              'borderColor': 'blue-dark',
            },
            'checked.disabled': {
              'selectBackgroundColor': 'gray-primary',
            },
          },
        },
        'variantGroups': {
          'status': {
            'error': {
              'borderColor': 'pink-primary',
              'state': {
                'checked': {
                  'borderColor': 'pink-primary',
                  'selectBackgroundColor': 'pink-primary',
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
              'textMarginLeft': 10,
              'textFontSize': 14,
              'selectWidth': 20,
              'selectHeight': 20,
              'selectBorderRadius': 10,
              'highlightWidth': 50,
              'highlightHeight': 50,
              'highlightBorderRadius': 25,
            },
            'medium': {
              'width': 36,
              'height': 36,
              'borderRadius': 18,
              'textMarginLeft': 12,
              'textFontSize': 16,
              'selectWidth': 24,
              'selectHeight': 24,
              'selectBorderRadius': 12,
              'highlightWidth': 60,
              'highlightHeight': 60,
              'highlightBorderRadius': 30,
            },
            'large': {
              'width': 42,
              'height': 42,
              'borderRadius': 21,
              'textMarginLeft': 14,
              'textFontSize': 18,
              'selectWidth': 28,
              'selectHeight': 28,
              'selectBorderRadius': 14,
              'highlightWidth': 70,
              'highlightHeight': 70,
              'highlightBorderRadius': 35,
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
};
