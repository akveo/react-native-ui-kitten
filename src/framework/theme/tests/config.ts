import { ThemeType } from '../component';

export const values = {
  backgroundDefault: '#ffffff',
  backgroundDark: '#000000',
  textDefault: '#000000',
  textDark: '#ffffff',
  textSuccess: '#00E676',
};

export const theme: ThemeType = {
  backgroundColorTestDefault: values.backgroundDefault,
  backgroundColorTestDark: values.backgroundDark,
  textColorTestDefault: values.textDefault,
  textColorTestSuccess: values.textSuccess,
};

export const themeInverse: ThemeType = {
  backgroundColorTestDefault: values.backgroundDark,
  backgroundColorTestDark: values.backgroundDefault,
  textColorTestDefault: values.textDark,
  textColorTestSuccess: values.textDefault,
};

export const mappings = {
  testDefault: [
    {
      parameter: 'backgroundColor',
      token: 'backgroundColorTestDefault',
    },
    {
      parameter: 'textColor',
      token: 'textColorTestDefault',
    },
  ],
  testDark: [
    {
      parameter: 'backgroundColor',
      token: 'backgroundColorTestDark',
    },
  ],
  testSuccess: [
    {
      parameter: 'textColor',
      token: 'textColorTestSuccess',
    },
  ],
  testInverseDefault: [
    {
      parameter: 'backgroundColor',
      token: 'backgroundColorTestDefault',
    },
    {
      parameter: 'textColor',
      token: 'textColorTestDefault',
    },
  ],
  mockBackground: [
    {
      parameter: 'backgroundColor',
      token: 'backgroundColorTestDefault',
    },
  ],
};

export const variants = {
  testDefault: {
    name: 'default',
    mapping: mappings.testDefault,
  },
  testDark: {
    name: 'dark',
    mapping: mappings.testDark,
  },
  testSuccess: {
    name: 'success',
    mapping: mappings.testSuccess,
  },
  testInverseDefault: {
    name: 'default',
    mapping: mappings.testInverseDefault,
  },
  mockDefault: {
    name: 'default',
    mapping: mappings.mockBackground,
  },
};

export const themeMappings = {
  test: {
    name: 'Test',
    parameters: [
      {
        name: 'backgroundColor',
      },
    ],
    variants: [variants.testDefault, variants.testDark, variants.testSuccess],
  },
  testInverse: {
    name: 'Test',
    parameters: [
      {
        name: 'backgroundColor',
      },
    ],
    variants: [variants.testInverseDefault],
  },
  mock: {
    name: 'Mock',
    parameters: [
      {
        name: 'backgroundColor',
      },
    ],
    variants: [variants.mockDefault],
  },
};
