import { ThemeType } from '../component';

export const values = {
  backgroundDefault: '#ffffff',
  backgroundDark: '#000000',
  textDefault: '#000000',
  textDefaultDisabled: '#9E9E9E',
  textDark: '#ffffff',
  textSuccess: '#4CAF50',
  textSuccessActive: '#81C784',
  backgroundSuccessDisabled: '#F5F5F5',
};

export const mappings = {
  Test: {
    parameters: [
      'backgroundColor',
      'textColor',
    ],
    states: [
      'active',
      'disabled',
    ],
    variants: {
      default: {
        backgroundColor: 'backgroundColorTestDefault',
        textColor: 'textColorTestDefault',
        state: {
          active: {
            backgroundColor: 'backgroundColorTestDark',
            textColor: 'textColorTestDark',
          },
          disabled: {
            textColor: 'textColorTestDefaultDisabled',
          },
        },
      },
      dark: {
        backgroundColor: 'backgroundColorTestDark',
        textColor: 'textColorTestDark',
        state: {
          active: {
            backgroundColor: 'backgroundColorTestDefault',
            textColor: 'textColorTestDefault',
          },
        },
      },
      success: {
        textColor: 'textColorTestSuccess',
        state: {
          active: {
            backgroundColor: 'backgroundColorTestDefault',
            textColor: 'textColorTestSuccessActive',
          },
          disabled: {
            backgroundColor: 'backgroundColorTestSuccessDisabled',
          },
        },
      },
    },
  },
};

export const theme: ThemeType = {
  backgroundColorTestDefault: values.backgroundDefault,
  backgroundColorTestDark: values.backgroundDark,
  textColorTestDefault: values.textDefault,
  textColorTestDefaultDisabled: values.textDefaultDisabled,
  textColorTestDark: values.textDark,
  textColorTestSuccess: values.textSuccess,
  textColorTestSuccessActive: values.textSuccessActive,
  backgroundColorTestSuccessDisabled: values.backgroundSuccessDisabled,
};

export const themeInverse: ThemeType = {
  backgroundColorTestDefault: values.backgroundDark,
  backgroundColorTestDark: values.backgroundDefault,
  textColorTestDefault: values.textDark,
  textColorTestDark: values.textDefault,
  textColorTestSuccess: values.textDefault,
};
