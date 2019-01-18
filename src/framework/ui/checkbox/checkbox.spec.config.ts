import { ThemeMappingType } from 'eva/packages/common';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  CheckBox: {
    meta: {
      variants: {
        status: [
          'error',
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
      'default': {
        mapping: {
          size: 30,
          highlightSize: 50,
          borderWidth: 2,
          borderRadius: 4,
          highlightBorderRadius: 8,
          borderColor: 'gray-primary',
          backgroundColor: 'gray-light',
          selectColor: 'transparent',
          highlightColor: 'transparent',
          state: {
            active: {
              borderColor: 'gray-dark',
              highlightColor: 'gray-light',
            },
            checked: {
              borderColor: 'transparent',
              selectColor: '#FFFFFF',
              backgroundColor: 'blue-primary',
            },
            disabled: {
              borderColor: 'gray-light',
              backgroundColor: '#F1F5F5',
            },
            'checked.active': {
              borderColor: 'blue-dark',
            },
            'checked.disabled': {
              borderColor: 'transparent',
              backgroundColor: 'gray-primary',
            },
          },
        },
        variant: {
          status: {
            error: {
              mapping: {
                borderColor: 'pink-primary',
                backgroundColor: '#FFC9D9',
                state: {
                  active: {
                    borderColor: 'pink-primary',
                  },
                  checked: {
                    borderColor: 'pink-primary',
                    backgroundColor: 'pink-primary',
                  },
                  'checked.active': {
                    borderColor: 'pink-primary',
                  },
                },
              },
            },
          },
          size: {
            big: {
              mapping: {
                size: 36,
                highlightSize: 60,
              },
            },
            small: {
              mapping: {
                size: 24,
                highlightSize: 40,
              },
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
