/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Icon,
  Menu,
} from '@ui-kitten/components';

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

const data = [
  {
    title: 'Item 1',
    icon: StarIcon,
  },
  {
    title: 'Item 2',
    icon: StarIcon,
  },
  {
    title: 'Item 3',
    icon: StarIcon,
  },
  {
    title: 'Item 4',
    icon: StarIcon,
  },
];

export const MenuWithIconsShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Menu
      data={data}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    />
  );
};
