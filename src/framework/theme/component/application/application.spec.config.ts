import { ThemeMappingType } from 'eva/packages/common';
import { ThemeType } from '../../type';

export const mapping: ThemeMappingType = {
  Test: {
    meta: {
      variants: {
        status: [
          'success',
          'info',
        ],
        size: [
          'small',
          'big',
        ],
      },
      states: [
        'checked',
        'disabled',
        'active',
      ],
    },
    appearance: {
      default: {
        mapping: {
          size: 36,
          innerSize: 24,
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
            big: {
              mapping: {
                size: 42,
                innerSize: 28,
              },
            },
            small: {
              mapping: {
                size: 30,
                innerSize: 20,
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
      variants: {},
      states: [],
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
