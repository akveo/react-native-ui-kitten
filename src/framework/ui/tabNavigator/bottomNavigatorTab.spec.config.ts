import { ThemeMappingType } from 'eva/packages/common';
import { ThemeType } from '@kitten/theme';


export const mapping: ThemeMappingType = {
  BottomNavigatorTab: {
    meta: {
      variants: {},
      states: [],
    },
    appearance: {
      default: {
        mapping: {
          'icon.marginBottom': 5,
          'icon.width': 40,
          'icon.height': 40,
          'title.color': 'gray-dark',
          'title.selectedColor': 'blue-primary',
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
