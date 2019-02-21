import { ThemeMappingType } from 'eva/packages/common';
import { ThemeType } from '@kitten/theme';


export const mapping: ThemeMappingType = {
  BottomTabNavigator: {
    meta: {
      variants: {},
      states: [],
    },
    appearance: {
      default: {
        mapping: {
          backgroundColor: 'transparent',
          paddingVertical: 16,
          color: 'gray-dark',
          selectedColor: 'blue-primary',
          borderTopColor: 'gray-primary',
          borderTopWidth: 1,
          highlightHeight: 3,
          showHighlight: false,
        },
      },
      highlight: {
        mapping: {
          showHighlight: true,
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
