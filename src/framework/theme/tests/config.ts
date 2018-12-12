import { ThemeType } from '../component';

export const values = {
  backgroundDefault: '#ffffff',
  backgroundDark: '#000000',
  textDefault: '#000000',
  textDark: '#ffffff',
  textSuccess: '#00E676',
};

export const mappings = {
  Test: {
    parameters: [
      'backgroundColor',
      'textColor',
    ],
    variants: {
      default: {
        backgroundColor: 'backgroundColorTestDefault',
        textColor: 'textColorTestDefault',
      },
      dark: {
        backgroundColor: 'backgroundColorTestDark',
        textColor: 'textColorTestDark',
      },
      success: {
        textColor: 'textColorTestSuccess',
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
};

export const themeInverse: ThemeType = {
  backgroundColorTestDefault: values.backgroundDark,
  backgroundColorTestDark: values.backgroundDefault,
  textColorTestDefault: values.textDark,
  textColorTestDark: values.textDefault,
  textColorTestSuccess: values.textDefault,
};
