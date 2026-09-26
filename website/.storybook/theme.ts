import { create, type ThemeVars } from 'storybook/theming';

/**
 * Storybook manager themes built from the Eva Design System palette
 * (`src/eva/themes/light.json` and `dark.json`), so the Storybook chrome
 * matches the components rendered inside it.
 */
const eva = {
  primary400: '#598BFF',
  primary500: '#3366FF',
  primary600: '#274BDB',
  basic100: '#FFFFFF',
  basic200: '#F7F9FC',
  basic300: '#EDF1F7',
  basic400: '#E4E9F2',
  basic500: '#C5CEE0',
  basic600: '#8F9BB3',
  basic700: '#2E3A59',
  basic800: '#222B45',
  basic900: '#1A2138',
  basic1000: '#151A30',
  basic1100: '#101426',
};

const shared = {
  brandTitle: 'UI Kitten',
  brandUrl: 'https://akveo.github.io/react-native-ui-kitten/',
  brandTarget: '_self' as const,
  colorPrimary: eva.primary500,
  colorSecondary: eva.primary500,
  fontBase: '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
  appBorderRadius: 4,
  inputBorderRadius: 4,
};

export const evaLight: ThemeVars = create({
  ...shared,
  base: 'light',
  appBg: eva.basic200,
  appContentBg: eva.basic100,
  appPreviewBg: eva.basic100,
  appBorderColor: eva.basic400,
  textColor: eva.basic800,
  textInverseColor: eva.basic100,
  textMutedColor: eva.basic600,
  barTextColor: eva.basic700,
  barHoverColor: eva.primary600,
  barSelectedColor: eva.primary500,
  barBg: eva.basic100,
  buttonBg: eva.basic200,
  buttonBorder: eva.basic400,
  booleanBg: eva.basic300,
  booleanSelectedBg: eva.basic100,
  inputBg: eva.basic100,
  inputBorder: eva.basic400,
  inputTextColor: eva.basic800,
});

export const evaDark: ThemeVars = create({
  ...shared,
  base: 'dark',
  appBg: eva.basic900,
  appContentBg: eva.basic800,
  appPreviewBg: eva.basic800,
  appBorderColor: eva.basic1000,
  textColor: eva.basic100,
  textInverseColor: eva.basic800,
  textMutedColor: eva.basic600,
  barTextColor: eva.basic500,
  barHoverColor: eva.primary400,
  barSelectedColor: eva.primary500,
  barBg: eva.basic800,
  buttonBg: eva.basic900,
  buttonBorder: eva.basic1000,
  booleanBg: eva.basic1000,
  booleanSelectedBg: eva.basic800,
  inputBg: eva.basic900,
  inputBorder: eva.basic1000,
  inputTextColor: eva.basic100,
});
