import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '../../type';

export const mapping: ThemeMappingType = {
  Test: {
    meta: {
      scope: 'mobile',
      parameters: {
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
          type: 'string',
        },
        selectColor: {
          type: 'string',
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
      variantGroups: {
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
    appearances: {
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
        variantGroups: {
          status: {
            info: {
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
            success: {
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
          size: {
            small: {
              size: 30,
              innerSize: 20,
            },
            medium: {
              size: 36,
              innerSize: 24,
            },
            large: {
              size: 42,
              innerSize: 28,
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
          variant: {
            status: {
              success: {
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
      parameters: {},
      appearances: {},
      variantGroups: {},
      states: {},
    },
    appearances: {},
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
