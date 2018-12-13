import { ThemeType } from '../component';

export const values = {
  backgroundDefault: '#ffffff',
  backgroundDark: '#000000',
  textDefault: '#000000',
  textDark: '#ffffff',
  textSuccess: '#00E676',
  textSuccessActive: '#81C784',
};

export const mappings = {
  Test: {
    parameters: [
      'backgroundColor',
      'textColor',
    ],
    states: [
      'active',
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
        },
      },
      dark: {
        backgroundColor: 'backgroundColorTestDark',
        textColor: 'textColorTestDark',
        state: {
          active: {
            backgroundColor: 'backgroundColorTestDefault',
          },
        },
      },
      success: {
        textColor: 'textColorTestSuccess',
        state: {
          active: {
            textColor: 'textColorTestSuccessActive',
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
  textColorTestDark: values.textDark,
  textColorTestSuccess: values.textSuccess,
  textColorTestSuccessActive: values.textSuccessActive,
};

export const themeInverse: ThemeType = {
  backgroundColorTestDefault: values.backgroundDark,
  backgroundColorTestDark: values.backgroundDefault,
  textColorTestDefault: values.textDark,
  textColorTestDark: values.textDefault,
  textColorTestSuccess: values.textDefault,
};
