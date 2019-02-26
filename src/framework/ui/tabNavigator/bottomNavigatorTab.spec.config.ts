import { ThemeMappingType } from 'eva/packages/common';
import { ThemeType } from '@kitten/theme';


export const mapping: ThemeMappingType = {
  BottomNavigatorTab: {
    meta: {
      variants: {},
      states: [
        'selected',
      ],
    },
    appearance: {
      default: {
        mapping: {
          icon: {
            marginBottom: 5,
            width: 40,
            height: 40,
            color: 'gray-dark',
          },
          text: {
            color: 'gray-dark',
            fontWeight: '600',
          },
          state: {
            selected: {
              icon: {
                color: 'blue-primary',
              },
              text: {
                color: 'blue-primary',
              },
            },
          },
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
