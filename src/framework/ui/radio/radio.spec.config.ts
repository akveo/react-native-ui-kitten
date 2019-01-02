export const mapping = {
  Radio: {
    appearance: {
      default: {
        mapping: {
          size: 36,
          innerSize: 24,
          highlightSize: 60,
          borderWidth: 2,
          borderColor: 'gray-primary',
          selectColor: 'transparent',
          highlightColor: 'transparent',
          state: {
            active: {
              borderColor: 'gray-dark',
              highlightColor: 'gray-light',
            },
            checked: {
              borderColor: 'blue-primary',
              selectColor: 'blue-primary',
            },
            disabled: {
              borderColor: 'gray-light',
            },
            'active.checked': {
              borderColor: 'blue-dark',
            },
            'checked.disabled': {
              selectColor: 'gray-primary',
            },
          },
        },
        variant: {
          status: {
            error: {
              mapping: {
                borderColor: 'pink-primary',
                state: {
                  checked: {
                    borderColor: 'pink-primary',
                    selectColor: 'pink-primary',
                  },
                  'active.checked': {
                    borderColor: 'pink-primary',
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
                highlightSize: 70,
              },
            },
            small: {
              mapping: {
                size: 30,
                innerSize: 20,
                highlightSize: 50,
              },
            },
          },
        },
      },
    },
  },
};

export const theme = {
  'blue-primary': '#3366FF',
  'blue-dark': '#2541CC',
  'gray-light': '#DDE1EB',
  'gray-primary': '#A6AEBD',
  'gray-dark': '#8992A3',
  'gray-highlight': '#EDF0F5',
  'pink-primary': '#FF3D71',
};
