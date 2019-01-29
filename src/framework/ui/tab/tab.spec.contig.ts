import { ThemeMappingType } from 'eva/packages/common';
import { ThemeType } from '@kitten/theme';


export const mapping: ThemeMappingType = {
  Tab: {
    meta: {
      variants: {},
      states: [
        'selected',
        'active',
      ],
    },
    appearance: {
      default: {
        mapping: {
          state: {
            selected: {},
            active: {},
            'selected.active': {},
          },
        },
      },
    },
  },
  TabBar: {
    meta: {
      variants: {},
      states: [],
    },
    appearance: {
      default: {
        mapping: {
          barSize: 42,
          indicatorSize: 4,
          indicatorBorderRadius: 2,
          indicatorColor: 'pink-primary',
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
