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
