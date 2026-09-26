import { addons } from 'storybook/manager-api';
import { evaDark, evaLight } from './theme';

const prefersDark =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: prefersDark ? evaDark : evaLight,
});
