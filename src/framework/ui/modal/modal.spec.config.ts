import { ThemeMappingType } from 'eva/packages/common';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  Modal: {
    meta: {
      variants: {},
      states: [],
    },
    appearance: {
      default: {
        mapping: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: 'transparent',
          borderColor: 'blue-primary',
          borderRadius: 3,
          borderWidth: 1,
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
