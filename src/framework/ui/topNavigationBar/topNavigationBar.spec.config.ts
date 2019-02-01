import { ThemeMappingType } from 'eva/packages/common';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  TopNavigationBar: {
    meta: {
      variants: {},
      states: [],
    },
    appearance: {
      default: {
        mapping: {
          height: 46,
          paddingTop: 4,
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: 'blue-primary',
          withSubtitle: false,
          titleCentered: false,
          titleColor: 'white',
          titleFontSize: 16,
          titleFontWeight: '600',
          subtitleColor: 'white',
          subtitleFontSize: 12,
          subtitleFontWeight: '400',
          leftControlColor: 'white',
          rightControlsColors: ['white', 'white'],
        },
      },
      subtitle: {
        mapping: {
          withSubtitle: true,
        },
      },
      'title-centered': {
        mapping: {
          titleCentered: true,
        },
      },
      'title-centered-subtitle': {
        mapping: {
          withSubtitle: true,
          titleCentered: true,
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
