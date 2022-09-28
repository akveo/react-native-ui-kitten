import React from 'react';
import { Drawer, DrawerGroup, DrawerItem, Icon, IconElement } from '@ui-kitten/components';

const SmartphoneIcon = (props): IconElement => (
  <Icon
    {...props}
    name='smartphone-outline'
  />
);

const BrowserIcon = (props): IconElement => (
  <Icon
    {...props}
    name='browser-outline'
  />
);

const ColorPaletteIcon = (props): IconElement => (
  <Icon
    {...props}
    name='color-palette-outline'
  />
);

const StarIcon = (props): IconElement => (
  <Icon
    {...props}
    name='star'
  />
);

export const DrawerGroupsShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <DrawerGroup
        title='Akveo React Native'
        accessoryLeft={SmartphoneIcon}
      >
        <DrawerItem
          title='UI Kitten'
          accessoryLeft={StarIcon}
        />
        <DrawerItem
          title='Kitten Tricks'
          accessoryLeft={StarIcon}
        />
      </DrawerGroup>
      <DrawerGroup
        title='Akveo Angular'
        accessoryLeft={BrowserIcon}
      >
        <DrawerItem
          title='Nebular'
          accessoryLeft={StarIcon}
        />
        <DrawerItem
          title='ngx-admin'
          accessoryLeft={StarIcon}
        />
        <DrawerItem
          title='UI Bakery'
          accessoryLeft={StarIcon}
        />
      </DrawerGroup>
      <DrawerGroup
        title='Akveo Design'
        accessoryLeft={ColorPaletteIcon}
      >
        <DrawerItem
          title='Eva Design System'
          accessoryLeft={StarIcon}
        />
        <DrawerItem
          title='Eva Icons'
          accessoryLeft={StarIcon}
        />
      </DrawerGroup>
    </Drawer>
  );
};
