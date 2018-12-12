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
        backgroundColor: 'background-color-test-default',
        textColor: 'text-color-test-default',
      },
      dark: {
        backgroundColor: 'background-color-test-dark',
        textColor: 'text-color-test-dark',
      },
      success: {
        textColor: 'text-color-test-success',
      },
    },
  },
};

export const theme: ThemeType = {
  ['background-color-test-default']: values.backgroundDefault,
  ['background-color-test-dark']: values.backgroundDark,
  ['text-color-test-default']: values.textDefault,
  ['text-color-test-dark']: values.textDark,
  ['text-color-test-success']: values.textSuccess,
};

export const themeInverse: ThemeType = {
  ['background-color-test-default']: values.backgroundDark,
  ['background-color-test-dark']: values.backgroundDefault,
  ['text-color-test-default']: values.textDark,
  ['text-color-test-dark']: values.textDefault,
  ['text-color-test-success']: values.textDefault,
};
