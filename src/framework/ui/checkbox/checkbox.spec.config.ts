import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'CheckBox': {
    'meta': {
      'scope': 'all',
      'parameters': {
        'width': {
          'type': 'string',
        },
        'height': {
          'type': 'string',
        },
        'borderWidth': {
          'type': 'string',
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
        'textLineHeight': {
          'type': 'string',
        },
        'checkMarkColor': {
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
          'primary': {
            'default': true,
          },
          'success': {
            'default': false,
          },
          'warning': {
            'default': false,
          },
          'danger': {
            'default': false,
          },
          'info': {
            'default': false,
          },
          'white': {
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
        'indeterminate': {
          'default': false,
          'priority': 3,
          'scope': 'all',
        },
      },
    },
    'appearances': {
      'default': {
        'mapping': {
          'borderWidth': 'checkbox-border-width',
          'borderRadius': 'checkbox-border-radius',
          'borderColor': 'color-primary-500',
          'backgroundColor': 'color-primary-200',
          'textColor': 'font-primary-color',
          'textFontWeight': 'font-primary-regular-text-weight',
          'textLineHeight': 'font-primary-regular-text-line-height',
          'checkMarkColor': 'opacity-transparent',
          'width': 'checkbox-width',
          'height': 'checkbox-height',
          'textFontSize': 'font-primary-regular-text-size',
          'highlightWidth': 40,
          'highlightHeight': 40,
          'highlightBorderRadius': 6,
          'highlightBackgroundColor': 'transparent',
          'state': {
            'active': {
              'borderColor': 'color-primary-600',
              'backgroundColor': 'color-primary-600',
              'highlightBackgroundColor': 'gray-light',
            },
            'indeterminate': {
              'borderColor': 'color-primary-500',
              'backgroundColor': 'color-primary-500',
              'checkMarkColor': 'color-white',
            },
            'checked': {
              'borderColor': 'color-primary-500',
              'backgroundColor': 'color-primary-500',
              'checkMarkColor': 'color-white',
            },
            'disabled': {
              'borderColor': 'color-basic-600',
              'backgroundColor': 'color-basic-400',
              'textColor': 'font-primary-disabled-color',
            },
            'checked.active': {
              'borderColor': 'color-primary-600',
            },
            'checked.disabled': {
              'borderColor': 'color-basic-400',
              'backgroundColor': 'color-basic-400',
            },
          },
        },
        'variantGroups': {
          'status': {
            'success': {
              'borderColor': 'color-success-500',
              'backgroundColor': 'color-success-200',
              'state': {
                'active': {
                  'borderColor': 'color-success-600',
                  'backgroundColor': 'color-success-600',
                },
                'checked': {
                  'borderColor': 'color-success-500',
                  'backgroundColor': 'color-success-500',
                },
                'indeterminate': {
                  'borderColor': 'color-success-500',
                  'backgroundColor': 'color-success-500',
                },
                'checked.active': {
                  'borderColor': 'color-success-600',
                },
              },
            },
            'warning': {
              'borderColor': 'color-warning-500',
              'backgroundColor': 'color-warning-200',
              'state': {
                'active': {
                  'borderColor': 'color-warning-600',
                  'backgroundColor': 'color-warning-600',
                },
                'checked': {
                  'borderColor': 'color-warning-500',
                  'backgroundColor': 'color-warning-500',
                },
                'indeterminate': {
                  'borderColor': 'color-warning-500',
                  'backgroundColor': 'color-warning-500',
                },
                'checked.active': {
                  'borderColor': 'color-warning-600',
                },
              },
            },
            'danger': {
              'borderColor': 'color-danger-500',
              'backgroundColor': 'color-danger-200',
              'state': {
                'active': {
                  'borderColor': 'color-danger-600',
                  'backgroundColor': 'color-danger-600',
                },
                'checked': {
                  'borderColor': 'color-danger-500',
                  'backgroundColor': 'color-danger-500',
                },
                'indeterminate': {
                  'borderColor': 'color-danger-500',
                  'backgroundColor': 'color-danger-500',
                },
                'checked.active': {
                  'borderColor': 'color-danger-600',
                },
              },
            },
            'info': {
              'borderColor': 'color-info-500',
              'backgroundColor': 'color-info-200',
              'state': {
                'active': {
                  'borderColor': 'color-info-600',
                  'backgroundColor': 'color-info-600',
                },
                'checked': {
                  'borderColor': 'color-info-500',
                  'backgroundColor': 'color-info-500',
                },
                'indeterminate': {
                  'borderColor': 'color-info-500',
                  'backgroundColor': 'color-info-500',
                },
                'checked.active': {
                  'borderColor': 'color-info-600',
                },
              },
            },
            'white': {
              'borderColor': 'color-white',
              'backgroundColor': 'color-white',
              'checkMarkColor': 'opacity-transparent',
              'state': {
                'active': {
                  'borderColor': 'color-white',
                  'backgroundColor': 'color-white',
                },
                'checked': {
                  'backgroundColor': 'color-white',
                  'borderColor': 'color-white',
                  'checkMarkColor': 'color-primary-500',
                },
                'indeterminate': {
                  'checkMarkColor': 'color-primary-500',
                },
                'checked.active': {
                  'borderColor': 'color-white',
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
  'blue-pitch-dark': '#0D1C2E',
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

  'color-primary-100': '#F2F6FF',
  'color-primary-200': '#D9E4FF',
  'color-primary-300': '#A6C1FF',
  'color-primary-400': '#598BFF',
  'color-primary-500': '#3366FF',
  'color-primary-600': '#284DE0',
  'color-primary-700': '#2541CC',
  'color-primary-800': '#192F9E',
  'color-primary-900': '#14236E',
  'color-secondary-100': '#F7F2FF',
  'color-secondary-200': '#E0D1FF',
  'color-secondary-300': '#C5A8FF',
  'color-secondary-400': '#A375FF',
  'color-secondary-500': '#884DFF',
  'color-secondary-600': '#6A39DB',
  'color-secondary-700': '#4F28B8',
  'color-secondary-800': '#371B94',
  'color-secondary-900': '#26117A',
  'color-tertiary-100': '#FFDED6',
  'color-tertiary-200': '#FFDED6',
  'color-tertiary-300': '#FFDED6',
  'color-tertiary-400': '#FFDED6',
  'color-tertiary-500': '#FFDED6',
  'color-tertiary-600': '#FFDED6',
  'color-tertiary-700': '#FFDED6',
  'color-tertiary-800': '#FFDED6',
  'color-tertiary-900': '#FFDED6',
  'color-success-100': '#EDFFF3',
  'color-success-200': '#B3FFD6',
  'color-success-300': '#8CFAC7',
  'color-success-400': '#51F0B0',
  'color-success-500': '#00E096',
  'color-success-600': '#00B383',
  'color-success-700': '#008F72',
  'color-success-800': '#007566',
  'color-success-900': '#00524C',
  'color-info-100': '#F2F8FF',
  'color-info-200': '#C7E2FF',
  'color-info-300': '#94CBFF',
  'color-info-400': '#42AAFF',
  'color-info-500': '#0095FF',
  'color-info-600': '#006FD6',
  'color-info-700': '#0057C2',
  'color-info-800': '#0041A8',
  'color-info-900': '#002885',
  'color-warning-100': '#FFFDF2',
  'color-warning-200': '#FFF1C2',
  'color-warning-300': '#FFE59E',
  'color-warning-400': '#FFC94D',
  'color-warning-500': '#FFAA00',
  'color-warning-600': '#DB8B00',
  'color-warning-700': '#B86E00',
  'color-warning-800': '#945400',
  'color-warning-900': '#703C00',
  'color-danger-100': '#FFF2F2',
  'color-danger-200': '#FFD6D9',
  'color-danger-300': '#FFA8B4',
  'color-danger-400': '#FF708D',
  'color-danger-500': '#FF3D71',
  'color-danger-600': '#DB2C66',
  'color-danger-700': '#B81D5B',
  'color-danger-800': '#94124E',
  'color-danger-900': '#700940',
  'color-basic-100': '#F7F8FA',
  'color-basic-200': '#EDF0F5',
  'color-basic-300': '#DDE1EB',
  'color-basic-400': '#C8CEDB',
  'color-basic-500': '#A6AEBD',
  'color-basic-600': '#8992A3',
  'color-basic-700': '#6A7385',
  'color-basic-800': '#4B5466',
  'color-basic-900': '#2C3547',
  'color-white': '#FFFFFF',
  'color-black': '#0D1C2E',
  'opacity-transparent': 'transparent',
  'outline-width': 11,
  'outline-color': '#DDE1EB',
  'outline-disabled-width': 0,
  'outline-disabled-color': 'transparent',
  'checkbox-height': 24,
  'checkbox-width': 24,
  'checkbox-border-width': 1,
  'checkbox-border-radius': 3,
  'font-primary-family': '',
  'font-primary-color': '#0D1C2E',
  'font-primary-disabled-color': '#C8CEDB',
  'font-primary-regular-text-size': 14,
  'font-primary-regular-text-weight': '600',
  'font-primary-regular-text-line-height': 16,
};
