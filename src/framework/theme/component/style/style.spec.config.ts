import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '../../type';

export const mapping: ThemeMappingType = {
  Test: {
    meta: {
      scope: 'mobile',
      mapping: {
        size: {
          type: 'number',
        },
        innerSize: {
          type: 'number',
        },
        borderWidth: {
          type: 'number',
        },
        borderColor: {
          type: 'color',
        },
        selectColor: {
          type: 'color',
        },
      },
      appearances: {
        default: {
          default: true,
        },
        custom: {
          default: false,
        },
      },
      variants: {
        status: {
          success: {
            default: false,
          },
          info: {
            default: false,
          },
        },
        size: {
          small: {
            default: false,
          },
          medium: {
            default: true,
          },
          large: {
            default: false,
          },
        },
      },
      states: {
        checked: {
          default: false,
          priority: 0,
          scope: 'mobile',
        },
        disabled: {
          default: false,
          priority: 1,
          scope: 'mobile',
        },
        active: {
          default: false,
          priority: 2,
          scope: 'mobile',
        },
      },
    },
    appearance: {
      default: {
        mapping: {
          borderWidth: 2,
          borderColor: 'grayPrimary',
          selectColor: 'transparent',
          state: {
            active: {
              borderColor: 'grayDark',
            },
            checked: {
              borderColor: 'bluePrimary',
              selectColor: 'bluePrimary',
            },
            disabled: {
              borderColor: 'grayLight',
            },
            'active.checked': {
              borderColor: 'blueDark',
            },
            'checked.disabled': {
              selectColor: 'grayPrimary',
            },
          },
        },
        variant: {
          status: {
            info: {
              mapping: {
                state: {
                  checked: {
                    borderColor: 'orangePrimary',
                    selectColor: 'orangePrimary',
                  },
                  'active.checked': {
                    borderColor: 'orangeDark',
                  },
                },
              },
            },
            success: {
              mapping: {
                state: {
                  checked: {
                    borderColor: 'tealPrimary',
                    selectColor: 'tealPrimary',
                  },
                  'active.checked': {
                    borderColor: 'tealDark',
                  },
                },
              },
            },
          },
          size: {
            small: {
              mapping: {
                size: 30,
                innerSize: 20,
              },
            },
            medium: {
              mapping: {
                size: 36,
                innerSize: 24,
              },
            },
            large: {
              mapping: {
                size: 42,
                innerSize: 28,
              },
            },
          },
        },
      },
      custom: {
        mapping: {
          borderWidth: 4,
          state: {
            active: {
              borderColor: 'grayLight',
            },
          },
        },
        variant: {
          status: {
            success: {
              mapping: {
                borderColor: 'tealPrimary',
              },
            },
          },
        },
      },
    },
  },
  Empty: {
    meta: {
      scope: 'mobile',
      mapping: {},
      appearances: {},
      variants: {},
      states: {},
    },
    appearance: {},
  },
};

export const theme: ThemeType = {
  grayLight: '#E0E0E0',
  grayPrimary: '#9E9E9E',
  grayDark: '#616161',
  bluePrimary: '#2196F3',
  blueDark: '#1976D2',
  orangePrimary: '#FF9800',
  orangeDark: '#F57C00',
  tealPrimary: '#009688',
  tealDark: '#00796B',
};

export const themeInverse: ThemeType = {
  grayLight: '#616161',
  grayPrimary: '#9E9E9E',
  grayDark: '#E0E0E0',
  bluePrimary: '#2196F3',
  blueDark: '#1976D2',
  orangePrimary: '#FF9800',
  orangeDark: '#F57C00',
  tealPrimary: '#009688',
  tealDark: '#00796B',
};
