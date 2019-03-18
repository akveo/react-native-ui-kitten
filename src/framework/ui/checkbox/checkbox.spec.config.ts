import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'CheckBox': {
    'meta': {
      'scope': 'all',
      'parameters': {
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
          'type': 'string',
        },
        'backgroundColor': {
          'type': 'string',
        },
        'textColor': {
          'type': 'string',
        },
        'textFontSize': {
          'type': 'number',
        },
        'textFontWeight': {
          'type': 'string',
        },
        'textMarginLeft': {
          'type': 'number',
        },
        'selectWidth': {
          'type': 'number',
        },
        'selectHeight': {
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
          'borderRadius': 4,
          'borderColor': 'gray-primary',
          'backgroundColor': 'gray-light',
          'textColor': 'text-primary',
          'textFontWeight': '500',
          'selectBackgroundColor': 'transparent',
          'highlightBorderRadius': 8,
          'highlightBackgroundColor': 'transparent',
          'state': {
            'active': {
              'borderColor': 'gray-dark',
              'highlightBackgroundColor': 'gray-light',
            },
            'checked': {
              'borderColor': 'transparent',
              'backgroundColor': 'blue-primary',
              'selectBackgroundColor': '#FFFFFF',
            },
            'disabled': {
              'borderColor': 'gray-light',
              'backgroundColor': '#F1F5F5',
              'textColor': 'gray-300',
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
        'variantGroups': {
          'status': {
            'error': {
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
          'size': {
            'small': {
              'width': 24,
              'height': 24,
              'textMarginLeft': 10,
              'textFontSize': 14,
              'selectWidth': 12,
              'selectHeight': 12,
              'highlightWidth': 40,
              'highlightHeight': 40,
            },
            'medium': {
              'width': 30,
              'height': 30,
              'textMarginLeft': 12,
              'textFontSize': 16,
              'selectWidth': 14,
              'selectHeight': 14,
              'highlightWidth': 50,
              'highlightHeight': 50,
            },
            'large': {
              'width': 36,
              'height': 36,
              'textMarginLeft': 14,
              'textFontSize': 18,
              'selectWidth': 16,
              'selectHeight': 16,
              'highlightWidth': 60,
              'highlightHeight': 60,
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
};
