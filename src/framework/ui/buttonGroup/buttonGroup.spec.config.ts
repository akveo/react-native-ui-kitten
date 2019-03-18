import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'ButtonGroup': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'buttonBorderRadius': {
          'type': 'number',
        },
      },
      'appearances': {
        'filled': {
          'default': true,
        },
        'outline': {
          'default': false,
        },
      },
      'variantGroups': {
        'size': {
          'tiny': {
            'default': false,
          },
          'small': {
            'default': false,
          },
          'medium': {
            'default': true,
          },
          'large': {
            'default': false,
          },
          'giant': {
            'default': false,
          },
        },
      },
      'states': {},
    },
    'appearances': {
      'filled': {
        'mapping': {
          'buttonBorderRadius': 6,
        },
        'variantGroups': {
          'size': {
            'tiny': {},
            'small': {},
            'medium': {},
            'large': {},
            'giant': {},
          },
        },
      },
      'outline': {
        'mapping': {},
      },
    },
  },
  'Button': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'minWidth': {
          'type': 'number',
        },
        'minHeight': {
          'type': 'number',
        },
        'padding': {
          'type': 'number',
        },
        'borderRadius': {
          'type': 'number',
        },
        'borderWidth': {
          'type': 'number',
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
        'textMarginHorizontal': {
          'type': 'number',
        },
        'iconWidth': {
          'type': 'number',
        },
        'iconHeight': {
          'type': 'number',
        },
        'iconTintColor': {
          'type': 'string',
        },
        'iconMarginHorizontal': {
          'type': 'number',
        },
      },
      'appearances': {
        'filled': {
          'default': true,
        },
        'outline': {
          'default': false,
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
          'danger': {
            'default': false,
          },
        },
        'size': {
          'tiny': {
            'default': false,
          },
          'small': {
            'default': false,
          },
          'medium': {
            'default': true,
          },
          'large': {
            'default': false,
          },
          'giant': {
            'default': true,
          },
        },
      },
      'states': {
        'disabled': {
          'default': false,
          'priority': 0,
          'scope': 'all',
        },
        'active': {
          'default': false,
          'priority': 1,
          'scope': 'all',
        },
      },
    },
    'appearances': {
      'filled': {
        'mapping': {
          'borderRadius': 6,
          'textColor': 'text-primary-inverse',
          'textFontWeight': '800',
          'iconTintColor': '#ffffff',
          'iconMarginHorizontal': 4,
        },
        'variantGroups': {
          'status': {
            'primary': {
              'backgroundColor': '#2196F3',
              'state': {
                'active': {
                  'backgroundColor': '#1E88E5',
                },
              },
            },
            'success': {
              'backgroundColor': '#4CAF50',
              'state': {
                'active': {
                  'backgroundColor': '#43A047',
                },
              },
            },
            'info': {
              'backgroundColor': '#03A9F4',
              'state': {
                'active': {
                  'backgroundColor': '#039BE5',
                },
              },
            },
            'warning': {
              'backgroundColor': '#FFC107',
              'state': {
                'active': {
                  'backgroundColor': '#FFB300',
                },
              },
            },
            'danger': {
              'backgroundColor': '#F44336',
              'state': {
                'active': {
                  'backgroundColor': '#E53935',
                },
              },
            },
          },
          'size': {
            'tiny': {
              'minWidth': 16,
              'minHeight': 16,
              'padding': 3,
              'textFontSize': 10,
              'textMarginHorizontal': 3,
              'iconWidth': 11,
              'iconHeight': 11,
              'iconMarginHorizontal': 3,
            },
            'small': {
              'minHeight': 20,
              'minWidth': 20,
              'padding': 3.5,
              'textFontSize': 11,
              'textMarginHorizontal': 3.5,
              'iconWidth': 12,
              'iconHeight': 12,
              'iconMarginHorizontal': 3.5,
            },
            'medium': {
              'minHeight': 24,
              'minWidth': 24,
              'padding': 4,
              'textFontSize': 12,
              'textMarginHorizontal': 4,
              'iconWidth': 13,
              'iconHeight': 13,
              'iconMarginHorizontal': 4,
            },
            'large': {
              'minHeight': 30,
              'minWidth': 30,
              'padding': 4.5,
              'textFontSize': 13,
              'textMarginHorizontal': 4.5,
              'iconWidth': 14,
              'iconHeight': 14,
              'iconMarginHorizontal': 4.5,
            },
            'giant': {
              'minHeight': 36,
              'minWidth': 36,
              'padding': 5,
              'textFontSize': 14,
              'textMarginHorizontal': 5,
              'iconWidth': 15,
              'iconHeight': 15,
              'iconMarginHorizontal': 5,
            },
          },
        },
      },
      'outline': {
        'mapping': {
          'borderWidth': 2,
        },
        'variantGroups': {
          'status': {
            'primary': {
              'backgroundColor': 'transparent',
              'borderColor': '#2196F3',
              'textColor': '#2196F3',
              'iconTintColor': '#2196F3',
              'state': {
                'active': {
                  'backgroundColor': 'transparent',
                  'borderColor': '#1E88E5',
                  'textColor': '#1E88E5',
                  'iconTintColor': '#1E88E5',
                },
              },
            },
            'success': {
              'backgroundColor': 'transparent',
              'borderColor': '#4CAF50',
              'textColor': '#4CAF50',
              'iconTintColor': '#4CAF50',
              'state': {
                'active': {
                  'backgroundColor': 'transparent',
                  'borderColor': '#43A047',
                  'textColor': '#43A047',
                  'iconTintColor': '#43A047',
                },
              },
            },
            'info': {
              'backgroundColor': 'transparent',
              'borderColor': '#03A9F4',
              'textColor': '#03A9F4',
              'iconTintColor': '#03A9F4',
              'state': {
                'active': {
                  'backgroundColor': 'transparent',
                  'borderColor': '#039BE5',
                  'textColor': '#039BE5',
                  'iconTintColor': '#039BE5',
                },
              },
            },
            'warning': {
              'backgroundColor': 'transparent',
              'borderColor': '#FFC107',
              'textColor': '#FFC107',
              'iconTintColor': '#FFC107',
              'state': {
                'active': {
                  'backgroundColor': 'transparent',
                  'borderColor': '#FFB300',
                  'textColor': '#FFB300',
                  'iconTintColor': '#FFB300',
                },
              },
            },
            'danger': {
              'backgroundColor': 'transparent',
              'borderColor': '#F44336',
              'textColor': '#F44336',
              'iconTintColor': '#F44336',
              'state': {
                'active': {
                  'backgroundColor': 'transparent',
                  'borderColor': '#E53935',
                  'textColor': '#E53935',
                  'iconTintColor': '#E53935',
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
};
