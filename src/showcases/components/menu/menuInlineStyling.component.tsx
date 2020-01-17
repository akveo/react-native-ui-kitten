import React from 'react';
import { StyleSheet } from 'react-native';
import { Menu } from '@ui-kitten/components';

export const MenuInlineStylingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const data = [
    {
      title: 'Item 1',
      titleStyle: styles.menuItemTitle,
    },
    { title: 'Item 2' },
    {
      title: 'Item 3',
      titleStyle: styles.menuItemTitle,
    },
    { title: 'Item 4' },
  ];

  return (
    <Menu
      data={data}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    />
  );
};

const styles = StyleSheet.create({
  menuItemTitle: {
    color: 'black',
    fontSize: 18,
  },
});
